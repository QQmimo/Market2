export function Selector({ className, options, value, onChange }) {
    const onSelect = (e) => {
        onChange?.(Number(e.currentTarget.value));
    }

    return (
        <select className={className} onChange={onSelect} defaultValue={value}>
            {options.map(option => <option key={option.id} value={option.id}>{option.title}</option>)}
        </select>
    );
}