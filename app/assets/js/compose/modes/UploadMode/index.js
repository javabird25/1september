import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import Cookies from 'js-cookie';
import Compressor from 'compressorjs';

import Mode from '../Mode';

export default function UploadMode(props) {
    function submitPhoto() {
        new Compressor(props.prevModeResult.composedPhotoBlob, {
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.9,
            success(result) {
                let formData = new FormData();
                formData.append("photo", result, `${uuidV4()}.jpg`);
                formData.append("profession", props.prevModeResult.profession);

                fetch(
                    "/photo-upload/",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "X-CSRFToken": Cookies.get("csrftoken")
                        }
                    }
                )
                .then(response => response.json())
                .then(json => {
                    window.location.href = `/photocompose/finish/?photo-id=${json.id}`;
                });
            }
        });
    }

    if (!props.prevModeResult.composedPhotoBlob)
        return null;

    return (
        <Mode className="upload">
            <div className="message">
                <p>
                    Спасибо! Теперь можешь скачать фотографию с рамкой и поделиться ей,
                    нажав на кнопку:
                </p>
                <a
                    className="green-button full-width"
                    download="Фото с рамкой.jpg"
                    href={URL.createObjectURL(props.prevModeResult.composedPhotoBlob)}
                >Скачать</a>
                <p>
                    Дорогой друг! Уважаемые родители!
                    У Вас есть возможность опубликовать фотографию в галерее «Моя будущая профессия».
                    (Нажимая кнопку "Опубликовать", вы соглашаетесь на размещение фоторамки с вашей фотографией
                    на публичном ресурсе в общем доступе по адресу <code>https://1sept.kvantorium.su</code>)
                </p>
                <div className="upload-buttons">
                    <button className="green-button" onClick={submitPhoto}>Опубликовать</button>
                    <a className="green-button" href="/photocompose/finish/">Нет, спасибо</a>
                </div>
            </div>
        </Mode>
    );
}
