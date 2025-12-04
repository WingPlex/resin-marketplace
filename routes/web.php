<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $categories = App\Models\Category::where('is_active', true)
        ->orderBy('sort_order')
        ->orderBy('name')
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => $categories,
    ]);
})->name('welcome');

Route::get('/collections', function () {
    $categories = App\Models\Category::where('is_active', true)
        ->withCount('products')
        ->orderBy('sort_order')
        ->orderBy('name')
        ->get();

    return Inertia::render('Collections', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => $categories,
    ]);
})->name('collections');

Route::get('/collections/{collection}', function ($collection) {
    // Find the category by slug/name
    $category = App\Models\Category::where('slug', $collection)
        ->orWhere('name', 'like', '%' . str_replace('-', ' ', $collection) . '%')
        ->first();
    
    if (!$category) {
        abort(404, 'Collection not found');
    }
    
    // Get products for this category with relationships
    $products = App\Models\Product::where('category_id', $category->id)
        ->where(function($query) {
            $query->where('status', 'active')
                  ->orWhere('status', 'Active');
        })
        ->with(['category', 'artist'])
        ->orderBy('created_at', 'desc')
        ->get();
    
    return Inertia::render('CollectionListing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'collection' => $collection,
        'category' => $category,
        'products' => $products,
    ]);
})->name('collection.listing');

// Product Detail Route
Route::get('/products/{id}', function ($id) {
    $product = App\Models\Product::where('id', $id)
        ->where(function($query) {
            $query->where('status', 'active')
                  ->orWhere('status', 'Active');
        })
        ->with(['category', 'artist'])
        ->firstOrFail();
    
    // Get related products from the same category
    $relatedProducts = App\Models\Product::where('category_id', $product->category_id)
        ->where('id', '!=', $product->id)
        ->where(function($query) {
            $query->where('status', 'active')
                  ->orWhere('status', 'Active');
        })
        ->with(['category', 'artist'])
        ->limit(4)
        ->get();
    
    return Inertia::render('ProductDetail', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'product' => $product,
        'relatedProducts' => $relatedProducts,
    ]);
})->name('product.detail');

// Admin Routes
Route::get('/super-user', [App\Http\Controllers\Admin\AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/super-user', [App\Http\Controllers\Admin\AuthController::class, 'login']);

Route::prefix('artist-panel')->name('admin.')->middleware('admin')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [App\Http\Controllers\Admin\AuthController::class, 'logout'])->name('logout');
    
    // Categories Management
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    
    // Products Management
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);
    
    // Artists Management
    Route::resource('artists', App\Http\Controllers\Admin\ArtistController::class);
    
    // Tags Management
    Route::resource('tags', App\Http\Controllers\Admin\TagController::class);
});

Route::get('/dashboard', function () {
    return Inertia::render(component: 'Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
