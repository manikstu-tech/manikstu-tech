<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\EnquiryController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryPreviewController extends EnquiryController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }

    public function show(Enquiry $enquiry)
    {
        return $this->preview(parent::show($enquiry));
    }
}
