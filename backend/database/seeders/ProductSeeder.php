<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Product categories (single source of truth for the website filters).
        $categories = [];
        foreach (['Nutrition', 'Health', 'Fodder'] as $i => $name) {
            $categories[$name] = Category::updateOrCreate(
                ['slug' => Str::slug($name), 'type' => 'product'],
                ['name' => $name, 'order' => $i + 1, 'is_active' => true]
            );
        }

        $specs = fn (array $rows) => collect($rows)->map(fn ($r) => ['label' => $r[0], 'value' => $r[1]])->all();

        $products = [
            [
                'name' => 'Goat Feed', 'category' => 'Nutrition', 'price' => 850, 'size' => '25 kg',
                'sku' => 'MK-FEED-25', 'stock' => 120, 'rating' => 4.5, 'rating_count' => 1284, 'featured' => true,
                'description' => 'Complete and balanced nutrition for healthy growth and productivity.',
                'long' => 'A scientifically formulated feed blend that provides complete daily nutrition for goats across all life stages — from kids to lactating does. Regular feeding improves growth, productivity, and overall herd health while reducing dependence on scarce green fodder.',
                'highlights' => ['Balanced protein, energy and mineral profile', 'Formulated for all life stages of goats', 'Supports better weight gain and milk yield', 'Made from farmer-tested, quality ingredients'],
                'specs' => $specs([['Form', 'Pellet'], ['Packaging Type', 'Bag'], ['Grade Standard', 'Feed Grade'], ['Shelf Life', '6 months'], ['Type Of Supplement', 'Complete Feed'], ['Packaging', '25 kg'], ['Country of Origin', 'Made in India']]),
                'usage' => 'Feed 300–500 gm per adult goat per day, mixed with regular ration. Introduce gradually over 5–7 days when switching feeds.',
                'storage' => 'Store in a cool, dry place away from direct sunlight. Reseal the bag after every use. Keep out of reach of children.',
                'ingredients' => 'Maize, soybean meal, rice bran, molasses, calcium carbonate, common salt, vitamin & mineral premix.',
                'recommended' => ['Farmers looking to improve growth rate of their goats', 'Lactating does needing higher nutrient density', 'Rearing kids from 3 months onwards', 'Farms with limited access to quality green fodder'],
                'gallery' => ['/1.png', '/2.png', '/3.png', '/4.png'],
            ],
            [
                'name' => 'Herbal Booster', 'category' => 'Health', 'price' => 450, 'size' => '500 ml',
                'sku' => 'MK-HERB-500', 'stock' => 80, 'rating' => 4.3, 'rating_count' => 742, 'featured' => true,
                'description' => 'Improves immunity, digestion and overall goat health.',
                'long' => 'A natural liquid supplement crafted from time-tested herbs, designed to strengthen the immune system, aid digestion, and improve the overall vitality of the herd. Especially useful during monsoon and winter months.',
                'highlights' => ['Traditional herbal blend with modern extraction', 'Boosts appetite and digestive health', 'Supports immunity during seasonal transitions', 'Safe for daily long-term use'],
                'specs' => $specs([['Form', 'Liquid'], ['Packaging Type', 'Bottle'], ['Grade Standard', 'Food Grade'], ['Shelf Life', '1 year'], ['Type Of Supplement', 'Nutritional Supplement'], ['Packaging', '500 ml'], ['Country of Origin', 'Made in India']]),
                'usage' => '10 ml twice a day for adult goats, mixed with water or feed. Continue for 21 days for best results.',
                'storage' => 'Keep tightly closed. Store below 30°C, away from direct sunlight.',
                'ingredients' => 'Ashwagandha, Shatavari, Amla, Giloy, Neem extract, natural fruit sweeteners.',
                'recommended' => ['Herds recovering from illness or transport stress', 'Seasonal immunity support during monsoon and winter', 'Farms wanting a chemical-free daily tonic'],
                'gallery' => ['/5.png', '/6.png', '/7.png', '/8.png'],
            ],
            [
                'name' => 'Mineral Mixture', 'category' => 'Nutrition', 'price' => 300, 'size' => '1 kg',
                'sku' => 'MK-MIN-1', 'stock' => 200, 'rating' => 4.6, 'rating_count' => 512, 'featured' => false,
                'description' => 'Essential minerals for strong bones, better growth and fertility.',
                'long' => 'A precisely balanced mineral supplement that fills the gaps in a typical grazing diet, helping goats grow stronger, breed better, and recover faster from stress. A small daily dose delivers long-term benefits.',
                'highlights' => ['Complete macro & trace mineral profile', 'Improves bone strength in growing kids', 'Supports fertility and reproductive health', 'Easily mixed with daily feed'],
                'specs' => $specs([['Form', 'Powder'], ['Packaging Type', 'Container'], ['Grade Standard', 'Feed Grade'], ['Shelf Life', '12 months'], ['Type Of Supplement', 'Mineral Supplement'], ['Packaging', '1 kg'], ['Country of Origin', 'Made in India']]),
                'usage' => 'Mix 15–20 gm per adult goat per day into feed. Continue daily during growth, lactation and stress periods.',
                'storage' => 'Store in a cool, dry place. Keep the container tightly closed after use.',
                'ingredients' => 'Di-calcium phosphate, calcium carbonate, magnesium oxide, salt, trace minerals (Zn, Cu, Mn, Fe, I, Se).',
                'recommended' => ['Growing kids showing weak bones or slow growth', 'Lactating does — supports milk yield and calcium demand', 'Breeding bucks and pregnant does', 'Farms noticing signs of mineral deficiency (pica, poor coat)'],
                'gallery' => ['/9.png', '/10.png', '/11.png', '/12.png'],
            ],
            [
                'name' => 'Dewormer Powder', 'category' => 'Health', 'price' => 120, 'size' => '100 gm',
                'sku' => 'MK-DEW-100', 'stock' => 300, 'rating' => 4.2, 'rating_count' => 386, 'featured' => false,
                'description' => 'Helps control internal worms and keeps goats healthy.',
                'long' => 'An easy-to-use dewormer powder for scheduled internal parasite control. Reduces production losses from worm infestations and keeps herds thriving on pasture.',
                'highlights' => ['Broad-spectrum internal parasite control', 'Easy oral administration', 'Trusted by field veterinarians', 'Suitable for regular deworming schedules'],
                'specs' => $specs([['Form', 'Powder'], ['Packaging Type', 'Sachet'], ['Grade Standard', 'Veterinary Grade'], ['Shelf Life', '24 months'], ['Type Of Supplement', 'Anthelmintic'], ['Packaging', '100 gm'], ['Country of Origin', 'Made in India']]),
                'usage' => '1 gm per 10 kg body weight, administered orally with feed. Repeat every 3 months as part of routine deworming.',
                'storage' => 'Store in a cool, dry place. Keep out of reach of children and away from feed.',
                'ingredients' => 'Broad-spectrum anthelmintic actives with palatable carrier for oral administration.',
                'recommended' => ['Routine quarterly deworming schedules', 'Herds showing signs of parasite load (poor coat, weight loss)', 'Newly acquired stock during quarantine'],
                'gallery' => ['/15.png', '/16.png', '/17.png', '/18.png'],
            ],
            [
                'name' => 'Calcium Supplement', 'category' => 'Nutrition', 'price' => 220, 'size' => '500 gm',
                'sku' => 'MK-CAL-500', 'stock' => 150, 'rating' => 4.4, 'rating_count' => 268, 'featured' => false,
                'description' => 'Strengthens bones and improves milk yield in lactating goats.',
                'long' => 'A concentrated calcium supplement fortified with vitamin D3, formulated to prevent milk fever, weakness, and bone disorders — especially in high-producing lactating does.',
                'highlights' => ['Highly bioavailable calcium source', 'Improves milk yield in lactating does', 'Prevents milk fever and weakness', 'Fortified with vitamin D3'],
                'specs' => $specs([['Form', 'Powder'], ['Packaging Type', 'Container'], ['Grade Standard', 'Feed Grade'], ['Shelf Life', '18 months'], ['Type Of Supplement', 'Mineral Supplement'], ['Packaging', '500 gm'], ['Country of Origin', 'Made in India']]),
                'usage' => '10–15 gm per adult goat per day, mixed with feed. Increase to 20 gm during late pregnancy and peak lactation.',
                'storage' => 'Keep the container closed. Store in a cool, dry place.',
                'ingredients' => 'Calcium carbonate, calcium phosphate, vitamin D3, magnesium, essential trace minerals.',
                'recommended' => ['High-yielding lactating does', 'Late-pregnancy does — prevents milk fever', 'Growing kids showing weak bones'],
                'gallery' => ['/20.png', '/21.png', '/1.png', '/2.png'],
            ],
            [
                'name' => 'Fodder Seed Mix', 'category' => 'Fodder', 'price' => 180, 'size' => '1 kg',
                'sku' => 'MK-FODR-1', 'stock' => 90, 'rating' => 4.7, 'rating_count' => 194, 'featured' => false,
                'description' => 'High-yield seed mix for green fodder cultivation year-round.',
                'long' => 'A curated mix of proven multi-cut fodder seed varieties that grow well across Indian agro-climatic zones. Cultivating this on even a small patch of land dramatically reduces feed cost and improves herd health.',
                'highlights' => ['Multi-cut, high-yield fodder varieties', 'Suitable for irrigated and rainfed plots', 'Improves on-farm green fodder availability', 'Reduces feed cost year-round'],
                'specs' => $specs([['Form', 'Seed'], ['Packaging Type', 'Pouch'], ['Grade Standard', 'Certified Seed'], ['Shelf Life', '12 months'], ['Type Of Supplement', 'Multi-cut Fodder'], ['Packaging', '1 kg'], ['Country of Origin', 'Made in India']]),
                'usage' => 'Broadcast 8–10 kg per acre on well-prepared land. Irrigate lightly after sowing; first cut in 55–70 days.',
                'storage' => 'Store in a dry, cool place. Avoid moisture and direct sunlight to preserve germination.',
                'ingredients' => 'Napier grass, Berseem, Lucerne, Guinea grass, Sorghum sudan (varietal mix).',
                'recommended' => ['Farms wanting to build a year-round green fodder base', 'Small-holder families using kitchen gardens for fodder', 'Reducing dependence on purchased feed'],
                'gallery' => ['/3.png', '/4.png', '/5.png', '/6.png'],
            ],
        ];

        foreach ($products as $i => $p) {
            Product::updateOrCreate(
                ['slug' => Str::slug($p['name'])],
                [
                    'name' => $p['name'],
                    'description' => $p['description'],
                    'long_description' => $p['long'],
                    'sku' => $p['sku'],
                    'size' => $p['size'],
                    'price' => $p['price'],
                    'stock_quantity' => $p['stock'],
                    'category_id' => $categories[$p['category']]->id,
                    'image' => $p['gallery'][0] ?? null,
                    'images' => $p['gallery'],
                    'highlights' => $p['highlights'],
                    'specifications' => $p['specs'],
                    'usage_instructions' => $p['usage'],
                    'storage_instructions' => $p['storage'],
                    'ingredients' => $p['ingredients'],
                    'recommended_for' => $p['recommended'],
                    'rating' => $p['rating'],
                    'rating_count' => $p['rating_count'],
                    'is_featured' => $p['featured'],
                    'is_active' => true,
                    'order' => $i + 1,
                ]
            );
        }
    }
}
