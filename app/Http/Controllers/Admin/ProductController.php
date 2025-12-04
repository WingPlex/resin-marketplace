<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'artist', 'tags'])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::orderBy('name')->get(['id', 'name']);
        $artists = Artist::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'artists' => $artists
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();
        
        $artists = Artist::where('is_active', true)
            ->orderBy('name')
            ->get();

        $tags = \App\Models\Tag::active()
            ->orderBy('name')
            ->get(['id', 'name', 'color', 'description']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'artists' => $artists,
            'availableTags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'artist_id' => 'required|exists:artists,id',
            'featured_image' => 'nullable|url|max:500',
            'gallery_images' => 'nullable|json',
            'materials' => 'nullable|json',
            'dimensions' => 'nullable|json',
            'colors_available' => 'nullable|json',
            'stock_quantity' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|max:100|unique:products,sku',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'weight' => 'nullable|numeric|min:0',
            'is_customizable' => 'boolean',
            'customization_options' => 'nullable|json',
            'status' => 'required|in:draft,active,inactive,out_of_stock',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'artist_id' => $request->artist_id,
            'featured_image' => $request->featured_image,
            'gallery_images' => $request->gallery_images ? json_decode($request->gallery_images) : null,
            'materials' => $request->materials ? json_decode($request->materials) : null,
            'dimensions' => $request->dimensions ? json_decode($request->dimensions) : null,
            'colors_available' => $request->colors_available ? json_decode($request->colors_available) : null,
            'stock_quantity' => $request->stock_quantity ?? 0,
            'sku' => $request->sku,
            'weight' => $request->weight,
            'is_customizable' => $request->is_customizable ?? false,
            'customization_options' => $request->customization_options ? json_decode($request->customization_options) : null,
            'status' => $request->status,
        ]);

        // Sync tag relationships
        if ($request->has('tags') && is_array($request->tags)) {
            $product->tags()->sync($request->tags);
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'artist', 'images', 'reviews']);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();
        
        $artists = Artist::where('is_active', true)
            ->orderBy('name')
            ->get();

        $tags = \App\Models\Tag::active()
            ->orderBy('name')
            ->get(['id', 'name', 'color', 'description']);

        // Load existing relationships including tags
        $product->load(['category', 'artist', 'tags:id,name,color,description']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'artists' => $artists,
            'availableTags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'artist_id' => 'required|exists:artists,id',
            'featured_image' => 'nullable|url|max:500',
            'gallery_images' => 'nullable|json',
            'materials' => 'nullable|json',
            'dimensions' => 'nullable|json',
            'colors_available' => 'nullable|json',
            'stock_quantity' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|max:100|unique:products,sku,' . $product->id,
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'weight' => 'nullable|numeric|min:0',
            'is_customizable' => 'boolean',
            'customization_options' => 'nullable|json',
            'status' => 'required|in:draft,active,inactive,out_of_stock',
        ]);

        $product->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'artist_id' => $request->artist_id,
            'featured_image' => $request->featured_image,
            'gallery_images' => $request->gallery_images ? json_decode($request->gallery_images) : null,
            'materials' => $request->materials ? json_decode($request->materials) : null,
            'dimensions' => $request->dimensions ? json_decode($request->dimensions) : null,
            'colors_available' => $request->colors_available ? json_decode($request->colors_available) : null,
            'stock_quantity' => $request->stock_quantity ?? 0,
            'sku' => $request->sku,
            'weight' => $request->weight,
            'is_customizable' => $request->is_customizable ?? false,
            'customization_options' => $request->customization_options ? json_decode($request->customization_options) : null,
            'status' => $request->status,
        ]);

        // Sync tag relationships
        if ($request->has('tags') && is_array($request->tags)) {
            $product->tags()->sync($request->tags);
        } else {
            $product->tags()->sync([]);
        }

        // Sync tag relationships
        if ($request->has('tags') && is_array($request->tags)) {
            $product->tags()->sync($request->tags);
        } else {
            $product->tags()->sync([]);
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
