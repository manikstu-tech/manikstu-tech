<?php

namespace App\Http\Controllers\Preview;

use Illuminate\View\View;

/**
 * Shared helper for the view-only preview controllers.
 *
 * Each preview controller extends its real counterpart and calls the parent
 * method to reuse the exact same data-fetching, then hands the result here.
 * We only swap the rendered template from the real namespace (admin. /
 * telecalling.) to the copied preview namespace (admin_preview. /
 * telecalling_preview.) — the data is untouched, so the copy shows the same
 * content as the original. Non-view responses (redirects) pass straight
 * through unchanged.
 */
trait RendersPreview
{
    protected function preview(mixed $result): mixed
    {
        if ($result instanceof View) {
            $name = preg_replace(
                ['/^admin\./', '/^telecalling\./'],
                ['admin_preview.', 'telecalling_preview.'],
                $result->name()
            );

            return view($name, $result->getData());
        }

        return $result;
    }
}
