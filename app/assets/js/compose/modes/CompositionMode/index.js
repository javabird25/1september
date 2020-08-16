import React, { useState, useRef } from 'react';

import Mode from '../Mode';
import UploadMode from '../UploadMode';

import Composer from './Composer';
import FramePicker from './FramePicker';
import DoneButton from './DoneButton';

export default function CompositionMode(props) {
    const [pickedFrame, setPickedFrame] = useState(null);
    const canvasRef = useRef();

    function finishComposition() {
        const canvas = canvasRef.current;
        canvas.toBlob(blob => {
            props.changeMode(UploadMode, { composedPhotoBlob: blob });
        });
    }

    return <Mode className="composition">
        <Composer
            frame={pickedFrame}
            photo={props.prevModeResult.photo}
            photoSize={props.prevModeResult.photoSize}
            canvasRef={canvasRef}
        />
        <FramePicker onPick={frame => setPickedFrame(frame)} />
        <DoneButton onClick={finishComposition} />
    </Mode>;
}
