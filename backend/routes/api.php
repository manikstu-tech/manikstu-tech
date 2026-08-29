<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

// Throttle: 60 req/min for GET endpoints
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/settings', [ApiController::class, 'getSettings']);
    Route::get('/navigation', [ApiController::class, 'getNavigation']);
    Route::get('/footer', [ApiController::class, 'getFooter']);
    Route::get('/pages/{slug}', [ApiController::class, 'getPage']);
    Route::get('/blog', [ApiController::class, 'getBlogPosts']);
    Route::get('/blog/categories', [ApiController::class, 'getBlogCategories']);
    Route::get('/blog/{slug}', [ApiController::class, 'getBlogPost']);
    Route::get('/press', [ApiController::class, 'getPressReleases']);
    Route::get('/press/{slug}', [ApiController::class, 'getPressRelease']);
    Route::get('/products', [ApiController::class, 'getProducts']);
    Route::get('/products/{slug}', [ApiController::class, 'getProduct']);
    Route::get('/categories', [ApiController::class, 'getCategories']);
    Route::get('/testimonials', [ApiController::class, 'getTestimonials']);
    Route::get('/team', [ApiController::class, 'getTeamMembers']);
    Route::get('/careers', [ApiController::class, 'getJobOpenings']);
    Route::get('/training', [ApiController::class, 'getTrainingPrograms']);
    Route::get('/awareness', [ApiController::class, 'getAwareness']);
    Route::get('/stats', [ApiController::class, 'getStats']);
    Route::get('/gallery', [ApiController::class, 'getGallery']);
    Route::get('/partners', [ApiController::class, 'getPartners']);
});

// Throttle: 10 req/min for spam-prone POST endpoints (unauthenticated)
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/enquiries', [ApiController::class, 'storeEnquiry']);
    Route::post('/orders', [ApiController::class, 'storeOrder']);
});
