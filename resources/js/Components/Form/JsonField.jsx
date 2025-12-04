import React from 'react';

export default function JsonField({ 
    label, 
    id, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error, 
    helpText,
    className = '',
    examples = []
}) {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        try {
            const parsed = JSON.parse(inputValue);
            onChange(Array.isArray(parsed) ? parsed : []);
        } catch {
            onChange(inputValue);
        }
    };

    const displayValue = Array.isArray(value) ? JSON.stringify(value) : value;

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            <input
                type="text"
                id={id}
                value={displayValue}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            
            {helpText && (
                <p className="mt-1 text-sm text-gray-500">{helpText}</p>
            )}
            
            {examples.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                    Examples: {examples.join(', ')}
                </p>
            )}
            
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}