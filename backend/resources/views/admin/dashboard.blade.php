@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('content')
<style>
    .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .dash-title { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #1A1A1A; }
    .dash-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
    .dash-accent { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
    .dash-accent-line { width: 40px; height: 1px; background: #C4952A; opacity: 0.5; }
    .dash-accent-dot { width: 6px; height: 6px; background: #C4952A; transform: rotate(45deg); }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card {
        background: #fff;
        border: 1px solid #E5E5E5;
        border-radius: 12px;
        padding: 20px 22px;
        box-shadow: 0 2px 8px rgba(26,26,26,0.04);
        transition: box-shadow 0.2s, transform 0.2s;
    }
    .stat-card:hover { box-shadow: 0 4px 16px rgba(26,26,26,0.08); transform: translateY(-1px); }
    .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .stat-icon {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .stat-icon svg { width: 20px; height: 20px; }
    .stat-icon.green { background: rgba(74,140,63,0.08); color: #4A8C3F; }
    .stat-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 10px;
        border-radius: 9999px;
    }
    .badge-green { background: rgba(74,140,63,0.08); color: #3A7030; }
    .badge-gold { background: rgba(196,149,42,0.1); color: #C4952A; }
    .badge-red { background: rgba(212,52,44,0.08); color: #D4342C; }
    .stat-number { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #1A1A1A; line-height: 1.1; }
    .stat-label { font-size: 13px; color: #5A5A5A; margin-top: 4px; }

    .content-grid { display: grid; grid-template-columns: 2.5fr 1fr; gap: 20px; }

    .card {
        background: #fff;
        border: 1px solid #E5E5E5;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(26,26,26,0.04);
    }
    .card-header {
        padding: 16px 22px;
        border-bottom: 1px solid #E5E5E5;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        font-weight: 700;
        color: #1A1A1A;
    }
    .card-body { padding: 0; }

    .activity-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 22px;
        border-bottom: 1px solid #F0F0F0;
        transition: background 0.12s;
    }
    .activity-row:last-child { border-bottom: none; }
    .activity-row:hover { background: #FAFAFA; cursor: default; }
    .activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot-green { background: #4A8C3F; }
    .dot-gold { background: #C4952A; }
    .dot-red { background: #D4342C; }
    .activity-text { flex: 1; min-width: 0; }
    .activity-title { font-size: 13.5px; font-weight: 500; color: #1A1A1A; }
    .activity-sub { font-size: 12px; color: #5A5A5A; margin-top: 1px; }
    .activity-time { font-size: 12px; color: #999; white-space: nowrap; }

    .actions-card { padding: 0; }
    .action-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 13.5px;
        font-weight: 500;
        color: #1A1A1A;
        transition: all 0.15s;
        cursor: pointer;
    }
    .action-item:last-child { border-bottom: none; }
    .action-item:hover { background: rgba(74,140,63,0.04); color: #4A8C3F; }
    .action-item svg { width: 18px; height: 18px; color: #999; flex-shrink: 0; transition: color 0.15s, transform 0.15s; }
    .action-item:hover svg { color: #4A8C3F; transform: translateX(2px); }
    .action-item span { flex: 1; }
    .action-arrow { width: 16px; height: 16px; color: #ccc; flex-shrink: 0; transition: color 0.15s; }
    .action-item:hover .action-arrow { color: #4A8C3F; }

    .action-primary { background: rgba(74,140,63,0.03); }

    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) {
        .dash-title { font-size: 24px; }
        .stats-grid { grid-template-columns: 1fr; }
        .content-grid { grid-template-columns: 1fr; }
        .dash-header { flex-direction: column; align-items: flex-start; gap: 8px; }
    }
</style>

<div class="dash-header">
    <div>
        <h1 class="dash-title">Dashboard</h1>
        <p class="dash-subtitle">Welcome back, {{ Auth::user()->name }}. Here's what's happening today.</p>
        <div class="dash-accent">
            <span class="dash-accent-line"></span>
            <span class="dash-accent-dot"></span>
            <span class="dash-accent-line"></span>
        </div>
    </div>
</div>

<!-- Stat Cards -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-top">
            <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <span class="stat-badge badge-green">+2 this week</span>
        </div>
        <div class="stat-number">12</div>
        <div class="stat-label">Total Products</div>
    </div>

    <div class="stat-card">
        <div class="stat-top">
            <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <span class="stat-badge badge-green">+12%</span>
        </div>
        <div class="stat-number">48</div>
        <div class="stat-label">Total Orders</div>
    </div>

    <div class="stat-card">
        <div class="stat-top">
            <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span class="stat-badge badge-gold">5 pending</span>
        </div>
        <div class="stat-number">23</div>
        <div class="stat-label">Active Enquiries</div>
    </div>

    <div class="stat-card">
        <div class="stat-top">
            <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <span class="stat-badge badge-green">+18%</span>
        </div>
        <div class="stat-number">&#8377;5.2L</div>
        <div class="stat-label">Total Revenue</div>
    </div>
</div>

<!-- Activity + Actions -->
<div class="content-grid">

    <div class="card">
        <div class="card-header">Recent Activity</div>
        <div class="card-body">
            <div class="activity-row">
                <span class="activity-dot dot-green"></span>
                <div class="activity-text">
                    <p class="activity-title">New enquiry received from Rourkela</p>
                    <p class="activity-sub">Goat farming consultation enquiry</p>
                </div>
                <span class="activity-time">2 mins ago</span>
            </div>
            <div class="activity-row">
                <span class="activity-dot dot-gold"></span>
                <div class="activity-text">
                    <p class="activity-title">Order #1042 status updated to Shipped</p>
                    <p class="activity-sub">Customer: Abinash Behera</p>
                </div>
                <span class="activity-time">15 mins ago</span>
            </div>
            <div class="activity-row">
                <span class="activity-dot dot-green"></span>
                <div class="activity-text">
                    <p class="activity-title">New blog post published</p>
                    <p class="activity-sub">"Goat Farming Best Practices for 2026"</p>
                </div>
                <span class="activity-time">1 hour ago</span>
            </div>
            <div class="activity-row">
                <span class="activity-dot dot-gold"></span>
                <div class="activity-text">
                    <p class="activity-title">New customer registered</p>
                    <p class="activity-sub">Samira Bhoi (Jagatsinghpur)</p>
                </div>
                <span class="activity-time">3 hours ago</span>
            </div>
        </div>
    </div>

    <div class="card actions-card">
        <div class="card-header">Quick Actions</div>
        <div class="card-body">
            <a href="#" class="action-item action-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                <span>Add New Product</span>
                <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="action-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>Create Blog Post</span>
                <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="action-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>View All Enquiries</span>
                <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="action-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Manage Settings</span>
                <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </div>
    </div>

</div>
@endsection
