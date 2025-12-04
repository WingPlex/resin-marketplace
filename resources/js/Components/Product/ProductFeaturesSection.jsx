import React from 'react';
import JsonField from '../Form/JsonField';
import { PRODUCT_FIELD_LABELS } from '../../constants/productConstants';

export default function ProductFeaturesSection({ data, setData, errors }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Product Features</h3>
            
            <div className="space-y-6">
                <JsonField
                    id="materials"
                    label={PRODUCT_FIELD_LABELS.materials}
                    value={data.materials}
                    onChange={(value) => setData('materials', value)}
                    placeholder='["Epoxy Resin", "Dried Flowers", "Glitter"]'
                    error={errors.materials}
                />

                <JsonField
                    id="dimensions"
                    label={PRODUCT_FIELD_LABELS.dimensions}
                    value={data.dimensions}
                    onChange={(value) => setData('dimensions', value)}
                    placeholder='{"length": "5cm", "width": "3cm", "height": "0.5cm"}'
                    error={errors.dimensions}
                />

                <JsonField
                    id="colors_available"
                    label={PRODUCT_FIELD_LABELS.colors_available}
                    value={data.colors_available}
                    onChange={(value) => setData('colors_available', value)}
                    placeholder='["Blue", "Pink", "Purple", "Clear"]'
                    error={errors.colors_available}
                />
            </div>
        </div>
    );
}