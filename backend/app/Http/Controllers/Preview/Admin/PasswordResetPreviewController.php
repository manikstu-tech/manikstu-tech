<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\PasswordResetController;
use App\Http\Controllers\Preview\RendersPreview;
use Illuminate\Http\Request;

class PasswordResetPreviewController extends PasswordResetController
{
    use RendersPreview;

    public function showLinkRequestForm()
    {
        return $this->preview(parent::showLinkRequestForm());
    }

    public function showResetForm(Request $request, string $token)
    {
        return $this->preview(parent::showResetForm($request, $token));
    }
}
