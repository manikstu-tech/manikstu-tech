<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamPreviewController extends TeamController
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

    public function edit(TeamMember $member)
    {
        return $this->preview(parent::edit($member));
    }
}
