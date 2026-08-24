<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Manikstu Agro</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        :root {
            --font-inter: 'Inter', sans-serif;
            --font-playfair: 'Playfair Display', serif;
            --manikstu-green: #4A8C3F;
            --manikstu-leaf: #3A7030;
            --manikstu-cream: #FDF6EC;
            --manikstu-gold: #C4952A;
            --charcoal: #1A1A1A;
            --grey: #5A5A5A;
            --light-grey: #E5E5E5;
            --manikstu-red: #D4342C;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: var(--font-inter);
            color: var(--charcoal);
            background: linear-gradient(135deg, #FDF6EC 0%, #F5EDE0 50%, #FDF6EC 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        h1, h2, h3 { font-family: var(--font-playfair); }

        /* ===== ANIMATIONS ===== */
        @keyframes cardSlideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes logoBreathe {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(74,140,63,0.15)); }
            50% { transform: scale(1.03); filter: drop-shadow(0 4px 16px rgba(74,140,63,0.25)); }
        }

        @keyframes diamondShimmer {
            0%, 100% { opacity: 0.6; transform: rotate(45deg) scale(1); }
            50% { opacity: 1; transform: rotate(45deg) scale(1.3); }
        }

        @keyframes lineDraw {
            from { width: 0; }
            to { width: 2.5rem; }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatParticle {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.25; }
        }

        @keyframes villageFade {
            from { opacity: 0; }
            to { opacity: 0.12; }
        }

        @keyframes tribalScroll {
            from { background-position: 0 0; }
            to { background-position: 60px 0; }
        }

        /* ===== COMPONENTS ===== */

        .login-card {
            animation: cardSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            background: white;
            border-radius: 1rem;
            border: 1px solid var(--light-grey);
            box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
            width: 100%;
            max-width: 420px;
            overflow: hidden;
            position: relative;
            z-index: 10;
            transition: box-shadow 0.3s ease;
        }

        .login-card:hover {
            box-shadow: 0 25px 70px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06);
        }

        .tribal-strip {
            height: 48px;
            background-image: url('{{ asset("patterns/tribal-floral-border-seamless.png") }}');
            background-size: auto 100%;
            background-repeat: repeat-x;
            animation: tribalScroll 8s linear infinite;
            position: relative;
        }

        .tribal-strip::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--manikstu-gold), transparent);
        }

        .login-logo {
            animation: logoBreathe 3s ease-in-out infinite;
            height: 64px;
            width: auto;
            display: block;
            margin: 0 auto;
        }

        .ornament-line {
            height: 1px;
            background: var(--manikstu-gold);
            animation: lineDraw 0.8s 0.4s ease-out forwards;
            width: 0;
            opacity: 0.6;
        }

        .ornament-diamond {
            width: 6px;
            height: 6px;
            background: var(--manikstu-gold);
            transform: rotate(45deg);
            animation: diamondShimmer 2s ease-in-out infinite;
            flex-shrink: 0;
        }

        .form-group {
            opacity: 0;
            animation: fadeInUp 0.4s ease forwards;
        }
        .form-group:nth-child(1) { animation-delay: 0.3s; }
        .form-group:nth-child(2) { animation-delay: 0.4s; }
        .form-group:nth-child(3) { animation-delay: 0.5s; }
        .form-group:nth-child(4) { animation-delay: 0.6s; }
        .form-group:nth-child(5) { animation-delay: 0.7s; }

        .login-input {
            width: 100%;
            border: 1.5px solid var(--light-grey);
            border-radius: 0.5rem;
            padding: 0.75rem 0.75rem 0.75rem 2.75rem;
            font-size: 14px;
            font-family: var(--font-inter);
            color: var(--charcoal);
            background: white;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
        }

        .login-input::placeholder { color: rgba(90, 90, 90, 0.45); }

        .login-input:focus {
            border-color: var(--manikstu-green);
            box-shadow: 0 0 0 3px rgba(74, 140, 63, 0.12), 0 1px 3px rgba(74, 140, 63, 0.08);
        }

        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover,
        .login-input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 1000px white inset;
            -webkit-text-fill-color: var(--charcoal);
            border-color: var(--light-grey);
            transition: background-color 5000s ease-in-out 0s;
        }

        .login-input:focus:-webkit-autofill {
            border-color: var(--manikstu-green);
            -webkit-box-shadow: 0 0 0 1000px white inset, 0 0 0 3px rgba(74, 140, 63, 0.12);
        }

        .input-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--grey);
            transition: color 0.2s;
            pointer-events: none;
        }

        .input-wrapper:focus-within .input-icon { color: var(--manikstu-green); }

        .btn-signin {
            width: 100%;
            border: none;
            border-radius: 9999px;
            padding: 0.875rem 1.5rem;
            font-size: 14px;
            font-weight: 600;
            font-family: var(--font-inter);
            color: white;
            background: linear-gradient(135deg, var(--manikstu-green), var(--manikstu-leaf));
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            opacity: 0;
            animation: fadeInUp 0.4s 0.7s ease forwards;
        }

        .btn-signin:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(74, 140, 63, 0.35);
        }

        .btn-signin:active {
            transform: translateY(0);
            box-shadow: 0 4px 12px rgba(74, 140, 63, 0.25);
        }

        .login-checkbox {
            accent-color: var(--manikstu-green);
            width: 16px;
            height: 16px;
            cursor: pointer;
        }

        .forgot-link {
            color: var(--manikstu-green);
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
            position: relative;
        }

        .forgot-link::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--manikstu-red);
            transition: width 0.3s;
        }

        .forgot-link:hover { color: var(--manikstu-red); }
        .forgot-link:hover::after { width: 100%; }

        .pw-toggle {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--grey);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s;
        }

        .pw-toggle:hover {
            color: var(--charcoal);
            background: rgba(74, 140, 63, 0.08);
        }

        .village-bg {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            animation: villageFade 1.2s 0.3s ease forwards;
            z-index: 1;
            pointer-events: none;
            max-height: 35vh;
            object-fit: contain;
            object-position: bottom;
        }

        .particle {
            position: fixed;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: var(--manikstu-gold);
            opacity: 0.12;
            animation: floatParticle 4s ease-in-out infinite;
            z-index: 0;
            pointer-events: none;
        }

        .copyright {
            position: fixed;
            bottom: 1.5rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 11px;
            color: var(--grey);
            z-index: 20;
            opacity: 0;
            animation: fadeInUp 0.4s 0.9s ease forwards;
            white-space: nowrap;
            max-width: 90%;
            text-align: center;
        }

        .error-msg {
            background: rgba(212, 52, 44, 0.06);
            border: 1px solid rgba(212, 52, 44, 0.15);
            border-radius: 0.5rem;
            padding: 0.625rem 0.75rem;
            color: var(--manikstu-red);
            font-size: 13px;
            text-align: center;
            margin-bottom: 1rem;
            animation: fadeInUp 0.3s ease;
        }

        .remember-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            opacity: 0;
            animation: fadeInUp 0.4s 0.6s ease forwards;
        }

        .remember-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 13px;
            color: var(--charcoal);
            cursor: pointer;
        }

        .field-label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: var(--charcoal);
            margin-bottom: 0.375rem;
        }
    </style>
</head>
<body>

    <div class="particle" style="top:15%; left:10%; animation-delay:0s;"></div>
    <div class="particle" style="top:25%; left:85%; animation-delay:1s; width:3px; height:3px;"></div>
    <div class="particle" style="top:60%; left:20%; animation-delay:2s; width:5px; height:5px;"></div>
    <div class="particle" style="top:40%; left:75%; animation-delay:0.5s;"></div>
    <div class="particle" style="top:70%; left:50%; animation-delay:1.5s; width:3px; height:3px;"></div>
    <div class="particle" style="top:20%; left:45%; animation-delay:2.5s;"></div>

    <img src="{{ asset('patterns/village-scene.png') }}" alt="" class="village-bg" />

    <div class="login-card">
        <div class="tribal-strip"></div>

        <div style="padding: 2rem 2.5rem 2.5rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <img src="{{ asset('logo.png') }}" alt="Manikstu Agro" class="login-logo" />
            </div>

            <h1 style="text-align: center; font-size: 22px; font-weight: 700; color: var(--charcoal); margin-bottom: 0.5rem;">Admin Panel</h1>

            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
                <span class="ornament-line"></span>
                <span class="ornament-diamond"></span>
                <span class="ornament-line"></span>
            </div>

            <form method="POST" action="{{ route('admin.login') }}">
                @csrf

                @error('email')
                    <div class="error-msg">{{ $message }}</div>
                @enderror

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="email" class="field-label">Email</label>
                    <div class="input-wrapper" style="position: relative;">
                        <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <input type="email" name="email" id="email" value="{{ old('email') }}"
                            placeholder="admin@manikstu.com" required autofocus
                            class="login-input @error('email') border-manikstu-red @enderror" />
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="password" class="field-label">Password</label>
                    <div class="input-wrapper" style="position: relative;">
                        <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type="password" name="password" id="password_input"
                            placeholder="Enter your password" required
                            class="login-input @error('password') border-manikstu-red @enderror" style="padding-right: 2.75rem;" />
                        <button type="button" id="password_toggle" onclick="togglePassword()" class="pw-toggle">
                            <svg id="eye_icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                </div>

                <div class="remember-row">
                    <label class="remember-label">
                        <input type="checkbox" name="remember" class="login-checkbox" />
                        Remember me
                    </label>
                    <a href="#" class="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" class="btn-signin">Sign In</button>
            </form>
        </div>
    </div>

    <p class="copyright">&copy; {{ date('Y') }} Manikstu Agro Private Limited. All Rights Reserved.</p>

    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password_input');
            const eyeIcon = document.getElementById('eye_icon');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="2" x2="22" y1="12" y2="12"/>';
            } else {
                passwordInput.type = 'password';
                eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
            }
        }
    </script>
</body>
</html>