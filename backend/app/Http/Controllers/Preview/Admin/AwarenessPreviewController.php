<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\AwarenessController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\AwarenessInitiative;
use Illuminate\Http\Request;

class AwarenessPreviewController extends AwarenessController
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

    public function edit(AwarenessInitiative $initiative)
    {
        return $this->preview(parent::edit($initiative));
    }
}
