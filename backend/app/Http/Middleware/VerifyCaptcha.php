<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class VerifyCaptcha
{
    public function handle(Request $request, Closure $next): Response
    {
        $secret = env('TURNSTILE_SECRET_KEY');

        // Captcha only enforced when a secret is configured; without it the endpoint stays open (dev/local).
        if (!$secret) {
            return $next($request);
        }

        $token = $request->input('cf_turnstile_response') ?: $request->header('X-Captcha-Token');

        if (!$token) {
            abort(422, 'Captcha verification required.');
        }

        $result = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $request->ip(),
        ]);

        if (!$result->json('success')) {
            abort(422, 'Captcha verification failed.');
        }

        return $next($request);
    }
}
