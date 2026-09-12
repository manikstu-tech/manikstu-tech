<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerPreviewController extends CustomerController
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

    public function edit(Customer $customer)
    {
        return $this->preview(parent::edit($customer));
    }
}
