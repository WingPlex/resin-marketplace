import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track if a form has unsaved changes
 * @param {Object} formData - Current form data
 * @param {Object} originalData - Original form data 
 * @param {Array} ignoreFields - Fields to ignore when checking for changes
 * @returns {Object} - { isDirty, resetDirty, markClean }
 */
export default function useFormDirty(formData, originalData = null, ignoreFields = []) {
    const [isDirty, setIsDirty] = useState(false);
    const initialDataRef = useRef(null);

    // Store initial data on first render
    useEffect(() => {
        if (originalData) {
            initialDataRef.current = JSON.parse(JSON.stringify(originalData));
        } else if (formData && !initialDataRef.current) {
            initialDataRef.current = JSON.parse(JSON.stringify(formData));
        }
    }, [originalData]);

    // Check for changes whenever formData updates
    useEffect(() => {
        if (!initialDataRef.current || !formData) return;

        const compareData = (current, initial) => {
            // Filter out ignored fields
            const filterFields = (obj) => {
                const filtered = { ...obj };
                ignoreFields.forEach(field => {
                    delete filtered[field];
                });
                return filtered;
            };

            const currentFiltered = filterFields(current);
            const initialFiltered = filterFields(initial);

            return JSON.stringify(currentFiltered) !== JSON.stringify(initialFiltered);
        };

        const hasChanges = compareData(formData, initialDataRef.current);
        setIsDirty(hasChanges);
    }, [formData, ignoreFields]);

    const resetDirty = () => {
        if (formData) {
            initialDataRef.current = JSON.parse(JSON.stringify(formData));
            setIsDirty(false);
        }
    };

    const markClean = () => {
        setIsDirty(false);
    };

    return {
        isDirty,
        resetDirty,
        markClean,
        initialData: initialDataRef.current
    };
}