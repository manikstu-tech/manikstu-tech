<?php

namespace App\Providers;

use App\View\Composers\TelecallingNotificationsComposer;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ponytail: force HTTPS in production so session/auth cookies never leak over plain HTTP
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        // Live notification feed for the telecalling topbar bell.
        View::composer('telecalling.layouts.app', TelecallingNotificationsComposer::class);
    }
}
