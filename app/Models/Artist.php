<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'username',
        'country',
        'address',
        'profile_image',
        'bio',
        'specialization',
        'cover_image_url',
        'rating',
        'total_reviews',
        'total_sales',
        'is_featured',
        'is_active',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'rating' => 'decimal:2',
    ];

    /**
     * Get the products for this artist.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
