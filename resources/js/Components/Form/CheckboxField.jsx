import React from 'react';

export default function CheckboxField({ id, label, checked, onChange, className = '', error, helpText }) {
    return (
        <div className={className}>
            <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>
            
            {helpText && (
                <p className="text-sm text-gray-500 mb-2">
                    {helpText}
                </p>
            )}
            
            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}