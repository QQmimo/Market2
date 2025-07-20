export function Selector({ options, value, onChange }) {
    const onSelect = (e) => {
        onChange?.(Number(e.currentTarget.value));
    }

    return (
        <select onChange={onSelect} defaultValue={value}>
            {options.map(option => <option key={option.id} value={option.id}>{option.title}</option>)}
        </select>
    );
}