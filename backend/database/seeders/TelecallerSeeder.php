<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TelecallerSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'telecalling@manikstu.com'],
            [
                'name' => 'Telecaller',
                'password' => Hash::make(env('TELECALLER_PASSWORD', 'password')),
                'role' => 'telecaller',
                'is_active' => true,
            ]
        );
    }
}
