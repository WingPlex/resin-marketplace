import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion, categories = [] }) {
    return (
        <>
            <Head title="Resin Marketplace - Handmade Resin Art by Independent Artists" />
            <div className="bg-secondary-50 min-h-screen">
                {/* Header */}
                <header className="bg-white shadow-custom-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="text-2xl font-k2d-bold text-primary-500">
                                    ✨ RESINCRAFT
                                </div>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="hidden md:flex flex-1 max-w-lg mx-8">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Search..."
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
                                <div className="hidden md:flex items-center space-x-2 text-sm text-secondary-600">
                                    <span>📞 Need help...</span>
                                    <span>+0123 456 789</span>
                                </div>
                                <div className="hidden md:flex items-center space-x-2 text-sm text-secondary-600">
                                    <span>🚚 Free delivery</span>
                                    <span>Free consultation</span>
                                </div>
                                
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

                {/* Main Navigation */}
                <nav className="bg-white border-t border-secondary-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-8">
                                <Link href="#" className="flex items-center space-x-2 text-secondary-700 hover:text-primary-500 transition-colors">
                                    <span>HOME</span>
                                </Link>
                                <div className="relative group">
                                    <Link href="#" className="flex items-center space-x-2 text-secondary-700 hover:text-primary-500 transition-colors">
                                        <span>SHOP</span>
                                        <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">NEW</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                </div>
                                <Link href="#" className="text-secondary-700 hover:text-primary-500 transition-colors">COLLECTION</Link>
                                <Link href="#" className="text-secondary-700 hover:text-primary-500 transition-colors">BLOGS</Link>
                                <div className="relative group">
                                    <Link href="#" className="flex items-center space-x-2 text-secondary-700 hover:text-primary-500 transition-colors">
                                        <span>PAGES</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="container mx-auto px-4 py-8">
                    {/* Banner with Image */}
                    <div className="relative bg-gradient-to-r from-secondary-100 to-primary-100 rounded-2xl overflow-hidden mb-12">
                        <div className="flex flex-col lg:flex-row items-center">
                            {/* Left Side - Content */}
                            <div className="lg:w-1/2 p-8 lg:p-12">
                                <div className="text-primary-500 text-sm font-medium mb-4">
                                    ✨ Unique Handmade Designs - up to 20% off!
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-k2d-extrabold text-secondary-800 mb-6 leading-tight">
                                    Handmade Resin Art —<br />
                                    <span className="text-secondary-600 font-k2d-semibold">Crafted With Love</span>
                                </h1>
                                <p className="text-lg text-secondary-600 mb-6">
                                    Unique Keychains, Trays, Photo Frames & Jewelry by Independent Resin Artists.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="btn btn-primary btn-lg">
                                        Shop Resin Collections
                                    </button>
                                    <button className="btn btn-outline btn-lg">
                                        Become a Seller
                                    </button>
                                </div>
                            </div>
                            
                            {/* Right Side - Image */}
                            <div className="lg:w-1/2 relative">
                                <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 rounded-full w-80 h-80 mx-auto flex items-center justify-center overflow-hidden">
                                    <div className="text-6xl">🔮</div>
                                </div>
                                {/* Decorative Resin Elements */}
                                <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-400 rounded-lg opacity-60 transform rotate-12"></div>
                                <div className="absolute bottom-12 right-12 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full opacity-70"></div>
                                <div className="absolute top-20 right-4 w-6 h-6 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full opacity-50"></div>
                            </div>
                        </div>
                        
                        {/* Carousel Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                        </div>
                    </div>

                    {/* Resin Product Categories */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {categories.length > 0 ? categories.slice(0, 4).map((category, index) => {
                                // Fallback gradient colors and icons
                                const gradientColors = [
                                    'from-pink-200 to-pink-300',
                                    'from-yellow-200 to-yellow-300', 
                                    'from-purple-200 to-purple-300',
                                    'from-green-200 to-green-300'
                                ];
                                const fallbackIcons = ['🗝️', '🍽️', '🖼️', '💎'];
                                
                                const gradientClass = category.gradient_from && category.gradient_to 
                                    ? `from-[${category.gradient_from}] to-[${category.gradient_to}]`
                                    : gradientColors[index % gradientColors.length];
                                
                                return (
                                    <Link
                                        key={category.id}
                                        href={route('collection.listing', category.slug)}
                                        className="card group cursor-pointer hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative overflow-hidden">
                                            {category.image_url ? (
                                                <div className="h-48 relative">
                                                    <img 
                                                        src={category.image_url} 
                                                        alt={category.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                </div>
                                            ) : (
                                                <div className={`h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                                                    <span className="text-4xl">
                                                        {category.icon || fallbackIcons[index % fallbackIcons.length]}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 left-4">
                                                <div className="bg-primary-500 text-white px-3 py-1 rounded text-sm font-medium">
                                                    {category.name}
                                                </div>
                                                <div className="text-white text-xs mt-1">
                                                    {category.products_count || 0} Items
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-4">
                                                <div className="text-white text-xs">Explore Designs</div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            }) : (
                                // Fallback when no categories are available
                                <div className="col-span-full text-center py-12">
                                    <div className="text-gray-400 text-lg mb-2">No categories available</div>
                                    <div className="text-gray-500 text-sm">Categories will appear here once they are added by administrators.</div>
                                </div>
                            )}
                        </div>
                        
                        {/* View All Collections Button */}
                        <div className="text-center">
                            <Link href={route('collections')} className="btn btn-outline btn-lg">
                                View All Collections
                            </Link>
                        </div>
                    </div>

                    {/* New in trends section */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-k2d-bold text-secondary-800 mb-4">New in trends</h2>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {/* Product 1 */}
                            <div className="card group cursor-pointer relative">
                                <div className="absolute top-2 left-2 bg-secondary-800 text-white text-xs px-2 py-1 rounded z-10">
                                    Best Pick
                                </div>
                                <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center mb-4">
                                    <span className="text-4xl">🗝️</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="font-medium text-secondary-700 mb-2">Name Resin Keychain</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-500 font-bold">$12.99</span>
                                        <button className="text-primary-500 hover:text-primary-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Product 2 */}
                            <div className="card group cursor-pointer">
                                <div className="h-48 bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center mb-4">
                                    <span className="text-4xl">🍽️</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="font-medium text-secondary-700 mb-2">Floral Resin Tray</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-500 font-bold">$22.99</span>
                                        <button className="text-primary-500 hover:text-primary-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Product 3 */}
                            <div className="card group cursor-pointer relative">
                                <div className="absolute top-2 left-2 bg-secondary-800 text-white text-xs px-2 py-1 rounded z-10">
                                    Sale 15%
                                </div>
                                <div className="h-48 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center mb-4">
                                    <span className="text-4xl">💎</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="font-medium text-secondary-700 mb-2">Heart Pendant</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-500 font-bold">$18.99</span>
                                        <button className="text-primary-500 hover:text-primary-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Product 4 */}
                            <div className="card group cursor-pointer relative">
                                <div className="absolute top-2 left-2 bg-secondary-800 text-white text-xs px-2 py-1 rounded z-10">
                                    Sale 10%
                                </div>
                                <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center mb-4">
                                    <span className="text-4xl">🖼️</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="font-medium text-secondary-700 mb-2">Pressed Flower Photo Frame</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-500 font-bold">$28.99</span>
                                        <button className="text-primary-500 hover:text-primary-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Resin Artists Section */}
                    <section className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-k2d-bold text-secondary-800 mb-4">Meet the Artists</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Artist 1 */}
                            <div className="card group cursor-pointer">
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl text-white">👩‍🎨</span>
                                    </div>
                                    <h3 className="font-k2d-semibold text-secondary-800 mb-2">Sarah Chen</h3>
                                    <p className="text-sm text-secondary-600 mb-2">Specializes in: Keychains</p>
                                    <div className="flex justify-center">
                                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">150+ Reviews</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Artist 2 */}
                            <div className="card group cursor-pointer">
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl text-white">🧑‍🎨</span>
                                    </div>
                                    <h3 className="font-k2d-semibold text-secondary-800 mb-2">Marcus Rivera</h3>
                                    <p className="text-sm text-secondary-600 mb-2">Specializes in: Trays</p>
                                    <div className="flex justify-center">
                                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">200+ Reviews</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Artist 3 */}
                            <div className="card group cursor-pointer">
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl text-white">👩‍🎨</span>
                                    </div>
                                    <h3 className="font-k2d-semibold text-secondary-800 mb-2">Emma Johnson</h3>
                                    <p className="text-sm text-secondary-600 mb-2">Specializes in: Jewelry</p>
                                    <div className="flex justify-center">
                                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">300+ Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Custom Orders Banner */}
                    <section className="mb-12">
                        <div className="relative bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-8 text-center overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-k2d-bold text-secondary-800 mb-4">Looking for Something Custom?</h2>
                                <p className="text-secondary-600 mb-6">Request personalized resin designs made just for you.</p>
                                <button className="btn btn-primary btn-lg">
                                    Request Custom Order
                                </button>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-8 w-12 h-12 bg-gradient-to-br from-primary-300 to-primary-400 rounded-lg opacity-40 transform rotate-12"></div>
                            <div className="absolute bottom-6 left-8 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full opacity-50"></div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-secondary-700 text-white py-12 mt-12">
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
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Keychains</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Trays</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Photo Frames</Link></li>
                                    <li><Link href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Resin Jewelry</Link></li>
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
                                Made with 💚 using Laravel v{laravelVersion} (PHP v{phpVersion}) | Resin Marketplace © 2025
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
