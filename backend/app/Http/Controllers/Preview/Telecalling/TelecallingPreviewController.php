<?php

namespace App\Http\Controllers\Preview\Telecalling;

use App\Http\Controllers\Preview\RendersPreview;
use App\Http\Controllers\Telecalling\TelecallingController;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * View-only preview of the Telecalling panel. Extends the real controller so
 * all data is identical; only the rendered template is swapped to the
 * telecalling_preview namespace.
 */
class TelecallingPreviewController extends TelecallingController
{
    use RendersPreview;

    public function index(Request $request)
    {
        return $this->preview(parent::index($request));
    }

    /**
     * The parent's section() dispatch keys off the current route name
     * (telecalling.<section>). Our preview routes are named
     * telecalling-preview.<section>, so we present the real name to the parent
     * for dispatch, then restore the preview name so the copied layout's
     * active-nav highlighting still matches at render time.
     */
    public function section(Request $request)
    {
        $route = $request->route();
        $previewName = $route->getName();                       // telecalling-preview.orders
        $key = Str::after($previewName, 'telecalling-preview.'); // orders
        $original = $route->action['as'] ?? null;

        $route->action['as'] = 'telecalling.' . $key;
        try {
            $result = parent::section($request);
        } finally {
            $route->action['as'] = $original;
        }

        return $this->preview($result);
    }

    public function orderDetail(Request $request, string $id)
    {
        return $this->preview(parent::orderDetail($request, $id));
    }

    public function complaintDetail(Request $request, string $id)
    {
        return $this->preview(parent::complaintDetail($request, $id));
    }

    public function franchiseDetail(Request $request, string $id)
    {
        return $this->preview(parent::franchiseDetail($request, $id));
    }
}
