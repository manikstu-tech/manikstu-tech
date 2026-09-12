<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Preview\RendersPreview;
use Illuminate\Http\Request;

class DashboardPreviewController extends DashboardController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }
}
