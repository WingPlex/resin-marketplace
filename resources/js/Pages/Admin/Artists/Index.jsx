import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../../../Components/AdminLayout';
import ConfirmationModal from '../../../Components/ConfirmationModal';

export default function ArtistsIndex({ artists }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [artistToDelete, setArtistToDelete] = useState(null);
    return (
        <AdminLayout title="Artists">
            <Head title="Artists - Admin Panel" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-k2d-bold text-gray-900">Artists</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage resin artists and their profiles
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/artist-panel/artists/create"
                            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Artist
                        </Link>
                    </div>
                </div>

                {/* Artists Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-k2d-semibold text-gray-900">All Artists</h3>
                    </div>
                    
                    {artists && artists.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Artist
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Products
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
                                    {artists.map((artist) => (
                                        <tr key={artist.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    href={`/artist-panel/artists/${artist.id}/edit`}
                                                    className="flex items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                                                >
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        {artist.profile_image ? (
                                                            <img 
                                                                className="h-12 w-12 rounded-full object-cover" 
                                                                src={artist.profile_image} 
                                                                alt={artist.name}
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                                                            {artist.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            @{artist.username}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{artist.email}</div>
                                                <div className="text-sm text-gray-500">{artist.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {artist.country}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {artist.products_count || 0} products
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    artist.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {artist.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/artists/${artist.slug || artist.id}`}
                                                        className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="View Artist Profile"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/artist-panel/artists/${artist.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="Edit Artist"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full inline-flex items-center justify-center"
                                                        title="Delete Artist"
                                                        onClick={() => {
                                                            setArtistToDelete(artist);
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-k2d-semibold text-gray-900">No artists yet</h3>
                            <p className="mt-2 text-gray-500">Get started by adding your first resin artist.</p>
                            <div className="mt-6">
                                <Link
                                    href="/artist-panel/artists/create"
                                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Artist
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setArtistToDelete(null);
                }}
                onConfirm={() => {
                    if (!artistToDelete) return;
                    
                    router.delete(`/artist-panel/artists/${artistToDelete.id}`, {
                        onSuccess: () => {
                            setArtistToDelete(null);
                        },
                        onError: (errors) => {
                            console.error('Delete failed:', errors);
                            alert('Failed to delete artist. Please try again.');
                        }
                    });
                }}
                title="Delete Artist"
                message={artistToDelete ? `Are you sure you want to delete "${artistToDelete.name}"? This action cannot be undone.` : ''}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </AdminLayout>
    );
}