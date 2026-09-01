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
        input[type="email"] { width: 100%; padding: 10px 14px; border: 1px solid var(--light-grey); border-radius: 8px; font-size: 14px; outline: none; transition: border 0.15s; }
        input[type="email"]:focus { border-color: var(--green); }
        .btn { display: block; width: 100%; padding: 12px; background: var(--green); color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 20px; transition: background 0.15s; }
        .btn:hover { background: #3A7030; }
        .back { display: block; text-align: center; margin-top: 16px; font-size: 13px; color: var(--grey); text-decoration: none; }
        .back:hover { color: var(--green); }
        .alert { padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
        .alert-success { background: rgba(74,140,63,0.08); color: var(--green); border: 1px solid rgba(74,140,63,0.15); }
        .alert-danger { background: rgba(212,52,44,0.08); color: var(--red); border: 1px solid rgba(212,52,44,0.15); }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo"><img src="{{ asset('logo.png') }}" alt="Manikstu Agro"></div>
        <h1>Forgot Password</h1>
        <p class="sub">Enter your email to receive a reset link.</p>

        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        <form method="POST" action="{{ route('admin.password.email') }}">
            @csrf
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus>
            @error('email') <div class="alert alert-danger">{{ $message }}</div> @enderror
            <button type="submit" class="btn">Send Reset Link</button>
        </form>
        <a href="{{ route('admin.login') }}" class="back">&larr; Back to login</a>
    </div>
</body>
</html>
