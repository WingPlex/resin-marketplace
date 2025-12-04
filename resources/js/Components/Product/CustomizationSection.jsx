import React from 'react';
import CheckboxField from '../Form/CheckboxField';
import JsonField from '../Form/JsonField';

export default function CustomizationSection({ data, setData, errors }) {
    return (
        <div>
            <CheckboxField
                id="is_customizable"
                label="This product is customizable"
                checked={data.is_customizable}
                onChange={(e) => setData('is_customizable', e.target.checked)}
                className="mb-4"
            />
            
            {data.is_customizable && (
                <JsonField
                    id="customization_options"
                    label="Customization Options"
                    value={data.customization_options}
                    onChange={(value) => setData('customization_options', value)}
                    placeholder='{"name": "text", "color": "select", "size": "select"}'
                    error={errors.customization_options}
                />
            )}
        </div>
    );
}