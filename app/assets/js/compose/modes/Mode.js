import React from 'react';

export default function Mode(props) {
    const className = "mode " + props.className;
    return <div className={className}>{props.children}</div>;
}
