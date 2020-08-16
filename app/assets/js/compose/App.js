import React, { useState } from 'react';

import PhotoPickMode from './modes/PhotoPickMode';

export default function App(props) {
    const [mode, setMode] = useState({ mode: PhotoPickMode });
    const [prevModeResult, setPrevModeResult] = useState({});

    function changeMode(newMode, result) {
        setMode({ mode: newMode });
        setPrevModeResult(result);
    }

    const Mode = mode.mode;
    return <Mode changeMode={changeMode} prevModeResult={prevModeResult} />;
}
