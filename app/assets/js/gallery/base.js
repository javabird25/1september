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
    const id = $(photoDiv).attr("data-photo-id");
    window.open(`/gallery/${id}/`, "_blank");
};
