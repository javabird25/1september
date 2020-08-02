import '../../css/compose.sass';

import $ from 'jquery';
import html2canvas from 'html2canvas';
import { setDialogVisible } from './dialog';

const SELECTED_FRAME = $(".frame");
const DONE_BUTTON = $("#done");
const COMPOSITION = $("composition");

/**
 * Возвращает ширину и высоту свободного места в рамке.
 * Эти значения зашифрованы в конце имени файла изображения, в виде
 * "1_30x10.png", где ширина - 30, высота - 10.
 */
function getFrameSpace(frameImgSrc) {
    let matches = frameImgSrc.match(/.*_(\d+)x(\d+).\w+$/);
    return matches.slice(1).map(str => parseInt(str));
}

/** Получает соотношение реального размера изображения к размеру на экране. */
function getImageScaleFactor(img) {
    return img.width / img.naturalWidth;
}

const PHOTO = $(".photo");

/** Подгоняет размер фотографии под место в рамке. */
function resizePhoto(frameImg) {
    let [width, height] = getFrameSpace(frameImg.src);
    // TODO: Портретные фотографии
//    PHOTO.css("width", width + "px");
    PHOTO.css("height", Math.ceil(height * getImageScaleFactor(frameImg)) + 1 + "px");
}

/**
 * Задает размер элемента <composition> равным размеру рамки,
 * чтобы фотография правильно центрировалась внутри неё.
 */
function resizeComposition(appliedFrame) {
    COMPOSITION.css("width", appliedFrame.width + "px");
    COMPOSITION.css("height", appliedFrame.height + "px");
}

window.applyFrame = frameImg => {
    SELECTED_FRAME.attr("src", frameImg.src);
    let appliedFrame = SELECTED_FRAME.get()[0];
    resizeComposition(appliedFrame);
    resizePhoto(appliedFrame);
    DONE_BUTTON.prop("disabled", false);
};

const DOWNLOAD_LINK = $("#download");

async function setShareImage() {
    html2canvas(COMPOSITION.get()[0], { scale: 1 }).then(canvas => {
        let resultImage = canvas.toDataURL();
        DOWNLOAD_LINK.attr("href", resultImage);
    });
}

window.compositionDone = () => {
    setShareImage().then(() => {
        setDialogVisible(true);
    });
};
