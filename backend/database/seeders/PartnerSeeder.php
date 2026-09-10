<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            // Operational Partners
            ['name' => 'Krimanshi', 'logo' => '/1.png', 'category' => 'operational', 'description' => 'Innovative goat breeding and genetics solutions for improved livestock productivity.', 'website_url' => null, 'order' => 1],
            ['name' => 'Bharat Herbs Co.', 'logo' => '/2.png', 'category' => 'operational', 'description' => 'Natural herbal supplements and feed additives for livestock health.', 'website_url' => null, 'order' => 2],
            ['name' => 'Goat Bank Odisha', 'logo' => '/3.png', 'category' => 'operational', 'description' => 'Community-based goat lending program empowering rural farmers in Odisha.', 'website_url' => null, 'order' => 3],
            ['name' => 'TrainGuru', 'logo' => '/4.png', 'category' => 'operational', 'description' => 'Digital training platform for agricultural skill development and capacity building.', 'website_url' => null, 'order' => 4],
            ['name' => 'AIC', 'logo' => '/AIC.png', 'category' => 'operational', 'description' => 'Atal Incubation Centre supporting agricultural innovation and rural entrepreneurship.', 'website_url' => null, 'order' => 5],

            // Incubation Partners
            ['name' => 'KIIT TBI', 'logo' => '/5.png', 'category' => 'incubation', 'description' => 'KIIT Technology Business Incubator fostering rural tech startups.', 'website_url' => null, 'order' => 6],
            ['name' => 'ILS', 'logo' => '/6.png', 'category' => 'incubation', 'description' => 'Institute of Life Sciences supporting biotech research in agriculture.', 'website_url' => null, 'order' => 7],
            ['name' => 'Miller Center', 'logo' => '/7.png', 'category' => 'incubation', 'description' => 'Social enterprise accelerator for impact-driven agricultural ventures.', 'website_url' => null, 'order' => 8],
            ['name' => 'Startup Odisha', 'logo' => '/8.png', 'category' => 'incubation', 'description' => 'State government initiative promoting agricultural entrepreneurship in Odisha.', 'website_url' => null, 'order' => 9],
            ['name' => 'Startup India', 'logo' => '/startup-india.png', 'category' => 'incubation', 'description' => 'Government of India flagship initiative supporting agri-tech startups.', 'website_url' => null, 'order' => 10],
            ['name' => 'MSME', 'logo' => '/10.png', 'category' => 'incubation', 'description' => 'Ministry of Micro, Small and Medium Enterprises supporting rural businesses.', 'website_url' => null, 'order' => 11],
            ['name' => 'Next Bharat', 'logo' => '/next-bharat.png', 'category' => 'incubation', 'description' => 'Impact fund investing in scalable rural livelihood solutions.', 'website_url' => null, 'order' => 12],

            // Supporting Partners
            ['name' => 'Supporting Partner', 'logo' => '/11.png', 'category' => 'supporting', 'description' => 'Key supporting partner in rural agricultural development.', 'website_url' => null, 'order' => 13],
            ['name' => 'Supporting Partner 2', 'logo' => '/12.png', 'category' => 'supporting', 'description' => 'Contributing to sustainable farming practices and community growth.', 'website_url' => null, 'order' => 14],

            // CSR Partners
            ['name' => 'Kalinga Kusum', 'logo' => '/15.png', 'category' => 'csr', 'description' => 'CSR initiative supporting rural women empowerment through agriculture.', 'website_url' => null, 'order' => 15],
            ['name' => 'HDFC Parivartan', 'logo' => '/16.png', 'category' => 'csr', 'description' => 'HDFC Bank CSR program for sustainable rural livelihood development.', 'website_url' => null, 'order' => 16],
            ['name' => 'Oxfam', 'logo' => '/17.png', 'category' => 'csr', 'description' => 'International development organization fighting poverty and injustice.', 'website_url' => null, 'order' => 17],

            // Investing Partners
            ['name' => 'Upaya', 'logo' => '/18.png', 'category' => 'investing', 'description' => 'Impact investment firm backing rural enterprises and social ventures.', 'website_url' => null, 'order' => 18],
            ['name' => 'Beneficial Returns', 'logo' => '/beneficial-returns.jpeg', 'category' => 'investing', 'description' => 'Social impact fund providing patient capital for agricultural development.', 'website_url' => null, 'order' => 19],

            // Banking Partners
            ['name' => 'Sambhav', 'logo' => '/20.png', 'category' => 'banking', 'description' => 'Microfinance institution enabling financial inclusion for rural communities.', 'website_url' => null, 'order' => 20],
            ['name' => 'HDFC Bank', 'logo' => '/21.png', 'category' => 'banking', 'description' => 'Leading private bank supporting agricultural financing and rural banking.', 'website_url' => null, 'order' => 21],
            ['name' => 'Atal Incubation Centre', 'logo' => '/AIC.png', 'category' => 'banking', 'description' => 'NITI Aayog initiative supporting agricultural innovation and rural incubation.', 'website_url' => null, 'order' => 22],
        ];

        foreach ($partners as $data) {
            Partner::updateOrCreate(
                ['name' => $data['name']],
                $data
            );
        }
    }
}
