import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import FormErrorSummary from '../../../Components/Form/FormErrorSummary';
import FixedActionBar from '../../../Components/Form/FixedActionBar';
import useFormErrors from '../../../Components/Form/hooks/useFormErrors';
import { useState } from 'react';

export default function ArtistsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        phone: '',
        username: '',
        country: '',
        address: '',
        profile_image: '',
        bio: '',
        social_links: '',
        is_active: true,
    });

    const [previewImage, setPreviewImage] = useState('');
    
    // Custom field labels for artists
    const fieldLabels = {
        full_name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        username: 'Username',
        country: 'Country',
        address: 'Address',
        profile_image: 'Profile Image URL',
        bio: 'Biography',
        social_links: 'Social Links',
        is_active: 'Status'
    };
    
    // Use custom form errors hook
    const { errorSummaryRef, errorCount, hasErrors, scrollToField, getFieldLabel, handleFormError } = useFormErrors(errors, fieldLabels);

    // Auto-generate username from full name
    const handleNameChange = (e) => {
        const name = e.target.value;
        setData('full_name', name);
        
        // Generate username
        const username = name
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 20);
        
        setData('username', username);
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setData('profile_image', url);
        setPreviewImage(url);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/artist-panel/artists', {
            onError: handleFormError
        });
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    };

    return (
        <AdminLayout title="Add New Artist">
            <Head title="Add New Artist - Admin Panel" />
            
            <div className="space-y-6 pb-20">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Add New Artist</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Create a new artist profile for the marketplace
                        </p>
                    </div>
                    <Link
                        href="/artist-panel/artists"
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Artists
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
                    actionText="create this artist"
                />

                {/* Form */}
                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Basic Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Legal Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={handleNameChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="e.g., Sarah Johnson"
                                        required
                                    />
                                    {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                                </div>

                                {/* Username */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username (Displayed on Website) *
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="sarah_johnson"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        This will be displayed as @{data.username || 'username'} on the website
                                    </p>
                                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="sarah@example.com"
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="+1 234 567 8900"
                                            required
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="e.g., United States"
                                        required
                                    />
                                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Complete address including city, state, postal code"
                                    />
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                        Artist Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Tell us about the artist's background, experience, and style..."
                                    />
                                    {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                                </div>

                                {/* Social Links */}
                                <div>
                                    <label htmlFor="social_links" className="block text-sm font-medium text-gray-700 mb-2">
                                        Social Media Links (JSON)
                                    </label>
                                    <textarea
                                        id="social_links"
                                        value={data.social_links}
                                        onChange={(e) => setData('social_links', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder='{"instagram": "https://instagram.com/artist", "facebook": "https://facebook.com/artist"}'
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Optional: Add social media profiles in JSON format
                                    </p>
                                    {errors.social_links && <p className="mt-1 text-sm text-red-600">{errors.social_links}</p>}
                                </div>
                            </div>

                            {/* Right Column - Image & Status */}
                            <div className="space-y-6">
                                {/* Profile Image */}
                                <div>
                                    <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="profile_image"
                                        value={data.profile_image}
                                        onChange={handleImageUrlChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="https://example.com/profile.jpg"
                                    />
                                    {errors.profile_image && <p className="mt-1 text-sm text-red-600">{errors.profile_image}</p>}
                                </div>

                                {/* Image Preview */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Picture Preview
                                    </label>
                                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                        {previewImage ? (
                                            <img 
                                                src={previewImage} 
                                                alt="Profile Preview" 
                                                className="h-32 w-32 rounded-full object-cover"
                                                onError={() => setPreviewImage('')}
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                    <svg className="h-16 w-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
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
                                        Artist Status
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
                                    <p className="mt-1 text-sm text-gray-500">
                                        Active artists can sell products on the marketplace
                                    </p>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">Required Fields</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Full Legal Name</li>
                                        <li>• Email Address</li>
                                        <li>• Phone Number</li>
                                        <li>• Username</li>
                                        <li>• Country</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            
            {/* Fixed Action Bar */}
            <FixedActionBar
                cancelUrl="/artist-panel/artists"
                cancelText="Cancel"
                saveText="Create Artist"
                loadingText="Creating..."
                processing={processing}
                onSave={handleSave}
                statusText="Unsaved changes"
            />
        </AdminLayout>
    );
}