import React from 'react';

export default function TextareaField({ 
    label, 
    id, 
    value, 
    onChange, 
    placeholder, 
    rows = 3,
    required = false, 
    error, 
    helpText,
    className = ''
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            
            {helpText && (
                <p className="mt-1 text-sm text-gray-500">{helpText}</p>
            )}
            
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}