import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import { ArrowLeft, Edit, Eye, Package, Calendar, Palette, Hash } from 'lucide-react';

export default function ShowTag({ tag }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    return (
        <AdminLayout>
            <Head title={`Tag: ${tag.name}`} />
            
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('admin.tags.index')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                                    <div 
                                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                                        style={{ backgroundColor: tag.color }}
                                    ></div>
                                    <span>{tag.name}</span>
                                </h1>
                                <p className="text-gray-600">Tag details and usage information</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <Link
                                href={route('admin.tags.edit', tag.id)}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                            >
                                <Edit className="w-4 h-4" />
                                <span>Edit Tag</span>
                            </Link>
                            <button
                                onClick={handleDeleteClick}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Delete Tag
                            </button>
                        </div>
                    </div>

                {/* Tag Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Package className="w-8 h-8 text-orange-600" />
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{tag.usage_count}</div>
                                <div className="text-sm text-gray-600">Products Using Tag</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Palette className="w-8 h-8 text-blue-600" />
                            <div>
                                <div className="flex items-center space-x-2">
                                    <div 
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{ backgroundColor: tag.color }}
                                    ></div>
                                    <div className="text-lg font-bold text-gray-900">{tag.color}</div>
                                </div>
                                <div className="text-sm text-gray-600">Tag Color</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Hash className="w-8 h-8 text-green-600" />
                            <div>
                                <div className="text-lg font-bold text-gray-900">{tag.slug}</div>
                                <div className="text-sm text-gray-600">URL Slug</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-8 h-8 text-purple-600" />
                            <div>
                                <div className="text-lg font-bold text-gray-900">
                                    {new Date(tag.created_at).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-600">Created Date</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tag Preview */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Tag Preview</h2>
                    <div className="flex items-center space-x-4">
                        <span 
                            className="px-4 py-2 text-sm font-medium text-white rounded-full"
                            style={{ backgroundColor: tag.color }}
                        >
                            {tag.name}
                        </span>
                        <span 
                            className="px-4 py-2 text-sm font-medium rounded-full border-2"
                            style={{ 
                                borderColor: tag.color,
                                color: tag.color,
                                backgroundColor: 'transparent'
                            }}
                        >
                            {tag.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            Different style variations
                        </span>
                    </div>
                </div>

                {/* Description */}
                {tag.description && (
                    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700">{tag.description}</p>
                    </div>
                )}
                </div>

                {/* Products Using This Tag */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Products Using This Tag ({tag.products?.length || 0})
                    </h2>
                    
                    {tag.products && tag.products.length > 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
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
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tag.products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            SKU: {product.sku}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.category?.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.artist?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        product.status === 'Active' || product.status === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => router.visit(route('admin.products.show', product.id))}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
                            <p className="text-gray-600 mb-4">This tag hasn't been assigned to any products yet.</p>
                            <Link
                                href={route('admin.products.create')}
                                className="text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Create a product →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    router.delete(`/artist-panel/tags/${tag.id}`, {
                        onSuccess: () => {
                            router.visit(route('admin.tags.index'));
                        },
                        onError: (errors) => {
                            console.error('Delete failed:', errors);
                            alert('Failed to delete tag. Please try again.');
                        }
                    });
                }}
                title="Delete Tag"
                message={`Are you sure you want to delete "${tag.name}"? This action cannot be undone and will remove this tag from all ${tag.usage_count} product${tag.usage_count !== 1 ? 's' : ''}.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </AdminLayout>
    );
}