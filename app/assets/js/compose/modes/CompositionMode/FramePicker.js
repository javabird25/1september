import React from 'react';

import Frame from './Frame';

function getFramesSrcs() {
    return document.getElementsByTagName("data")[0].getAttribute("data-frames-srcs").split("|");
}

export default function FramePicker(props) {
    const frames = getFramesSrcs().map(src => <Frame src={src} key={src} onPick={props.onPick} />);

    return (
        <div className="frame-picker">
            {frames}
        </div>
    )
}
