<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collections = [
            ['name' => 'Resin Keychains', 'slug' => 'resin-keychains'],
            ['name' => 'Resin Coasters', 'slug' => 'resin-coasters'],
            ['name' => 'Resin Photo Frames', 'slug' => 'resin-photo-frames'],
            ['name' => 'Resin Home Decor', 'slug' => 'resin-home-decor'],
            ['name' => 'Resin Ornaments', 'slug' => 'resin-ornaments'],
            ['name' => 'Resin Stationery', 'slug' => 'resin-stationery'],
            ['name' => 'Resin Clocks', 'slug' => 'resin-clocks'],
            ['name' => 'Preserved Flower Resin', 'slug' => 'preserved-flower-resin'],
            ['name' => 'Seasonal Resin', 'slug' => 'seasonal-resin']
        ];

        foreach ($collections as $collection) {
            Category::create([
                'name' => $collection['name'],
                'slug' => $collection['slug'],
                'description' => 'Beautiful ' . strtolower($collection['name']) . ' crafted with care',
                'is_active' => true,
                'sort_order' => 0
            ]);

            $this->command->info('Created category: ' . $collection['name']);
        }

        $this->command->info('All categories created successfully!');
    }
}
