import React from 'react';
import FormField from '../Form/FormField';

export default function ProductNameSlugSection({ data, setData, errors, handleNameChange }) {
    return (
        <FormField
            id="name"
            label="Product Name"
            type="text"
            value={data.name}
            onChange={handleNameChange}
            placeholder="e.g., Custom Name Keychain"
            required
            error={errors.name}
        />
    );
}