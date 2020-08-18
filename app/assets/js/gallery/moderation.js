import '../../css/gallery/moderation.sass';

import $ from 'jquery';
import Cookies from 'js-cookie';

function reloadIfAllDone() {
    let photos = $(".photo");
    let allPhotosHidden = photos.get().every(photo => $(photo).css("opacity") == "0");
    if (allPhotosHidden) {
        window.location.reload();
    }
}

window.moderationAction = (action, button) => {
    let $button = $(button);
    let photo = $button.parents(".photo");
    let id = photo.attr("data-photo-id");
    $.post({
        url: "/gallery/moderation/action/",
        data: JSON.stringify({
            id: id,
            action: action
        }),
        contentType: "application/json",
        processData: false,
        success: () => {
            photo.css("opacity", "0");
            reloadIfAllDone();
        },
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    });
};

window.approveAll = () => {
    let photos = $(".photo:not([opacity=0])");
    let ids = photos.map(function() { return $(this).attr("data-photo-id"); }).get();
    $.post({
        url: "/gallery/moderation/batch-action/",
        data: JSON.stringify({
            ids: ids,
            action: "approve"
        }),
        contentType: "application/json",
        processData: false,
        success: () => {
            window.location.reload();
        },
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    });
};
