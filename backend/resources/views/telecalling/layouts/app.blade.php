<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Telecalling') - Manikstu</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}">
    <style>
        :root {
            --green: #4A8C3F; --leaf: #3A7030; --forest: #2D5016; --cream: #FDF6EC;
            --gold: #C4952A; --charcoal: #1A1A1A; --grey: #5A5A5A; --light-grey: #E5E5E5;
            --red: #D4342C; --page-bg: #FBF6EC;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--charcoal); background: var(--page-bg); height: 100vh; overflow: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Playfair Display', serif; }
        a { text-decoration: none; color: inherit; }

        .app-shell { display: flex; height: 100vh; overflow: hidden; }

        .sidebar { width: 260px; background: var(--leaf); height: 100vh; position: fixed; left: 0; top: 0; display: flex; flex-direction: column; z-index: 40; transition: transform 0.25s ease; }
        .sidebar-logo { height: 100px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.12); padding: 0 16px; }
        .sidebar-logo img { height: 60px; width: auto; filter: brightness(0) invert(1); opacity: 1; }
        .sidebar-nav { flex: 1; overflow-y: auto; padding: 12px 10px; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .nav-group-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); padding: 16px 14px 6px; }
        .nav-item { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 14px; margin: 1px 0; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.7); transition: all 0.15s; cursor: pointer; }
        .nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .nav-item.active { background: var(--green); color: #fff; font-weight: 600; }
        .nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
        .sidebar-user { border-top: 1px solid rgba(255,255,255,0.12); padding: 14px 16px; }
        .sidebar-user-inner { display: flex; align-items: center; gap: 10px; }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 600; flex-shrink: 0; }
        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { display: inline-block; font-size: 10px; font-weight: 600; padding: 1px 8px; border-radius: 9999px; margin-top: 2px; background: var(--gold); color: #fff; }
        .logout-btn { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; margin-top: 10px; padding: 8px 10px; border: 1px solid rgba(255,120,120,0.5); background: rgba(255,95,95,0.16); color: #ff9a9a; font-size: 12px; font-weight: 600; font-family: 'Inter', sans-serif; border-radius: 8px; cursor: pointer; transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease; }
        .logout-btn:hover { background: rgba(255,95,95,0.28); color: #ffbcbc; transform: translateY(-1px); }
        .logout-btn svg { width: 14px; height: 14px; }

        .main-area { flex: 1; margin-left: 260px; display: flex; flex-direction: column; height: 100vh; overflow-y: scroll; transition: margin-left 0.25s ease; }
        .app-shell.sidebar-collapsed .sidebar { transform: translateX(-100%); }
        .app-shell.sidebar-collapsed .main-area { margin-left: 0; }
        .main-area::-webkit-scrollbar { width: 10px; }
        .main-area::-webkit-scrollbar-track { background: transparent; }
        .main-area::-webkit-scrollbar-thumb { background: rgba(45,80,22,0.22); border-radius: 6px; }

        .topbar { height: 64px; background: #fff; border-bottom: 1px solid var(--light-grey); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: sticky; top: 0; z-index: 30; }
        .topbar-strip { height: 30px; flex-shrink: 0; background-image: url('{{ asset("patterns/saura-border-tight.png") }}'); background-size: auto 100%; background-repeat: repeat-x; background-position: center; opacity: 0.4; pointer-events: none; border-bottom: 1px solid var(--light-grey); }
        .topbar-search { position: relative; width: 340px; }
        .topbar-search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--grey); pointer-events: none; }
        .topbar-search input { width: 100%; height: 40px; border: 1px solid var(--light-grey); border-radius: 10px; padding: 0 14px 0 38px; font-size: 13px; font-family: 'Inter', sans-serif; color: var(--charcoal); background: var(--page-bg); outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .topbar-search input::placeholder { color: rgba(90,90,90,0.5); }
        .topbar-search input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(74,140,63,0.08); background: #fff; }
        .topbar-right { display: flex; align-items: center; gap: 16px; }
        .topbar-bell { position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px; border: none; background: transparent; cursor: pointer; }
        .topbar-bell svg { width: 20px; height: 20px; color: var(--grey); }
        .bell-badge { position: absolute; top: 5px; right: 5px; min-width: 16px; height: 16px; padding: 0 3px; background: var(--red); color: #fff; font-size: 9px; font-weight: 700; border-radius: 9px; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
        .topbar-user { display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: 8px; }
        .topbar-user-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--leaf); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 600; flex-shrink: 0; }
        .topbar-user-name { font-size: 13px; font-weight: 600; color: var(--charcoal); }
        .topbar-user-role { font-size: 11px; font-weight: 600; color: var(--gold); }

        .page-content { padding: 24px; flex: 1; }

        .hamburger { display: flex; width: 40px; height: 40px; align-items: center; justify-content: center; border: none; background: rgba(74,140,63,0.10); border-radius: 10px; cursor: pointer; }
        .hamburger:hover { background: rgba(74,140,63,0.18); }
        .hamburger svg { width: 20px; height: 20px; color: var(--green); }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 35; }

        @media (max-width: 768px) {
            .sidebar { transform: translateX(-100%); }
            .sidebar.open { transform: translateX(0); }
            .sidebar-overlay.open { display: block; }
            .main-area { margin-left: 0; }
            .topbar-search { width: 100%; max-width: 200px; }
            .topbar-user-name, .topbar-user-role { display: none; }
            .page-content { padding: 16px; }
        }
    </style>
</head>
<body>
    <div class="app-shell" id="appShell">
        <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

        <aside class="sidebar" id="sidebar">
            <div class="sidebar-logo">
                <a href="{{ route('telecalling.dashboard') }}"><img src="{{ asset('logo.png') }}" alt="Manikstu Agro" /></a>
            </div>

            @php
                $nav = [
                    ['dashboard', 'Dashboard', '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'],
                    ['farmers', 'Farmers', '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'],
                    ['orders', 'Orders', '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'],
                    ['products', 'Products', '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'],
                    ['delivery', 'Delivery Tracking', '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'],
                    ['complaints', 'Complaints', '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="15.5" r="0.6" fill="currentColor"/>'],
                    ['telecalling', 'Telecalling', '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'],
                    ['franchise', 'Franchise Leads', '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
                    ['reports', 'Reports', '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>'],
                    ['settings', 'Settings', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'],
                ];
            @endphp
            <nav class="sidebar-nav">
                <p class="nav-group-label">Overview</p>
                @foreach($nav as [$key, $label, $icon])
                    <a href="{{ route('telecalling.' . $key) }}" class="nav-item {{ request()->routeIs('telecalling.' . $key) ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $icon !!}</svg>
                        {{ $label }}
                    </a>
                @endforeach
            </nav>

            <div class="sidebar-user">
                <div class="sidebar-user-inner">
                    <div class="user-avatar">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</div>
                    <div class="user-info">
                        <p class="user-name">{{ Auth::user()->name }}</p>
                        <span class="user-role">{{ ucfirst(Auth::user()->role) }}</span>
                    </div>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="logout-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>

        <div class="main-area">
            <header class="topbar">
                <div style="display:flex;align-items:center;gap:12px;">
                    <button class="hamburger" onclick="toggleSidebar()" aria-label="Toggle menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                    <div class="topbar-search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input type="text" placeholder="Search anything..." />
                    </div>
                </div>
                <div class="topbar-right">
                    <button class="topbar-bell" aria-label="Notifications">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                        @isset($stats)@if(($stats['new'] ?? 0) > 0)<span class="bell-badge">{{ $stats['new'] > 9 ? '9+' : $stats['new'] }}</span>@endif @endisset
                    </button>
                    <div class="topbar-user">
                        <div class="topbar-user-avatar">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</div>
                        <div>
                            <p class="topbar-user-name">{{ Auth::user()->name }}</p>
                            <p class="topbar-user-role">{{ ucfirst(Auth::user()->role) }}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div class="topbar-strip" aria-hidden="true"></div>

            <main class="page-content">@yield('content')</main>
        </div>
    </div>

    <script>
        function toggleSidebar() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.toggle('open');
                document.getElementById('sidebarOverlay').classList.toggle('open');
            } else {
                var shell = document.getElementById('appShell');
                var collapsed = shell.classList.toggle('sidebar-collapsed');
                try { localStorage.setItem('tcSidebarCollapsed', collapsed ? '1' : '0'); } catch (e) {}
            }
        }
        function closeSidebar() {
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('open');
        }
        try {
            if (window.innerWidth > 768 && localStorage.getItem('tcSidebarCollapsed') === '1') {
                document.getElementById('appShell').classList.add('sidebar-collapsed');
            }
        } catch (e) {}
    </script>
</body>
</html>
