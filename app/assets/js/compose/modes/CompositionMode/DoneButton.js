import React from 'react';

export default function DoneButton(props) {
    function onClick() {
        if (!props.silentlyDisabled)
            props.onClick();
    }

    return <button className="done green-button" onClick={onClick} disabled={props.disabled}>Готово</button>
}
