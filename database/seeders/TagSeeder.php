<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            // Existing tags
            ['name' => 'Handmade', 'color' => '#10B981', 'description' => 'Handcrafted with care'],
            ['name' => 'Custom', 'color' => '#F59E0B', 'description' => 'Customizable products'],
            ['name' => 'Gift', 'color' => '#EF4444', 'description' => 'Perfect for gifting'],
            ['name' => 'Popular', 'color' => '#8B5CF6', 'description' => 'Trending items'],
            ['name' => 'Limited Edition', 'color' => '#EC4899', 'description' => 'Limited availability'],
            ['name' => 'Eco-Friendly', 'color' => '#22C55E', 'description' => 'Environmentally conscious'],
            ['name' => 'Personalized', 'color' => '#3B82F6', 'description' => 'Can be personalized'],
            ['name' => 'Vintage Style', 'color' => '#A855F7', 'description' => 'Classic vintage look'],
            ['name' => 'Modern', 'color' => '#06B6D4', 'description' => 'Contemporary design'],
            ['name' => 'Artisan Made', 'color' => '#F97316', 'description' => 'Crafted by skilled artisans'],
            
            // Occasions
            ['name' => 'Wedding', 'color' => '#FF6B9D', 'description' => 'Perfect for wedding ceremonies and celebrations'],
            ['name' => 'Birthday', 'color' => '#FFD93D', 'description' => 'Great for birthday gifts and parties'],
            ['name' => 'Festivals', 'color' => '#6BCF7F', 'description' => 'Ideal for festival decorations and gifts'],
            ['name' => 'Romantic', 'color' => '#E91E63', 'description' => 'Perfect for romantic occasions and gifts'],
            
            // Display Types
            ['name' => 'Wall', 'color' => '#8E44AD', 'description' => 'Wall-mounted display items'],
            ['name' => 'Desk', 'color' => '#3498DB', 'description' => 'Desktop and tabletop items'],
            ['name' => 'Geode', 'color' => '#95A5A6', 'description' => 'Geode-inspired designs'],
            ['name' => 'Theme', 'color' => '#FF6B35', 'description' => 'Themed decorative items'],
            
            // Customization Features
            ['name' => 'Name', 'color' => '#2ECC71', 'description' => 'Personalized with names'],
            ['name' => 'Messages', 'color' => '#F39C12', 'description' => 'Custom messages and text'],
            ['name' => 'Photo', 'color' => '#E74C3C', 'description' => 'Photo embedding and preservation'],
            ['name' => 'Made-to-Order', 'color' => '#9B59B6', 'description' => 'Custom made-to-order items'],
            ['name' => 'Glitter', 'color' => '#F1C40F', 'description' => 'Glitter and sparkle effects'],
            ['name' => 'Pressed-Flower', 'color' => '#1ABC9C', 'description' => 'Real pressed flowers preserved in resin'],
            ['name' => 'Shapes', 'color' => '#E67E22', 'description' => 'Various shapes and forms'],
            ['name' => 'Themes', 'color' => '#34495E', 'description' => 'Themed designs and concepts'],
            
            // Jewelry Types
            ['name' => 'Earrings', 'color' => '#FF4081', 'description' => 'Earring jewelry pieces'],
            ['name' => 'Pendants', 'color' => '#7C4DFF', 'description' => 'Pendant necklaces'],
            ['name' => 'Bracelets', 'color' => '#00BCD4', 'description' => 'Bracelet jewelry'],
            ['name' => 'Bangles', 'color' => '#4CAF50', 'description' => 'Bangle bracelets'],
            ['name' => 'Rings', 'color' => '#FFC107', 'description' => 'Ring jewelry'],
            ['name' => 'Brooches', 'color' => '#9C27B0', 'description' => 'Decorative brooches and pins'],
            ['name' => 'Hair-Accessories', 'color' => '#FF9800', 'description' => 'Hair clips, bands, and accessories'],
            ['name' => 'Sets', 'color' => '#607D8B', 'description' => 'Jewelry sets and collections'],
            
            // Decor Styles
            ['name' => 'Decor', 'color' => '#8BC34A', 'description' => 'Decorative items for home and office'],
            ['name' => 'Serving', 'color' => '#CDDC39', 'description' => 'Serving trays and functional items'],
            ['name' => 'Ocean', 'color' => '#03A9F4', 'description' => 'Ocean and sea-themed designs'],
        ];

        foreach ($tags as $tagData) {
            $tag = Tag::firstOrCreate(
                ['name' => $tagData['name']], 
                [
                    'slug' => \Illuminate\Support\Str::slug($tagData['name']),
                    'color' => $tagData['color'],
                    'description' => $tagData['description'],
                    'usage_count' => 0,
                    'is_active' => true,
                ]
            );
            
            if ($tag->wasRecentlyCreated) {
                $this->command->info("Created tag: {$tagData['name']}");
            } else {
                $this->command->info("Tag already exists: {$tagData['name']}");
            }
        }
        
        $this->command->info('All tags have been processed successfully!');
    }
}
