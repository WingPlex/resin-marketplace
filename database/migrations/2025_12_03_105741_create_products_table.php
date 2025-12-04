<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable(); // For sale items
            $table->string('sku')->unique()->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('manage_stock')->default(true);
            $table->boolean('in_stock')->default(true);
            $table->enum('stock_status', ['in_stock', 'out_of_stock', 'on_backorder'])->default('in_stock');
            
            // Product specifications for filtering
            $table->json('colors')->nullable(); // ["Pink", "Blue", "Purple"]
            $table->string('material')->nullable(); // Epoxy Resin, UV Resin, etc.
            $table->enum('size', ['Small', 'Medium', 'Large', 'Extra Large'])->nullable();
            $table->json('dimensions')->nullable(); // {"length": 5, "width": 3, "height": 1}
            $table->decimal('weight', 8, 2)->nullable(); // in grams
            
            // SEO and marketing
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable(); // ["handmade", "custom", "personalized"]
            
            // Product status and badges
            $table->enum('status', ['draft', 'active', 'inactive', 'archived'])->default('draft');
            $table->json('badges')->nullable(); // ["Best Seller", "Sale", "New", "Featured"]
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_custom_order')->default(false);
            
            // Analytics and performance
            $table->decimal('rating', 3, 2)->default(0); // Average rating
            $table->integer('total_reviews')->default(0);
            $table->integer('total_sales')->default(0);
            $table->integer('view_count')->default(0);
            
            // Timestamps and soft delete
            $table->timestamp('featured_until')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index(['category_id', 'status']);
            $table->index(['artist_id', 'status']);
            $table->index(['is_featured', 'status']);
            $table->index('rating');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
