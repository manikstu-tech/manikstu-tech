<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPreviewController extends BlogController
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

    public function edit(BlogPost $post)
    {
        return $this->preview(parent::edit($post));
    }
}
