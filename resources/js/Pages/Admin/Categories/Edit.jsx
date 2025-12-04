import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import FormErrorSummary from '../../../Components/Form/FormErrorSummary';
import FixedActionBar from '../../../Components/Form/FixedActionBar';
import useFormErrors from '../../../Components/Form/hooks/useFormErrors';
import { useState, useEffect } from 'react';

export default function CategoriesEdit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image_url: category.image_url || '',
        is_active: category.is_active || true,
        sort_order: category.sort_order || 0,
    });

    const [previewImage, setPreviewImage] = useState(category.image_url || '');
    
    // Custom field labels for categories
    const fieldLabels = {
        name: 'Collection Name',
        slug: 'URL Slug',
        description: 'Description',
        image_url: 'Collection Image URL',
        is_active: 'Status',
        sort_order: 'Sort Order'
    };
    
    // Use custom form errors hook
    const { errorSummaryRef, errorCount, hasErrors, scrollToField, getFieldLabel, handleFormError } = useFormErrors(errors, fieldLabels);

    // Auto-generate slug from name
    const handleNameChange = (e) => {
        const name = e.target.value;
        setData('name', name);
        
        // Generate slug
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Remove multiple hyphens
            .trim('-'); // Remove leading/trailing hyphens
        
        setData('slug', slug);
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setData('image_url', url);
        setPreviewImage(url);
    };

    const submit = (e) => {
        e.preventDefault();
        put(`/artist-panel/categories/${category.id}`, {
            onError: handleFormError
        });
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    };

    return (
        <AdminLayout title="Edit Collection">
            <Head title={`Edit ${category.name} - Admin Panel`} />
            
            <div className="space-y-6 pb-20">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Edit Collection</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Update "{category.name}" collection details
                        </p>
                    </div>
                    <Link
                        href="/artist-panel/categories"
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Collections
                    </Link>
                </div>

                {/* Error Summary */}
                <FormErrorSummary
                    ref={errorSummaryRef}
                    errorCount={errorCount}
                    hasErrors={hasErrors}
                    onErrorClick={scrollToField}
                    getFieldLabel={getFieldLabel}
                    errors={errors}
                    actionText="update this collection"
                />

                {/* Form */}
                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Collection Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Collection Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={handleNameChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="e.g., Keychains, Bookmarks, etc."
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Slug */}
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
                                        placeholder="keychains"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        URL: /collections/{data.slug || 'slug'}
                                    </p>
                                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Brief description of this resin collection..."
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-2">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        id="sort_order"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="0"
                                        min="0"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Lower numbers appear first. Default is 0.
                                    </p>
                                    {errors.sort_order && <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Image URL */}
                                <div>
                                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                                        Collection Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="image_url"
                                        value={data.image_url}
                                        onChange={handleImageUrlChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
                                </div>

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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Enter image URL to see preview
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="1"
                                                checked={data.is_active === true}
                                                onChange={() => setData('is_active', true)}
                                                className="mr-2 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-700">Active</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="0"
                                                checked={data.is_active === false}
                                                onChange={() => setData('is_active', false)}
                                                className="mr-2 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-700">Inactive</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Collection Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Collection Info</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p><span className="font-medium">ID:</span> #{category.id}</p>
                                        <p><span className="font-medium">Created:</span> {new Date(category.created_at).toLocaleDateString()}</p>
                                        <p><span className="font-medium">Last Updated:</span> {new Date(category.updated_at).toLocaleDateString()}</p>
                                        {category.products_count !== undefined && (
                                            <p><span className="font-medium">Products:</span> {category.products_count}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            
            {/* Fixed Action Bar */}
            <FixedActionBar
                cancelUrl="/artist-panel/categories"
                cancelText="Cancel"
                saveText="Update Collection"
                loadingText="Updating..."
                processing={processing}
                onSave={handleSave}
                statusText="Unsaved changes"
            />
        </AdminLayout>
    );
}