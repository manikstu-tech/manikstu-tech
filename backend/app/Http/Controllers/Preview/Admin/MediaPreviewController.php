<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Preview\RendersPreview;
use Illuminate\Http\Request;

class MediaPreviewController extends MediaController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }
}
