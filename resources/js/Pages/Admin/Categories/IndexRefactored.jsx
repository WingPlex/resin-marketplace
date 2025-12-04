import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import AdminFilterBar from '../../../Components/AdminFilterBar';
import AdminDataTable from '../../../Components/AdminDataTable';
import { StatusBadge, ImagePreview, CountBadge } from '../../../Components/AdminUI';
import { useAdminFilters } from '../../../Hooks/useAdminFilters';

export default function CategoriesIndex({ categories }) {
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

    // Use the filter hook
    const {
        filters,
        filteredData,
        activeFiltersCount,
        updateFilter,
        clearAllFilters
    } = useAdminFilters(categories, {
        status: ''
    });

    // Define table columns
    const columns = [
        {
            header: 'Category',
            accessor: 'name',
            render: (category) => (
                <div className="flex items-center">
                    <ImagePreview 
                        src={category.image_url} 
                        alt={category.name}
                        className="w-10 h-10 mr-4"
                        fallback={<span className="text-primary-600 font-medium">{category.name.charAt(0)}</span>}
                    />
                    <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        {category.slug && (
                            <div className="text-sm text-gray-500">/{category.slug}</div>
                        )}
                    </div>
                </div>
            )
        },
        {
            header: 'Description',
            accessor: 'description',
            render: (category) => (
                <span className="text-sm text-gray-600 max-w-xs truncate">
                    {category.description || 'No description'}
                </span>
            )
        },
        {
            header: 'Products',
            accessor: 'products_count',
            render: (category) => (
                <CountBadge count={category.products_count || 0} color="blue" />
            )
        },
        {
            header: 'Sort Order',
            accessor: 'sort_order',
            render: (category) => (
                <span className="text-sm text-gray-900">{category.sort_order || 0}</span>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (category) => <StatusBadge status={category.status || 'active'} />
        }
    ];

    // Define table actions
    const actions = [
        {
            type: 'link',
            label: 'Edit',
            href: (category) => `/artist-panel/categories/${category.id}/edit`,
            className: 'text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200'
        },
        {
            type: 'button',
            label: 'Delete',
            className: 'text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200',
            onClick: (category) => {
                if (confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
                    router.delete(`/artist-panel/categories/${category.id}`);
                }
            }
        }
    ];

    return (
        <AdminLayout title="Categories">
            <Head title="Categories - Admin Panel" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Categories</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Organize your products into collections
                        </p>
                    </div>
                    <Link
                        href="/artist-panel/categories/create"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Category
                    </Link>
                </div>

                {/* Filters */}
                <AdminFilterBar
                    searchPlaceholder="Search categories..."
                    searchValue={filters.search}
                    onSearchChange={(value) => updateFilter('search', value)}
                    filters={filterConfig}
                    activeFilters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearAllFilters}
                />

                {/* Data Table */}
                <AdminDataTable
                    title="All Categories"
                    data={filteredData}
                    columns={columns}
                    actions={actions}
                    totalCount={categories.length}
                    filteredCount={filteredData.length}
                    activeFiltersCount={activeFiltersCount}
                />
            </div>
        </AdminLayout>
    );
}