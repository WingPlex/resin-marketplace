import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function CollectionListing({ auth, collection = 'keychains', category, products: dbProducts = [] }) {
    const [selectedFilters, setSelectedFilters] = useState({
        priceRange: [0, 100],
        inStock: true,
        outOfStock: false,
        colors: [],
        materials: [],
        sizes: []
    });
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');

    // Use database category data if available, otherwise fallback to defaults
    const defaultCollectionConfig = {
        keychains: {
            title: 'Resin Keychains',
            description: 'Personalized keychains with names, letters, and custom designs',
            icon: '🗝️',
            gradient: 'from-pink-200 to-pink-300'
        },
        trays: {
            title: 'Resin Trays',
            description: 'Elegant serving trays with floral designs and marble effects',
            icon: '🍽️',
            gradient: 'from-yellow-200 to-yellow-300'
        },
        frames: {
            title: 'Photo Frames',
            description: 'Memory frames with pressed flowers and personalized touches',
            icon: '🖼️',
            gradient: 'from-purple-200 to-purple-300'
        },
        jewelry: {
            title: 'Resin Jewelry',
            description: 'Handcrafted necklaces, earrings, and bracelets with unique designs',
            icon: '💎',
            gradient: 'from-green-200 to-green-300'
        }
    };

    const currentCollection = category ? {
        title: category.name,
        description: category.description || defaultCollectionConfig[collection]?.description || 'Beautiful handcrafted resin products',
        icon: defaultCollectionConfig[collection]?.icon || '✨',
        gradient: category.image_url ? 'from-primary-200 to-primary-300' : (defaultCollectionConfig[collection]?.gradient || 'from-primary-200 to-primary-300'),
        count: dbProducts.length
    } : (defaultCollectionConfig[collection] || defaultCollectionConfig.keychains);

    // Transform database products to match component structure
    const currentProducts = dbProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        originalPrice: product.compare_at_price ? parseFloat(product.compare_at_price) : null,
        image: product.featured_image || currentCollection.icon,
        inStock: product.stock_quantity > 0 && product.status === 'active',
        rating: 4.5, // Default rating since we don't have reviews yet
        reviews: Math.floor(Math.random() * 200) + 10, // Random reviews count for now
        colors: product.color_options ? (Array.isArray(product.color_options) ? product.color_options : [product.color_options]) : ['Mixed'],
        size: product.dimensions || 'Standard',
        material: product.material || 'Resin',
        sku: product.sku,
        artist: product.artist,
        category: product.category
    }));

    // Filter options
    const filterOptions = {
        colors: ['Pink', 'Blue', 'Purple', 'Yellow', 'Green', 'Black', 'White', 'Red', 'Gold', 'Silver', 'Clear', 'Turquoise'],
        materials: ['Epoxy Resin', 'UV Resin', 'Silicone Mold', 'Mixed Media'],
        sizes: ['Small', 'Medium', 'Large', 'Extra Large']
    };

    // Filter functions
    const filteredProducts = currentProducts.filter(product => {
        // Price range filter
        if (product.price < selectedFilters.priceRange[0] || product.price > selectedFilters.priceRange[1]) {
            return false;
        }
        
        // Stock filter
        if (selectedFilters.inStock && selectedFilters.outOfStock) {
            // Show all if both selected
        } else if (selectedFilters.inStock && !product.inStock) {
            return false;
        } else if (selectedFilters.outOfStock && product.inStock) {
            return false;
        }
        
        // Color filter
        if (selectedFilters.colors.length > 0) {
            const hasMatchingColor = selectedFilters.colors.some(color => 
                product.colors.includes(color)
            );
            if (!hasMatchingColor) return false;
        }
        
        // Material filter
        if (selectedFilters.materials.length > 0) {
            if (!selectedFilters.materials.includes(product.material)) return false;
        }
        
        // Size filter
        if (selectedFilters.sizes.length > 0) {
            if (!selectedFilters.sizes.includes(product.size)) return false;
        }
        
        return true;
    });

    const toggleFilter = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }));
    };

    const updatePriceRange = (range) => {
        setSelectedFilters(prev => ({
            ...prev,
            priceRange: range
        }));
    };

    const toggleStockFilter = (type) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            priceRange: [0, 100],
            inStock: true,
            outOfStock: false,
            colors: [],
            materials: [],
            sizes: []
        });
    };

    return (
        <>
            <Head title={`${currentCollection.title} - Resin Marketplace`} />
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
                                        placeholder="Search products..."
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
                            <Link href={route('collections')} className="text-secondary-500 hover:text-primary-500">Collections</Link>
                            <span className="text-secondary-400">/</span>
                            <span className="text-secondary-800 font-medium">{currentCollection.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Collection Header */}
                <div className="container mx-auto px-4 py-8">
                    <div className={`bg-gradient-to-r ${currentCollection.gradient} rounded-2xl p-8 mb-8`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-k2d-extrabold text-secondary-800 mb-4 flex items-center gap-4">
                                    <span className="text-5xl">{currentCollection.icon}</span>
                                    {currentCollection.title}
                                </h1>
                                <p className="text-lg text-secondary-700 mb-4">
                                    {currentCollection.description}
                                </p>
                                <div className="text-sm text-secondary-600">
                                    Showing {filteredProducts.length} of {currentProducts.length} products
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        {/* Filters Sidebar */}
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-custom-sm p-6 sticky top-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-k2d-bold text-secondary-800">Filters</h3>
                                    <button 
                                        onClick={clearAllFilters}
                                        className="text-sm text-primary-500 hover:text-primary-600"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="font-k2d-semibold text-secondary-700 mb-3">Price Range</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={selectedFilters.priceRange[0]}
                                                onChange={(e) => updatePriceRange([parseInt(e.target.value) || 0, selectedFilters.priceRange[1]])}
                                                className="w-20 px-2 py-1 border border-secondary-300 rounded text-sm"
                                            />
                                            <span className="text-secondary-500">to</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={selectedFilters.priceRange[1]}
                                                onChange={(e) => updatePriceRange([selectedFilters.priceRange[0], parseInt(e.target.value) || 100])}
                                                className="w-20 px-2 py-1 border border-secondary-300 rounded text-sm"
                                            />
                                        </div>
                                        <div className="text-xs text-secondary-500">
                                            ${selectedFilters.priceRange[0]} - ${selectedFilters.priceRange[1]}
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="mb-6">
                                    <h4 className="font-k2d-semibold text-secondary-700 mb-3">Availability</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.inStock}
                                                onChange={() => toggleStockFilter('inStock')}
                                                className="rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm">In Stock ({currentProducts.filter(p => p.inStock).length})</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.outOfStock}
                                                onChange={() => toggleStockFilter('outOfStock')}
                                                className="rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm">Out of Stock ({currentProducts.filter(p => !p.inStock).length})</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className="mb-6">
                                    <h4 className="font-k2d-semibold text-secondary-700 mb-3">Colors</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => toggleFilter('colors', color)}
                                                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                                                    selectedFilters.colors.includes(color)
                                                        ? 'bg-primary-500 text-white border-primary-500'
                                                        : 'bg-white text-secondary-600 border-secondary-300 hover:border-primary-500'
                                                }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Materials */}
                                <div className="mb-6">
                                    <h4 className="font-k2d-semibold text-secondary-700 mb-3">Materials</h4>
                                    <div className="space-y-2">
                                        {filterOptions.materials.map(material => (
                                            <label key={material} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters.materials.includes(material)}
                                                    onChange={() => toggleFilter('materials', material)}
                                                    className="rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                                                />
                                                <span className="ml-2 text-sm">{material}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="mb-6">
                                    <h4 className="font-k2d-semibold text-secondary-700 mb-3">Sizes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => toggleFilter('sizes', size)}
                                                className={`px-3 py-1 rounded border transition-all ${
                                                    selectedFilters.sizes.includes(size)
                                                        ? 'bg-primary-500 text-white border-primary-500'
                                                        : 'bg-white text-secondary-600 border-secondary-300 hover:border-primary-500'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Area */}
                        <div className="flex-1">
                            {/* Sort & View Controls */}
                            <div className="bg-white rounded-lg shadow-custom-sm p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-secondary-600">
                                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        {/* Sort Dropdown */}
                                        <select 
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="oldest">Oldest First</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="popular">Most Popular</option>
                                        </select>

                                        {/* View Mode Toggle */}
                                        <div className="flex bg-secondary-100 rounded-lg p-1">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`p-2 rounded transition-all ${
                                                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`p-2 rounded transition-all ${
                                                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid/List */}
                            {filteredProducts.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-custom-sm p-12 text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-k2d-semibold text-secondary-800 mb-2">No products found</h3>
                                    <p className="text-secondary-600 mb-4">Try adjusting your filters to see more results</p>
                                    <button 
                                        onClick={clearAllFilters}
                                        className="btn btn-primary"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredProducts.map((product) => (
                                                <Link key={product.id} href={`/products/${product.id}`} className="card group cursor-pointer relative block">
                                                    {!product.inStock && (
                                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                                                            Out of Stock
                                                        </div>
                                                    )}
                                                    {product.originalPrice && (
                                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                                                            Sale
                                                        </div>
                                                    )}
                                                    
                                                    {/* Product Image */}
                                                    <div className={`h-48 bg-gradient-to-br ${currentCollection.gradient} flex items-center justify-center mb-4 relative overflow-hidden ${!product.inStock ? 'opacity-60' : ''}`}>
                                                        {product.image && product.image.startsWith('http') ? (
                                                            <img 
                                                                src={product.image} 
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : null}
                                                        <span className="text-4xl" style={{ display: product.image && product.image.startsWith('http') ? 'none' : 'block' }}>{product.image}</span>
                                                        
                                                        {/* Hover Overlay */}
                                                        {product.inStock && (
                                                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                                <button className="bg-white text-secondary-800 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                                    Quick View
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Product Info */}
                                                    <div className="px-4 pb-4">
                                                        <h3 className="font-k2d-semibold text-secondary-800 mb-2 group-hover:text-primary-500 transition-colors">
                                                            {product.name}
                                                        </h3>
                                                        
                                                        {/* Colors & Size */}
                                                        <div className="text-xs text-secondary-500 mb-2">
                                                            {product.colors.join(', ')} • {product.size}
                                                        </div>
                                                        
                                                        {/* Rating */}
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-secondary-500">({product.reviews})</span>
                                                        </div>
                                                        
                                                        {/* Price & Actions */}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-primary-500 font-k2d-bold text-lg">${product.price}</span>
                                                                {product.originalPrice && (
                                                                    <span className="text-secondary-400 line-through text-sm">${product.originalPrice}</span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button className="text-secondary-400 hover:text-primary-500 transition-colors">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                    </svg>
                                                                </button>
                                                                <button 
                                                                    className={`text-primary-500 hover:text-primary-600 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                    disabled={!product.inStock}
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        /* List View */
                                        <div className="space-y-4">
                                            {filteredProducts.map((product) => (
                                                <Link key={product.id} href={`/products/${product.id}`} className="card group cursor-pointer block">
                                                    <div className="flex items-center p-4">
                                                        {/* Product Image */}
                                                        <div className={`w-24 h-24 bg-gradient-to-br ${currentCollection.gradient} rounded-lg flex items-center justify-center mr-6 flex-shrink-0 overflow-hidden ${!product.inStock ? 'opacity-60' : ''}`}>
                                                            {product.image && product.image.startsWith('http') ? (
                                                                <img 
                                                                    src={product.image} 
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.nextSibling.style.display = 'block';
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <span className="text-2xl" style={{ display: product.image && product.image.startsWith('http') ? 'none' : 'block' }}>{product.image}</span>
                                                        </div>
                                                        
                                                        {/* Product Info */}
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h3 className="font-k2d-semibold text-secondary-800 mb-1 group-hover:text-primary-500 transition-colors">
                                                                        {product.name}
                                                                    </h3>
                                                                    <div className="text-sm text-secondary-500 mb-2">
                                                                        {product.colors.join(', ')} • {product.size} • {product.material}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <div className="flex items-center">
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <svg
                                                                                    key={i}
                                                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 20 20"
                                                                                >
                                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                </svg>
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-sm text-secondary-500">({product.reviews} reviews)</span>
                                                                        {!product.inStock && (
                                                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                                                                                Out of Stock
                                                                            </span>
                                                                        )}
                                                                        {product.originalPrice && (
                                                                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                                                                                Sale
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex items-center gap-4">
                                                                    <div className="text-right">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-primary-500 font-k2d-bold text-xl">${product.price}</span>
                                                                            {product.originalPrice && (
                                                                                <span className="text-secondary-400 line-through">${product.originalPrice}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <button className="text-secondary-400 hover:text-primary-500 transition-colors">
                                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button 
                                                                            className={`btn btn-primary btn-sm ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                            disabled={!product.inStock}
                                                                        >
                                                                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    <div className="flex justify-center items-center mt-12 gap-2">
                                        <button className="px-3 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
                                            Previous
                                        </button>
                                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
                                        <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">2</button>
                                        <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">3</button>
                                        <button className="px-3 py-2 border border-secondary-300 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors">
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
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