import React, { useEffect, useState } from 'react';

export default function UsageHint(props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            setVisible(false);
        }, 10000);
        return () => { clearTimeout(hideTimeout); };
    }, []);

    return visible ? (
        <div className="usage-hint">
            Ты можешь перетаскивать фотографию,
            а также изменять ее размер с помощью кнопок внизу.
        </div>
    ) : null;
}
