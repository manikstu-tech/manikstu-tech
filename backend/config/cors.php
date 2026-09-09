<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_filter(array_map('trim', explode(',', env('CORS_ORIGINS', 'http://localhost:3000')))),

    // In local/dev, also accept the frontend served over localhost, 127.0.0.1
    // or a LAN IP on port 3000, so the gallery connects however the dev site is opened.
    'allowed_origins_patterns' => env('APP_ENV', 'production') !== 'production'
        ? ['#^http://(localhost|127\.0\.0\.1|(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))(?:\.\d{1,3}){2})(?::\d+)?$#']
        : [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
