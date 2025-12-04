import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import FormErrorSummary from '../../../Components/Form/FormErrorSummary';
import FixedActionBar from '../../../Components/Form/FixedActionBar';
import useFormErrors from '../../../Components/Form/hooks/useFormErrors';
import { ArrowLeft } from 'lucide-react';

export default function EditTag({ tag }) {
    const { data, setData, put, processing, errors } = useForm({
        name: tag.name || '',
        color: tag.color || '#FF6B35',
        description: tag.description || '',
    });

    const [previewColor, setPreviewColor] = useState(data.color);
    
    // Custom field labels for tags
    const fieldLabels = {
        name: 'Tag Name',
        color: 'Color',
        description: 'Description'
    };
    
    // Use custom form errors hook
    const { errorSummaryRef, errorCount, hasErrors, scrollToField, getFieldLabel, handleFormError } = useFormErrors(errors, fieldLabels);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.tags.update', tag.id), {
            onError: handleFormError
        });
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setData('color', newColor);
        setPreviewColor(newColor);
    };

    const colorPresets = [
        '#FF6B35', // Orange (Primary)
        '#E74C3C', // Red
        '#3498DB', // Blue
        '#2ECC71', // Green
        '#F39C12', // Yellow
        '#9B59B6', // Purple
        '#1ABC9C', // Turquoise
        '#E67E22', // Dark Orange
        '#34495E', // Dark Blue Gray
        '#95A5A6', // Gray
        '#F1C40F', // Bright Yellow
        '#E91E63', // Pink
    ];

    return (
        <AdminLayout>
            <Head title={`Edit Tag: ${tag.name}`} />
            
            <div className="p-6 pb-26">
                <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Link
                            href={route('admin.tags.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Tag</h1>
                            <p className="text-gray-600">Update tag information and settings</p>
                        </div>
                    </div>

                    {/* Current Tag Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Tag</label>
                        <div className="flex items-center space-x-3">
                            <div 
                                className="w-6 h-6 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: tag.color }}
                            ></div>
                            <span 
                                className="px-3 py-1 text-sm font-medium text-white rounded-full"
                                style={{ backgroundColor: tag.color }}
                            >
                                {tag.name}
                            </span>
                            <div className="text-sm text-gray-600">
                                Used {tag.usage_count} time{tag.usage_count !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Summary */}
                <FormErrorSummary
                    ref={errorSummaryRef}
                    errorCount={errorCount}
                    hasErrors={hasErrors}
                    onErrorClick={scrollToField}
                    getFieldLabel={getFieldLabel}
                    errors={errors}
                    actionText="update this tag"
                />

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="max-w-2xl">
                        <div className="space-y-6">
                            {/* Tag Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tag Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter tag name"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Tag Color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tag Color <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-4">
                                    {/* Color Picker */}
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="color"
                                            value={data.color}
                                            onChange={handleColorChange}
                                            className="w-12 h-12 border-2 border-gray-300 rounded-md cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={handleColorChange}
                                            placeholder="#FF6B35"
                                            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                        {/* Preview */}
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-8 h-8 rounded-full border-2 border-gray-300"
                                                style={{ backgroundColor: previewColor }}
                                            ></div>
                                            {data.name && (
                                                <span 
                                                    className="px-3 py-1 text-sm font-medium text-white rounded-full"
                                                    style={{ backgroundColor: previewColor }}
                                                >
                                                    {data.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Color Presets */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quick Colors
                                        </label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {colorPresets.map((color) => (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    onClick={() => {
                                                        setData('color', color);
                                                        setPreviewColor(color);
                                                    }}
                                                    className={`w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${
                                                        data.color === color 
                                                            ? 'border-gray-800 ring-2 ring-gray-300' 
                                                            : 'border-gray-300'
                                                    }`}
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {errors.color && (
                                    <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Optional description for this tag"
                                    rows={3}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                        errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Provide a brief description to help others understand when to use this tag.
                                </p>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Usage Information */}
                            {tag.usage_count > 0 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                    <div className="flex items-center">
                                        <div className="text-sm text-blue-800">
                                            <p className="font-medium">Tag Usage Information</p>
                                            <p>This tag is currently used by {tag.usage_count} product{tag.usage_count !== 1 ? 's' : ''}. Changes to the tag name and color will be reflected across all products using this tag.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </form>
                </div>
            </div>
            
            {/* Fixed Action Bar */}
            <FixedActionBar
                cancelUrl={route('admin.tags.index')}
                cancelText="Cancel"
                saveText="Update Tag"
                loadingText="Updating..."
                processing={processing}
                onSave={handleSave}
                statusText="Unsaved changes"
            />
        </AdminLayout>
    );
}