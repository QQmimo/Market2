import { useEffect, useState } from "react";
import styles from "./Counter.module.scss";

export function Counter({ value = 1, min = 1, max = 100, step = 1, onChange }) {
    const [count, setCount] = useState(value);

    const changeValue = (add) => {
        setCount(prevState => {
            const value = Number(prevState) + add;
            if (value >= min && value <= max) {
                 onChange?.(value);
                return value;
            }
            return prevState;
        });
    } 

    return (
        <div className={styles.counter}>
            <button className={styles.minus} onClick={() => changeValue(-step)}>-</button>
            <input type="number" readOnly value={count} min={min} max={max} step={step} />
            <button className={styles.plus} onClick={() => changeValue(step)}>+</button>
        </div>
    );
}