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
    Route::get('/', fn() => redirect()->route('admin.login'));
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
    Route::put('/notifications/read', [TelecallingController::class, 'markNotificationsRead'])->name('notifications.read');

    // Sidebar sections (placeholder pages for now; dashboard is the live one).
    foreach (['farmers', 'orders', 'products', 'delivery', 'complaints', 'telecalling', 'franchise', 'reports', 'settings'] as $section) {
        Route::get("/{$section}", [TelecallingController::class, 'section'])->name($section);
    }
});

/*
|--------------------------------------------------------------------------
| View-only preview panels
|--------------------------------------------------------------------------
| Exact visual copies of the Admin and Telecalling panels, kept completely
| separate from the originals. Same login/access guard, same live data (the
| preview controllers extend the real ones), same views (copied verbatim into
| the *_preview namespaces). GET pages render; every form-submit endpoint is a
| read-only stub so the originals can never be modified from a preview.
*/
$previewInert = fn () => abort(403, 'This is a read-only preview.');

Route::prefix('admin-preview')->name('admin-preview.')->middleware(['auth', 'throttle:120,1', 'area:admin'])->group(function () use ($previewInert) {
    $ns = 'App\\Http\\Controllers\\Preview\\Admin\\';

    // Auth page previews (render the copied login / password views).
    Route::get('/login', [$ns . 'LoginPreviewController', 'showLogin'])->name('login');
    Route::post('/login', $previewInert);
    Route::get('/forgot-password', [$ns . 'PasswordResetPreviewController', 'showLinkRequestForm'])->name('password.request');
    Route::post('/forgot-password', $previewInert)->name('password.email');
    Route::get('/reset-password/{token}', [$ns . 'PasswordResetPreviewController', 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', $previewInert)->name('password.update');
    // Real logout so "Sign Out" still works from the preview shell.
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [$ns . 'DashboardPreviewController', 'index'])->name('dashboard');

    // Resource preview pages — GET/view routes only.
    Route::resource('products', $ns . 'ProductPreviewController')->only(['index', 'create', 'show', 'edit']);
    Route::resource('categories', $ns . 'CategoryPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('blog', $ns . 'BlogPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('press', $ns . 'PressPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('team', $ns . 'TeamPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('careers', $ns . 'CareerPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('training', $ns . 'TrainingPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('awareness', $ns . 'AwarenessPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('testimonials', $ns . 'TestimonialPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('partners', $ns . 'PartnerPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('enquiries', $ns . 'EnquiryPreviewController')->only(['index', 'show']);
    Route::resource('orders', $ns . 'OrderPreviewController')->only(['index', 'create', 'show', 'edit']);
    Route::resource('customers', $ns . 'CustomerPreviewController')->only(['index', 'create', 'edit']);
    Route::resource('users', $ns . 'UserPreviewController')->only(['index', 'create', 'edit']);

    Route::get('/media', [$ns . 'MediaPreviewController', 'index'])->name('media.index');
    Route::get('/settings', [$ns . 'SettingPreviewController', 'edit'])->name('settings.edit');
    Route::get('/pages/{page}/edit', [$ns . 'PagePreviewController', 'edit'])->name('pages.edit');

    // Inert read-only stubs so route() resolves in the copied views.
    foreach ([
        'products', 'categories', 'blog', 'press', 'team', 'careers', 'training',
        'awareness', 'testimonials', 'partners', 'customers', 'orders', 'users', 'enquiries',
    ] as $r) {
        Route::post("/$r", $previewInert)->name("$r.store");
        Route::match(['put', 'patch'], "/$r/{id}", $previewInert)->name("$r.update");
        Route::delete("/$r/{id}", $previewInert)->name("$r.destroy");
    }
    Route::put('/products/{id}/toggle-publish', $previewInert)->name('products.togglePublish');
    Route::post('/media/upload', $previewInert)->name('media.upload');
    Route::delete('/media/{id}', $previewInert)->name('media.destroy');
    Route::put('/settings', $previewInert)->name('settings.update');
    Route::put('/pages/{id}', $previewInert)->name('pages.update');
    Route::post('/pages/{id}/blocks', $previewInert)->name('pages.blocks.store');
    Route::post('/blocks/reorder', $previewInert)->name('blocks.reorder');
    Route::delete('/blocks/{id}', $previewInert)->name('blocks.destroy');
});

Route::prefix('telecalling-preview')->name('telecalling-preview.')->middleware(['auth', 'throttle:120,1', 'area:telecalling'])->group(function () use ($previewInert) {
    $tc = \App\Http\Controllers\Preview\Telecalling\TelecallingPreviewController::class;

    Route::get('/', fn () => redirect()->route('telecalling-preview.dashboard'));
    Route::get('/dashboard', [$tc, 'index'])->name('dashboard');
    Route::get('/orders/{id}', [$tc, 'orderDetail'])->name('order.show');
    Route::get('/complaints/{id}', [$tc, 'complaintDetail'])->name('complaint.show');
    Route::get('/franchise/{id}', [$tc, 'franchiseDetail'])->name('franchise.show');
    Route::put('/settings/profile', $previewInert)->name('settings.profile');
    Route::put('/notifications/read', $previewInert)->name('notifications.read');

    foreach (['farmers', 'orders', 'products', 'delivery', 'complaints', 'telecalling', 'franchise', 'reports', 'settings'] as $section) {
        Route::get("/{$section}", [$tc, 'section'])->name($section);
    }
});
