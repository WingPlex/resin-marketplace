import { useState, useEffect, useRef } from 'react';

export default function useFormErrors(errors, fieldLabels = {}) {
    const errorSummaryRef = useRef(null);
    
    // Get error count and detection
    const errorCount = Object.keys(errors).length;
    const hasErrors = errorCount > 0;
    
    // Auto-scroll to errors when they occur
    useEffect(() => {
        if (hasErrors && errorSummaryRef.current) {
            errorSummaryRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, [hasErrors]);
    
    // Function to scroll to specific field
    const scrollToField = (fieldName) => {
        const element = document.getElementById(fieldName);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            element.focus();
        }
    };
    
    // Default field labels for common form fields
    const defaultLabels = {
        name: 'Name',
        slug: 'URL Slug',
        description: 'Description',
        price: 'Price',
        category_id: 'Category',
        artist_id: 'Artist',
        featured_image: 'Featured Image',
        gallery_images: 'Gallery Images',
        materials: 'Materials',
        dimensions: 'Dimensions',
        colors_available: 'Available Colors',
        stock_quantity: 'Stock Quantity',
        sku: 'SKU',
        tags: 'Tags',
        weight: 'Weight',
        customization_options: 'Customization Options',
        status: 'Status',
        title: 'Title',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        website: 'Website',
        bio: 'Bio',
        image: 'Image',
        sort_order: 'Sort Order',
        is_active: 'Active Status'
    };
    
    // Get user-friendly field names
    const getFieldLabel = (fieldName) => {
        return fieldLabels[fieldName] || defaultLabels[fieldName] || fieldName;
    };
    
    // Handle error scroll after form submission
    const handleFormError = () => {
        setTimeout(() => {
            if (errorSummaryRef.current) {
                errorSummaryRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    };
    
    return {
        errorSummaryRef,
        errorCount,
        hasErrors,
        scrollToField,
        getFieldLabel,
        handleFormError
    };
}