<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\TrainingController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\TrainingProgram;
use Illuminate\Http\Request;

class TrainingPreviewController extends TrainingController
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

    public function edit(TrainingProgram $program)
    {
        return $this->preview(parent::edit($program));
    }
}
