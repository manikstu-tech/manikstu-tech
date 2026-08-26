<?php

namespace App\Support;

class Sanitizer
{
    // ponytail: minimal sanitizer for semi-trusted (admin-authored) rich text.
    // Kills script/iframe/svg/style, event-handler attributes, and javascript:/data: URIs,
    // then allowlists tags. For fully untrusted input use a real parser (mews/purifier).
    public static function richText(?string $html): ?string
    {
        if ($html === null) {
            return null;
        }

        $html = preg_replace('#<(script|iframe|object|embed|svg|style|link)[^>]*>.*?</\1>#is', '', $html);
        $html = preg_replace('#</(script|iframe|object|embed|svg|style|link)>#is', '', $html);
        $html = preg_replace('#\s+on\w+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)#i', '', $html);
        $html = preg_replace('#(href|src)\s*=\s*("(javascript|data):[^"]*"|\'(javascript|data):[^\']*\')#i', '', $html);

        $allowed = '<p><br><div><span><strong><b><em><i><u><a><ul><ol><li>'
            . '<h2><h3><h4><blockquote><img><code><pre>';

        return strip_tags($html, $allowed);
    }
}
