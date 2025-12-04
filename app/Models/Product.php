<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'artist_id',
        'name',
        'featured_image',
        'slug',
        'description',
        'short_description',
        'price',
        'original_price',
        'sku',
        'stock_quantity',
        'manage_stock',
        'in_stock',
        'stock_status',
        'colors',
        'material',
        'size',
        'dimensions',
        'weight',
        'meta_title',
        'meta_description',
        'tags',
        'status',
        'badges',
        'is_featured',
        'is_custom_order',
        'rating',
        'total_reviews',
        'total_sales',
        'view_count',
        'featured_until',
        // New resin-specific fields
        'finish_type',
        'theme',
        'processing_time_days',
        'care_instructions',
        'ideal_for',
        'inclusions',
        'safety_notes',
        // SEO fields (meta_title and meta_description already exist)
        'seo_keywords',
    ];

    protected $casts = [
        'colors' => 'array',
        'dimensions' => 'array',
        'tags' => 'array',
        'badges' => 'array',
        'is_featured' => 'boolean',
        'is_custom_order' => 'boolean',
        'manage_stock' => 'boolean',
        'in_stock' => 'boolean',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'rating' => 'decimal:2',
        'featured_until' => 'datetime',
        // New resin-specific field casts
        'theme' => 'array',
        'ideal_for' => 'array',
        'inclusions' => 'array',
    ];

    /**
     * Get the artist that owns this product.
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get the category that owns this product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the product images for the product.
     */
    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Get the tags for this product.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }
}
