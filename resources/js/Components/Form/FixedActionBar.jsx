import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function FixedActionBar({ 
    cancelUrl, 
    cancelText = "Cancel",
    saveText = "Save",
    loadingText = "Saving...",
    processing = false,
    onSave,
    statusText = "Unsaved changes",
    showStatus = true,
    className = "",
    isDirty = false,
    formData = null,
    originalData = null
}) {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Check if form data has changed from original
    useEffect(() => {
        if (formData && originalData) {
            const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
            setHasUnsavedChanges(hasChanges);
        } else if (isDirty !== undefined) {
            setHasUnsavedChanges(isDirty);
        }
    }, [formData, originalData, isDirty]);

    return (
        <>
            {/* Fixed Bottom Action Bar - Shopify Style */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
        {showStatus && hasUnsavedChanges && (
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm text-amber-600 font-medium">{statusText}</span>
            </div>
        )}                        <div className="flex items-center space-x-3 ml-auto">
                            {cancelUrl && (
                                <Link
                                    href={cancelUrl}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                >
                                    {cancelText}
                                </Link>
                            )}
                            <button
                                type="submit"
                                onClick={onSave}
                                disabled={processing}
                                className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {loadingText}
                                    </>
                                ) : saveText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add bottom padding to prevent content from being hidden behind fixed bar */}
            <div className="h-16"></div>
        </>
    );
}