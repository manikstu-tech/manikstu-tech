<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Manikstu Agro</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('favicon-180.png') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}">
    <style>
        :root {
            --green: #4A8C3F;
            --leaf: #3A7030;
            --forest: #2D5016;
            --cream: #FDF6EC;
            --gold: #C4952A;
            --charcoal: #1A1A1A;
            --grey: #5A5A5A;
            --light-grey: #E5E5E5;
            --red: #D4342C;
            --earth: #9F5233;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', sans-serif;
            color: var(--charcoal);
            background: linear-gradient(160deg, #FDF6EC 0%, #F6EDDD 48%, #FBF3E6 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            overflow-x: hidden;
            padding-bottom: 68px; /* sit the secure-access badge a little above the fixed footer strip */
        }

        .bg-village {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            opacity: 0.2;
            z-index: 0;
            pointer-events: none;
        }

        .bg-sun {
            position: fixed;
            top: 7%;
            left: 5%;
            width: 104px;
            height: 104px;
            opacity: 0.14;
            color: var(--earth);
            z-index: 0;
            pointer-events: none;
        }

        .dot {
            position: fixed;
            border-radius: 50%;
            background: var(--gold);
            opacity: 0.4;
            z-index: 0;
            pointer-events: none;
            animation: dotFloat 7s ease-in-out infinite;
        }

        @keyframes dotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
        }

        .leaf {
            position: fixed;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            animation: leafFloat 8s ease-in-out infinite, leafFadeIn 0.6s ease forwards;
        }

        @keyframes leafFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-6px) rotate(2deg); }
            50% { transform: translateY(-10px) rotate(-1deg); }
            75% { transform: translateY(-4px) rotate(1.5deg); }
        }

        @keyframes leafFadeIn {
            to { opacity: 0.22; }
        }

        @keyframes cardIn {
            from { opacity: 0; transform: translateY(18px) scale(0.985); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineGrow {
            from { width: 0; }
            to { width: 60px; }
        }

        @keyframes diamondPulse {
            0%, 100% { opacity: 0.6; transform: rotate(45deg) scale(1); }
            50% { opacity: 1; transform: rotate(45deg) scale(1.2); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-3px); }
            40% { transform: translateX(3px); }
            60% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .login-card {
            background: #fff;
            border-radius: 18px;
            border: 1px solid var(--light-grey);
            box-shadow: 0 12px 30px rgba(26,26,26,0.10);
            width: 100%;
            max-width: 420px;
            overflow: hidden;
            position: relative;
            z-index: 10;
            opacity: 0;
            animation: cardIn 0.6s 0.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            margin: 0 16px;
        }

        .tribal-strip {
            height: 40px;
            /* tight-cropped seamless Warli people tile (1837x271, 9 whole periods,
               figures fill the height so they read clearly and repeat with no gap) */
            background-image: url('{{ asset("patterns/saura-border-tight.png") }}');
            background-size: auto 100%;
            background-repeat: repeat-x;
            background-position: center;
            position: relative;
            opacity: 0.9;
        }

        .tribal-strip::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            opacity: 0.5;
        }

        .card-body { padding: 24px 36px 28px; }

        .logo-wrap {
            text-align: center;
            margin-bottom: 8px;
            opacity: 0;
            animation: fadeIn 0.4s 0.3s ease forwards;
        }

        .login-logo {
            height: 72px;
            width: auto;
            display: block;
            margin: 0 auto;
        }

        .heading {
            text-align: center;
            font-family: 'Playfair Display', serif;
            font-size: 30px;
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 4px;
            opacity: 0;
            animation: fadeIn 0.4s 0.38s ease forwards;
        }

        .subtitle {
            text-align: center;
            font-size: 13.5px;
            color: var(--grey);
            margin-bottom: 12px;
            opacity: 0;
            animation: fadeIn 0.4s 0.44s ease forwards;
        }

        .ornament {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
            opacity: 0;
            animation: fadeIn 0.3s 0.5s ease forwards;
        }

        .ornament-line {
            height: 1px;
            background: var(--gold);
            width: 0;
            opacity: 0.6;
            animation: lineGrow 0.6s 0.55s ease-out forwards;
        }

        .ornament-diamond {
            width: 7px;
            height: 7px;
            background: var(--gold);
            transform: rotate(45deg);
            flex-shrink: 0;
            animation: diamondPulse 2.5s ease-in-out infinite;
        }

        .field-group {
            margin-bottom: 14px;
            opacity: 0;
            animation: fadeIn 0.35s ease forwards;
        }
        .field-group:nth-child(1) { animation-delay: 0.5s; }
        .field-group:nth-child(2) { animation-delay: 0.58s; }

        .field-group.shake { animation: shake 0.3s ease; }

        .field-label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: var(--charcoal);
            margin-bottom: 6px;
        }

        .input-wrap { position: relative; }

        .input-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--grey);
            pointer-events: none;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        .input-wrap:focus-within .input-icon { color: var(--green); }

        .login-input {
            width: 100%;
            height: 46px;
            border: 1px solid var(--light-grey);
            border-radius: 8px;
            padding: 0 12px 0 40px;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            color: var(--charcoal);
            background: #fff;
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
        }

        .login-input::placeholder { color: rgba(90,90,90,0.45); }

        .login-input:focus {
            border-color: var(--green);
            box-shadow: 0 0 0 3px rgba(74,140,63,0.12);
        }

        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover,
        .login-input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 1000px #fff inset;
            -webkit-text-fill-color: var(--charcoal);
            border-color: var(--light-grey);
            transition: background-color 5000s ease-in-out 0s;
        }

        .login-input:focus:-webkit-autofill {
            border-color: var(--green);
            -webkit-box-shadow: 0 0 0 1000px #fff inset, 0 0 0 3px rgba(74,140,63,0.12);
        }

        .pw-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--grey);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            transition: color 0.2s, background 0.2s;
        }

        .pw-toggle:hover {
            color: var(--charcoal);
            background: rgba(74,140,63,0.08);
        }

        .remember-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            opacity: 0;
            animation: fadeIn 0.35s 0.66s ease forwards;
        }

        .remember-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: var(--charcoal);
            cursor: pointer;
        }

        .remember-checkbox {
            accent-color: var(--green);
            width: 16px;
            height: 16px;
            cursor: pointer;
        }

        .forgot-link {
            color: var(--green);
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: color 0.2s;
        }

        .forgot-link:hover { color: var(--leaf); }

        .btn-signin {
            width: 100%;
            height: 50px;
            border: none;
            border-radius: 9999px;
            padding: 0 24px;
            font-size: 15px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            color: #fff;
            background: linear-gradient(135deg, var(--green), var(--leaf));
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
            opacity: 0;
            animation: fadeIn 0.4s 0.72s ease forwards;
        }

        .btn-signin:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 14px rgba(58,112,48,0.20);
        }

        .btn-signin:active {
            transform: scale(0.99);
            box-shadow: none;
        }

        .btn-signin:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            display: none;
        }

        .btn-signin.loading .btn-text { display: none; }
        .btn-signin.loading .btn-arrow { display: none; }
        .btn-signin.loading .spinner { display: block; }

        .error-msg {
            background: rgba(212,52,44,0.06);
            border: 1px solid rgba(212,52,44,0.15);
            border-radius: 8px;
            padding: 10px 12px;
            color: var(--red);
            font-size: 13px;
            text-align: center;
            margin-bottom: 16px;
            opacity: 0;
            animation: fadeIn 0.3s 0.48s ease forwards;
        }

        .error-input {
            border-color: var(--red) !important;
            box-shadow: 0 0 0 3px rgba(212,52,44,0.08) !important;
        }

        .secure-access {
            text-align: center;
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 0.4s 0.85s ease forwards;
            z-index: 10;
            position: relative;
        }

        .secure-access-title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 600;
            color: var(--green);
            margin-bottom: 2px;
        }

        .secure-access-sub {
            font-size: 12px;
            color: var(--grey);
        }

        .footer-strip {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(180deg, #3a6b28 0%, #2d5219 100%);
            padding: 11px 16px 10px;
            text-align: center;
            z-index: 20;
            opacity: 0;
            animation: fadeIn 0.4s 0.9s ease forwards;
        }

        .footer-strip::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38'%3E%3Cpath d='M19 5 L30 19 L19 33 L8 19 Z' fill='none' stroke='%23ffffff' stroke-opacity='0.06'/%3E%3Ccircle cx='19' cy='19' r='1.1' fill='%23ffffff' fill-opacity='0.06'/%3E%3C/svg%3E");
            background-repeat: repeat;
            pointer-events: none;
        }

        .footer-strip p {
            position: relative;
            font-size: 12px;
            color: rgba(253,246,236,0.85);
        }

        .footer-torn {
            position: absolute;
            left: 0;
            top: -15px;
            width: 100%;
            height: 17px;
            display: block;
        }


        @media (prefers-reduced-motion: reduce) {
            .leaf, .login-card, .logo-wrap, .heading,
            .subtitle, .ornament, .field-group, .btn-signin,
            .secure-access, .footer-strip, .error-msg, .ornament-line {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
            .ornament-line { width: 60px !important; }
            .ornament-diamond { animation: none !important; opacity: 0.8; }
            .leaf { opacity: 0.12 !important; }
        }

        @media (max-width: 480px) {
            .card-body { padding: 20px 20px 24px; }
            .heading { font-size: 26px; }
            .login-logo { height: 60px; }
            .ornament-line { width: 40px; }
            .ornament-diamond { width: 6px; height: 6px; }
            .field-group { margin-bottom: 12px; }
            .remember-row { margin-bottom: 14px; }
        }
    </style>
</head>
<body>

    <img src="{{ asset('patterns/village-scene.png') }}" alt="" class="bg-village" />

    <svg class="bg-sun" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="50" cy="50" r="16"/>
        <circle cx="50" cy="50" r="9"/>
        <g stroke-linecap="round">
            <path d="M50 6 V22"/><path d="M50 78 V94"/><path d="M6 50 H22"/><path d="M78 50 H94"/>
            <path d="M19 19 L30 30"/><path d="M70 70 L81 81"/><path d="M81 19 L70 30"/><path d="M30 70 L19 81"/>
        </g>
    </svg>

    <span class="dot" style="top:22%; left:14%; width:5px; height:5px; animation-delay:0s;"></span>
    <span class="dot" style="top:31%; left:82%; width:4px; height:4px; animation-delay:1.2s;"></span>
    <span class="dot" style="top:46%; left:8%; width:6px; height:6px; animation-delay:2s;"></span>
    <span class="dot" style="top:18%; left:58%; width:4px; height:4px; animation-delay:0.6s;"></span>
    <span class="dot" style="top:55%; left:90%; width:5px; height:5px; animation-delay:1.8s;"></span>
    <span class="dot" style="top:38%; left:33%; width:4px; height:4px; animation-delay:2.6s;"></span>

    <svg class="leaf" style="top:10%; left:7%; animation-delay:0s; animation-duration:9s;" width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.42 20 16.63 14.38 17 8Z" fill="#4A8C3F" opacity="0.7"/>
        <path d="M8 17C10.5 14.5 12 11 12.5 7.5" stroke="#3A7030" stroke-width="0.8" opacity="0.5"/>
    </svg>

    <svg class="leaf" style="top:55%; left:91%; animation-delay:3s; animation-duration:10s;" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.42 20 16.63 14.38 17 8Z" fill="#3A7030" opacity="0.6"/>
    </svg>

    <svg class="leaf" style="top:80%; left:4%; animation-delay:5s; animation-duration:11s;" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.42 20 16.63 14.38 17 8Z" fill="#4A8C3F" opacity="0.5"/>
    </svg>

    <div class="login-card">
        <div class="tribal-strip"></div>

        <div class="card-body">
            <div class="logo-wrap">
                <img src="{{ asset('logo.png') }}" alt="Manikstu Agro" class="login-logo" />
            </div>

            <h1 class="heading">Admin Panel</h1>
            <p class="subtitle">Manikstu Agro Management System</p>

            <div class="ornament">
                <span class="ornament-line"></span>
                <span class="ornament-diamond"></span>
                <span class="ornament-line"></span>
            </div>

            <form method="POST" action="{{ route('admin.login') }}" id="loginForm">
                @csrf

                @error('email')
                    <div class="error-msg" role="alert">{{ $message }}</div>
                @enderror

                <div class="field-group" id="emailGroup">
                    <label for="email" class="field-label">Email</label>
                    <div class="input-wrap">
                        <span class="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </span>
                        <input type="email" name="email" id="email" value="{{ old('email') }}"
                            placeholder="you@example.com" required autofocus
                            class="login-input @error('email') error-input @enderror" />
                    </div>
                </div>

                <div class="field-group" id="passwordGroup">
                    <label for="password" class="field-label">Password</label>
                    <div class="input-wrap">
                        <span class="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </span>
                        <input type="password" name="password" id="password_input"
                            placeholder="Enter your password" required
                            class="login-input @error('password') error-input @enderror" />
                        <button type="button" id="password_toggle" class="pw-toggle" aria-label="Toggle password visibility">
                            <svg id="eye_icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                </div>

                <div class="remember-row">
                    <label class="remember-label">
                        <input type="checkbox" name="remember" class="remember-checkbox" />
                        Remember me
                    </label>
                    <a href="{{ route('admin.password.request') }}" class="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" class="btn-signin" id="submitBtn">
                    <span class="btn-text">Sign In</span>
                    <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    <span class="spinner"></span>
                </button>
            </form>
        </div>
    </div>

    <div class="secure-access">
        <div class="secure-access-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            Secure Admin Access
        </div>
        <div class="secure-access-sub">Protected by Manikstu Agro</div>
    </div>

    <div class="footer-strip">
        <svg class="footer-torn" viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#3a6b28" d="M0,30 L0,13.4 L0,13.4 L12,9.4 L21.2,9.4 L32.3,12.7 L41.9,11.5 L48.2,13.9 L54.7,12.2 L63.2,7.4 L73.6,5.8 L82.2,5.6 L93.2,14.5 L99.3,13.7 L109.5,10.8 L121.1,14 L130.4,7.9 L142.2,9.3 L154.2,9.1 L163.6,12.8 L175.1,9.4 L181.3,7.8 L191.1,12.8 L198.3,10.2 L205.9,12 L216.6,14.9 L228.5,14.1 L236.3,18.8 L247.2,13.1 L258.6,5.4 L270.1,11.5 L277.5,7.3 L287.4,11.3 L299.4,10.5 L310.1,13.3 L316.5,13.8 L324.3,7.8 L334,7 L343.1,9.5 L351.8,12 L358.5,13.8 L366,13.5 L376.6,12.8 L383.4,14.1 L392.3,9.3 L403.7,14.8 L413,13.2 L423.9,6 L433.6,12.6 L445.3,9.7 L454.5,11.4 L462.4,10.6 L471.1,10.6 L477.7,9 L486.4,7.2 L492.7,10.4 L502.7,9.3 L510.8,14.5 L519.2,13.2 L528.8,12.7 L537.4,11.6 L543.9,12.2 L550.3,17.9 L561.4,12.2 L572.3,19.5 L583.2,11.1 L593.5,11 L600.3,12 L611.4,12.4 L618.9,14 L627.2,11.2 L636.6,9.3 L647.9,11.5 L656.2,19.5 L664,8 L671,7.8 L680.6,9.8 L688.2,11.7 L695.7,14.3 L704.2,9 L711.1,6.8 L718,9.3 L725.5,14.7 L733.9,6.6 L741.7,9.4 L753.4,13.4 L760.1,11.5 L769.8,11.9 L778,14.9 L784.2,14.9 L792.5,12 L798.9,12.7 L808.9,11.8 L820,14.1 L827,11.7 L836.3,10.7 L848,9.8 L856.3,12.4 L864.3,7.5 L871.7,10 L878.1,7.5 L886.3,13.1 L895.4,12.6 L903.6,10.2 L912,13.3 L921.1,12.8 L929.4,9 L935.7,14.4 L943,14.3 L953.9,15 L961.9,9.8 L971.9,14.5 L981.9,11.5 L991.2,18.9 L1002.2,11.8 L1012.4,12.7 L1020.9,10.8 L1028.7,10.5 L1035.5,19.5 L1044,11.4 L1054.4,11.3 L1065.2,14.3 L1071.8,14.7 L1082.6,11.6 L1094.1,9.2 L1101.8,17.9 L1112.7,11.2 L1118.8,13.3 L1129.4,18.7 L1136.5,12.2 L1147.9,14.3 L1158.9,19.2 L1165.2,12.7 L1175.7,9.3 L1185.4,9.7 L1196.5,14 L1200,13.5 L1200,30 Z"/>
            <path fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" d="M0,13.4 L12,9.4 L21.2,9.4 L32.3,12.7 L41.9,11.5 L48.2,13.9 L54.7,12.2 L63.2,7.4 L73.6,5.8 L82.2,5.6 L93.2,14.5 L99.3,13.7 L109.5,10.8 L121.1,14 L130.4,7.9 L142.2,9.3 L154.2,9.1 L163.6,12.8 L175.1,9.4 L181.3,7.8 L191.1,12.8 L198.3,10.2 L205.9,12 L216.6,14.9 L228.5,14.1 L236.3,18.8 L247.2,13.1 L258.6,5.4 L270.1,11.5 L277.5,7.3 L287.4,11.3 L299.4,10.5 L310.1,13.3 L316.5,13.8 L324.3,7.8 L334,7 L343.1,9.5 L351.8,12 L358.5,13.8 L366,13.5 L376.6,12.8 L383.4,14.1 L392.3,9.3 L403.7,14.8 L413,13.2 L423.9,6 L433.6,12.6 L445.3,9.7 L454.5,11.4 L462.4,10.6 L471.1,10.6 L477.7,9 L486.4,7.2 L492.7,10.4 L502.7,9.3 L510.8,14.5 L519.2,13.2 L528.8,12.7 L537.4,11.6 L543.9,12.2 L550.3,17.9 L561.4,12.2 L572.3,19.5 L583.2,11.1 L593.5,11 L600.3,12 L611.4,12.4 L618.9,14 L627.2,11.2 L636.6,9.3 L647.9,11.5 L656.2,19.5 L664,8 L671,7.8 L680.6,9.8 L688.2,11.7 L695.7,14.3 L704.2,9 L711.1,6.8 L718,9.3 L725.5,14.7 L733.9,6.6 L741.7,9.4 L753.4,13.4 L760.1,11.5 L769.8,11.9 L778,14.9 L784.2,14.9 L792.5,12 L798.9,12.7 L808.9,11.8 L820,14.1 L827,11.7 L836.3,10.7 L848,9.8 L856.3,12.4 L864.3,7.5 L871.7,10 L878.1,7.5 L886.3,13.1 L895.4,12.6 L903.6,10.2 L912,13.3 L921.1,12.8 L929.4,9 L935.7,14.4 L943,14.3 L953.9,15 L961.9,9.8 L971.9,14.5 L981.9,11.5 L991.2,18.9 L1002.2,11.8 L1012.4,12.7 L1020.9,10.8 L1028.7,10.5 L1035.5,19.5 L1044,11.4 L1054.4,11.3 L1065.2,14.3 L1071.8,14.7 L1082.6,11.6 L1094.1,9.2 L1101.8,17.9 L1112.7,11.2 L1118.8,13.3 L1129.4,18.7 L1136.5,12.2 L1147.9,14.3 L1158.9,19.2 L1165.2,12.7 L1175.7,9.3 L1185.4,9.7 L1196.5,14 L1200,13.5"/>
        </svg>

        <p>&copy; {{ date('Y') }} Manikstu Agro Private Limited. All Rights Reserved.</p>
    </div>

    <script>
        document.getElementById('password_toggle').addEventListener('click', function() {
            var input = document.getElementById('password_input');
            var icon = document.getElementById('eye_icon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="2" x2="22" y1="12" y2="12"/>';
            } else {
                input.type = 'password';
                icon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
            }
        });

        document.getElementById('loginForm').addEventListener('submit', function() {
            var btn = document.getElementById('submitBtn');
            btn.classList.add('loading');
            btn.disabled = true;
        });

        @if ($errors->any())
            document.addEventListener('DOMContentLoaded', function() {
                var groups = document.querySelectorAll('.field-group');
                groups.forEach(function(g) { g.classList.add('shake'); });
                setTimeout(function() {
                    groups.forEach(function(g) { g.classList.remove('shake'); });
                }, 400);
            });
        @endif
    </script>
</body>
</html>
