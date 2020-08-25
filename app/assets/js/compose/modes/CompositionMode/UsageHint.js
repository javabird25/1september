import React, { useEffect, useState } from 'react';

export default function UsageHint(props) {
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            setShowHint(false);
        }, 10000);
        return () => { clearTimeout(hideTimeout); };
    }, []);

    return (
        <div className="usage-hint">
            {
                showHint ?
                    "Вы можете перетаскивать фотографию, а также изменять ее размер с помощью кнопок внизу" :
                    "Ваша будущая профессия"
            }
        </div>
    );
}
