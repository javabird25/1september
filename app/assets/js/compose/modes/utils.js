export default function getPhotoSize(src) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            resolve({ width: image.naturalWidth, height: image.naturalHeight });
        }
    });
}

