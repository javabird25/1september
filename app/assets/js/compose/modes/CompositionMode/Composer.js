import React, { useEffect, useState, useRef } from 'react';

import PhotoScaleButtons from './PhotoScaleButtons';
import UsageHint from './UsageHint';

/**
 * Возвращает ширину, высоту и координаты верхнего левого угла свободного места в рамке.
 * Эти значения зашифрованы в конце имени файла изображения, в виде
 * "Название_30x10@20,40.png", где ширина и высота области для фотографии - 30 и 10,
 * координаты верхего левого угла области - 20, 40.
 */
function getFrameSpaceParams(frameImgSrc) {
    let matches = frameImgSrc.match(/.*_(\d+)x(\d+)@(\d+),(\d+).\w+$/).slice(1).map(match => parseInt(match));
    return {
        w: matches[0],
        h: matches[1],
        start: { x: matches[2], y: matches[3] }
    };
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height, ratio }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio, ratio: ratio };
}

/**
 * Рассчитывает координаты для верхнего левого угла изображения,
 * чтобы оно оказалось в центре пространства для рамки.
 */
function calculatePhotoDrawCoordinates(spaceParams, photoW, photoH) {
    return {
        x: spaceParams.start.x + (spaceParams.w - photoW) / 2,
        y: spaceParams.start.y + (spaceParams.h - photoH) / 2
    };
}

export default function Composer(props) {
    const [photoCoords, setPhotoCoords] = useState({ x: 0, y: 0 });
    const [photoScale, setPhotoScale] = useState(1.0);

    useEffect(() => {
        if (!props.frame)
            return;

        const canvas = props.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const photoObj = new Image();
        photoObj.src = props.photo;
        const frameObj = new Image();
        frameObj.src = props.frame;

        canvas.width = frameObj.naturalWidth;
        canvas.height = frameObj.naturalHeight;

        ctx.drawImage(
            photoObj,
            photoCoords.x,
            photoCoords.y,
            props.photoSize.width * photoScale,
            props.photoSize.height * photoScale,
        );
        ctx.drawImage(frameObj, 0, 0);
    });

    useEffect(() => {
        if (!props.frame)
            return;

        const frameSpaceParams = getFrameSpaceParams(props.frame);

        const ratio = calculateAspectRatioFit(
            props.photoSize.width,
            props.photoSize.height,
            frameSpaceParams.w,
            frameSpaceParams.h,
        );

        const coords = calculatePhotoDrawCoordinates(
            frameSpaceParams,
            ratio.width,
            ratio.height,
        );

        setPhotoCoords(coords);
        setPhotoScale(ratio.ratio);
    }, [props.frame]);

    function getCanvasScale(canvas) {
        return canvas.clientWidth / canvas.width;
    }

    function dragPhoto(event) {
        if (event.buttons == 0)
            return;

        const canvasScale = getCanvasScale(props.canvasRef.current);

        setPhotoCoords({
            x: photoCoords.x + event.movementX / canvasScale,
            y: photoCoords.y + event.movementY / canvasScale,
        });
    }

    return (
        <div className="composer">
            <canvas className="composition" ref={props.canvasRef} onMouseMove={dragPhoto} />
            <PhotoScaleButtons
                zoomIn={() => setPhotoScale(photoScale + 0.5)}
                zoomOut={() => setPhotoScale(photoScale - 0.5)}
            />
            <UsageHint />
        </div>
    );
}
