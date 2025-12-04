import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductDetail({ canLogin, canRegister, product, relatedProducts = [] }) {
    const [selectedImage, setSelectedImage] = useState(product.featured_image || '');
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    
    // Parse JSON fields safely
    const colors = product.available_colors ? JSON.parse(product.available_colors) : [];
    const materials = product.materials ? JSON.parse(product.materials) : [];
    const dimensions = product.dimensions ? JSON.parse(product.dimensions) : {};
    
    // Get all product images including featured image
    const productImages = [
        ...(product.featured_image ? [product.featured_image] : [])
    ].filter(Boolean);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const handleAddToCart = () => {
        // TODO: Implement cart functionality
        alert('Add to cart functionality to be implemented');
    };

    return (
        <>
            <Head title={`${product.name} - ResinCraft`} />
            
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl">✨</span>
                                <span className="ml-2 text-xl font-k2d-bold text-gray-900">RESINCRAFT</span>
                            </Link>
                        </div>
                        
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Home
                            </Link>
                            <Link href="/collections" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Collections
                            </Link>
                            {canLogin && (
                                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Login
                                </Link>
                            )}
                            <button className="relative p-2">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                            <button className="relative p-2">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-gray-700">
                                    Home
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <Link href="/collections" className="text-gray-500 hover:text-gray-700">
                                    Collections
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <Link href={`/collections/${product.category?.slug || 'products'}`} className="text-gray-500 hover:text-gray-700">
                                    {product.category?.name || 'Products'}
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-900 font-medium">
                                    {product.name}
                                </span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            {selectedImage ? (
                                <img 
                                    src={selectedImage} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        {/* Thumbnail Images */}
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImage === image 
                                                ? 'border-primary-500' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img 
                                            src={image} 
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-k2d-bold text-gray-900">{product.name}</h1>
                            <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">(47)</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    SKU: {product.sku || 'N/A'}
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-k2d-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                                {product.compare_price && product.compare_price > product.price && (
                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                        {formatPrice(product.compare_price)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Color: {selectedColor || colors[0]}</h3>
                                <div className="flex space-x-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-colors ${
                                                selectedColor === color || (!selectedColor && color === colors[0])
                                                    ? 'border-gray-900' 
                                                    : 'border-gray-300'
                                            }`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                                <div className="flex border border-gray-300 rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock_quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-16 px-3 py-2 text-center border-l border-r border-gray-300 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                        className="px-3 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {product.stock_quantity} in stock
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                ADD TO CART
                            </button>
                            <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="border-t pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Delivery:</span>
                                    <span className="text-sm font-medium">Estimated delivery Dec 5-7 days</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Returns:</span>
                                    <span className="text-sm font-medium">Within 30 days of purchase</span>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="mx-auto w-8 h-8 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-medium">Order tracking</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-auto w-8 h-8 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-medium">90 days return</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-auto w-8 h-8 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-medium">Money guarantee</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Artist Info */}
                        {product.artist && (
                            <div className="border-t pt-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Made by</h3>
                                <div className="flex items-center space-x-3">
                                    {product.artist.profile_image ? (
                                        <img 
                                            src={product.artist.profile_image} 
                                            alt={product.artist.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                            <span className="text-primary-600 font-medium">
                                                {product.artist.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{product.artist.name}</p>
                                        <p className="text-xs text-gray-500">@{product.artist.username}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mt-12">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                Description
                            </button>
                            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                Product Specifications
                            </button>
                            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                                Reviews
                            </button>
                        </nav>
                    </div>
                    <div className="py-8">
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {product.description || 'No description available for this product.'}
                            </p>
                            
                            {materials.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-medium text-gray-900 mb-2">Materials:</h4>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {materials.map((material, index) => (
                                            <li key={index}>{material}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {Object.keys(dimensions).length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-medium text-gray-900 mb-2">Dimensions:</h4>
                                    <div className="text-gray-700">
                                        {Object.entries(dimensions).map(([key, value]) => (
                                            <span key={key} className="inline-block mr-4">
                                                <span className="font-medium">{key}:</span> {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-k2d-bold text-gray-900 mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.id}`}
                                    className="group"
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                        {relatedProduct.featured_image ? (
                                            <img 
                                                src={relatedProduct.featured_image} 
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                                            {relatedProduct.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {relatedProduct.artist?.name}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                            {formatPrice(relatedProduct.price)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}