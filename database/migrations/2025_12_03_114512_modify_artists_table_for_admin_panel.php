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
        Schema::table('artists', function (Blueprint $table) {
            // Remove the user_id constraint since we're making artists standalone
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            
            // Replace display_name with name
            $table->dropColumn('display_name');
            $table->string('name');
            
            // Add contact information
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('username')->unique();
            $table->string('country');
            $table->text('address')->nullable();
            
            // Rename avatar_url to profile_image for consistency
            $table->dropColumn('avatar_url');
            $table->string('profile_image')->nullable();
            
            // Keep existing columns: bio, specialization, cover_image_url, rating, 
            // total_reviews, total_sales, is_featured, is_active, social_links
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('artists', function (Blueprint $table) {
            // Reverse the changes
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('display_name');
            $table->dropColumn(['name', 'email', 'phone', 'username', 'country', 'address', 'profile_image']);
            $table->string('avatar_url')->nullable();
        });
    }
};
