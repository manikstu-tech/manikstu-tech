<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductPreviewController extends ProductController
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

    public function show(Product $product)
    {
        return $this->preview(parent::show($product));
    }

    public function edit(Product $product)
    {
        return $this->preview(parent::edit($product));
    }
}
