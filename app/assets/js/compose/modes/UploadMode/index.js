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

                fetch(
                    "/photo-upload/",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "X-CSRFToken": Cookies.get("csrftoken")
                        }
                    }
                ).then(() => {
                    window.location.href = "/photocompose/finish/?published=1";
                });
            }
        });
    }

    if (!props.prevModeResult.composedPhotoBlob)
        return null;

    return (
        <Mode className="upload">
            <div>
                <p>
                    Спасибо! Вы можете скачать фотографию с рамкой и поделиться ей, 
                    нажав на кнопку:
                </p>
                <a
                    className="green-button full-width"
                    download="Фото с рамкой.jpg"
                    href={URL.createObjectURL(props.prevModeResult.composedPhotoBlob)}
                >Скачать</a>
                <p>
                    У вас также есть возможность опубликовать фотографию на доску "Моя будущая профессия".
                    (Нажимая кнопку "Опубликовать", вы соглашаетесть на размещение фоторамки с вашей фотографией
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
