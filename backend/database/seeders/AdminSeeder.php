<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = env('ADMIN_PASSWORD') ?? Str::random(24);

        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@manikstu.com',
            'password' => Hash::make($password),
        ]);
        $user->role = 'developer';
        $user->is_active = true;
        $user->save();

        // ponytail: no fixed default; if ADMIN_PASSWORD unset we emit the random one to logs once
        if (!env('ADMIN_PASSWORD')) {
            logger()->info('Admin seeded with a random password (set ADMIN_PASSWORD to control it): '.$password);
        }
    }
}
