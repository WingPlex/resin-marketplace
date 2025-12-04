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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            
            // Product details at time of purchase (in case product changes later)
            $table->string('product_name');
            $table->text('product_description')->nullable();
            $table->string('product_sku')->nullable();
            $table->json('product_options')->nullable(); // Colors, size, customization
            
            // Pricing and quantity
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            
            // Custom order details
            $table->text('customization_details')->nullable();
            $table->json('custom_options')->nullable();
            
            $table->timestamps();
            
            $table->index('order_id');
            $table->index('product_id');
            $table->index('artist_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
