<?php

namespace App\Support;

use Mews\Purifier\Facades\Purifier;

class Sanitizer
{
    // ponytail: full HTML sanitization via HTML Purifier (replaces the earlier regex approach)
    private const ALLOWED = 'p,br,div,span[class],strong,b,em,i,u,'
        . 'a[href|title|target],ul,ol,li,h2,h3,h4,blockquote,'
        . 'img[src|alt|width|height],code,pre';

    public static function richText(?string $html): ?string
    {
        if ($html === null) {
            return null;
        }

        return Purifier::clean($html, [
            'HTML.Allowed' => self::ALLOWED,
            'AutoFormat.RemoveEmpty' => true,
            'URI.AllowedSchemes' => ['http' => true, 'https' => true, 'mailto' => true],
        ]);
    }
}
