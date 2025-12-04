import React, { useState } from 'react';
import FormField from '../Form/FormField';
import TextareaField from '../Form/TextareaField';
import { PRODUCT_FIELD_LABELS } from '../../constants/productConstants';

export default function SEOSection({ data, setData, errors }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Generate preview data
    const previewTitle = data.meta_title || data.name || 'Product Name';
    const previewUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://yourstore.com'}/products/${data.slug || 'product-slug'}`;
    const previewDescription = data.meta_description || data.description || 'Add a meta description to improve how your product appears in search results.';
    const previewPrice = data.price ? `$${parseFloat(data.price).toFixed(2)} USD` : '$0.00 USD';
    const previewDomain = typeof window !== 'undefined' ? window.location.hostname : 'yourstore.com';

    return (
        <div className="mt-4 bg-white rounded-lg shadow p-6">
            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">SEO Settings</h3>
                <p className="text-sm text-gray-600">
                    Optimize your product for search engines and social media sharing.
                </p>
            </div>

            {/* Search Engine Preview - Always Visible */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Search engine listing</h4>
                    <button 
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
                
                {/* Search Result Preview */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {previewDomain} › products › {data.slug || 'product-slug'}
                    </div>
                    <div className="text-xs text-green-700 mb-2 font-medium">
                        {previewUrl}
                    </div>
                    <h5 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {previewTitle}
                    </h5>
                    <p className="text-sm text-gray-700 mb-3" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.4'
                    }}>
                        {previewDescription.length > 160 
                            ? previewDescription.substring(0, 157) + '...' 
                            : previewDescription
                        }
                    </p>
                    <div className="text-sm font-semibold text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded">
                        {previewPrice}
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-6 space-y-6">
                    {/* URL Slug */}
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                            URL Slug *
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="custom-name-keychain"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            URL: /products/{data.slug || 'slug'}
                        </p>
                        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                    </div>

                    {/* Page Title */}
                    <FormField
                        id="meta_title"
                        label="Page Title"
                        type="text"
                        value={data.meta_title || data.name}
                        onChange={(e) => setData('meta_title', e.target.value)}
                        placeholder="SEO optimized page title"
                        helpText="Recommended: 50-60 characters. If empty, product name will be used."
                        error={errors.meta_title}
                    />

                    {/* Meta Description */}
                    <TextareaField
                        id="meta_description"
                        label="Meta Description"
                        value={data.meta_description}
                        onChange={(e) => setData('meta_description', e.target.value)}
                        rows={3}
                        placeholder="Brief description for search engines..."
                        helpText="Recommended: 150-160 characters. Appears in search results."
                        error={errors.meta_description}
                    />

                    {/* SEO Keywords */}
                    <FormField
                        id="seo_keywords"
                        label="SEO Keywords"
                        type="text"
                        value={data.seo_keywords}
                        onChange={(e) => setData('seo_keywords', e.target.value)}
                        placeholder="resin keychain, custom name, handmade"
                        helpText="Comma-separated keywords relevant to your product"
                        error={errors.seo_keywords}
                    />
                </div>
            )}
        </div>
    );
}