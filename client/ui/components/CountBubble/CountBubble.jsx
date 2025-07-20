import { useEffect, useState } from "react";
import styles from "./CountBubble.module.scss";

export function CountBubble({ number = 0 }) {
    const [bubbleStyle, setBubbleStyle] = useState([styles.bubble, styles.hidden].join(' '));
    const [count, setCount] = useState(number);

    useEffect(() => {
        setBubbleStyle([styles.bubble, styles.hidden].join(' '));
        if (count === 0) {
            if (number > 0) {
                setBubbleStyle([styles.bubble, styles.show].join(' '));
            }
        }
        if (count !== number && count > 0) {
            if (number === 0) {
                setBubbleStyle([styles.bubble, styles.hide].join(' '));
            }
            if (number > 0) {
                setBubbleStyle([styles.bubble, styles.morf].join(' '));
            }
        }

        setTimeout(() => {
            if (number > 0) {
                setBubbleStyle(styles.bubble);
            }
            else {
                setBubbleStyle([styles.bubble, styles.hidden].join(' '));
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