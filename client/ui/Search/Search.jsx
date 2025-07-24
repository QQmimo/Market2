export function Search({ className, onSearch }) {
    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            onSearch?.(e.currentTarget.value);
        }
    }

    const onBlur = (e) => {
        onSearch?.(e.currentTarget.value);
    }

    return (
        <div className={className}>
            <input placeholder="Поиск" onKeyDown={onKeyDown} onBlur={onBlur} type="text" />
        </div>
    );
}