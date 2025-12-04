import React from 'react';
import SelectField from '../Form/SelectField';
import TagsInput from '../TagsInput';
import { STATUS_OPTIONS, PRODUCT_FIELD_LABELS } from '../../constants/productConstants';

export default function StatusSettingsSection({ 
    data, 
    setData, 
    errors, 
    categories, 
    artists, 
    availableTags 
}) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status & Settings</h3>
            
            <div className="space-y-6">
                <SelectField
                    id="status"
                    label={PRODUCT_FIELD_LABELS.status}
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    options={STATUS_OPTIONS}
                    required
                    error={errors.status}
                />

                <SelectField
                    id="category_id"
                    label={PRODUCT_FIELD_LABELS.category_id}
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                    placeholder="Select a category"
                    required
                    error={errors.category_id}
                />

                <SelectField
                    id="artist_id"
                    label={PRODUCT_FIELD_LABELS.artist_id}
                    value={data.artist_id}
                    onChange={(e) => setData('artist_id', e.target.value)}
                    options={artists.map(artist => ({ value: artist.id, label: artist.name }))}
                    placeholder="Select an artist"
                    required
                    error={errors.artist_id}
                />

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <TagsInput
                        tags={data.tags}
                        availableTags={availableTags}
                        onChange={(tags) => setData('tags', tags)}
                        placeholder="Add tags..."
                        error={errors.tags}
                    />
                </div>
            </div>
        </div>
    );
}