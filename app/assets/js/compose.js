import '../css/compose.sass';
import mergeImages from 'merge-images';
import $ from 'jquery';

const RESULT_IMG = $("#result");
const ORIGINAL_IMG_URL = $("#result").attr("src");
const DONE_BUTTON = $("#done");

window.applyFrame = frameImg => {
    let frameUrl = $(frameImg).attr("src");

    mergeImages([ORIGINAL_IMG_URL, frameUrl], { crossOrigin: "Anonymous" })
        .then(resultB64 => RESULT_IMG.attr("src", resultB64));

    DONE_BUTTON.prop("disabled", false);
};

const DIALOG_DARKEN = $(".dialog-darken");
const DIALOG = $("dialog");
const DOWNLOAD_LINK = $("#download");

function setShareImage() {
    DOWNLOAD_LINK.attr("href", RESULT_IMG.attr("src"));
}

function setDialogVisible(visible) {
    if (visible) {
        DIALOG_DARKEN.addClass("show");
        DIALOG.addClass("show");
    } else {
        DIALOG_DARKEN.removeClass("show");
        DIALOG.removeClass("show");
    }
}

window.setDialogVisible = setDialogVisible;

window.compositionDone = () => {
    setShareImage();
    setDialogVisible(true);
};
