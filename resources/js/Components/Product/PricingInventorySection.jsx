import React from 'react';
import FormField from '../Form/FormField';
import { PRODUCT_FIELD_LABELS } from '../../constants/productConstants';

export default function PricingInventorySection({ data, setData, errors }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4 mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Pricing & Inventory</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                    label={PRODUCT_FIELD_LABELS.price}
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    placeholder="29.99"
                    min="0"
                    step="0.01"
                    required
                    error={errors.price}
                />
                
                <FormField
                    label={PRODUCT_FIELD_LABELS.stock_quantity}
                    id="stock_quantity"
                    type="number"
                    value={data.stock_quantity}
                    onChange={(e) => setData('stock_quantity', e.target.value)}
                    placeholder="10"
                    min="0"
                    error={errors.stock_quantity}
                />
                
                <FormField
                    label={PRODUCT_FIELD_LABELS.weight}
                    id="weight"
                    type="number"
                    value={data.weight}
                    onChange={(e) => setData('weight', e.target.value)}
                    placeholder="25"
                    min="0"
                    step="0.1"
                    error={errors.weight}
                />
                
                <FormField
                    label={PRODUCT_FIELD_LABELS.sku}
                    id="sku"
                    type="text"
                    value={data.sku}
                    onChange={(e) => setData('sku', e.target.value)}
                    placeholder="RK-001"
                    error={errors.sku}
                />
            </div>
        </div>
    );
}