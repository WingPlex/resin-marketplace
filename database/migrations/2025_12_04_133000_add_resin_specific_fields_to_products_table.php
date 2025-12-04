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
        Schema::table('products', function (Blueprint $table) {
            // 2.1 Finish Type - Glossy, Matte, Clear, Opaque, Metallic, Pearl/Shimmer
            $table->enum('finish_type', [
                'glossy', 
                'matte', 
                'clear', 
                'opaque', 
                'metallic', 
                'pearl', 
                'shimmer'
            ])->nullable()->after('weight');
            
            // 2.2 Theme/Style - JSON array for multiple themes
            $table->json('theme')->nullable()->after('finish_type');
            
            // 2.4 Processing Time (Made-to-order time) in days
            $table->integer('processing_time_days')->nullable()->after('theme');
            
            // 2.5 Care Instructions - Special handling instructions
            $table->text('care_instructions')->nullable()->after('processing_time_days');
            
            // 2.6 Ideal For (Gift purposes) - JSON array
            $table->json('ideal_for')->nullable()->after('care_instructions');
            
            // 2.7 Included Items/Accessories - JSON array
            $table->json('inclusions')->nullable()->after('ideal_for');
            
            // 2.9 Safety Notes - Food safe, waterproof, heat-resistant
            $table->text('safety_notes')->nullable()->after('inclusions');
            
            // Index for filtering by finish type and processing time
            $table->index('finish_type');
            $table->index('processing_time_days');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['finish_type']);
            $table->dropIndex(['processing_time_days']);
            
            $table->dropColumn([
                'finish_type',
                'theme',
                'processing_time_days',
                'care_instructions',
                'ideal_for',
                'inclusions',
                'safety_notes'
            ]);
        });
    }
};