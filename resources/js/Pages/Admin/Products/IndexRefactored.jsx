import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import AdminFilterBar from '../../../Components/AdminFilterBar';
import AdminDataTable from '../../../Components/AdminDataTable';
import { StatusBadge, ImagePreview, UserAvatar } from '../../../Components/AdminUI';
import { useAdminFilters } from '../../../Hooks/useAdminFilters';

export default function ProductsIndex({ products, categories = [], artists = [] }) {
    // Set up filters configuration
    const filterConfig = [
        {
            key: 'category_id',
            label: 'Category',
            placeholder: 'Categories',
            color: 'green',
            options: categories.map(cat => ({ value: cat.id, label: cat.name }))
        },
        {
            key: 'artist_id', 
            label: 'Vendor',
            placeholder: 'Vendors',
            color: 'purple',
            options: artists.map(artist => ({ value: artist.id, label: artist.name }))
        },
        {
            key: 'status',
            label: 'Status',
            placeholder: 'Status',
            color: 'yellow',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'draft', label: 'Draft' },
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
    } = useAdminFilters(products, {
        category_id: '',
        artist_id: '',
        status: ''
    });

    // Define table columns
    const columns = [
        {
            header: 'Product',
            accessor: 'name',
            render: (product) => (
                <div className="flex items-center">
                    <ImagePreview 
                        src={product.featured_image} 
                        alt={product.name}
                        className="w-12 h-12 mr-4"
                    />
                    <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Category',
            accessor: 'category.name',
            render: (product) => (
                <span className="text-sm text-gray-900">{product.category?.name || 'N/A'}</span>
            )
        },
        {
            header: 'Artist',
            accessor: 'artist.name', 
            render: (product) => product.artist ? (
                <UserAvatar user={product.artist} size="sm" />
            ) : (
                <span className="text-sm text-gray-500">No artist</span>
            )
        },
        {
            header: 'Price',
            accessor: 'price',
            render: (product) => (
                <span className="text-sm font-medium text-gray-900">
                    ${parseFloat(product.price).toFixed(2)}
                </span>
            )
        },
        {
            header: 'Stock',
            accessor: 'stock_quantity',
            render: (product) => (
                <span className="text-sm text-gray-900">{product.stock_quantity || 0}</span>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (product) => <StatusBadge status={product.status} />
        }
    ];

    // Define table actions
    const actions = [
        {
            type: 'link',
            label: 'Edit',
            href: (product) => `/artist-panel/products/${product.id}/edit`,
            className: 'text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200'
        },
        {
            type: 'button',
            label: 'Delete',
            className: 'text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200',
            onClick: (product) => {
                if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
                    router.delete(`/artist-panel/products/${product.id}`);
                }
            }
        }
    ];

    return (
        <AdminLayout title="Products">
            <Head title="Products - Admin Panel" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Products</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your resin product inventory
                        </p>
                    </div>
                    <Link
                        href="/artist-panel/products/create"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Product
                    </Link>
                </div>

                {/* Filters */}
                <AdminFilterBar
                    searchPlaceholder="Searching all products"
                    searchValue={filters.search}
                    onSearchChange={(value) => updateFilter('search', value)}
                    filters={filterConfig}
                    activeFilters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearAllFilters}
                />

                {/* Data Table */}
                <AdminDataTable
                    title="All Products"
                    data={filteredData}
                    columns={columns}
                    actions={actions}
                    totalCount={products.length}
                    filteredCount={filteredData.length}
                    activeFiltersCount={activeFiltersCount}
                />
            </div>
        </AdminLayout>
    );
}