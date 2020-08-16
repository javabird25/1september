import React, { useState } from 'react';

import Mode from '../Mode';
import CompositionMode from '../CompositionMode';

function getPhotoSize(src) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            resolve({ width: image.naturalWidth, height: image.naturalHeight });
        }
    });
}

export default function PhotoPickMode(props) {
    function loadPhoto() {
        const fileReader = new FileReader();
        const file = fileInputRef.current.files[0];

        fileReader.addEventListener("load", () => {
            const photoB64 = fileReader.result;
            getPhotoSize(photoB64).then(size => {
                props.changeMode(CompositionMode, { photo: photoB64, photoSize: size });
            });
        });

        if (file)
            fileReader.readAsDataURL(file);
    }

    const fileInputRef = React.createRef();

    return (
        <Mode className="photo-pick">
            <div>
                <div className="instruction">
                    <p>Теперь ты можешь загрузить свою фотографию и поместить её в рамку твоей любимой профессии.</p>
                    <p>Для этого нажми на кнопку "Выберите файл" и выбери свою фотографию, после чего нажми "Наложить рамку".</p>
                </div>
                <input type="file" ref={fileInputRef} />
                <button onClick={loadPhoto} className="green-button full-width">Наложить рамку</button>
            </div>
        </Mode>
    );
}
