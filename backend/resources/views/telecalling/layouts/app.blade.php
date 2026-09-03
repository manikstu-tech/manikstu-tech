<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Telecalling') - Manikstu</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}">
    <style>
        :root { --green:#4A8C3F; --leaf:#3A7030; --gold:#C4952A; --charcoal:#1A1A1A; --grey:#5A5A5A; --light-grey:#E5E5E5; --red:#D4342C; --page-bg:#FBF6EC; }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;color:var(--charcoal);background:var(--page-bg);height:100vh;overflow:hidden}
        h1,h2,h3,h4{font-family:'Playfair Display',serif}
        a{text-decoration:none;color:inherit}
        .shell{display:flex;height:100vh;overflow:hidden}
        .sidebar{width:250px;background:var(--leaf);height:100vh;position:fixed;left:0;top:0;display:flex;flex-direction:column;z-index:40;transition:transform .25s ease}
        .sidebar-logo{height:100px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(255,255,255,.12);padding:0 16px}
        .sidebar-logo img{height:56px;filter:brightness(0) invert(1)}
        .side-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.4);padding:16px 20px 6px}
        .nav{flex:1;padding:8px 10px}
        .nav-item{display:flex;align-items:center;gap:10px;height:42px;padding:0 14px;margin:2px 0;border-radius:8px;font-size:13.5px;font-weight:500;color:rgba(255,255,255,.72);transition:all .15s}
        .nav-item:hover{background:rgba(255,255,255,.08);color:#fff}
        .nav-item.active{background:var(--green);color:#fff;font-weight:600}
        .nav-item svg{width:18px;height:18px;flex-shrink:0}
        .side-user{border-top:1px solid rgba(255,255,255,.12);padding:14px 16px}
        .su-row{display:flex;align-items:center;gap:10px}
        .su-avatar{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;flex-shrink:0}
        .su-name{font-size:13px;font-weight:600;color:#fff}
        .su-role{display:inline-block;font-size:10px;font-weight:600;padding:1px 8px;border-radius:9999px;margin-top:2px;background:var(--gold);color:#fff}
        .logout{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;margin-top:10px;padding:8px 10px;border:1px solid rgba(255,120,120,.5);background:rgba(255,95,95,.16);color:#ff9a9a;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;border-radius:8px;cursor:pointer;transition:background .2s}
        .logout:hover{background:rgba(255,95,95,.28);color:#ffbcbc}
        .logout svg{width:14px;height:14px}
        .main{flex:1;margin-left:250px;display:flex;flex-direction:column;height:100vh;overflow-y:auto}
        .topbar{height:64px;background:#fff;border-bottom:1px solid var(--light-grey);display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:30}
        .topbar h2{font-size:16px;font-weight:700}
        .tb-user{display:flex;align-items:center;gap:8px}
        .tb-avatar{width:36px;height:36px;border-radius:50%;background:var(--leaf);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600}
        .tb-name{font-size:13px;font-weight:600}
        .tb-role{font-size:11px;font-weight:600;color:var(--gold)}
        .content{padding:24px;flex:1}
        .hamburger{display:none;width:38px;height:38px;align-items:center;justify-content:center;border:none;background:rgba(74,140,63,.1);border-radius:9px;cursor:pointer}
        .hamburger svg{width:20px;height:20px;color:var(--green)}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:35}
        @media(max-width:768px){.sidebar{transform:translateX(-100%)}.sidebar.open{transform:translateX(0)}.overlay.open{display:block}.main{margin-left:0}.hamburger{display:flex}}
    </style>
</head>
<body>
    <div class="shell">
        <div class="overlay" id="ov" onclick="tgl()"></div>
        <aside class="sidebar" id="sb">
            <div class="sidebar-logo"><img src="{{ asset('logo.png') }}" alt="Manikstu"></div>
            <nav class="nav">
                <p class="side-label">Telecalling</p>
                <a href="{{ route('telecalling.dashboard') }}" class="nav-item {{ request()->routeIs('telecalling.dashboard') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Dashboard
                </a>
            </nav>
            <div class="side-user">
                <div class="su-row">
                    <div class="su-avatar">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</div>
                    <div>
                        <div class="su-name">{{ Auth::user()->name }}</div>
                        <span class="su-role">{{ ucfirst(Auth::user()->role) }}</span>
                    </div>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="logout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>

        <div class="main">
            <header class="topbar">
                <div style="display:flex;align-items:center;gap:12px;">
                    <button class="hamburger" onclick="tgl()" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
                    <h2>@yield('title', 'Telecalling')</h2>
                </div>
                <div class="tb-user">
                    <div class="tb-avatar">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</div>
                    <div>
                        <div class="tb-name">{{ Auth::user()->name }}</div>
                        <div class="tb-role">{{ ucfirst(Auth::user()->role) }}</div>
                    </div>
                </div>
            </header>
            <main class="content">@yield('content')</main>
        </div>
    </div>
    <script>
        function tgl(){document.getElementById('sb').classList.toggle('open');document.getElementById('ov').classList.toggle('open');}
    </script>
</body>
</html>
