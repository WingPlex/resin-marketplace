import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import FormErrorSummary from '../../../Components/Form/FormErrorSummary';
import FixedActionBar from '../../../Components/Form/FixedActionBar';
import useFormErrors from '../../../Components/Form/hooks/useFormErrors';
import useFormDirty from '../../../Components/Form/hooks/useFormDirty';
import ResinPropertiesSection from '../../../Components/Product/ResinPropertiesSection';
import PricingInventorySection from '../../../Components/Product/PricingInventorySection';
import ProductBasicInfoSection from '../../../Components/Product/ProductBasicInfoSection';
import ProductFeaturesSection from '../../../Components/Product/ProductFeaturesSection';
import StatusSettingsSection from '../../../Components/Product/StatusSettingsSection';
import SEOSection from '../../../Components/Product/SEOSection';
import PageHeader from '../../../Components/UI/PageHeader';
import { getInitialProductData, PRODUCT_FIELD_LABELS } from '../../../constants/productConstants';
import { useState } from 'react';

export default function ProductsCreate({ categories, artists, availableTags }) {
    const { data, setData, post, processing, errors } = useForm(getInitialProductData());
    const [previewImage, setPreviewImage] = useState('');
    
    // Track form changes - for create forms, any data means it's dirty
    const emptyData = getInitialProductData();
    const { isDirty } = useFormDirty(data, emptyData);
    
    // Use custom form errors hook
    const { errorSummaryRef, errorCount, hasErrors, scrollToField, getFieldLabel, handleFormError } = useFormErrors(errors, PRODUCT_FIELD_LABELS);

    // Auto-generate slug from name
    const handleNameChange = (e) => {
        const name = e.target.value;
        setData('name', name);
        
        // Generate slug
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        
        setData('slug', slug);
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setData('featured_image', url);
        setPreviewImage(url);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/artist-panel/products', {
            onError: handleFormError
        });
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    };

    return (
        <AdminLayout title="Add New Product">
            <Head title="Add New Product - Admin Panel" />
            
            <div className="space-y-6 pb-20">
                <PageHeader
                    title="Add New Product"
                    subtitle="Create a new resin product for your marketplace"
                    backUrl="/artist-panel/products"
                    backText="Back to Products"
                />

                {/* Error Summary */}
                <FormErrorSummary
                    ref={errorSummaryRef}
                    errors={errors}
                    errorCount={errorCount}
                    hasErrors={hasErrors}
                    scrollToField={scrollToField}
                    getFieldLabel={getFieldLabel}
                    actionText="creating the product"
                />

                {/* Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Product Fields */}
                    <div className="lg:col-span-2">
                        <ProductBasicInfoSection
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleNameChange={handleNameChange}
                            handleImageUrlChange={handleImageUrlChange}
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            onSubmit={submit}
                        />

                        <PricingInventorySection
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        <ResinPropertiesSection
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        <SEOSection
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>

                    {/* Right Column - Status Section */}
                    <div className="space-y-6">
                        <StatusSettingsSection
                            data={data}
                            setData={setData}
                            errors={errors}
                            categories={categories}
                            artists={artists}
                            availableTags={availableTags}
                        />

                        <ProductFeaturesSection
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* Fixed Action Bar */}
            <FixedActionBar
                cancelUrl="/artist-panel/products"
                cancelText="Cancel"
                saveText="Create Product"
                loadingText="Creating..."
                processing={processing}
                onSave={handleSave}
                statusText="Ready to create"
                isDirty={isDirty}
            />
        </AdminLayout>
    );
}