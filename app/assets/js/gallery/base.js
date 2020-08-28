import '../../css/gallery/base.sass';

import $ from 'jquery';

window.goToPage = () => {
    let desiredPage;
    let lastPage = parseInt($("#current-page").attr("data-num-pages"));
    if (isNaN(lastPage))
        return;

    do {
        desiredPage = prompt(`Выберите страницу\n(1 - ${lastPage}):`);
        if (desiredPage == null)
            return;
        desiredPage = parseInt(desiredPage);
    } while (isNaN(desiredPage) || desiredPage < 1 || desiredPage > lastPage);

    window.location.href = "?page=" + desiredPage;
};

window.photoDetail = (photoDiv) => {
    const src = $(photoDiv).children("img").attr("src");
    $(".full-photo-dialog img").attr("src", src);
    $(".full-photo-dialog").show();
};

window.closeDialog = () => {
    $(".full-photo-dialog").hide();
};
