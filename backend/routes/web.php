<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\PressController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\CareerController;
use App\Http\Controllers\Admin\TrainingController;
use App\Http\Controllers\Admin\AwarenessController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\EnquiryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PasswordResetController;
use App\Http\Controllers\Telecalling\TelecallingController;

Route::get('/', fn() => redirect()->route('admin.login'));

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->middleware('throttle:5,1');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/forgot-password', [PasswordResetController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail'])->name('password.email')->middleware('throttle:5,1');
    Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', [PasswordResetController::class, 'reset'])->name('password.update')->middleware('throttle:5,1');

    Route::middleware(['auth', 'throttle:120,1', 'area:admin'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('products', ProductController::class)->except('destroy');
        Route::put('/products/{product}/toggle-publish', [ProductController::class, 'togglePublish'])->name('products.togglePublish');
        Route::resource('categories', CategoryController::class)->except(['show', 'destroy']);
        Route::resource('blog', BlogController::class)->except(['show', 'destroy']);
        Route::resource('press', PressController::class)->except(['show', 'destroy']);
        Route::resource('team', TeamController::class)->except(['show', 'destroy']);
        Route::resource('careers', CareerController::class)->except(['show', 'destroy']);
        Route::resource('training', TrainingController::class)->except(['show', 'destroy']);
        Route::resource('awareness', AwarenessController::class)->except(['show', 'destroy']);
        Route::resource('testimonials', TestimonialController::class)->except(['show', 'destroy']);
        Route::resource('partners', PartnerController::class)->except(['show', 'destroy']);
        Route::resource('enquiries', EnquiryController::class)->only(['index', 'show']);
        Route::resource('orders', OrderController::class)->except('destroy');
        Route::resource('customers', CustomerController::class)->except(['show', 'destroy']);

        // ponytail: destructive operations are developer-only
        Route::middleware('role:developer')->group(function () {
            Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
            Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
            Route::delete('/blog/{blog}', [BlogController::class, 'destroy'])->name('blog.destroy');
            Route::delete('/press/{press}', [PressController::class, 'destroy'])->name('press.destroy');
            Route::delete('/team/{team}', [TeamController::class, 'destroy'])->name('team.destroy');
            Route::delete('/careers/{career}', [CareerController::class, 'destroy'])->name('careers.destroy');
            Route::delete('/training/{training}', [TrainingController::class, 'destroy'])->name('training.destroy');
            Route::delete('/awareness/{awareness}', [AwarenessController::class, 'destroy'])->name('awareness.destroy');
            Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
            Route::delete('/partners/{partner}', [PartnerController::class, 'destroy'])->name('partners.destroy');
            Route::delete('/enquiries/{enquiry}', [EnquiryController::class, 'destroy'])->name('enquiries.destroy');
            Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');
            Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
            Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
        });

        // ponytail: user administration is developer-only (least privilege; prevents role escalation)
        Route::middleware('role:developer')->group(function () {
            Route::resource('users', UserController::class)->except('show');
            Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
            Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
        });

        Route::get('/pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
        Route::put('/pages/{page}', [PageController::class, 'update'])->name('pages.update');
        Route::post('/pages/{page}/blocks', [PageController::class, 'storeBlock'])->name('pages.blocks.store');
        Route::post('/blocks/reorder', [PageController::class, 'reorderBlocks'])->name('blocks.reorder');

        Route::middleware('role:developer')->group(function () {
            Route::delete('/blocks/{block}', [PageController::class, 'destroyBlock'])->name('blocks.destroy');
        });

        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
    });
});

/*
| Telecalling area — same shared login (/admin/login) routes telecallers here.
| Only accounts with role = "telecaller" may access; anyone else is redirected
| to the admin dashboard by the `area:telecalling` guard.
*/
Route::prefix('telecalling')->name('telecalling.')->middleware(['auth', 'throttle:120,1', 'area:telecalling'])->group(function () {
    Route::get('/', fn() => redirect()->route('telecalling.dashboard'));
    Route::get('/dashboard', [TelecallingController::class, 'index'])->name('dashboard');

    // Order tracking detail (register before the section catch so /orders stays the list).
    Route::get('/orders/{id}', [TelecallingController::class, 'orderDetail'])->name('order.show');
    Route::get('/complaints/{id}', [TelecallingController::class, 'complaintDetail'])->name('complaint.show');
    Route::get('/franchise/{id}', [TelecallingController::class, 'franchiseDetail'])->name('franchise.show');
    Route::put('/settings/profile', [TelecallingController::class, 'updateProfile'])->name('settings.profile');

    // Sidebar sections (placeholder pages for now; dashboard is the live one).
    foreach (['farmers', 'orders', 'products', 'delivery', 'complaints', 'telecalling', 'franchise', 'reports', 'settings'] as $section) {
        Route::get("/{$section}", [TelecallingController::class, 'section'])->name($section);
    }
});
