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

Route::get('/', fn() => redirect()->route('admin.login'));

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->middleware('throttle:5,1');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('products', ProductController::class)->except('show');
        Route::resource('categories', CategoryController::class)->except('show');
        Route::resource('blog', BlogController::class)->except('show');
        Route::resource('press', PressController::class)->except('show');
        Route::resource('team', TeamController::class)->except('show');
        Route::resource('careers', CareerController::class)->except('show');
        Route::resource('training', TrainingController::class)->except('show');
        Route::resource('awareness', AwarenessController::class)->except('show');
        Route::resource('testimonials', TestimonialController::class)->except('show');
        Route::resource('partners', PartnerController::class)->except('show');
        Route::resource('enquiries', EnquiryController::class)->only(['index', 'show', 'destroy']);
        Route::resource('orders', OrderController::class)->except('show');
        Route::resource('customers', CustomerController::class)->except('show');
        Route::resource('users', UserController::class)->except('show');

        Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

        Route::get('/pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
        Route::put('/pages/{page}', [PageController::class, 'update'])->name('pages.update');
        Route::post('/pages/{page}/blocks', [PageController::class, 'storeBlock'])->name('pages.blocks.store');
        Route::delete('/blocks/{block}', [PageController::class, 'destroyBlock'])->name('blocks.destroy');
        Route::post('/blocks/reorder', [PageController::class, 'reorderBlocks'])->name('blocks.reorder');

        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
        Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
    });
});
