<?php

namespace App\Http\Controllers\Preview\Admin;

use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Preview\RendersPreview;
use App\Models\Page;

class PagePreviewController extends PageController
{
    use RendersPreview;

    public function edit(Page $page)
    {
        return $this->preview(parent::edit($page));
    }
}
