<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\User;
use Illuminate\Http\Request;

class UserPreviewController extends UserController
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

    public function edit(User $user)
    {
        return $this->preview(parent::edit($user));
    }
}
