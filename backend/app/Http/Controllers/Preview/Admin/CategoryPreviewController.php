<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryPreviewController extends CategoryController
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

    public function edit(Category $category)
    {
        return $this->preview(parent::edit($category));
    }
}
