import '../../css/compose.sass';

import $ from 'jquery';
import Pica from 'pica';
import setDialogVisible from './dialog';

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
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
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

const RESULT_CANVAS = $(".result");
const PHOTO_ORIGINAL = $("img.photo");
const SCRATCHBOARD_CANVAS = $("canvas.scratchboard").get()[0];
const DONE_BUTTON = $("#done");

window.applyFrame = frameImg => {
    let canvas = RESULT_CANVAS.get()[0];
    let ctx = canvas.getContext("2d");

    // Установка размера холста равному размеру рамки
    canvas.width = frameImg.naturalWidth;
    canvas.height = frameImg.naturalHeight;

    let photoImg = PHOTO_ORIGINAL.get()[0];
    let frameSpaceParams = getFrameSpaceParams(frameImg.src);
    let targetPhotoDimensions = calculateAspectRatioFit(
        photoImg.naturalWidth,
        photoImg.naturalHeight,
        frameSpaceParams.w,
        frameSpaceParams.h
    );
    SCRATCHBOARD_CANVAS.width = targetPhotoDimensions.width;
    SCRATCHBOARD_CANVAS.height = targetPhotoDimensions.height;
    new Pica().resize(photoImg, SCRATCHBOARD_CANVAS).then(_ => {
        let coords = calculatePhotoDrawCoordinates(
            frameSpaceParams,
            targetPhotoDimensions.width,
            targetPhotoDimensions.height
        );
        ctx.drawImage(SCRATCHBOARD_CANVAS, coords.x, coords.y);
        ctx.drawImage(frameImg, 0, 0);
    });

    DONE_BUTTON.prop("disabled", false);
};

const DOWNLOAD_LINK = $("#download");

function setShareImage() {
    DOWNLOAD_LINK.attr("href", RESULT_CANVAS.get()[0].toDataURL());
}

window.compositionDone = () => {
    setShareImage();
    setDialogVisible(true);
};
