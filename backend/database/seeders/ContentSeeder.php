<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageBlock;
use App\Models\Setting;
use App\Models\NavigationMenu;
use App\Models\FooterLink;
use App\Models\BlogPost;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedNavigation();
        $this->seedFooterLinks();
        $this->seedBlogPosts();
        $this->seedHomepage();
        $this->seedAboutPage();
        $this->seedTrainingPage();
        $this->seedCareersPage();
        $this->seedCollaboratePage();
        $this->seedAjahPage();
    }

    private function seedSettings(): void
    {
        $settings = [
            'site_name' => 'Manikstu Agro',
            'site_tagline' => 'Revolutionizing Goat Farming. Empowering Lives.',
            'site_description' => 'Manikstu Agro is building a sustainable ecosystem that empowers farmers with technology, knowledge and innovative solutions.',
            'phone' => '+91 82703 31856',
            'phone_secondary' => '+919437000000',
            'email_sales' => 'sales@manikstu.com',
            'email_info' => 'info@manikstu.com',
            'address_registered' => 'Row House No - 94, Ravi Garden, Pune Solapur Road, Manjri Budruk, Hadapsar, Pune - 412307',
            'address_corporate' => 'Plot No-754, 14, Gangadhar Meher Marg, near Pabitra Guest House, Jayadev Vihar, Bhubaneswar, Odisha 751013',
            'address_farm' => 'At/Po: Salebhata, P.S: Kegaon, via: Borda, Kalahandi, Odisha - 766036',
            'address_regional' => 'CMTC Campus, Serikhedi, Chhattisgarh - 492012',
            'gstin' => '21AAJCM6881B1ZM',
            'cin' => 'U74900PN2015PTC154344',
            'facebook' => '#',
            'instagram' => '#',
            'linkedin' => '#',
            'twitter' => '#',
            'youtube' => '#',
            'tagline_ribbon' => 'Building partnerships. Strengthening communities. Transforming livelihoods.',
            'brand_tagline' => 'Building a prosperous and sustainable agricultural future through innovation, collaboration and empowerment.',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }

    private function seedNavigation(): void
    {
        $links = [
            ['label' => 'Home', 'url' => '/', 'order' => 1],
            ['label' => 'About Us', 'url' => '/about', 'order' => 2],
            ['label' => 'Services', 'url' => '/services', 'order' => 3],
            ['label' => 'Products', 'url' => '/products', 'order' => 4],
            ['label' => 'Media', 'url' => '/blog', 'order' => 5],
            ['label' => 'Collaborate', 'url' => '/collaborate', 'order' => 6],
            ['label' => 'Training & Awareness', 'url' => '/training', 'order' => 7],
        ];

        foreach ($links as $link) {
            NavigationMenu::updateOrCreate(
                ['url' => $link['url']],
                ['label' => $link['label'], 'order' => $link['order'], 'is_active' => true]
            );
        }
    }

    private function seedFooterLinks(): void
    {
        FooterLink::truncate();

        $quickLinks = [
            ['label' => 'About Us', 'url' => '/about', 'group' => 'quick', 'order' => 1],
            ['label' => 'Our Services', 'url' => '/services', 'group' => 'quick', 'order' => 2],
            ['label' => 'Our Products', 'url' => '/products', 'group' => 'quick', 'order' => 3],
            ['label' => 'Media', 'url' => '/blog', 'group' => 'quick', 'order' => 4],
            ['label' => 'Collaborate', 'url' => '/collaborate', 'group' => 'quick', 'order' => 5],
            ['label' => 'Training & Awareness', 'url' => '/training', 'group' => 'quick', 'order' => 6],
        ];

        $supportLinks = [
            ['label' => 'Help Center', 'url' => '/help', 'group' => 'support', 'order' => 1],
            ['label' => 'Contact Us', 'url' => '/contact', 'group' => 'support', 'order' => 2],
            ['label' => 'Privacy Policy', 'url' => '/privacy', 'group' => 'support', 'order' => 3],
            ['label' => 'Terms & Conditions', 'url' => '/terms', 'group' => 'support', 'order' => 4],
        ];

        foreach (array_merge($quickLinks, $supportLinks) as $link) {
            FooterLink::create($link);
        }
    }

    private function seedBlogPosts(): void
    {
        $featuredCategory = Category::firstOrCreate(
            ['slug' => 'featured'],
            ['name' => 'Featured', 'type' => 'blog', 'is_active' => true, 'order' => 1]
        );
        $eventCategory = Category::firstOrCreate(
            ['slug' => 'event'],
            ['name' => 'Event', 'type' => 'blog', 'is_active' => true, 'order' => 2]
        );
        $pressCategory = Category::firstOrCreate(
            ['slug' => 'press'],
            ['name' => 'Press', 'type' => 'blog', 'is_active' => true, 'order' => 3]
        );
        $mediaCategory = Category::firstOrCreate(
            ['slug' => 'media'],
            ['name' => 'Media', 'type' => 'blog', 'is_active' => true, 'order' => 4]
        );

        $posts = [
            [
                'title' => "Manikstu's Goat Bank featured in Mann Ki Baat",
                'slug' => 'mann-ki-baat-feature',
                'excerpt' => "Our innovative Goat Bank model was highlighted by the Hon'ble Prime Minister in his monthly radio address, recognizing its impact on rural livelihoods.",
                'category_id' => $featuredCategory->id,
                'featured_image' => '/1.png',
                'published_at' => '2024-02-25',
                'is_featured' => true,
            ],
            [
                'title' => 'PM Modi meets with Odisha Govt. for Rural Development',
                'slug' => 'pm-odisha-rural-development',
                'excerpt' => 'A landmark meeting between the Hon\'ble Prime Minister and Odisha state officials to discuss rural development initiatives including goat farming programs.',
                'category_id' => $eventCategory->id,
                'featured_image' => '/2.png',
                'published_at' => '2024-01-14',
            ],
            [
                'title' => 'CEO receives Emerging Women Entrepreneur Award',
                'slug' => 'emerging-women-entrepreneur',
                'excerpt' => 'Our CEO was honored with the Emerging Women Entrepreneur Award for her transformative work in agricultural empowerment and rural innovation.',
                'category_id' => $pressCategory->id,
                'featured_image' => '/3.png',
                'published_at' => '2023-12-15',
            ],
            [
                'title' => 'Manikstu Initiative on Goat Farming featured in Dainik Jagran',
                'slug' => 'dainik-jagran-coverage',
                'excerpt' => 'Dainik Jagran covered our goat farming initiative, highlighting how technology-driven approaches are revolutionizing traditional farming in Odisha.',
                'category_id' => $mediaCategory->id,
                'featured_image' => '/4.png',
                'published_at' => '2024-03-08',
            ],
            [
                'title' => 'Partnership with NABARD for Rural Credit Expansion',
                'slug' => 'nabard-partnership',
                'excerpt' => 'A strategic partnership with NABARD to expand rural credit facilities for goat farmers across Odisha, Chhattisgarh, and Maharashtra.',
                'category_id' => $featuredCategory->id,
                'featured_image' => '/5.png',
                'published_at' => '2023-11-20',
            ],
            [
                'title' => 'Annual Stakeholder Meeting 2023',
                'slug' => 'annual-stakeholder-meeting',
                'excerpt' => 'Our annual stakeholder meeting brought together farmers, partners, and government officials to review progress and plan the year ahead.',
                'category_id' => $eventCategory->id,
                'featured_image' => '/6.png',
                'published_at' => '2023-10-05',
            ],
            [
                'title' => 'Manikstu featured in The Hindu Business Line',
                'slug' => 'hindu-business-line',
                'excerpt' => 'The Hindu Business Line published an in-depth feature on our Goat Bank model and its potential to transform rural economies across India.',
                'category_id' => $pressCategory->id,
                'featured_image' => '/7.png',
                'published_at' => '2023-09-18',
            ],
            [
                'title' => 'Mobile App Launch for Farmer Onboarding',
                'slug' => 'mobile-app-launch',
                'excerpt' => 'Launch of our mobile application designed to streamline farmer onboarding, village visits, and delivery of essential agricultural services.',
                'category_id' => $mediaCategory->id,
                'featured_image' => '/8.png',
                'published_at' => '2023-08-12',
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => $post['slug']],
                array_merge($post, ['is_published' => true])
            );
        }
    }

    private function seedHomepage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'home'],
            ['title' => 'Homepage', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'stats',
                'title' => 'Our Impact',
                'content' => json_encode([
                    ['value' => '70,000+', 'label' => 'Farmers Impacted', 'icon' => 'Users', 'image' => '/patterns/impact-panel-1.png'],
                    ['value' => '10,000+', 'label' => 'Villages Reached', 'icon' => 'MapPin', 'image' => '/patterns/impact-panel-2.png'],
                    ['value' => '7,00,000+', 'label' => 'Goats Insured', 'icon' => 'Sprout', 'image' => '/patterns/impact-panel-3.png'],
                    ['value' => '10+', 'label' => 'States Covered', 'icon' => 'Shield', 'image' => '/patterns/impact-panel-4.png'],
                ]),
                'order' => 1,
            ],
            [
                'type' => 'text',
                'title' => 'Our Mission',
                'content' => json_encode([
                    'heading' => 'Worldwide, fostering a prosperous and sustainable agricultural future.',
                    'description' => "Since 2015, we have been empowering India's goat farmers with modern practices, financial support and innovative solutions.",
                    'pillars' => [
                        ['icon' => 'Cpu', 'title' => 'Driving Progress with Technology', 'description' => 'Leveraging technology and innovation to empower farmers with actionable data.', 'image' => '/patterns/mission-driving-progress.png'],
                        ['icon' => 'Handshake', 'title' => 'Collaborating for Success', 'description' => 'Building strong partnerships with cooperatives, organizations and governments.', 'image' => '/patterns/mission-collaborating.png'],
                        ['icon' => 'Home', 'title' => 'Empowering Rural Livelihoods', 'description' => 'Creating opportunities and strengthening rural communities through goat farming.', 'image' => '/patterns/mission-rural-livelihoods.png'],
                        ['icon' => 'Lightbulb', 'title' => 'Innovating for Tomorrow', 'description' => 'Continuously developing new solutions for farm development and inclusive future.', 'image' => '/patterns/mission-innovating.png'],
                    ],
                ]),
                'order' => 2,
            ],
            [
                'type' => 'text',
                'title' => 'Flagship Program',
                'content' => json_encode([
                    'heading' => 'Project AJAH',
                    'description' => "AJAH – Women-Led Integrated Livestock Entrepreneurship Initiative. Empowering women farmers through an integrated goat and poultry livelihood model, combining scientific livestock management, improved infrastructure, animal healthcare, training, insurance and market support.",
                    'badge' => '10 Female Goats + 2 Male Goats | Women-Led Livestock Entrepreneurship',
                    'cta_text' => 'Explore Project AJAH',
                    'cta_href' => '/collaborate/ajah',
                ]),
                'order' => 3,
            ],
            [
                'type' => 'partners',
                'title' => 'Our Network',
                'content' => json_encode([
                    'row1' => [
                        ['name' => 'Krimanshi', 'image' => '/1.png'],
                        ['name' => 'Bharat Herbs Co.', 'image' => '/2.png'],
                        ['name' => 'Goat Bank Odisha', 'image' => '/3.png'],
                        ['name' => 'TrainGuru', 'image' => '/4.png'],
                        ['name' => 'AIC', 'image' => '/AIC.png'],
                        ['name' => 'KIIT TBI', 'image' => '/5.png'],
                        ['name' => 'ILS', 'image' => '/6.png'],
                        ['name' => 'Miller Center', 'image' => '/7.png'],
                        ['name' => 'Startup Odisha', 'image' => '/8.png'],
                        ['name' => 'Startup India', 'image' => '/9.png'],
                        ['name' => 'MSME', 'image' => '/10.png'],
                    ],
                    'row2' => [
                        ['name' => 'Supporting Partner', 'image' => '/11.png'],
                        ['name' => 'Supporting Partner 2', 'image' => '/12.png'],
                        ['name' => 'Kalinga Kusum', 'image' => '/15.png'],
                        ['name' => 'HDFC Parivartan', 'image' => '/16.png'],
                        ['name' => 'Oxfam', 'image' => '/17.png'],
                        ['name' => 'Upaya', 'image' => '/18.png'],
                        ['name' => 'Sambhav', 'image' => '/20.png'],
                        ['name' => 'HDFC Bank', 'image' => '/21.png'],
                        ['name' => 'Atal Incubation Centre', 'image' => '/AIC.png'],
                    ],
                    'categories' => [
                        ['title' => 'Operational Partners', 'partners' => [['name' => 'Krimanshi', 'image' => '/1.png'], ['name' => 'Bharat Herbs Co.', 'image' => '/2.png'], ['name' => 'Goat Bank Odisha', 'image' => '/3.png'], ['name' => 'TrainGuru', 'image' => '/4.png'], ['name' => 'AIC', 'image' => '/AIC.png']]],
                        ['title' => 'Incubation Partners', 'partners' => [['name' => 'KIIT TBI', 'image' => '/5.png'], ['name' => 'ILS', 'image' => '/6.png'], ['name' => 'Miller Center', 'image' => '/7.png'], ['name' => 'Startup Odisha', 'image' => '/8.png'], ['name' => 'Startup India', 'image' => '/9.png'], ['name' => 'MSME', 'image' => '/10.png']]],
                        ['title' => 'Supporting Partners', 'partners' => [['name' => 'Supporting Partner', 'image' => '/11.png'], ['name' => 'Supporting Partner 2', 'image' => '/12.png']]],
                        ['title' => 'CSR Partners', 'partners' => [['name' => 'Kalinga Kusum', 'image' => '/15.png'], ['name' => 'HDFC Parivartan', 'image' => '/16.png'], ['name' => 'Oxfam', 'image' => '/17.png']]],
                        ['title' => 'Investing Partners', 'partners' => [['name' => 'Upaya', 'image' => '/18.png']]],
                        ['title' => 'Banking Partner', 'partners' => [['name' => 'Sambhav', 'image' => '/20.png'], ['name' => 'HDFC Bank', 'image' => '/21.png'], ['name' => 'Atal Incubation Centre', 'image' => '/AIC.png']]],
                    ],
                ]),
                'order' => 4,
            ],
            [
                'type' => 'text',
                'title' => 'Mobile App',
                'content' => json_encode([
                    'heading' => 'Empowering Farmers with Technology',
                    'description' => 'Our mobile app streamlines and enhances the entire onboarding process, village visits, and delivery of essential agricultural services.',
                    'features' => [
                        ['icon' => 'Shield', 'text' => "Spot treatment & vaccination of farmers' goats"],
                        ['icon' => 'User', 'text' => 'Support for field representatives in their daily tasks'],
                        ['icon' => 'BarChart3', 'text' => 'Activity management & farm governance'],
                        ['icon' => 'ShoppingBag', 'text' => 'Sales of company products for farmers'],
                    ],
                ]),
                'order' => 5,
            ],
            [
                'type' => 'testimonials',
                'title' => 'What Farmers Say',
                'content' => json_encode([
                    ['quote' => "Manikstu's support has transformed our lives. The loans and insurance helped me grow my goat farm and income.", 'name' => 'Ramesh Pradhan', 'role' => 'Farmer, Mayurbhanj, Odisha', 'initials' => 'RP', 'color' => 'bg-manikstu-green'],
                    ['quote' => 'With training and proper guidance, our goats are healthier and our earnings have increased significantly.', 'name' => 'Lakshmi Devi', 'role' => 'Farmer, Keonjhar, Odisha', 'initials' => 'LD', 'color' => 'bg-manikstu-red'],
                    ['quote' => 'The veterinary support at my doorstep saved my herd during the last outbreak. I owe my livelihood to their team.', 'name' => 'Sanjay Nayak', 'role' => 'Farmer, Kalahandi, Odisha', 'initials' => 'SN', 'color' => 'bg-manikstu-gold'],
                    ['quote' => 'Being part of the women-led initiative gave me both confidence and a steady income. My family is proud of me.', 'name' => 'Anita Majhi', 'role' => 'Farmer, Balangir, Odisha', 'initials' => 'AM', 'color' => 'bg-saura-red'],
                    ['quote' => 'The Goat Care app makes tracking vaccinations and sales simple. What used to take a whole day now takes minutes.', 'name' => 'Prakash Behera', 'role' => 'Farmer, Sundargarh, Odisha', 'initials' => 'PB', 'color' => 'bg-manikstu-leaf'],
                ]),
                'order' => 6,
            ],
        ];

        foreach ($blocks as $i => $block) {
            $page->blocks()->create($block);
        }
    }

    private function seedAboutPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'about'],
            ['title' => 'About', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'text',
                'title' => 'Vision',
                'content' => json_encode([
                    'paragraphs' => [
                        "To become India's most trusted goat farming ecosystem — connecting farmers with market access, technology, and sustainable practices that transform rural livelihoods and strengthen communities across Odisha and Chhattisgarh.",
                        'By 2030, we aim to empower 50,000+ farmers with modern goat farming techniques, creating sustainable income streams and strengthening rural economies.',
                    ],
                ]),
                'order' => 1,
            ],
            [
                'type' => 'text',
                'title' => 'Mission',
                'content' => json_encode([
                    'paragraphs' => [
                        'To revolutionize goat farming through integrated solutions: providing high-quality genetics, comprehensive veterinary care, market access, and training programs that create lasting positive impact for farmers and their communities.',
                        'We believe in farming with heart — nurturing both goats and farmers towards a greener, more prosperous future.',
                    ],
                ]),
                'order' => 2,
            ],
            [
                'type' => 'stats',
                'title' => 'Timeline',
                'content' => json_encode([
                    ['year' => '2015', 'title' => 'Manikstu Agro Founded', 'description' => 'Started with a vision to transform goat farming in Kalahandi, beginning with 500 goats and 5 farming families.'],
                    ['year' => '2018', 'title' => 'First Training Program', 'description' => 'Launched comprehensive goat care training, reaching 200 farmers across 3 districts with certified trainers.'],
                    ['year' => '2021', 'title' => 'Goat Bank Initiative', 'description' => 'Started Samarth goat bank project, providing breeding stock to 1,000+ small farmers with community trust.'],
                    ['year' => '2024', 'title' => 'Website & E-commerce', 'description' => 'Launched our digital presence with e-commerce platform for products, revolutionizing how farmers access quality goat products.'],
                ]),
                'order' => 3,
            ],
            [
                'type' => 'text',
                'title' => 'Values',
                'content' => json_encode([
                    ['icon' => 'Heart', 'title' => 'Community First', 'description' => 'We believe in farming with heart, nurturing both goats and farmers towards sustainable futures.'],
                    ['icon' => 'Target', 'title' => 'Quality', 'description' => 'We provide only the highest quality genetics, veterinary care, and farming practices for long-term success.'],
                    ['icon' => 'Users', 'title' => 'Sustainability', 'description' => 'Our practices protect the environment and create lasting economic value for rural communities.'],
                ]),
                'order' => 4,
            ],
        ];

        foreach ($blocks as $block) {
            $page->blocks()->create($block);
        }
    }

    private function seedTrainingPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'training'],
            ['title' => 'Training & Awareness', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'training_programs',
                'title' => 'Programs',
                'content' => json_encode([
                    ['icon' => 'GraduationCap', 'title' => 'Farmer Field Training', 'description' => 'Hands-on training at our model farms on scientific goat rearing, balanced feeding, breeding and herd health.', 'image' => '/patterns/training-farmer-field.png'],
                    ['icon' => 'Users', 'title' => 'FPO & SHG Capacity Building', 'description' => 'Strengthening Farmer Producer Organizations and self-help groups with governance, aggregation and collective marketing.', 'image' => '/patterns/training-fpo-shg.png'],
                    ['icon' => 'Stethoscope', 'title' => 'Veterinary & Animal Health Awareness', 'description' => 'Community vet camps and awareness drives on vaccination, disease prevention and timely treatment.', 'image' => '/patterns/training-vet-health.png', 'imageScale' => '115% auto'],
                    ['icon' => 'Sprout', 'title' => 'Sustainable & Regenerative Farming', 'description' => 'Fodder cultivation, water stewardship and low-emission practices for resilient rural livelihoods.', 'image' => '/patterns/training-sustainable.png'],
                    ['icon' => 'Sparkles', 'title' => 'Women & Youth Empowerment', 'description' => 'Skill development and entrepreneurship pathways for women and rural youth in the livestock economy.', 'image' => '/patterns/training-women-youth.png'],
                    ['icon' => 'Banknote', 'title' => 'Goat Bank & Livelihood Training', 'description' => 'Training on our Goat Bank model that builds assets, diversifies income and de-risks rural livelihoods.', 'image' => '/patterns/training-farmer-field.png'],
                ]),
                'order' => 1,
            ],
            [
                'type' => 'awareness_initiatives',
                'title' => 'Awareness Initiatives',
                'content' => json_encode([
                    ['icon' => 'Megaphone', 'title' => 'Community Awareness Drives', 'description' => 'Village-level campaigns on nutrition, hygiene and the value of improved livestock practices.', 'image' => '/patterns/awareness-community-drives.png'],
                    ['icon' => 'HeartPulse', 'title' => 'Veterinary Health Camps', 'description' => 'Periodic camps for vaccination, deworming and early diagnosis in partnership with local vets.', 'image' => '/patterns/awareness-vet-camps.png'],
                    ['icon' => 'Wheat', 'title' => 'Demo Plots & Field Days', 'description' => 'Live demonstrations of fodder, feeding and housing models farmers can adapt on their own land.', 'image' => '/patterns/awareness-demo-plots.png'],
                    ['icon' => 'Radio', 'title' => 'Rural Radio & IVRS Advisories', 'description' => 'Timely, localized advisories on weather, disease outbreaks and best practices in native dialects.', 'image' => '/patterns/awareness-radio-ivrs.png'],
                ]),
                'order' => 2,
            ],
            [
                'type' => 'stats',
                'title' => 'Training Impact',
                'content' => json_encode([
                    ['value' => '10,000+', 'label' => 'Farmers Trained', 'icon' => 'GraduationCap'],
                    ['value' => '700+', 'label' => 'Villages Reached', 'icon' => 'MapPin'],
                    ['value' => '3+', 'label' => 'States Covered', 'icon' => 'Shield'],
                    ['value' => '7,00,000+', 'label' => 'Goats Impacted', 'icon' => 'Sprout'],
                ]),
                'order' => 3,
            ],
            [
                'type' => 'cta_pillars',
                'title' => 'Training CTA',
                'content' => json_encode([
                    ['icon' => 'Users', 'line1' => 'Empowering', 'line2' => 'Communities'],
                    ['icon' => 'GraduationCap', 'line1' => 'Practical', 'line2' => 'Training'],
                    ['icon' => 'Handshake', 'line1' => 'Stronger', 'line2' => 'Partnerships'],
                    ['icon' => 'Sprout', 'line1' => 'Sustainable', 'line2' => 'Impact'],
                ]),
                'order' => 4,
            ],
        ];

        foreach ($blocks as $block) {
            $page->blocks()->create($block);
        }
    }

    private function seedCareersPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'careers'],
            ['title' => 'Careers', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'career_values',
                'title' => 'Why Join Us',
                'content' => json_encode([
                    ['icon' => 'impact', 'title' => 'Impact That Matters', 'description' => 'Your work directly contributes to improving rural livelihoods and farmer communities.'],
                    ['icon' => 'growth', 'title' => 'Learning & Growth', 'description' => 'Opportunities to learn continuously and develop professionally in a growing organization.'],
                    ['icon' => 'culture', 'title' => 'Collaborative Culture', 'description' => 'Work with passionate people who support, challenge and inspire you.'],
                    ['icon' => 'sustainability', 'title' => 'Sustainability at Heart', 'description' => 'Contribute to ethical and sustainable agricultural development that transforms communities.'],
                ]),
                'order' => 1,
            ],
            [
                'type' => 'career_benefits',
                'title' => 'Benefits',
                'content' => json_encode([
                    ['icon' => 'health', 'title' => 'Health & Wellness', 'description' => 'Comprehensive health support for you and your family.'],
                    ['icon' => 'learning', 'title' => 'Learning Support', 'description' => 'Access to training and professional development.'],
                    ['icon' => 'flexible', 'title' => 'Flexible Work', 'description' => 'Balanced work arrangements to support your lifestyle.'],
                    ['icon' => 'impact', 'title' => 'Impact Leave', 'description' => 'Time to contribute to community development initiatives.'],
                    ['icon' => 'growth', 'title' => 'Growth Path', 'description' => 'Clear career progression and leadership opportunities.'],
                ]),
                'order' => 2,
            ],
        ];

        foreach ($blocks as $block) {
            $page->blocks()->create($block);
        }
    }

    private function seedCollaboratePage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'collaborate'],
            ['title' => 'Collaborate', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'partner_types',
                'title' => 'Who We Partner With',
                'content' => json_encode([
                    ['icon' => 'Users', 'title' => 'FPOs & SHGs', 'description' => 'Strengthen farmer producer organizations and self-help groups with training, aggregation and collective market access.'],
                    ['icon' => 'Building2', 'title' => 'Corporates & CSR', 'description' => 'Co-create CSR and sustainability programs that deliver measurable rural livelihoods and ESG outcomes.'],
                    ['icon' => 'HeartHandshake', 'title' => 'NGOs & Development Orgs', 'description' => 'Combine on-ground reach with our technical expertise to scale livestock interventions that last.'],
                    ['icon' => 'Landmark', 'title' => 'Government & Research', 'description' => 'Partner on schemes, pilots and studies that inform policy and strengthen the livestock value chain.'],
                    ['icon' => 'Truck', 'title' => 'Supply Chain & Retail', 'description' => 'Source ethically produced, traceable livestock products and build resilient last-mile linkages.'],
                    ['icon' => 'Banknote', 'title' => 'Financial Institutions', 'description' => 'Enable credit, insurance and Goat Bank models that de-risk rural livelihoods and expand inclusion.'],
                ]),
                'order' => 1,
            ],
            [
                'type' => 'steps',
                'title' => 'How It Works',
                'content' => json_encode([
                    ['step' => '01', 'title' => 'Discover', 'description' => 'We listen to communities and partners to understand local needs, assets and gaps.', 'icon' => 'Compass'],
                    ['step' => '02', 'title' => 'Design', 'description' => 'We co-create programs that blend our livestock expertise with partner strengths.', 'icon' => 'ClipboardList'],
                    ['step' => '03', 'title' => 'Deploy', 'description' => 'We implement on the ground with training, infrastructure and continuous handholding.', 'icon' => 'Rocket'],
                    ['step' => '04', 'title' => 'Measure', 'description' => 'We track outcomes and refine together to ensure durable, scalable impact.', 'icon' => 'TrendingUp'],
                ]),
                'order' => 2,
            ],
            [
                'type' => 'stats',
                'title' => 'Collaborate Impact',
                'content' => json_encode([
                    ['value' => '50+', 'label' => 'Partner Organizations', 'icon' => 'Building2'],
                    ['value' => '700+', 'label' => 'Villages Reached', 'icon' => 'MapPin'],
                    ['value' => '10,000+', 'label' => 'Farmers Engaged', 'icon' => 'Users'],
                    ['value' => '3+', 'label' => 'States Covered', 'icon' => 'Shield'],
                ]),
                'order' => 3,
            ],
            [
                'type' => 'cta_pillars',
                'title' => 'Collaborate CTA',
                'content' => json_encode([
                    ['icon' => 'Building2', 'line1' => 'Institutional', 'line2' => 'Trust'],
                    ['icon' => 'MapPin', 'line1' => 'Grassroots', 'line2' => 'Delivery'],
                    ['icon' => 'Handshake', 'line1' => 'Shared', 'line2' => 'Governance'],
                    ['icon' => 'Sprout', 'line1' => 'Sustainable', 'line2' => 'Value'],
                ]),
                'order' => 4,
            ],
        ];

        foreach ($blocks as $block) {
            $page->blocks()->create($block);
        }
    }

    private function seedAjahPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'ajah'],
            ['title' => 'Project AJAH', 'is_published' => true]
        );

        $page->blocks()->delete();

        $blocks = [
            [
                'type' => 'text',
                'title' => 'AJAH Pillars',
                'content' => json_encode([
                    ['icon' => 'Sprout', 'title' => 'Scientific Livestock Management', 'description' => 'Improved breeding, feeding and husbandry practices for healthier, more productive animals.'],
                    ['icon' => 'Warehouse', 'title' => 'Improved Infrastructure', 'description' => 'Better housing, fodder storage and farm setups that raise productivity and comfort.'],
                    ['icon' => 'HeartPulse', 'title' => 'Animal Healthcare', 'description' => 'Routine vaccination, disease prevention and timely veterinary care for resilient herds.'],
                    ['icon' => 'GraduationCap', 'title' => 'Training', 'description' => 'Hands-on skill building for women farmers to manage and grow their livestock enterprises.'],
                    ['icon' => 'ShieldCheck', 'title' => 'Insurance', 'description' => 'Risk cover that protects families and assets against illness, loss and climate shocks.'],
                    ['icon' => 'ShoppingBag', 'title' => 'Market Support', 'description' => 'Linkages to fair, reliable markets so women entrepreneurs earn what their work is worth.'],
                ]),
                'order' => 1,
            ],
        ];

        foreach ($blocks as $block) {
            $page->blocks()->create($block);
        }
    }
}
