import React, { useState } from 'react';

import Mode from '../Mode';
import CompositionMode from '../CompositionMode';
import getPhotoSize from '../utils';

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
            <div className="message">
                <div className="instruction">
                    <p>
                        Поздравляем, ты справился с заданием! Ты очень умный ребенок.
                        Нам очень хочется узнать, кем бы ты хотел стать в будущем. 
                        Выбери интересующее тебя направление и сделай классное фото на память.
                    </p>
                    <p>
                        Нажми на кнопку "Выбери файл" и загрузи фотографию. 
                        После чего кликни на кнопку "Продолжить".
                    </p>
                </div>
                <input type="file" ref={fileInputRef} accept="image/*" />
                <button onClick={loadPhoto} className="green-button full-width">Продолжить</button>
            </div>
        </Mode>
    );
}
