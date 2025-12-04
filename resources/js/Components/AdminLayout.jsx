import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const logout = () => {
        router.post('/artist-panel/logout');
    };

    const navigation = [
        { 
            name: 'Dashboard', 
            href: '/artist-panel/dashboard', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
            )
        },
        { 
            name: 'Resin Collections', 
            href: '/artist-panel/categories', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-7-7-7 7m14 4l-7 7-7-7" />
                </svg>
            )
        },
        { 
            name: 'Products', 
            href: '/artist-panel/products', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        { 
            name: 'Artists', 
            href: '/artist-panel/artists', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        { 
            name: 'Tags', 
            href: '/artist-panel/tags', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div 
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex-shrink-0`}>
                <div className="flex items-center justify-between h-16 px-4 bg-primary-600">
                    <div className="flex items-center">
                        <span className="text-2xl">✨</span>
                        {!sidebarCollapsed && <span className="ml-2 text-xl font-k2d-bold text-white">RESINCRAFT</span>}
                    </div>
                    
                    {/* Desktop toggle button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:flex p-1.5 rounded-md text-white hover:bg-primary-700 transition-colors"
                    >
                        <svg className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                
                <nav className="mt-8">
                    {navigation.map((item) => {
                        const isActive = window.location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group relative flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'px-6'} py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-primary-50 border-r-4 border-primary-600 text-primary-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                title={sidebarCollapsed ? item.name : ''}
                            >
                                {item.icon}
                                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                                
                                {/* Tooltip for collapsed sidebar */}
                                {sidebarCollapsed && (
                                    <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="ml-2 text-xl font-k2d-semibold text-gray-900">{title}</h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Welcome, Admin</span>
                            <button
                                onClick={logout}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Desktop header */}
                <div className="hidden lg:block bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h1 className="text-xl font-k2d-semibold text-gray-900">{title}</h1>
                        
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Welcome, Admin</span>
                            <button
                                onClick={logout}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}