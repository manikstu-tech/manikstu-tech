<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Preview\RendersPreview;

class LoginPreviewController extends LoginController
{
    use RendersPreview;

    public function showLogin()
    {
        return $this->preview(parent::showLogin());
    }
}
