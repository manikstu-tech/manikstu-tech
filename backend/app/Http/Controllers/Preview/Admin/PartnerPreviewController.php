<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerPreviewController extends PartnerController
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

    public function edit(Partner $partner)
    {
        return $this->preview(parent::edit($partner));
    }
}
