import React from 'react';
import TextareaField from '../Form/TextareaField';
import JsonField from '../Form/JsonField';
import FormField from '../Form/FormField';
import ProductNameSlugSection from './ProductNameSlugSection';
import CustomizationSection from './CustomizationSection';
import { PRODUCT_FIELD_LABELS } from '../../constants/productConstants';

export default function ProductBasicInfoSection({ 
    data, 
    setData, 
    errors, 
    handleNameChange,
    handleImageUrlChange,
    previewImage,
    setPreviewImage,
    onSubmit 
}) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Product Information</h3>
            <form onSubmit={onSubmit} className="space-y-6">
                <ProductNameSlugSection 
                    data={data}
                    setData={setData}
                    errors={errors}
                    handleNameChange={handleNameChange}
                />

                <TextareaField
                    id="description"
                    label={PRODUCT_FIELD_LABELS.description}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                    placeholder="Detailed description of the product..."
                    required
                    error={errors.description}
                />



                <CustomizationSection 
                    data={data}
                    setData={setData}
                    errors={errors}
                />

                {/* Featured Image */}
                <div>
                    <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image URL
                    </label>
                    <input
                        type="url"
                        id="featured_image"
                        value={data.featured_image}
                        onChange={handleImageUrlChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/image.jpg"
                    />
                    {errors.featured_image && <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>}
                </div>

                {/* Gallery Images */}
                <JsonField
                    id="gallery_images"
                    label={PRODUCT_FIELD_LABELS.gallery_images}
                    value={data.gallery_images}
                    onChange={(value) => setData('gallery_images', value)}
                    placeholder='["url1", "url2", "url3"]'
                    error={errors.gallery_images}
                />

                {/* Image Preview */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Preview
                    </label>
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {previewImage ? (
                            <img 
                                src={previewImage} 
                                alt="Preview" 
                                className="max-h-full max-w-full object-contain rounded-lg"
                                onError={() => setPreviewImage('')}
                            />
                        ) : (
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">
                                    Enter image URL to see preview
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}