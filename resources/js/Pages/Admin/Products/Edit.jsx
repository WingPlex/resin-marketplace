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
import ProductInfoCard from '../../../Components/Product/ProductInfoCard';
import PageHeader from '../../../Components/UI/PageHeader';
import { getEditProductData, PRODUCT_FIELD_LABELS } from '../../../constants/productConstants';
import { useState } from 'react';

export default function ProductsEdit({ product, categories, artists, availableTags }) {
    const initialData = getEditProductData(product);
    const { data, setData, put, processing, errors } = useForm(initialData);
    const [previewImage, setPreviewImage] = useState(product.featured_image || '');
    
    // Track form changes
    const { isDirty, markClean } = useFormDirty(data, initialData);
    
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
        put(`/artist-panel/products/${product.id}`, {
            onError: handleFormError,
            onSuccess: () => {
                markClean();
            }
        });
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    };

    return (
        <AdminLayout title="Edit Product">
            <Head title={`Edit ${product.name} - Admin Panel`} />
            
            <div className="space-y-6 pb-20">
                <PageHeader
                    title="Edit Product"
                    subtitle={`Update "${product.name}" product details`}
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
                    actionText="updating the product"
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
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <ProductInfoCard product={product} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Fixed Action Bar */}
            <FixedActionBar
                cancelUrl="/artist-panel/products"
                cancelText="Cancel"
                saveText="Update Product"
                loadingText="Updating..."
                processing={processing}
                onSave={handleSave}
                statusText="Unsaved changes"
                isDirty={isDirty}
            />
        </AdminLayout>
    );
}