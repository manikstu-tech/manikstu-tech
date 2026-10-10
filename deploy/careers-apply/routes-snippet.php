<?php

// COPY-PASTE into routes/api.php on the server, then run: php artisan route:clear
//
// 1. Public apply route — put with the other PUBLIC routes (no auth middleware):
use App\Http\Controllers\Api\CareerApplicationController;

Route::post('/careers/{id}/apply', [CareerApplicationController::class, 'store']);

// 2. Admin routes — put INSIDE your existing /admin group
//    (wherever your other /admin/* routes live, same auth/role middleware):
use App\Http\Controllers\Admin\ApplicationController;

Route::get('/admin/applications', [ApplicationController::class, 'index']);
Route::post('/admin/applications/{id}', [ApplicationController::class, 'update']);
Route::get('/admin/applications/{id}/resume', [ApplicationController::class, 'resume']);
