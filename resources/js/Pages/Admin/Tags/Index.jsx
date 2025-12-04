import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

export default function TagsIndex({ tags = [] }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: ''
    });
    const [filteredTags, setFilteredTags] = useState(tags);

    // Filter tags based on current filters
    useEffect(() => {
        let filtered = tags;

        if (filters.search) {
            filtered = filtered.filter(tag => 
                tag.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                (tag.description && tag.description.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }

        setFilteredTags(filtered);
    }, [filters, tags]);

    const clearAllFilters = () => {
        setFilters({
            search: '',
            status: ''
        });
    };

    const handleDeleteClick = (tag) => {
        setTagToDelete(tag);
        setShowDeleteModal(true);
    };

    // Calculate stats
    const totalTags = tags.length;
    const totalUsage = tags.reduce((sum, tag) => sum + tag.usage_count, 0);
    const averageUsage = totalTags > 0 ? (totalUsage / totalTags).toFixed(1) : 0;
    const unusedTags = tags.filter(tag => tag.usage_count === 0).length;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <Head title="Tags Management" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
                        <p className="text-gray-600">Manage and organize your product tags</p>
                    </div>
                    <Link
                        href={route('admin.tags.create')}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Tag</span>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-orange-600">{totalTags}</div>
                        <div className="text-sm text-gray-600">Total Tags</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-green-600">{totalUsage}</div>
                        <div className="text-sm text-gray-600">Total Usages</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600">{averageUsage}</div>
                        <div className="text-sm text-gray-600">Avg. Usage</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-600">{unusedTags}</div>
                        <div className="text-sm text-gray-600">Unused Tags</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="text"
                                placeholder="Search tags..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <button
                            onClick={clearAllFilters}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Clear Filters
                        </button>
                        <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
                            <Plus className="w-4 h-4" />
                            <span>Add filter</span>
                        </button>
                        <button className="text-orange-600 hover:text-orange-700 font-medium">
                            Save as
                        </button>
                    </div>
                </div>

                {/* Results Header */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">All Tags</h3>
                            <p className="text-sm text-gray-500">
                                Showing {filteredTags.length} of {tags.length} tags
                            </p>
                        </div>
                    </div>

                    {/* Tags Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tag Name
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usage Count
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTags.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-medium text-gray-900">No tags yet</h3>
                                                    <p className="text-gray-500">Get started by creating your first product tag.</p>
                                                </div>
                                                <Link
                                                    href={route('admin.tags.create')}
                                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
                                                >
                                                    Add New Tag
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTags.map((tag) => (
                                        <tr key={tag.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div 
                                                        className="w-4 h-4 rounded-full border-2 border-gray-300"
                                                        style={{ backgroundColor: tag.color }}
                                                    ></div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{tag.name}</div>
                                                        {tag.description && (
                                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                {tag.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    tag.usage_count === 0 
                                                        ? 'bg-gray-100 text-gray-800' 
                                                        : tag.usage_count > 10
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {tag.usage_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(tag.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => router.visit(route('admin.tags.show', tag.id))}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => router.visit(route('admin.tags.edit', tag.id))}
                                                        className="text-orange-600 hover:text-orange-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(tag)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setTagToDelete(null);
                }}
                onConfirm={() => {
                    if (!tagToDelete) return;
                    
                    router.delete(`/artist-panel/tags/${tagToDelete.id}`, {
                        onSuccess: () => {
                            setTagToDelete(null);
                        },
                        onError: (errors) => {
                            console.error('Delete failed:', errors);
                            alert('Failed to delete tag. Please try again.');
                        }
                    });
                }}
                title="Delete Tag"
                message={tagToDelete ? `Are you sure you want to delete "${tagToDelete.name}"? This action cannot be undone and will remove this tag from all products.` : ''}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </AdminLayout>
    );
}