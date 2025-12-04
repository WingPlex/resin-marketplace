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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Resin Keychains, Resin Trays, etc.
            $table->string('slug')->unique(); // keychains, trays, frames, jewelry
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // Emoji or icon class
            $table->string('gradient_from')->nullable(); // CSS gradient start color
            $table->string('gradient_to')->nullable(); // CSS gradient end color
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
