import React, { useState, useRef } from 'react';

import Mode from '../Mode';
import UploadMode from '../UploadMode';

import Composer from './Composer';
import FramePicker from './FramePicker';
import DoneButton from './DoneButton';

function getProfessionName(frameSrc) {
    return frameSrc.match(new RegExp("/([а-яА-Я\\w ]+)_"))[1];
}

export default function CompositionMode(props) {
    const [pickedFrame, setPickedFrame] = useState(null);
    const [renderComplete, setRenderComplete] = useState(false);
    const canvasRef = useRef();

    function finishComposition() {
        const canvas = canvasRef.current;
        canvas.toBlob(blob => {
            props.changeMode(
                UploadMode,
                {
                    composedPhotoBlob: blob,
                    profession: getProfessionName(pickedFrame)
                }
            );
        }, "image/jpeg", 0.9);
    }

    return <Mode className="composition">
        <Composer
            frame={pickedFrame}
            photo={props.prevModeResult.photo}
            photoSize={props.prevModeResult.photoSize}
            canvasRef={canvasRef}
            onRenderStarted={() => setRenderComplete(false)}
            onRenderComplete={() => setRenderComplete(true)}
        />
        <FramePicker onPick={frame => setPickedFrame(frame)} />
        <DoneButton
            onClick={finishComposition}
            disabled={!pickedFrame}
            silentlyDisabled={!renderComplete}
        />
    </Mode>;
}
