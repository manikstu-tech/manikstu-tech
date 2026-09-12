<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderPreviewController extends OrderController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }

    public function show(Order $order)
    {
        return $this->preview(parent::show($order));
    }

    public function create()
    {
        return $this->preview(parent::create());
    }

    public function edit(Order $order)
    {
        return $this->preview(parent::edit($order));
    }
}
