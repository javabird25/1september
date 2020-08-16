import React from 'react';

export default function Frame(props) {
    return <img
        className="frame"
        key={props.src}
        src={props.src}
        onClick={() => props.onPick(props.src)}
    />
}
