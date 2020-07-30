import mergeImages from 'merge-images';
import $ from 'jquery';

const RESULT_IMG = $("#result");
const ORIGINAL_IMG_URL = $("#result").attr("src");

window.applyFrame = frameImg => {
    let frameUrl = $(frameImg).attr("src");

    mergeImages([ORIGINAL_IMG_URL, frameUrl], { crossOrigin: "Anonymous" })
        .then(resultB64 => RESULT_IMG.attr("src", resultB64));
}
