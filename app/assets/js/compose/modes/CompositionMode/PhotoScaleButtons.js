import React from 'react';

export default function PhotoScaleButtons(props) {
    return (
        <div className="scale-buttons">
            <button onClick={props.zoomOut}><span className="material-icons">zoom_out</span></button>
            <button onClick={props.zoomIn}><span className="material-icons">zoom_in</span></button>
        </div>
    );
}
