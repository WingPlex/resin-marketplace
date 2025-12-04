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
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('display_name');
            $table->text('bio')->nullable();
            $table->string('specialization')->nullable(); // Keychains, Jewelry, Trays, etc.
            $table->string('avatar_url')->nullable();
            $table->string('cover_image_url')->nullable();
            $table->decimal('rating', 3, 2)->default(0); // Average rating
            $table->integer('total_reviews')->default(0);
            $table->integer('total_sales')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->json('social_links')->nullable(); // Instagram, Facebook, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};
