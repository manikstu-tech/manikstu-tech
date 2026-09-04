<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLogin()
    {
        return view('admin.auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            // Generic message — never reveal whether the account exists.
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $user = Auth::user();

        // An account with no role can't be routed — block it.
        if (empty($user->role)) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                'email' => ['Your account has no role assigned. Please contact support.'],
            ]);
        }

        $request->session()->regenerate();

        // Route by role: telecaller -> telecalling dashboard, everyone else -> admin.
        $home = $user->role === 'telecaller'
            ? route('telecalling.dashboard')
            : route('admin.dashboard');

        return redirect()->intended($home);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
