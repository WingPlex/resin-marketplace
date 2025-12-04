import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../../Components/AdminLayout';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import { useState, useEffect } from 'react';

export default function ProductsIndex({ products, categories = [], artists = [] }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        artist: '',
        status: ''
    });
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Filter products based on current filters
    useEffect(() => {
        let filtered = products;

        if (filters.search) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                (product.sku && product.sku.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }

        if (filters.category) {
            filtered = filtered.filter(product => product.category_id === parseInt(filters.category));
        }

        if (filters.artist) {
            filtered = filtered.filter(product => product.artist_id === parseInt(filters.artist));
        }

        if (filters.status) {
            filtered = filtered.filter(product => product.status.toLowerCase() === filters.status.toLowerCase());
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const clearAllFilters = () => {
        setFilters({
            search: '',
            category: '',
            artist: '',
            status: ''
        });
    };

    const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;
    const getStatusBadge = (status) => {
        const statusConfig = {
            'active': 'bg-green-100 text-green-800',
            'draft': 'bg-gray-100 text-gray-800',
            'inactive': 'bg-red-100 text-red-800',
            'out_of_stock': 'bg-yellow-100 text-yellow-800'
        };
        
        return statusConfig[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatus = (status) => {
        return status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <AdminLayout title="Products">
            <Head title="Products - Admin Panel" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Products</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your resin product inventory
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
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
                </div>

                {/* Shopify-style Filters */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    {/* Filter Bar */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Search */}
                            <div className="relative flex-1 min-w-[300px]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Searching all products"
                                    value={filters.search}
                                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="">Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Artist Filter */}
                            <div className="relative">
                                <select
                                    value={filters.artist}
                                    onChange={(e) => setFilters({...filters, artist: e.target.value})}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="">Vendors</option>
                                    {artists.map(artist => (
                                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="">Status</option>
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Add filter button */}
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add filter
                            </button>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-auto">
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button className="text-sm text-gray-700 hover:text-gray-900">
                                    Save as
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Active Filters Tags */}
                        {activeFiltersCount > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {filters.search && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                        Search: "{filters.search}"
                                        <button
                                            onClick={() => setFilters({...filters, search: ''})}
                                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                                        >
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {filters.category && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                        Category: {categories.find(c => c.id === parseInt(filters.category))?.name || 'Unknown'}
                                        <button
                                            onClick={() => setFilters({...filters, category: ''})}
                                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
                                        >
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {filters.artist && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                        Vendor: {artists.find(a => a.id === parseInt(filters.artist))?.name || 'Unknown'}
                                        <button
                                            onClick={() => setFilters({...filters, artist: ''})}
                                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
                                        >
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {filters.status && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                                        <button
                                            onClick={() => setFilters({...filters, status: ''})}
                                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-yellow-200"
                                        >
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-k2d-semibold text-gray-900">All Products</h3>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
                            {activeFiltersCount > 0 && (
                                <span className="text-gray-500"> with {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied</span>
                            )}
                        </p>
                    </div>
                    
                    {filteredProducts && filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Artist
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    href={`/artist-panel/products/${product.id}/edit`}
                                                    className="flex items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                                                >
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        {product.featured_image ? (
                                                            <img 
                                                                className="h-12 w-12 rounded-lg object-cover" 
                                                                src={product.featured_image} 
                                                                alt={product.name}
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {product.sku || 'No SKU'}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.category?.name || 'No Category'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.artist?.name || 'No Artist'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="flex flex-wrap gap-1">
                                                    {product.tags && product.tags.length > 0 ? (
                                                        product.tags.slice(0, 3).map(tag => (
                                                            <span 
                                                                key={tag.id}
                                                                className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                                                                style={{ backgroundColor: tag.color + '20', color: tag.color }}
                                                            >
                                                                {tag.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 italic">No tags</span>
                                                    )}
                                                    {product.tags && product.tags.length > 3 && (
                                                        <span className="text-xs text-gray-400">+{product.tags.length - 3} more</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.stock_quantity ?? 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                                                    {formatStatus(product.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="View Product"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/artist-panel/products/${product.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="Edit Product"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="Delete Product"
                                                        onClick={() => {
                                                            setProductToDelete(product);
                                                            setShowDeleteModal(true);
                                                        }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-k2d-semibold text-gray-900">
                                {activeFiltersCount > 0 ? 'No products found' : 'No products yet'}
                            </h3>
                            <p className="mt-2 text-gray-500">
                                {activeFiltersCount > 0 
                                    ? 'Try adjusting your filters to see more results.'
                                    : 'Get started by creating your first resin product.'
                                }
                            </p>
                            <div className="mt-6">
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
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
                onConfirm={() => {
                    if (!productToDelete) return;
                    
                    router.delete(`/artist-panel/products/${productToDelete.id}`, {
                        onSuccess: () => {
                            setProductToDelete(null);
                        },
                        onError: (errors) => {
                            console.error('Delete failed:', errors);
                            alert('Failed to delete product. Please try again.');
                        }
                    });
                }}
                title="Delete Product"
                message={productToDelete ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.` : ''}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </AdminLayout>
    );
}