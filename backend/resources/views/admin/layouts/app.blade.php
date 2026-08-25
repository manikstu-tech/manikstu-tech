<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Dashboard') - Manikstu Admin</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
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
            --page-bg: #F5F5F5;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--charcoal); background: var(--page-bg); height: 100vh; overflow: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Playfair Display', serif; }
        a { text-decoration: none; color: inherit; }

        .app-shell { display: flex; height: 100vh; overflow: hidden; }

        /* ===== SIDEBAR ===== */
        .sidebar {
            width: 260px;
            background: var(--leaf);
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            z-index: 40;
            transition: transform 0.25s ease;
        }
        .sidebar-logo {
            height: 88px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgba(255,255,255,0.12);
            padding: 0 20px;
        }
        .sidebar-logo img { height: 40px; width: auto; filter: brightness(0) invert(1); opacity: 0.95; }

        .sidebar-nav {
            flex: 1;
            overflow-y: auto;
            padding: 12px 10px;
        }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        .nav-group-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255,255,255,0.4);
            padding: 16px 14px 6px;
        }
        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            height: 40px;
            padding: 0 14px;
            margin: 1px 0;
            border-radius: 8px;
            font-size: 13.5px;
            font-weight: 500;
            color: rgba(255,255,255,0.7);
            transition: all 0.15s;
            cursor: pointer;
        }
        .nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .nav-item.active {
            background: var(--green);
            color: #fff;
            font-weight: 600;
        }
        .nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

        .sidebar-user {
            border-top: 1px solid rgba(255,255,255,0.12);
            padding: 14px 16px;
        }
        .sidebar-user-inner {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
        }
        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role {
            display: inline-block;
            font-size: 10px;
            font-weight: 600;
            padding: 1px 8px;
            border-radius: 9999px;
            margin-top: 2px;
        }
        .role-developer { background: var(--gold); color: #fff; }
        .role-telesales { background: var(--green); color: #fff; }
        .role-hr { background: #5B8DEF; color: #fff; }
        .logout-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            width: 100%;
            margin-top: 10px;
            padding: 8px 10px;
            border: 1px solid rgba(255,120,120,0.5);
            background: rgba(255,95,95,0.16);
            color: #ff9a9a;
            font-size: 12px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .logout-btn:hover { background: rgba(255,95,95,0.28); color: #ffbcbc; transform: translateY(-1px); }
        .logout-btn:active { transform: translateY(0); }
        .logout-btn svg { width: 14px; height: 14px; }

        /* ===== MAIN ===== */
        .main-area { flex: 1; margin-left: 260px; display: flex; flex-direction: column; height: 100vh; overflow-y: scroll; }
        .main-area::-webkit-scrollbar { width: 10px; }
        .main-area::-webkit-scrollbar-track { background: transparent; }
        .main-area::-webkit-scrollbar-thumb { background: rgba(45,80,22,0.22); border-radius: 6px; }
        .main-area::-webkit-scrollbar-thumb:hover { background: rgba(45,80,22,0.35); }

        /* ===== TOPBAR ===== */
        .topbar {
            height: 64px;
            background: #fff;
            border-bottom: 1px solid var(--light-grey);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            position: sticky;
            top: 0;
            z-index: 30;
        }
        .topbar-strip {
            height: 30px;
            flex-shrink: 0;
            background-image: url('{{ asset("patterns/saura-border-tight.png") }}');
            background-size: auto 100%;
            background-repeat: repeat-x;
            background-position: center;
            opacity: 0.4;
            pointer-events: none;
            border-bottom: 1px solid var(--light-grey);
        }
        .topbar-search {
            position: relative;
            width: 340px;
        }
        .topbar-search svg {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            color: var(--grey);
            pointer-events: none;
        }
        .topbar-search input {
            width: 100%;
            height: 40px;
            border: 1px solid var(--light-grey);
            border-radius: 10px;
            padding: 0 14px 0 38px;
            font-size: 13px;
            font-family: 'Inter', sans-serif;
            color: var(--charcoal);
            background: var(--page-bg);
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .topbar-search input::placeholder { color: rgba(90,90,90,0.5); }
        .topbar-search input:focus {
            border-color: var(--green);
            box-shadow: 0 0 0 3px rgba(74,140,63,0.08);
            background: #fff;
        }
        .topbar-right { display: flex; align-items: center; gap: 16px; }
        .topbar-bell {
            position: relative;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            border: none;
            background: transparent;
            cursor: pointer;
            transition: background 0.15s;
        }
        .topbar-bell:hover { background: var(--page-bg); }
        .topbar-bell svg { width: 20px; height: 20px; color: var(--grey); }
        .bell-badge {
            position: absolute;
            top: 5px;
            right: 5px;
            min-width: 16px;
            height: 16px;
            padding: 0 3px;
            background: var(--red);
            color: #fff;
            font-size: 9px;
            font-weight: 700;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
        }
        .topbar-bell-wrap { position: relative; }
        .topbar-bell-menu {
            display: none;
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 340px;
            max-width: calc(100vw - 24px);
            background: #fff;
            border: 1px solid var(--light-grey);
            border-radius: 14px;
            box-shadow: 0 14px 40px rgba(26,26,26,0.16);
            z-index: 50;
            overflow: hidden;
        }
        .topbar-bell-wrap.open .topbar-bell-menu { display: block; animation: userMenuIn 0.16s ease both; }
        .bell-menu-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--light-grey); }
        .bell-menu-title { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--charcoal); }
        .bell-menu-count { font-size: 11px; font-weight: 700; color: var(--green); background: rgba(74,140,63,0.10); padding: 3px 9px; border-radius: 9999px; }
        .bell-menu-list { max-height: 360px; overflow-y: auto; }
        .bell-menu-list::-webkit-scrollbar { width: 6px; }
        .bell-menu-list::-webkit-scrollbar-thumb { background: rgba(45,80,22,0.18); border-radius: 6px; }
        .bell-item { position: relative; display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #F4F1EB; text-decoration: none; transition: background 0.13s; }
        .bell-item:hover { background: #FBFAF7; }
        .bell-item.unread { background: rgba(74,140,63,0.035); }
        .bell-item-ic { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bell-item-ic svg { width: 17px; height: 17px; }
        .bell-ic-enquiry { background: rgba(74,140,63,0.12); color: #3A7030; }
        .bell-ic-order { background: rgba(196,149,42,0.14); color: #B4711A; }
        .bell-item-body { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .bell-item-title { font-size: 13px; font-weight: 600; color: var(--charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bell-item-sub { font-size: 12px; color: var(--grey); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bell-item-time { font-size: 11px; color: #A8A8A8; margin-top: 4px; }
        .bell-item-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; margin-top: 6px; }
        .bell-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 36px 16px; color: #B0B0B0; }
        .bell-empty svg { width: 30px; height: 30px; opacity: 0.5; }
        .bell-empty p { font-size: 13px; }
        .bell-menu-foot { display: block; text-align: center; padding: 12px; font-size: 12.5px; font-weight: 600; color: var(--green); text-decoration: none; border-top: 1px solid var(--light-grey); transition: background 0.13s; }
        .bell-menu-foot:hover { background: #FBFAF7; }
        .topbar-user-wrap { position: relative; }
        .topbar-user {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 8px;
            border: none;
            background: transparent;
            font-family: 'Inter', sans-serif;
            transition: background 0.15s;
        }
        .topbar-user:hover { background: var(--page-bg); }
        .topbar-user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--leaf);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
        }
        .topbar-user-meta { display: flex; flex-direction: column; text-align: left; min-width: 0; }
        .topbar-user-name { font-size: 13px; font-weight: 600; color: var(--charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .topbar-user-role { font-size: 11px; font-weight: 600; color: var(--gold); white-space: nowrap; }
        .topbar-user-chev { width: 16px; height: 16px; color: var(--grey); flex-shrink: 0; transition: transform 0.2s ease; }
        .topbar-user-wrap.open .topbar-user-chev { transform: rotate(180deg); }

        /* User dropdown */
        .topbar-user-menu {
            display: none;
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            min-width: 220px;
            background: #fff;
            border: 1px solid var(--light-grey);
            border-radius: 12px;
            box-shadow: 0 12px 32px rgba(26,26,26,0.14);
            padding: 6px;
            z-index: 50;
        }
        .topbar-user-wrap.open .topbar-user-menu { display: block; animation: userMenuIn 0.16s ease both; }
        @keyframes userMenuIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .user-menu-head { display: flex; align-items: center; gap: 10px; padding: 10px 10px 12px; border-bottom: 1px solid var(--light-grey); margin-bottom: 6px; }
        .user-menu-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--leaf); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; flex-shrink: 0; }
        .user-menu-id { display: flex; flex-direction: column; min-width: 0; }
        .user-menu-name { font-size: 13.5px; font-weight: 600; color: var(--charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-menu-role { font-size: 11px; font-weight: 600; color: var(--gold); }
        .user-menu-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 10px; border: none; background: transparent; font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif; color: var(--grey); border-radius: 8px; cursor: pointer; text-decoration: none; text-align: left; }
        .user-menu-item svg { width: 16px; height: 16px; flex-shrink: 0; }
        .user-menu-item:hover { background: var(--page-bg); color: var(--charcoal); }
        .user-menu-danger { color: var(--red); }
        .user-menu-danger:hover { background: rgba(212,52,44,0.08); color: var(--red); }

        /* ===== PAGE CONTENT ===== */
        .page-content { padding: 24px; flex: 1; }

        /* ===== HAMBURGER ===== */
        .hamburger {
            display: flex;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            border: none;
            background: rgba(74,140,63,0.10);
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.15s;
        }
        .hamburger:hover { background: rgba(74,140,63,0.18); }
        .hamburger svg { width: 20px; height: 20px; color: var(--green); }
        .sidebar-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 35;
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
            .sidebar { transform: translateX(-100%); }
            .sidebar.open { transform: translateX(0); }
            .sidebar-overlay.open { display: block; }
            .main-area { margin-left: 0; }
            .hamburger { display: flex; }
            .topbar-search { width: 100%; max-width: 200px; }
            .topbar-user-meta, .topbar-user-chev { display: none; }
            .topbar-user { gap: 0; padding: 2px; }
            .page-content { padding: 16px; }
        }
        @media (max-width: 380px) {
            .topbar-search { max-width: 130px; }
            .topbar-user-menu { min-width: 200px; right: -4px; }
        }
    </style>
</head>
<body>
    @php
        $notifItems = collect();
        try {
            foreach (\App\Models\Enquiry::latest()->take(6)->get() as $e) {
                $notifItems->push([
                    'type' => 'enquiry',
                    'title' => $e->name ?: 'New enquiry',
                    'sub' => \Illuminate\Support\Str::limit($e->message ?: ($e->type ?: 'New enquiry received'), 46),
                    'time' => $e->created_at,
                    'unread' => ($e->status ?? 'new') === 'new',
                    'url' => route('admin.enquiries.index'),
                ]);
            }
        } catch (\Throwable $ex) {}
        try {
            foreach (\App\Models\Order::latest()->take(6)->get() as $o) {
                $notifItems->push([
                    'type' => 'order',
                    'title' => 'Order ' . ($o->order_number ?: ('#' . $o->id)),
                    'sub' => '₹' . number_format((float) $o->total, 0) . ' · ' . ucfirst($o->status ?? 'pending'),
                    'time' => $o->created_at,
                    'unread' => in_array($o->status ?? 'pending', ['pending', 'processing']),
                    'url' => route('admin.orders.index'),
                ]);
            }
        } catch (\Throwable $ex) {}
        $notifItems = $notifItems->sortByDesc('time')->take(7)->values();
        $notifCount = $notifItems->where('unread', true)->count();
    @endphp
    <div class="app-shell">

        <!-- Sidebar overlay (mobile) -->
        <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-logo">
                <a href="{{ route('admin.dashboard') }}">
                    <img src="{{ asset('logo.png') }}" alt="Manikstu Agro" />
                </a>
            </div>

            <nav class="sidebar-nav">
                <p class="nav-group-label">Overview</p>
                <a href="{{ route('admin.dashboard') }}" class="nav-item {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Dashboard
                </a>

                <p class="nav-group-label">Catalog</p>
                <a href="{{ route('admin.products.index') }}" class="nav-item {{ request()->routeIs('admin.products*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Products
                </a>
                <a href="{{ route('admin.categories.index') }}" class="nav-item {{ request()->routeIs('admin.categories*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>
                    Categories
                </a>

                <p class="nav-group-label">Sales</p>
                <a href="{{ route('admin.orders.index') }}" class="nav-item {{ request()->routeIs('admin.orders*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Orders
                </a>
                <a href="{{ route('admin.customers.index') }}" class="nav-item {{ request()->routeIs('admin.customers*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Customers
                </a>
                <a href="{{ route('admin.enquiries.index') }}" class="nav-item {{ request()->routeIs('admin.enquiries*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Enquiries
                </a>

                <p class="nav-group-label">Content</p>
                <a href="{{ route('admin.blog.index') }}" class="nav-item {{ request()->routeIs('admin.blog*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Blog Posts
                </a>
                <a href="{{ route('admin.press.index') }}" class="nav-item {{ request()->routeIs('admin.press*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                    Press Releases
                </a>
                <a href="{{ route('admin.media.index') }}" class="nav-item {{ request()->routeIs('admin.media*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    Media
                </a>
                <a href="{{ route('admin.team.index') }}" class="nav-item {{ request()->routeIs('admin.team*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Team
                </a>
                <a href="{{ route('admin.careers.index') }}" class="nav-item {{ request()->routeIs('admin.careers*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Careers
                </a>
                <a href="{{ route('admin.training.index') }}" class="nav-item {{ request()->routeIs('admin.training*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Training
                </a>
                <a href="{{ route('admin.testimonials.index') }}" class="nav-item {{ request()->routeIs('admin.testimonials*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Testimonials
                </a>
                <a href="{{ route('admin.partners.index') }}" class="nav-item {{ request()->routeIs('admin.partners*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Partners
                </a>

                <p class="nav-group-label">System</p>
                <a href="{{ route('admin.settings.edit') }}" class="nav-item {{ request()->routeIs('admin.settings*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Settings
                </a>
                <a href="{{ route('admin.users.index') }}" class="nav-item {{ request()->routeIs('admin.users*') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Users
                </a>
            </nav>

            <div class="sidebar-user">
                <div class="sidebar-user-inner">
                    <div class="user-avatar">{{ substr(Auth::user()->name, 0, 1) }}</div>
                    <div class="user-info">
                        <p class="user-name">{{ Auth::user()->name }}</p>
                        <span class="user-role role-{{ Auth::user()->role }}">{{ ucfirst(Auth::user()->role) }}</span>
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

        <!-- Main -->
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
                    <div class="topbar-bell-wrap" id="bellWrap">
                        <button type="button" class="topbar-bell" onclick="toggleBellMenu()" aria-label="Notifications" aria-haspopup="true" aria-expanded="false" id="bellToggle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                            @if($notifCount > 0)<span class="bell-badge">{{ $notifCount > 9 ? '9+' : $notifCount }}</span>@endif
                        </button>
                        <div class="topbar-bell-menu" id="bellMenu">
                            <div class="bell-menu-head">
                                <span class="bell-menu-title">Notifications</span>
                                @if($notifCount > 0)<span class="bell-menu-count">{{ $notifCount }} new</span>@endif
                            </div>
                            <div class="bell-menu-list">
                                @forelse($notifItems as $n)
                                    <a href="{{ $n['url'] }}" class="bell-item {{ $n['unread'] ? 'unread' : '' }}">
                                        <span class="bell-item-ic bell-ic-{{ $n['type'] }}">
                                            @if($n['type'] === 'order')
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                                            @else
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                            @endif
                                        </span>
                                        <span class="bell-item-body">
                                            <span class="bell-item-title">{{ $n['title'] }}</span>
                                            <span class="bell-item-sub">{{ $n['sub'] }}</span>
                                            <span class="bell-item-time">{{ $n['time'] ? $n['time']->diffForHumans() : '' }}</span>
                                        </span>
                                        @if($n['unread'])<span class="bell-item-dot"></span>@endif
                                    </a>
                                @empty
                                    <div class="bell-empty">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                                        <p>You're all caught up</p>
                                    </div>
                                @endforelse
                            </div>
                            <a href="{{ route('admin.enquiries.index') }}" class="bell-menu-foot">View all enquiries</a>
                        </div>
                    </div>
                    <div class="topbar-user-wrap" id="userWrap">
                        <button type="button" class="topbar-user" onclick="toggleUserMenu()" aria-haspopup="true" aria-expanded="false" id="userToggle">
                            <span class="topbar-user-avatar">{{ substr(Auth::user()->name, 0, 1) }}</span>
                            <span class="topbar-user-meta">
                                <span class="topbar-user-name">{{ Auth::user()->name }}</span>
                                <span class="topbar-user-role">{{ ucfirst(Auth::user()->role) }}</span>
                            </span>
                            <svg class="topbar-user-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <div class="topbar-user-menu" id="userMenu">
                            <div class="user-menu-head">
                                <span class="user-menu-avatar">{{ substr(Auth::user()->name, 0, 1) }}</span>
                                <span class="user-menu-id">
                                    <span class="user-menu-name">{{ Auth::user()->name }}</span>
                                    <span class="user-menu-role">{{ ucfirst(Auth::user()->role) }}</span>
                                </span>
                            </div>
                            <a href="{{ route('admin.settings.edit') }}" class="user-menu-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                                Settings
                            </a>
                            <form method="POST" action="{{ route('admin.logout') }}">
                                @csrf
                                <button type="submit" class="user-menu-item user-menu-danger">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <div class="topbar-strip" aria-hidden="true"></div>

            <main class="page-content">
                @yield('content')
            </main>
        </div>
    </div>

    <script>
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
            document.getElementById('sidebarOverlay').classList.toggle('open');
        }
        function closeSidebar() {
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('open');
        }
        function closeBellMenu() {
            var bw = document.getElementById('bellWrap');
            if (bw) { bw.classList.remove('open'); document.getElementById('bellToggle').setAttribute('aria-expanded', 'false'); }
        }
        function closeUserMenu() {
            var uw = document.getElementById('userWrap');
            if (uw) { uw.classList.remove('open'); document.getElementById('userToggle').setAttribute('aria-expanded', 'false'); }
        }
        function toggleUserMenu() {
            closeBellMenu();
            var wrap = document.getElementById('userWrap');
            var open = wrap.classList.toggle('open');
            document.getElementById('userToggle').setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        function toggleBellMenu() {
            closeUserMenu();
            var wrap = document.getElementById('bellWrap');
            var open = wrap.classList.toggle('open');
            document.getElementById('bellToggle').setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        document.addEventListener('click', function (e) {
            if (!e.target.closest('#userWrap')) closeUserMenu();
            if (!e.target.closest('#bellWrap')) closeBellMenu();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { closeUserMenu(); closeBellMenu(); }
        });
    </script>
</body>
</html>
