<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialPreviewController extends TestimonialController
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

    public function edit(Testimonial $testimonial)
    {
        return $this->preview(parent::edit($testimonial));
    }
}
