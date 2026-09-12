<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\CareerController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\JobOpening;
use Illuminate\Http\Request;

class CareerPreviewController extends CareerController
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

    public function edit(JobOpening $job)
    {
        return $this->preview(parent::edit($job));
    }
}
