import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import AdminLayout from '../../../Components/AdminLayout';
import AdminFilterBar from '../../../Components/AdminFilterBar';
import AdminDataTable from '../../../Components/AdminDataTable';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import { StatusBadge, ImagePreview, CountBadge } from '../../../Components/AdminUI';
import { useAdminFilters } from '../../../Hooks/useAdminFilters';

export default function CategoriesIndex({ categories }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Filter configuration for categories
    const filterConfig = [
        {
            key: 'status',
            label: 'Status',
            placeholder: 'Status',
            color: 'yellow',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
            ]
        }
    ];

    // Use the filter hook but exclude status from base filtering
    const {
        filters,
        filteredData: baseFilteredData,
        activeFiltersCount: baseActiveFiltersCount,
        updateFilter,
        clearAllFilters
    } = useAdminFilters(categories, {
        status: ''
    });

    // Apply custom status filtering based on is_active field
    const filteredData = useMemo(() => {
        // Start with categories and apply search filter manually
        let result = [...categories];
        
        // Apply search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(category => 
                category.name?.toLowerCase().includes(searchTerm) ||
                category.slug?.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply status filter based on is_active field
        if (filters.status) {
            result = result.filter(category => {
                if (filters.status === 'active') {
                    return category.is_active === 1 || category.is_active === true;
                } else if (filters.status === 'inactive') {
                    return category.is_active === 0 || category.is_active === false;
                }
                return true;
            });
        }
        
        return result;
    }, [categories, filters.search, filters.status]);

    // Calculate active filters count manually
    const activeFiltersCount = useMemo(() => {
        return Object.values(filters).filter(value => value !== '').length;
    }, [filters]);

    // Define table columns
    const columns = [
        {
            header: 'Collection',
            accessor: 'name',
            render: (category) => (
                <Link 
                    href={`/collections/${category.slug}`}
                    className="flex items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                >
                    <ImagePreview 
                        src={category.image_url} 
                        alt={category.name}
                        className="w-12 h-12 mr-4"
                        fallback={<span className="text-primary-600 font-medium">{category.name.charAt(0)}</span>}
                    />
                    <div>
                        <div className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.slug || category.name.toLowerCase()}</div>
                    </div>
                </Link>
            )
        },
        {
            header: 'Status',
            accessor: 'is_active',
            render: (category) => <StatusBadge status={category.is_active ? 'active' : 'inactive'} />
        },
        {
            header: 'Products',
            accessor: 'products_count',
            render: (category) => (
                <span className="text-sm text-gray-900">{category.products_count || 0} products</span>
            )
        },
        {
            header: 'Created',
            accessor: 'created_at',
            render: (category) => (
                <span className="text-sm text-gray-500">
                    {new Date(category.created_at).toLocaleDateString()}
                </span>
            )
        }
    ];

    // Define table actions
    const actions = [
        {
            type: 'link',
            label: <Eye size={16} />,
            href: (category) => `/collections/${category.slug}`,
            className: 'text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 p-2 rounded-full',
            title: 'View Collection'
        },
        {
            type: 'link',
            label: <Edit size={16} />,
            href: (category) => `/artist-panel/categories/${category.id}/edit`,
            className: 'text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-full',
            title: 'Edit Category'
        },
        {
            type: 'button',
            label: <Trash2 size={16} />,
            className: 'text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full',
            title: 'Delete Category',
            onClick: (category) => {
                setCategoryToDelete(category);
                setShowDeleteModal(true);
            }
        }
    ];

    const handleDeleteCategory = () => {
        if (!categoryToDelete) return;
        
        router.delete(`/artist-panel/categories/${categoryToDelete.id}`, {
            onSuccess: () => {
                setCategoryToDelete(null);
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
                alert('Failed to delete category. Please try again.');
            }
        });
    };

    return (
        <AdminLayout title="Categories">
            <Head title="Categories - Admin Panel" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Resin Collections</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your resin product collections and categories
                        </p>
                    </div>
                    <Link
                        href="/artist-panel/categories/create"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Collection
                    </Link>
                </div>

                {/* Filters */}
                <AdminFilterBar
                    searchPlaceholder="Search collections..."
                    searchValue={filters.search}
                    onSearchChange={(value) => updateFilter('search', value)}
                    filters={filterConfig}
                    activeFilters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearAllFilters}
                />

                {/* Data Table */}
                <AdminDataTable
                    title="All Collections"
                    data={filteredData}
                    columns={columns}
                    actions={actions}
                    totalCount={categories.length}
                    filteredCount={filteredData.length}
                    activeFiltersCount={activeFiltersCount}
                    emptyState={
                        <div>
                            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-7-7-7 7m14 4l-7 7-7-7" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-k2d-semibold text-gray-900">
                                {activeFiltersCount > 0 ? 'No collections found' : 'No collections yet'}
                            </h3>
                            <p className="mt-2 text-gray-500">
                                {activeFiltersCount > 0 
                                    ? 'Try adjusting your filters to see more results.'
                                    : 'Get started by creating your first resin collection.'
                                }
                            </p>
                            {activeFiltersCount === 0 && (
                                <div className="mt-6">
                                    <Link
                                        href="/artist-panel/categories/create"
                                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Collection
                                    </Link>
                                </div>
                            )}
                        </div>
                    }
                />
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
                }}
                onConfirm={handleDeleteCategory}
                title="Delete Category"
                message={categoryToDelete ? `Are you sure you want to delete "${categoryToDelete.name}"? This action cannot be undone.` : ''}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </AdminLayout>
    );
}