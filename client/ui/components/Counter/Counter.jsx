import { useEffect, useRef, useState } from "react";
import styles from "./Counter.module.scss";

export function Counter({ value = 1, min = 1, max = 100, step = 1, onChange }) {
    const [count, setCount] = useState(value);
    const refInput = useRef(null);

    const changeValue = (add) => {
        setCount(prevState => {
            const value = Number(prevState) + add;
            refInput.current.value = value;
            if (value >= min && value <= max) {
                onChange?.(value);
                return value;
            }
            return prevState;
        });
    }

    const onBlur = (e) => {
        const value = e.currentTarget.value;
        setCount(value);
        onChange?.(value);
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            e.currentTarget.blur();
        }
    }

    return (
        <div className={styles.counter}>
            <button className={styles.minus} onClick={() => changeValue(-step)}>-</button>
            <input ref={refInput} name="count" type="number" defaultValue={count} min={min} max={max} step={step} onBlur={onBlur} onKeyDown={onKeyDown} />
            <button className={styles.plus} onClick={() => changeValue(step)}>+</button>
        </div>
    );
}