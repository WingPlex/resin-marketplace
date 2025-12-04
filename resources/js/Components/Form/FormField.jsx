import React from 'react';

export default function FormField({ 
    label, 
    id, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error, 
    helpText,
    className = '',
    ...props 
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                {...props}
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