import { Head, Link } from '@inertiajs/react';

export default function Collections({ auth, categories = [] }) {

    return (
        <>
            <Head title="Collections - Resin Marketplace" />
            <div className="bg-secondary-50 min-h-screen">
                {/* Header */}
                <header className="bg-white shadow-custom-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href={route('welcome')} className="text-2xl font-k2d-bold text-primary-500">
                                    ✨ RESINCRAFT
                                </Link>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="hidden md:flex flex-1 max-w-lg mx-8">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Search collections..."
                                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Navigation */}
                            <nav className="flex items-center space-x-6">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="btn btn-primary">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link href={route('login')} className="text-secondary-600 hover:text-primary-500 transition-colors">
                                            LOGIN
                                        </Link>
                                        <span className="text-secondary-300">/</span>
                                        <span>💖 0</span>
                                        <span>🛒 0</span>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Breadcrumb */}
                <div className="bg-white border-b border-secondary-200">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link href={route('welcome')} className="text-secondary-500 hover:text-primary-500">Home</Link>
                            <span className="text-secondary-400">/</span>
                            <span className="text-secondary-800 font-medium">Collections</span>
                        </nav>
                    </div>
                </div>

                {/* Page Header */}
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-k2d-extrabold text-secondary-800 mb-4">
                            Our Collections
                        </h1>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            Discover unique handmade resin art pieces crafted with love by talented independent artists
                        </p>
                    </div>

                    {/* Collections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {categories.length > 0 ? categories.map((category, index) => {
                            // Fallback gradient colors and icons
                            const gradientColors = [
                                'from-pink-200 to-pink-300',
                                'from-yellow-200 to-yellow-300', 
                                'from-purple-200 to-purple-300',
                                'from-green-200 to-green-300',
                                'from-blue-200 to-blue-300',
                                'from-indigo-200 to-indigo-300'
                            ];
                            const fallbackIcons = ['🗝️', '🍽️', '🖼️', '💎', '🎁', '✨'];
                            const statusBadges = ['Trending', 'Popular', 'New', 'Best Seller', 'Hot', 'Featured'];
                            const badgeColors = [
                                'bg-primary-100 text-primary-600',
                                'bg-green-100 text-green-600',
                                'bg-purple-100 text-purple-600', 
                                'bg-orange-100 text-orange-600',
                                'bg-red-100 text-red-600',
                                'bg-blue-100 text-blue-600'
                            ];
                            
                            const gradientClass = category.gradient_from && category.gradient_to 
                                ? `from-[${category.gradient_from}] to-[${category.gradient_to}]`
                                : gradientColors[index % gradientColors.length];
                            
                            return (
                                <div key={category.id} className="card group cursor-pointer hover:shadow-custom-md transition-all duration-300">
                                    <div className="relative overflow-hidden">
                                        {category.image_url ? (
                                            <div className="h-64 relative">
                                                <img 
                                                    src={category.image_url} 
                                                    alt={category.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
                                                    {category.icon || fallbackIcons[index % fallbackIcons.length]}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className={`h-64 bg-gradient-to-br ${gradientClass} flex items-center justify-center relative`}>
                                                <span className="text-6xl mb-4">
                                                    {category.icon || fallbackIcons[index % fallbackIcons.length]}
                                                </span>
                                                
                                                {/* Collection overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Floating elements */}
                                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                                                <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/20 rounded-full"></div>
                                            </div>
                                        )}
                                        
                                        <div className="p-6">
                                            <h3 className="text-xl font-k2d-bold text-secondary-800 mb-2 group-hover:text-primary-500 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-secondary-600 text-sm mb-4">
                                                {category.description || `Handcrafted ${category.name.toLowerCase()} with unique designs and premium materials`}
                                            </p>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-secondary-500 text-sm">
                                                    {category.products_count || 0} Products
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded ${badgeColors[index % badgeColors.length]}`}>
                                                    {statusBadges[index % statusBadges.length]}
                                                </span>
                                            </div>
                                            <Link 
                                                href={route('collection.listing', category.slug)} 
                                                className="w-full btn btn-outline group-hover:btn-primary transition-all duration-300 block text-center"
                                            >
                                                View All {category.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 text-lg mb-2">No collections available</div>
                                <div className="text-gray-500 text-sm">Collections will appear here once they are added.</div>
                            </div>
                        )}


                        {/* Custom Orders Collection - Always show this as static */}
                        <div className="card group cursor-pointer hover:shadow-custom-md transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center relative">
                                    <span className="text-6xl mb-4">✨</span>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div className="absolute top-4 left-4 w-6 h-6 bg-white/30 rounded-lg rotate-12 animate-pulse"></div>
                                    <div className="absolute bottom-8 right-6 w-4 h-4 bg-white/35 rounded-full"></div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-k2d-bold text-secondary-800 mb-2 group-hover:text-primary-500 transition-colors">
                                        Custom Orders
                                    </h3>
                                    <p className="text-secondary-600 text-sm mb-4">
                                        Request personalized resin art pieces made just for you
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-secondary-500 text-sm">Made to Order</span>
                                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Custom</span>
                                    </div>
                                    <button className="w-full btn btn-outline group-hover:btn-primary transition-all duration-300">
                                        Request Custom
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Artist Spotlight Collection */}
                        <div className="card group cursor-pointer hover:shadow-custom-md transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 flex items-center justify-center relative">
                                    <span className="text-6xl mb-4">👨‍🎨</span>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div className="absolute top-6 right-8 w-5 h-5 bg-white/25 rounded-full"></div>
                                    <div className="absolute bottom-4 left-6 w-7 h-7 bg-white/20 rounded-lg rotate-45"></div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-k2d-bold text-secondary-800 mb-2 group-hover:text-primary-500 transition-colors">
                                        Featured Artists
                                    </h3>
                                    <p className="text-secondary-600 text-sm mb-4">
                                        Discover collections from our talented featured artists
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-secondary-500 text-sm">12 Artists</span>
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Featured</span>
                                    </div>
                                    <button className="w-full btn btn-outline group-hover:btn-primary transition-all duration-300">
                                        Meet Artists
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button className="px-3 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
                        <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">2</button>
                        <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">3</button>
                        <span className="px-2">...</span>
                        <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">8</button>
                        <button className="px-3 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
                            Next
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-secondary-700 text-white py-12 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            {/* Brand Column */}
                            <div>
                                <div className="text-xl font-k2d-bold text-primary-400 mb-4">
                                    ✨ RESINCRAFT
                                </div>
                                <p className="text-secondary-300 text-sm">
                                    Handmade resin art crafted with love by independent artists worldwide.
                                </p>
                            </div>
                            
                            {/* Quick Links */}
                            <div>
                                <h3 className="font-k2d-semibold text-white mb-4">Shop Categories</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href={route('collections') + '?category=keychains'} className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Keychains</Link></li>
                                    <li><Link href={route('collections') + '?category=trays'} className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Trays</Link></li>
                                    <li><Link href={route('collections') + '?category=frames'} className="text-secondary-300 hover:text-primary-400 transition-colors">Photo Frames</Link></li>
                                    <li><Link href={route('collections') + '?category=jewelry'} className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Jewelry</Link></li>
                                </ul>
                            </div>
                            
                            {/* For Artists */}
                            <div>
                                <h3 className="font-k2d-semibold text-white mb-4">For Artists</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Become a Seller</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Seller Resources</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Artist Community</Link></li>
                                </ul>
                            </div>
                            
                            {/* Support */}
                            <div>
                                <h3 className="font-k2d-semibold text-white mb-4">Support</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Help Center</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Custom Orders</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Shipping Info</Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-secondary-600 pt-6 text-center">
                            <p className="text-secondary-300 text-sm">
                                Resin Marketplace © 2025 - Connecting Artists & Art Lovers
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}