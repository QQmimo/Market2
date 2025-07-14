import { useEffect, useState } from "react";
import "./CountBubble.scss";

export function CountBubble({ number = 0 }) {
    const [bubbleStyle, setBubbleStyle] = useState('bubble hidden');
    const [count, setCount] = useState(number);

    useEffect(() => {
        if (count === 0) {
            if (number > 0) {
                setBubbleStyle(`bubble show`);
            }
        }
        if (count !== number && count > 0) {
            if (number === 0) {
                setBubbleStyle(`bubble hide`);
            }
            if (number > 0) {
                setBubbleStyle(`bubble morf`);
            }
        }

        setTimeout(() => {
            if (number > 0) {
                setBubbleStyle(`bubble`);
            }
            else {
                setBubbleStyle('bubble hidden');
            }
        }, 700);

        setCount(number);
    }, [number]);

    return (
        <div className={bubbleStyle}>
            {count >= 10 ? '9+' : count}
        </div>
    );
}