<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Seeds the 16 products in the March 2026 Manikstu product catalogue.
 * All details (description, highlights, composition, dosage, specs) come from
 * the catalogue itself so the website matches the printed material.
 */
class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Categories — kept in sync with the website filter set.
        $categoryDefs = ['Health', 'Nutrition'];
        $categories = [];
        foreach ($categoryDefs as $i => $name) {
            $categories[$name] = Category::updateOrCreate(
                ['slug' => Str::slug($name), 'type' => 'product'],
                ['name' => $name, 'order' => $i + 1, 'is_active' => true]
            );
        }

        // Clean slate — this seeder is the definitive product list.
        DB::table('product_translations')->delete();
        DB::table('products')->delete();

        $specs = fn (array $rows) => array_values(array_map(
            fn ($r) => ['label' => $r[0], 'value' => $r[1]],
            $rows
        ));

        $products = [
            [
                'name' => 'Poshak Tatwa',
                'category' => 'Health',
                'size' => '300 ml',
                'description' => 'Ayurvedic multivitamin syrup that boosts livestock health, growth, and productivity.',
                'long' => 'Poshak Tatwa is an Ayurvedic multivitamin and nutritional tonic designed to enhance livestock health, growth, and productivity. Its blend of natural herbal extracts improves metabolism, immunity, digestion, and physical strength. Essential for bone, muscle, and reproductive development, it is highly beneficial for growing, pregnant, lactating, and recovering animals. Regular supplementation ensures optimal body condition, better feed utilization, and improved overall performance.',
                'highlights' => [
                    'Supports bone formation and joint flexibility',
                    'Boosts immunity and helps in disease resistance',
                    'Enhances physical strength, stamina, and daily energy levels',
                    'Promotes growth and development in young and adult animals',
                    'Improves appetite, digestion, and nutrient absorption',
                    'Helps in stress management and recovery from fatigue',
                    'Maintains healthy skin and coat condition',
                    'Ideal for daily health maintenance in livestock',
                ],
                'ingredients' => 'Composition (per 10 ml): Sahjan (Moringa) 100 mg, Apple Extract 100 mg, Amrud (Guava) 50 mg, Nashpati (Pear) 50 mg, Ashwagandha 30 mg, Shilajit 30 mg, Shatavari 45 mg, Amla (Indian Gooseberry) 15 mg, Aloe Vera 20 mg, Mulethi (Licorice) 15 mg, Safed Musli 20 mg, Papaya (Papita) 10 mg, Wheat Extract 20 mg, Bael (Wood Apple) 20 mg, Giloy (Tinospora cordifolia) 21 mg.',
                'usage' => "Small Ruminants (Goats/Sheep) — Weak Kids: 10 ml/day for 30 days; Pregnant Goats: 20 ml/day for 30 days.\nCattle — Weak Calves: 25 ml/day for 30 days; Pregnant Cows: 50 ml/day for 30 days.",
                'storage' => 'Store in a cool, dry place away from direct sunlight. Keep tightly closed when not in use.',
                'recommended' => [
                    'Growing kids, lambs and calves',
                    'Pregnant and lactating animals',
                    'Weak, recovering or stressed livestock',
                    'Daily health maintenance across the herd',
                ],
                'specs' => $specs([
                    ['Form', 'Syrup'],
                    ['Packaging Type', 'Bottle'],
                    ['Grade Standard', 'Ayurvedic Proprietary Medicine'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Multivitamin Supplement'],
                    ['Packaging', '300 ml'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Livtherapy Syrup',
                'category' => 'Health',
                'size' => '200 ml',
                'description' => 'Powerful Ayurvedic liver tonic that supports hepatic function and recovery.',
                'long' => 'Livtherapy Syrup is a powerful Ayurvedic liver tonic formulated to protect and enhance liver function in livestock. It aids in detoxifying the bloodstream by supporting hepatic activity, improving liver enzyme function, and promoting bile secretion. Regular use helps animals recover from infections, stress, or deworming, and improves their overall vitality and health.',
                'highlights' => [
                    'Supports and protects liver function in goats, sheep, and cattle',
                    'Aids in detoxification of toxins, chemicals, and harmful metabolites',
                    'Improves appetite, digestion, and nutrient absorption',
                    'Enhances recovery from illness, stress, or post-medication (e.g., deworming)',
                    'Promotes energy, immunity, and overall health',
                ],
                'ingredients' => 'Composition (per 10 ml): Andrographis paniculata 250 mg, Eclipta alba 260 mg, Fumaria parviflora 255 mg, Phyllanthus niruri 245 mg, Terminalia chebula 250 mg, Tecomella undulata 245 mg, Chicorium endivia 200 mg, Emblica officinalis (Amla) 210 mg, Achyranthes aspera 200 mg, Terminalia arjuna 195 mg, Berberis aristata 200 mg, Potassium carbonate 140 mg, Piper longum (Long Pepper) 50 mg.',
                'usage' => "Goats & Sheep — Kids: 5 ml/day for 10 days; Adults: 10 ml/day for 10 days.\nCattle — Calves: 10 ml/day for 10 days; Adults: 20 ml/day for 10 days.",
                'storage' => 'Store in a cool, dry place away from direct sunlight.',
                'recommended' => [
                    'Post-deworming recovery',
                    'Animals with liver stress, poor appetite or fatigue',
                    'Post-infection or post-medication recovery',
                    'Farms wanting a routine liver-support tonic',
                ],
                'specs' => $specs([
                    ['Form', 'Syrup'],
                    ['Packaging Type', 'Bottle'],
                    ['Grade Standard', 'Ayurvedic Proprietary Medicine'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Liver Tonic'],
                    ['Packaging', '200 ml'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Pachak Tatwa',
                'category' => 'Health',
                'size' => '200 ml',
                'description' => 'Potent Ayurvedic digestive tonic that stimulates appetite and gut health.',
                'long' => 'Pachak Tatwa is a potent Ayurvedic formulation designed to improve digestion and appetite in livestock. It enhances the functioning of the gastrointestinal system by stimulating the secretion of proteolytic, amylolytic, and lipolytic enzymes. This action supports gut health, nutrient absorption, and overall well-being in animals.',
                'highlights' => [
                    'Promotes healthy digestion and nutrient assimilation',
                    'Relieves indigestion, bloating, gas and GI discomfort',
                    'Stimulates appetite in animals with anorexia or reduced feed intake',
                    'Helps balance rumen pH and promotes gut microflora',
                    'Acts as a mild carminative, digestive stimulant and tonic',
                    'Enhances overall digestive wellness for improved energy and health',
                ],
                'ingredients' => 'Composition (per 10 ml): Amla 300 mg, Nagarmotha (Nutgrass) 295 mg, Harad (Chebulic Myrobalan) 250 mg, Baheda (Beleric Myrobalan) 255 mg, Chavya (Java Long Pepper) 155 mg, Sonth (Dry Ginger) 100 mg, Chitrakmool (Leadwort Root) 95 mg, Kala Namak (Black Salt) 90 mg, Dhaniya (Coriander) 95 mg, Peepalimool (Long Pepper Root) 55 mg, Dalchini (Cinnamon) 55 mg, Jeera (Cumin) 50 mg, Peepali (Long Pepper) 20 mg, Kali Mirch (Black Pepper) 35 mg, Hing (Asafoetida) 5 mg, Sendha Namak (Rock Salt) 100 mg.',
                'usage' => "Goats & Sheep — Kids: 5 ml/day for 3 days; Adults: 10 ml/day for 3 days.\nCattle — Calves: 10 ml/day for 3 days; Adults: 20 ml/day for 3 days.",
                'storage' => 'Store in a cool, dry place away from direct sunlight.',
                'recommended' => [
                    'Animals with reduced appetite or indigestion',
                    'Livestock recovering from illness or medication',
                    'After transportation, diet changes or heat stress',
                ],
                'specs' => $specs([
                    ['Form', 'Syrup'],
                    ['Packaging Type', 'Bottle'],
                    ['Grade Standard', 'Ayurvedic Proprietary Medicine'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Digestive Tonic'],
                    ['Packaging', '200 ml'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Kurmi Nashak',
                'category' => 'Health',
                'size' => '10 Tablets',
                'description' => 'Ayurvedic deworming tablets for internal parasite control.',
                'long' => 'Kurmi Nashak is an Ayurvedic deworming formulation designed to eliminate internal parasitic infections in livestock. It effectively targets a wide range of intestinal worms including tapeworms, roundworms, hookworms, and whipworms. Regular deworming not only protects animals from parasite-induced diseases but also improves digestion, nutrient uptake, and productivity. The formulation is safe, natural, and also helps reduce the risk of parasite transmission to humans handling the animals.',
                'highlights' => [
                    'Eliminates internal parasites such as roundworms, tapeworms and liver flukes',
                    'Promotes better digestion and nutrient absorption',
                    'Improves growth rate, weight gain and general well-being',
                    'Enhances immune function and reduces disease risk',
                    'Supports improved milk yield and meat production',
                    'Contributes to biosecurity by minimizing zoonotic parasite transmission',
                ],
                'ingredients' => 'Composition (per tablet): Haridra (Curcuma longa) 500 mg, Chiraita (Swertia chirata) 500 mg, Maricha (Piper nigrum / Black Pepper) 500 mg, Vidanga (Embelia ribes) 500 mg, Katira (Astragalus gummifer) 500 mg.',
                'usage' => "Small Animals (Goats, Sheep, Calves) — Initial deworming: 1 tablet/day for 3 days; Maintenance: 1 tablet monthly.\nLarge Animals (Cattle, Buffalo) — Initial deworming: 2 tablets/day for 3 days; Maintenance: 2 tablets monthly.",
                'storage' => 'Store in a cool, dry place away from children and direct sunlight.',
                'recommended' => [
                    'Routine quarterly deworming schedules',
                    'Post-purchase or quarantine periods',
                    'Herds showing signs of parasite load (poor coat, weight loss)',
                ],
                'specs' => $specs([
                    ['Form', 'Tablet'],
                    ['Packaging Type', 'Strip'],
                    ['Grade Standard', 'Ayurvedic Deworming Supplement'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Anthelmintic'],
                    ['Packaging', '1 Strip of 10 Tablets'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Tickclear Soap',
                'category' => 'Health',
                'size' => '75 gm',
                'description' => 'Medicated soap that protects livestock from ticks, lice, mites and other external parasites.',
                'long' => "Manikstu TickClear Soap protects livestock from ticks, lice, mites, and other external parasites. It combines insecticidal Permethrin to quickly paralyze and eliminate pests, with antibacterial Cetrimide to prevent secondary skin infections caused by scratching. Regular use relieves severe irritation, maintains essential hygiene, and ensures a clean, healthy coat.",
                'highlights' => [
                    "Helps eliminate ticks, lice, mites and other external parasites from the animal's skin",
                    'Provides quick relief from itching, irritation and skin discomfort',
                    'Helps prevent secondary bacterial infections from scratching or lesions',
                    'Supports healthy skin hygiene and coat condition',
                    'Reduces the risk of parasite-related skin diseases',
                    'Maintains comfort and wellbeing, improving productivity',
                    'Suitable for regular use in parasite-prone environments such as farms and sheds',
                ],
                'ingredients' => 'Permethrin (insecticidal actives) with Cetrimide (antibacterial) in a soap base.',
                'usage' => 'Wet the animal, lather the soap over affected areas, and let the foam sit for a few minutes before rinsing thoroughly. Repeat as needed or as directed by a veterinarian for effective parasite control.',
                'storage' => 'Store in a cool, dry place away from direct sunlight and out of reach of children.',
                'recommended' => [
                    'Herds facing tick, lice or mite infestations',
                    'Routine grooming in parasite-prone environments',
                    'Support during monsoon and warm months',
                ],
                'specs' => $specs([
                    ['Form', 'Soap Bar'],
                    ['Packaging Type', 'Wrapper'],
                    ['Grade Standard', 'Veterinary Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'External Parasite Control'],
                    ['Packaging', 'A Block of 75 gm'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Fungi Rakshak',
                'category' => 'Health',
                'size' => '100 gm',
                'description' => 'Natural plant-based antifungal cream for livestock skin health.',
                'long' => 'Fungi Rakshak Cream is a natural, plant-based antifungal formulation designed to effectively manage fungal skin infections in domestic animals. The synergistic action of essential oils provides strong antifungal, antiseptic, and soothing effects, helping restore skin health while preventing secondary infections.',
                'highlights' => [
                    'Effectively treats fungal skin infections such as ringworm and dermatitis',
                    'Provides antifungal and antimicrobial action, inhibiting fungal growth',
                    'Helps relieve itching, redness, irritation and skin inflammation',
                    'Promotes faster healing and regeneration of affected skin areas',
                    'Prevents secondary bacterial infections due to scratching or lesions',
                    'Safe for repeated use and suitable for sensitive animal skin',
                ],
                'ingredients' => 'Blend of essential oils and plant extracts with antifungal, antiseptic and soothing properties.',
                'usage' => 'Clean the affected area and apply evenly 1-2 times daily until completely healed, or as directed by a veterinarian.',
                'storage' => 'Store in a cool, dry place. Keep the container closed after use.',
                'recommended' => [
                    'Animals with ringworm, dermatitis or fungal skin lesions',
                    'Recurrent skin infections during monsoon',
                    'Supportive care for sensitive-skin animals',
                ],
                'specs' => $specs([
                    ['Form', 'Cream'],
                    ['Packaging Type', 'Container'],
                    ['Grade Standard', 'Veterinary Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Antifungal Cream'],
                    ['Packaging', 'A Pack of 100 gm'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Multi Mineral Lick Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Natural trace mineral lick block that supports livestock health and performance.',
                'long' => 'The Mineral Block is a natural and practical supplement that provides a range of essential trace minerals required for optimum livestock health and performance. Designed as a free-choice lick, it allows animals to self-regulate their intake based on individual needs. Especially useful in mineral-deficient regions or during physiologically demanding phases like pregnancy, lactation, or heat stress.',
                'highlights' => [
                    'Strengthens bones and muscles by replenishing key trace minerals (without added calcium)',
                    'Enhances milk production by supporting metabolic function in lactating animals',
                    'Fulfils deficiencies of Zinc, Iron, Copper, Manganese, Magnesium, Cobalt, Iodine and Selenium',
                    'Boosts immunity and disease resistance via enzymatic and hormonal support',
                    'Prevents dehydration and fatigue during heat stress',
                ],
                'ingredients' => 'Core minerals: Zinc (Zn), Iron (Fe), Copper (Cu), Magnesium (Mg), Manganese (Mn), Cobalt (Co), Iodine (I), Selenium (Se).',
                'usage' => 'Hang the Mineral Block securely in the shed or grazing area using a rope. Animals will lick the block according to their individual mineral requirements.',
                'storage' => 'Store in a dry place. Protect from rain and moisture to prevent dissolution.',
                'recommended' => [
                    'Farms in mineral-deficient regions',
                    'Pregnant, lactating or growing livestock',
                    'Animals under heat stress or transport stress',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Trace Mineral Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Black Salt Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Ayurvedic black-salt lick for digestion, electrolyte balance and detox.',
                'long' => 'The Black Salt Block is a natural mineral lick enriched with Ayurvedic digestive and detoxifying properties. Known for its high mineral content and lower sodium levels compared to regular salt, black salt (Kala Namak) supports gastrointestinal health, electrolyte balance, and respiratory comfort in livestock. This block serves as both a digestive aid and a mineral replenisher, especially in hot or stressful conditions.',
                'highlights' => [
                    'Aids digestion and relieves bloating, gas and acidity',
                    'Acts as a natural laxative supporting bowel regularity',
                    'Helps balance electrolytes, reducing muscle cramps, fatigue and dehydration',
                    'Offers cooling and detoxifying effects (Ayurvedic principles)',
                    'May assist in managing blood pressure via lower sodium content',
                    'Traditionally used to relieve constipation, flatulence and respiratory issues',
                ],
                'ingredients' => 'Ayurvedic black salt (Kala Namak) with natural minerals.',
                'usage' => 'Hang the Black Salt Block securely in the shed or resting area using a rope. Livestock will lick the block as needed, especially when experiencing digestive discomfort or salt cravings.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Herds with digestive discomfort or bloating',
                    'Animals under heat stress',
                    'Routine digestive and electrolyte support',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Digestive & Electrolyte Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Sulphur Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Sulphur-rich lick block for skin, metabolism and detoxification support.',
                'long' => 'The Sulphur Block is a natural sulphur-rich lick designed to support various metabolic, dermatological, and digestive functions in livestock. Sulphur is essential for amino acid, vitamin, and enzyme formation. Free-choice licking delivers sulphur in a controlled, safe manner, contributing to improved skin condition, disease resistance, and overall productivity.',
                'highlights' => [
                    'Skin, coat & parasite defense — builds resilient skin and a healthy, shiny coat',
                    'Hoof & joint durability — hardens hooves and improves joint flexibility',
                    'Optimized digestion — boosts rumen microbial activity and feed conversion',
                    'Immunity & detoxification — strengthens cellular defenses and liver function',
                    'Metabolic & nervous system health — drives biotin and thiamine production',
                    'Tissue repair & growth — fuels amino acid & enzyme synthesis for healing',
                ],
                'ingredients' => 'Elemental sulphur with supporting minerals.',
                'usage' => 'Hang the Sulphur Block in the livestock shed or near the feeding area using a rope. Animals will lick as needed based on their individual sulphur requirements.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Animals with dull coats, skin issues or slow growth',
                    'Working livestock and dairy animals',
                    'Herds needing metabolic and detox support',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Sulphur Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Calcium Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Pure plant-derived calcium block for daily livestock calcium needs.',
                'long' => 'The Calcium Block is a pure, plant-derived supplement designed to meet the daily calcium needs of livestock. Highly beneficial for young, pregnant, lactating, and high-producing animals, it offers a stress-free way to prevent deficiency through self-licking. Free from animal residues, it ensures safety while supporting strong bones, optimal muscle function, and improved productivity.',
                'highlights' => [
                    'Bone & skeletal strength — dense, strong bones and teeth at every growth stage',
                    'Deficiency prevention — protects against milk fever, rickets and osteomalacia',
                    'Increased dairy yield — optimises calcium metabolism for milk quality and volume',
                    'Vital system support — healthy heart, muscle, nerve and enzyme functions',
                    'Reproductive health — safe reproduction and fewer post-partum complications',
                    'Stress & recovery aid — accelerates recovery during high-stress periods',
                ],
                'ingredients' => 'Plant-derived calcium sources with essential trace mineral support.',
                'usage' => 'Hang the block using a rope inside the livestock shed or feeding area. Animals will lick the block voluntarily based on their calcium needs.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'High-yielding lactating dairy animals',
                    'Late-pregnancy females — prevents milk fever',
                    'Growing kids and calves with weak bones',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Calcium Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Pink Salt Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Natural pink-salt lick rich in essential trace minerals and electrolytes.',
                'long' => 'The Pink Salt Block is a natural mineral lick made from high-quality pink salt, rich in essential trace minerals required for maintaining electrolyte balance and overall health in livestock. It supports daily mineral intake through free-choice licking, especially beneficial in hot climates and mineral-deficient feeding systems.',
                'highlights' => [
                    'Helps maintain electrolyte balance and prevents salt deficiency',
                    'Supports proper nerve and muscle function, reducing weakness and fatigue',
                    'Improves hydration levels — especially during heat stress',
                    'Enhances feed intake and digestion by stimulating appetite',
                    'Supports metabolic activities and overall vitality',
                    'Helps reduce stress-related issues in working and grazing animals',
                ],
                'ingredients' => 'High-quality Himalayan pink salt with natural trace minerals.',
                'usage' => 'Hang the Pink Salt Block securely in the shed or grazing area using a rope. Animals will lick the block according to their individual mineral requirements.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Farms in hot or arid climates',
                    'Working and grazing animals',
                    'Herds needing daily electrolyte support',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Mineral & Electrolyte Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Protein Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Nutritional lick block that supplements essential protein for growth and milk production.',
                'long' => 'Protein Block is a nutritional lick block that supplements the essential protein required for livestock growth and productivity. It actively supports body development, muscle formation, and milk production. By instinctively licking the block, animals fulfill their specific nutritional needs and maintain a proper protein balance in their diet.',
                'highlights' => [
                    'Provides essential protein for muscle repair and body growth',
                    'Enhances milk production and milk quality in dairy animals',
                    'Improves feed utilization and boosts digestion efficiency',
                    'Promotes faster growth and healthy weight gain in young animals',
                    'Supports optimal reproductive performance and fertility',
                    'Boosts overall strength, stamina and productivity',
                ],
                'ingredients' => 'Balanced non-protein nitrogen sources and mineral fortification.',
                'usage' => 'Hang the Protein Block in the animal shed using a rope. Animals will naturally lick the block according to their nutritional requirements.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Growing kids, calves and lambs',
                    'High-yielding dairy animals',
                    'Breeding bucks and cows during peak stages',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Protein Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Cobalt Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Cobalt-rich lick block for rumen Vitamin B12 synthesis and energy metabolism.',
                'long' => 'Cobalt Block is a mineral lick block formulated to supply cobalt, an essential trace mineral required for proper rumen function in ruminant animals. Cobalt plays a crucial role in the production of Vitamin B12 by rumen microbes, which is necessary for energy metabolism, red blood cell formation, and overall animal health. Regular access to cobalt helps maintain optimal growth, productivity, and metabolic efficiency in livestock.',
                'highlights' => [
                    'Supports Vitamin B12 synthesis in the rumen for optimal energy metabolism',
                    'Prevents cobalt deficiency symptoms like anemia, poor growth and loss of appetite',
                    'Promotes better growth and healthy weight gain, especially in young animals',
                    'Enhances appetite, feed utilization and healthy rumen microbial activity',
                    'Improves overall vitality, strength and stamina',
                    'Contributes to higher productivity and yields in both milk and meat animals',
                ],
                'ingredients' => 'Elemental cobalt with supporting trace mineral fortification.',
                'usage' => 'Hang the Cobalt Block in the shed using a rope. Animals will naturally lick the block as per their mineral requirement.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Ruminants showing signs of B12 deficiency',
                    'Young stock with slow growth',
                    'Herds needing energy and appetite support',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Trace Mineral Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Super Supplement Block',
                'category' => 'Nutrition',
                'size' => '1 kg',
                'description' => 'Premium multi-nutrient lick block for balanced daily supplementation.',
                'long' => 'Super Supplement Block is a premium multi-nutrient lick block specially formulated to provide a balanced combination of essential minerals and nutrients required for optimum livestock health and productivity. It helps bridge nutritional gaps in the regular diet and supports overall growth, reproduction, immunity, and milk production. Animals naturally consume the block according to their nutritional requirements.',
                'highlights' => [
                    'Provides essential minerals to support health and prevent deficiency disorders',
                    'Improves overall growth, strength, body condition and long-term productivity',
                    'Supports higher milk production and better milk quality',
                    'Enhances natural immunity and disease resistance',
                    'Improves feed utilization and overall metabolic efficiency',
                    'Supports optimal fertility and reproductive performance',
                ],
                'ingredients' => 'Balanced combination of macro and trace minerals, vitamins and nutrients.',
                'usage' => 'Hang the Super Supplement Block in the shed using a rope. Animals will naturally lick the block according to their nutritional needs.',
                'storage' => 'Store in a dry place. Protect from rain and moisture.',
                'recommended' => [
                    'Farms wanting an all-round mineral & nutrition solution',
                    'Dairy and breeding herds',
                    'Livestock recovering from stress or deficiency',
                ],
                'specs' => $specs([
                    ['Form', 'Block'],
                    ['Packaging Type', 'Shrink Wrap'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Premium Multi-Nutrient Supplement'],
                    ['Packaging', '1 Block of 1 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Hydracharge',
                'category' => 'Health',
                'size' => '20 gm',
                'description' => 'Advanced Oral Rehydration Solution (ORS) that quickly restores fluid and electrolyte balance.',
                'long' => 'HydraCharge is an advanced Oral Rehydration Solution (ORS) that rapidly replenishes lost fluids, essential electrolytes, and energy in livestock. Designed to combat heat stress, dehydration, illness, transportation, or post-treatment recovery, this instant formula quickly restores fluid balance, helping animals recover faster and maintain optimal metabolic function during high-stress conditions.',
                'highlights' => [
                    'Rapid rehydration to combat dehydration, heat stress and environmental challenges',
                    'Restores essential electrolyte balance lost via sweating, diarrhea or illness',
                    'Supports faster recovery during weakness, stress and post-treatment phases',
                    'Improves overall energy levels, stamina and daily activity',
                    'Encourages better feed intake and rapid appetite recovery',
                    'Ideal for high-stress situations like transportation, vaccination and extreme weather',
                ],
                'ingredients' => 'Electrolyte blend (sodium, potassium, chloride) with dextrose and supportive nutrients.',
                'usage' => 'Dissolve one 20 g sachet of HydraCharge in 1 litre of clean drinking water and offer it to animals. Prepare fresh solution daily for best results.',
                'storage' => 'Keep the sachet sealed. Store in a cool, dry place away from direct sunlight.',
                'recommended' => [
                    'Herds facing heat stress or dehydration',
                    'Recovery after diarrhea, illness or vaccination',
                    'During transportation or intensive work',
                ],
                'specs' => $specs([
                    ['Form', 'Powder'],
                    ['Packaging Type', 'Sachet'],
                    ['Grade Standard', 'Veterinary Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Electrolyte & Rehydration Supplement'],
                    ['Packaging', 'A Sachet of 20 gm'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],

            [
                'name' => 'Goat Feed',
                'category' => 'Nutrition',
                'size' => '10 kg',
                'description' => 'Complete pelleted feed that supports growth, milk yield and overall goat productivity.',
                'long' => 'Goat Feed is a nutritionally complete, pelleted feed formulation designed to support the growth, health, and productivity of goats and sheep. Rich in protein, fat, vitamins, and essential minerals, it delivers balanced daily nutrition that enhances weight gain, milk yield, reproductive function, and overall vitality. The pellet form reduces wastage and improves digestibility.',
                'highlights' => [
                    'High protein, fat and vitamin feed supplement for overall growth',
                    'Aids proper development of kids into stronger, healthier goats',
                    'Supports better milk production in lactating females',
                    'Enhances body condition and sturdiness in male bucks',
                    'Vitamins A, D3 and E support health, immunity and reproduction',
                    'Minerals help maintain fertility and metabolic performance',
                    'Pellet form reduces wastage and improves digestibility',
                ],
                'ingredients' => 'DORB, Food Byproducts & Rice Bran (20%); Maize / Broken Rice (25%); DDGS (15%); Mustard / Groundnut / Soya DOC (15%); Molasses (5%); Calcium & Salt (2%); Vitamin & Mineral Mix (1%); Urea (2%); Wheat Bran / Fillers (15%).',
                'usage' => "Goats and Sheep — Kids: 100 gram/day; Large Animals: 200 gram/day.\nCattle — Calves: 200 gram/day; Large Animals: 400 gram/day.",
                'storage' => 'Store in a cool, dry place away from direct sunlight. Reseal the bag after every use. Keep out of reach of children.',
                'recommended' => [
                    'Growing kids and lambs',
                    'Lactating females needing higher nutrient density',
                    'Farms with limited access to quality green fodder',
                ],
                'specs' => $specs([
                    ['Form', 'Pellet'],
                    ['Packaging Type', 'Bag'],
                    ['Grade Standard', 'Feed Grade'],
                    ['Shelf Life', ''],
                    ['Type Of Supplement', 'Complete Feed'],
                    ['Packaging', '1 Pack of 10 kg'],
                    ['Country of Origin', 'Made in India'],
                ]),
            ],
        ];

        foreach ($products as $i => $p) {
            Product::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']),
                'category_id' => $categories[$p['category']]->id,
                'size' => $p['size'],
                'sku' => null,
                'description' => $p['description'],
                'long_description' => $p['long'],
                'price' => null,
                'stock_quantity' => 0,
                'image' => null,
                'images' => [],
                'highlights' => $p['highlights'],
                'specifications' => $p['specs'],
                'usage_instructions' => $p['usage'],
                'storage_instructions' => $p['storage'],
                'ingredients' => $p['ingredients'],
                'recommended_for' => $p['recommended'],
                'rating' => null,
                'rating_count' => 0,
                'is_featured' => false,
                'is_active' => true,
                'order' => $i + 1,
            ]);
        }
    }
}
