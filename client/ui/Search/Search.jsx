export function Search({ onSearch }) {
    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            onSearch?.(e.currentTarget.value);
        }
    }

    return (
        <div>
            <input placeholder="Поиск" onKeyDown={onKeyDown} type="text" />
        </div>
    );
}