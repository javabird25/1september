import $ from 'jquery';

const DIALOG_DARKEN = $(".dialog-darken");
const DIALOG = $("dialog");

export function setDialogVisible(visible) {
    if (visible) {
        DIALOG_DARKEN.addClass("show");
        DIALOG.addClass("show");
    } else {
        DIALOG_DARKEN.removeClass("show");
        DIALOG.removeClass("show");
    }
}

window.setDialogVisible = setDialogVisible;