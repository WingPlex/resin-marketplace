import React from 'react';
import FormField from '../Form/FormField';

export default function ImageSection({ data, setData, errors, previewImage, setPreviewImage }) {
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setData('featured_image', url);
        setPreviewImage(url);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Product Images</h3>
            
            <FormField
                label="Featured Image URL"
                id="featured_image_url"
                type="url"
                value={data.featured_image}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                error={errors.featured_image}
                className="mb-6"
            />

            {/* Image Preview */}
            <div className="mb-6">
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">
                                Enter image URL to see preview
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <FormField
                label="Gallery Images (JSON)"
                id="gallery_images"
                value={data.gallery_images}
                onChange={(e) => setData('gallery_images', e.target.value)}
                placeholder='["url1", "url2", "url3"]'
                helpText="JSON array of image URLs"
                error={errors.gallery_images}
            />
        </div>
    );
}