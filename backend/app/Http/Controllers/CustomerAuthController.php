<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;

class CustomerAuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'password' => ['required', 'string', 'min:8', 'regex:/[A-Z]/', 'regex:/[a-z]/', 'regex:/[0-9]/'],
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $customer->createToken('api')->plainTextToken;

        return response()->json([
            'data' => $customer->makeHidden('password'),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $customer = Customer::where('email', $validated['email'])->first();

        if (! $customer || ! Hash::check($validated['password'], $customer->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $customer->createToken('api')->plainTextToken;

        return response()->json([
            'data' => $customer->makeHidden('password'),
            'token' => $token,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::broker('customers')->sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::broker('customers')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($customer, $password) {
                $customer->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($customer));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent.']);
    }

    public function confirmEmail(Request $request): JsonResponse
    {
        $request->validate([
            'id' => 'required|integer',
            'hash' => 'required|string',
        ]);

        $customer = Customer::findOrFail($request->id);

        if (! hash_equals((string) hash('sha256', $customer->getEmailForVerification() . $customer->email_verified_at), (string) $request->hash)) {
            return response()->json(['message' => 'Invalid verification link.'], 403);
        }

        if ($customer->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.']);
        }

        $customer->markEmailAsVerified();

        return response()->json(['message' => 'Email verified successfully.']);
    }
}
