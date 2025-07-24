import styles from "./Button.module.scss";

export function Button({ title, className, onClick }) {
    return (
        <button className={[styles.button, className].join(" ")} onClick={onClick}>{title}</button>
    );
}