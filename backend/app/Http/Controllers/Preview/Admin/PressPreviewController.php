<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\PressController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\PressRelease;
use Illuminate\Http\Request;

class PressPreviewController extends PressController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }

    public function create()
    {
        return $this->preview(parent::create());
    }

    public function edit(PressRelease $release)
    {
        return $this->preview(parent::edit($release));
    }
}
