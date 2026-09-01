<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Manikstu Agro</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}">
    <style>
        :root { --green: #4A8C3F; --cream: #FDF6EC; --charcoal: #1A1A1A; --grey: #5A5A5A; --light-grey: #E5E5E5; --red: #D4342C; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--charcoal); background: linear-gradient(160deg, #FDF6EC 0%, #F6EDDD 48%, #FBF3E6 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .card { background: #fff; border: 1px solid #EDE9E1; border-radius: 16px; box-shadow: 0 8px 32px rgba(26,26,26,0.06); width: 100%; max-width: 420px; padding: 40px 36px; }
        .logo { text-align: center; margin-bottom: 20px; }
        .logo img { height: 56px; }
        h1 { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 6px; }
        .sub { text-align: center; color: var(--grey); font-size: 13px; margin-bottom: 24px; }
        label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; }
        input[type="email"], input[type="password"] { width: 100%; padding: 10px 14px; border: 1px solid var(--light-grey); border-radius: 8px; font-size: 14px; outline: none; transition: border 0.15s; }
        input:focus { border-color: var(--green); }
        .field { margin-bottom: 14px; }
        .btn { display: block; width: 100%; padding: 12px; background: var(--green); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 20px; transition: background 0.15s; }
        .btn:hover { background: #3A7030; }
        .alert { padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
        .alert-danger { background: rgba(212,52,44,0.08); color: var(--red); border: 1px solid rgba(212,52,44,0.15); }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo"><img src="{{ asset('logo.png') }}" alt="Manikstu Agro"></div>
        <h1>Reset Password</h1>
        <p class="sub">Enter your new password below.</p>

        <form method="POST" action="{{ route('admin.password.update') }}">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">

            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="{{ $email ?? old('email') }}" required>
            </div>

            <div class="field">
                <label for="password">New Password</label>
                <input type="password" name="password" id="password" required>
            </div>

            <div class="field">
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" required>
            </div>

            @error('email') <div class="alert alert-danger">{{ $message }}</div> @enderror
            @error('password') <div class="alert alert-danger">{{ $message }}</div> @enderror

            <button type="submit" class="btn">Reset Password</button>
        </form>
    </div>
</body>
</html>
