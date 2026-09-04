<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Keeps each role inside its own area. Telecallers may only use the
 * /telecalling area; every other role uses the /admin area. Wrong-area
 * access is redirected to the user's own dashboard (not a 403), so a
 * direct-URL attempt lands them where they belong.
 *
 * Usage:  ->middleware('area:admin')  or  ->middleware('area:telecalling')
 */
class RoleArea
{
    public function handle(Request $request, Closure $next, string $area): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('admin.login');
        }

        // Account with no role can't be routed anywhere — bounce to login.
        if (empty($user->role)) {
            return redirect()->route('admin.login');
        }

        $isTelecaller = $user->role === 'telecaller';

        if ($area === 'admin' && $isTelecaller) {
            return redirect()->route('telecalling.dashboard');
        }

        if ($area === 'telecalling' && ! $isTelecaller) {
            return redirect()->route('admin.dashboard');
        }

        return $next($request);
    }
}
