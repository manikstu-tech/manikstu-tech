<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Preview\RendersPreview;

class SettingPreviewController extends SettingController
{
    use RendersPreview;

    public function edit()
    {
        return $this->preview(parent::edit());
    }
}
