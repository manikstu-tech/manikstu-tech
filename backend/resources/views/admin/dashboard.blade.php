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
.content-grid { display: grid; grid-template-columns: 2.5fr 1fr; gap: 20px; }
.card { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; box-shadow: 0 2px 8px rgba(26,26,26,0.04); }
.card-header { padding: 16px 22px; border-bottom: 1px solid #E5E5E5; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #1A1A1A; }
.activity-row { display: flex; align-items: center; gap: 12px; padding: 14px 22px; border-bottom: 1px solid #F0F0F0; transition: background 0.12s; }
.activity-row:last-child { border-bottom: none; }
.activity-row:hover { background: #FAFAFA; }
.activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-green { background: #4A8C3F; }
.dot-gold { background: #C4952A; }
.dot-red { background: #D4342C; }
.activity-text { flex: 1; min-width: 0; }
.activity-title { font-size: 13.5px; font-weight: 500; color: #1A1A1A; }
.activity-sub { font-size: 12px; color: #5A5A5A; margin-top: 1px; }
.activity-time { font-size: 12px; color: #999; white-space: nowrap; }
.actions-card { padding: 0; }
.action-item { display: flex; align-items: center; gap: 10px; padding: 13px 22px; border-bottom: 1px solid #F0F0F0; font-size: 13.5px; font-weight: 500; color: #1A1A1A; transition: all 0.15s; cursor: pointer; text-decoration: none; }
.action-item:last-child { border-bottom: none; }
.action-item:hover { background: rgba(74,140,63,0.04); color: #4A8C3F; }
.action-item svg { width: 18px; height: 18px; color: #999; flex-shrink: 0; transition: color 0.15s, transform 0.15s; }
.action-item:hover svg { color: #4A8C3F; transform: translateX(2px); }
.action-item span { flex: 1; }
.action-arrow { width: 16px; height: 16px; color: #ccc; flex-shrink: 0; transition: color 0.15s; }
.action-item:hover .action-arrow { color: #4A8C3F; }
@media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .dash-title { font-size: 24px; } .stats-grid { grid-template-columns: 1fr; } .content-grid { grid-template-columns: 1fr; } .dash-header { flex-direction: column; align-items: flex-start; gap: 8px; } }
</style>

<div class="dash-header">
    <div>
        <h1 class="dash-title">Dashboard</h1>
        <p class="dash-subtitle">Welcome back, {{ Auth::user()->name }}. Here's what's happening today.</p>
        <div class="dash-accent"><span class="dash-accent-line"></span><span class="dash-accent-dot"></span><span class="dash-accent-line"></span></div>
    </div>
</div>

<div class="stats-grid">
    <x-admin.stat-card title="Products" value="{{ $stats['products'] }}" label="Total Products" icon="package" badge="+2 this week" badgeType="green" />
    <x-admin.stat-card title="Orders" value="{{ $stats['orders'] }}" label="Total Orders" icon="cart" badge="+12%" badgeType="green" />
    <x-admin.stat-card title="Enquiries" value="{{ $stats['enquiries'] }}" label="New Enquiries" icon="message" badge="{{ $stats['enquiries'] }} pending" badgeType="gold" />
    <x-admin.stat-card title="Revenue" value="₹{{ $stats['revenue'] > 0 ? number_format($stats['revenue'] / 100000, 1) . 'L' : '0' }}" label="Total Revenue" icon="dollar" badge="+18%" badgeType="green" />
</div>

<div class="content-grid">
    <div class="card">
        <div class="card-header">Recent Enquiries</div>
        @forelse($recentEnquiries as $e)
            <div class="activity-row">
                <span class="activity-dot {{ $e->status === 'new' ? 'dot-red' : 'dot-green' }}"></span>
                <div class="activity-text">
                    <p class="activity-title">{{ $e->name }} — {{ ucfirst($e->type) }}</p>
                    <p class="activity-sub">{{ Str::limit($e->message, 60) }}</p>
                </div>
                <span class="activity-time">{{ $e->created_at->diffForHumans() }}</span>
            </div>
        @empty
            <p style="padding:20px;text-align:center;color:#999;font-size:13px;">No enquiries yet.</p>
        @endforelse
    </div>

    <div class="card actions-card">
        <div class="card-header">Quick Actions</div>
        <a href="{{ route('admin.products.create') }}" class="action-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            <span>Add New Product</span>
            <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="{{ route('admin.blog.create') }}" class="action-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <span>Create Blog Post</span>
            <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="{{ route('admin.enquiries.index') }}" class="action-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>View All Enquiries</span>
            <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="{{ route('admin.settings.edit') }}" class="action-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Manage Settings</span>
            <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
    </div>
</div>
@endsection
