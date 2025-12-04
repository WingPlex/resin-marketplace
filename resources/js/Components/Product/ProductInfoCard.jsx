import React from 'react';

export default function ProductInfoCard({ product }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Product Info</h4>
            <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">ID:</span> #{product.id}</p>
                <p><span className="font-medium">Created:</span> {new Date(product.created_at).toLocaleDateString()}</p>
                <p><span className="font-medium">Last Updated:</span> {new Date(product.updated_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
}