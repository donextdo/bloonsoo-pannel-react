const TextInput = ({
    label, 
    error, 
    errorMessage, 
    type, 
    name,
    value, 
    Styles, 
    border, 
    borderColor, 
    placeholder, 
    onChange,
    max,
    min,
    required,
}:any) => {
return (
<div className='flex flex-col gap-2 items-start'>

    {label && 
        <label className={`text-sm font-medium ${error ? 'text-red-600' : 'text-gray-900'}`}>
            {label}
        </label>
    }

    <input
        type={type ? type : 'text'}
        value={value ?? undefined}
        name={name}
        className={`w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        required = {required}
        max={max}
        min={min}
    />

    {error && 
        <small className="text-xs text-red-600">
            { errorMessage }
        </small>
    }
    
</div>
)
}


export default TextInput