import { useState, useEffect, useMemo } from 'react';

export function useAdminFilters(data = [], initialFilters = {}) {
    const [filters, setFilters] = useState({
        search: '',
        ...initialFilters
    });

    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearAllFilters = () => {
        setFilters(Object.keys(filters).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {}));
    };

    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply search filter
        if (filters.search) {
            result = result.filter(item => {
                const searchTerm = filters.search.toLowerCase();
                return (
                    item.name?.toLowerCase().includes(searchTerm) ||
                    item.title?.toLowerCase().includes(searchTerm) ||
                    item.email?.toLowerCase().includes(searchTerm) ||
                    item.sku?.toLowerCase().includes(searchTerm) ||
                    item.username?.toLowerCase().includes(searchTerm)
                );
            });
        }

        // Apply other filters
        Object.entries(filters).forEach(([key, value]) => {
            if (key !== 'search' && value) {
                result = result.filter(item => {
                    if (key.endsWith('_id')) {
                        return item[key] === parseInt(value);
                    }
                    return item[key]?.toLowerCase() === value.toLowerCase();
                });
            }
        });

        return result;
    }, [data, filters]);

    const activeFiltersCount = useMemo(() => {
        return Object.values(filters).filter(value => value !== '').length;
    }, [filters]);

    return {
        filters,
        filteredData,
        activeFiltersCount,
        updateFilter,
        clearAllFilters,
        setFilters
    };
}

export function useAdminTable(data = [], columns = [], actions = []) {
    const {
        filters,
        filteredData,
        activeFiltersCount,
        updateFilter,
        clearAllFilters
    } = useAdminFilters(data);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return {
        data: sortedData,
        totalCount: data.length,
        filteredCount: filteredData.length,
        filters,
        activeFiltersCount,
        sortConfig,
        updateFilter,
        clearAllFilters,
        handleSort,
        columns: columns.map(col => ({
            ...col,
            sortable: col.sortable !== false,
            onSort: col.sortable !== false ? () => handleSort(col.accessor) : null
        })),
        actions
    };
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function useAdminForm(initialData = {}, onSubmit = null) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const updateData = (key, value) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }));
        
        // Clear error when field is updated
        if (errors[key]) {
            setErrors(prev => ({
                ...prev,
                [key]: null
            }));
        }
    };

    const setError = (key, message) => {
        setErrors(prev => ({
            ...prev,
            [key]: message
        }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing || !onSubmit) return;

        setProcessing(true);
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setProcessing(false);
        }
    };

    const reset = (newData = initialData) => {
        setData(newData);
        setErrors({});
        setProcessing(false);
    };

    return {
        data,
        errors,
        processing,
        updateData,
        setError,
        clearErrors,
        handleSubmit,
        reset,
        setData
    };
}