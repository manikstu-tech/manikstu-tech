<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Seeds the products listed in the March product catalogue.
 *
 * Only fields explicitly named in the catalogue (product name + packaging
 * size) are pre-filled. Everything else is left empty so the admin can
 * complete descriptions, prices, images, etc. from the admin panel.
 */
class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Categories — kept in sync with the ones the website filter uses.
        $categoryDefs = [
            'Health',     // syrups, tablets, soaps, herbal supplements
            'Nutrition',  // mineral blocks & feed
        ];
        $categories = [];
        foreach ($categoryDefs as $i => $name) {
            $categories[$name] = Category::updateOrCreate(
                ['slug' => Str::slug($name), 'type' => 'product'],
                ['name' => $name, 'order' => $i + 1, 'is_active' => true]
            );
        }

        // Wipe the existing products (and their translations/orders) so this
        // seeder is the definitive source per the March catalogue.
        DB::table('product_translations')->delete();
        DB::table('products')->delete();

        $specs = fn (string $packaging) => [
            ['label' => 'Form', 'value' => ''],
            ['label' => 'Packaging Type', 'value' => ''],
            ['label' => 'Grade Standard', 'value' => ''],
            ['label' => 'Shelf Life', 'value' => ''],
            ['label' => 'Type Of Supplement', 'value' => ''],
            ['label' => 'Packaging', 'value' => $packaging],
            ['label' => 'Country of Origin', 'value' => 'Made in India'],
        ];

        // From page 1 of "product catalogue March.pdf".
        $products = [
            ['name' => 'Poshak Tatwa',              'size' => '300 ml',      'category' => 'Health'],
            ['name' => 'Livtherapy Syrup',         'size' => '200 ml',      'category' => 'Health'],
            ['name' => 'Pachak Tatwa',              'size' => '200 ml',      'category' => 'Health'],
            ['name' => 'Kurmi Nashak',              'size' => '10 Tablets',  'category' => 'Health'],
            ['name' => 'Tickclear Soap',            'size' => '75 gm',       'category' => 'Health'],
            ['name' => 'Fungi Rakshak',             'size' => '100 gm',      'category' => 'Health'],
            ['name' => 'Multi Mineral Lick Block',  'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Black Salt Block',          'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Sulphur Block',             'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Calcium Block',             'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Pink Salt Block',           'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Protein Block',             'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Cobalt Block',              'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Super Supplement Block',    'size' => '1 kg',        'category' => 'Nutrition'],
            ['name' => 'Hydracharge',               'size' => '20 gm',       'category' => 'Health'],
            ['name' => 'Goat Feed',                 'size' => '10 kg',       'category' => 'Nutrition'],
        ];

        foreach ($products as $i => $p) {
            Product::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']),
                'category_id' => $categories[$p['category']]->id,
                'size' => $p['size'],
                'sku' => null,
                'description' => null,
                'long_description' => null,
                'price' => null,
                'stock_quantity' => 0,
                'image' => null,
                'images' => [],
                'highlights' => [],
                'specifications' => $specs($p['size']),
                'usage_instructions' => null,
                'storage_instructions' => null,
                'ingredients' => null,
                'recommended_for' => [],
                'rating' => null,
                'rating_count' => 0,
                'is_featured' => false,
                'is_active' => true,
                'order' => $i + 1,
            ]);
        }
    }
}
