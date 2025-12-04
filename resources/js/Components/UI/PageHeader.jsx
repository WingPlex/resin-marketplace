import React from 'react';
import { Link } from '@inertiajs/react';

export default function PageHeader({ 
    title, 
    subtitle, 
    backUrl, 
    backText = 'Back',
    className = '' 
}) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div>
                <h2 className="text-2xl font-k2d-bold text-gray-900">{title}</h2>
                {subtitle && (
                    <p className="mt-1 text-sm text-gray-600">
                        {subtitle}
                    </p>
                )}
            </div>
            {backUrl && (
                <Link
                    href={backUrl}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {backText}
                </Link>
            )}
        </div>
    );
}