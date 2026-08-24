@extends('admin.layouts.app')
@section('title', 'Dashboard')

@section('content')
<style>
/* warm cream page to match the villagescape theme (dashboard only) */
:root { --page-bg: #FBF6EC; }

.dash-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 26px; }
.dash-title { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: #1A1A1A; }
.dash-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.dash-accent { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
.dash-accent-line { width: 42px; height: 2px; background: #C4952A; opacity: 0.55; border-radius: 2px; }
.dash-accent-line.short { width: 22px; opacity: 0.3; }
.dash-accent-dot { width: 7px; height: 7px; background: #C4952A; transform: rotate(45deg); }
.date-pill { position: relative; display: inline-flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #ECE7DC; border-radius: 12px; padding: 10px 14px; font-size: 13.5px; font-weight: 600; color: #1A1A1A; box-shadow: 0 2px 8px rgba(26,26,26,0.04); white-space: nowrap; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; }
.date-pill:hover { border-color: rgba(74,140,63,0.4); box-shadow: 0 4px 12px rgba(26,26,26,0.07); }
.date-pill svg { width: 17px; height: 17px; color: #4A8C3F; }
.date-pill .chev { color: #999; width: 15px; height: 15px; }
.date-pill input[type="date"] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; border: none; padding: 0; margin: 0; cursor: pointer; outline: none; }
.date-pill input[type="date"]::-webkit-calendar-picker-indicator { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 22px; }
.content-grid { display: grid; grid-template-columns: 2.2fr 1fr; gap: 20px; }
.card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; box-shadow: 0 2px 10px rgba(26,26,26,0.04); overflow: hidden; }
.card-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 14px; }
.card-head h2 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1A1A1A; }
.view-all { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 600; color: #4A8C3F; text-decoration: none; transition: gap 0.15s; }
.view-all:hover { gap: 8px; }
.view-all svg { width: 15px; height: 15px; }

/* activity list */
.act-list { padding: 0 12px 12px; }
.act-row { display: flex; align-items: center; gap: 14px; padding: 13px 12px; border-radius: 12px; transition: background 0.13s; }
.act-row:hover { background: #FBF9F4; }
.act-row + .act-row { border-top: 1px solid #F4F1EA; }
.act-ic { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.act-ic svg { width: 19px; height: 19px; }
.ic-green { background: rgba(74,140,63,0.10); color: #4A8C3F; }
.ic-gold { background: rgba(196,149,42,0.12); color: #C4952A; }
.ic-red { background: rgba(212,52,44,0.08); color: #D4342C; }
.act-body { flex: 1; min-width: 0; }
.act-title { font-size: 14px; font-weight: 600; color: #1A1A1A; }
.act-sub { font-size: 12.5px; color: #7A7A7A; margin-top: 1px; }
.act-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.act-time { font-size: 12px; color: #999; white-space: nowrap; }
.act-dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-green { background: #4A8C3F; } .dot-gold { background: #C4952A; } .dot-red { background: #D4342C; }

/* quick actions */
.qa-head { padding: 20px 24px 10px; }
.qa-head h2 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1A1A1A; }
.qa-list { padding: 6px 16px 18px; display: flex; flex-direction: column; gap: 10px; }
.qa-item { display: flex; align-items: center; gap: 14px; padding: 13px 14px; border: 1px solid #ECE7DC; border-radius: 12px; text-decoration: none; transition: all 0.15s; }
.qa-item:hover { border-color: rgba(74,140,63,0.4); background: rgba(74,140,63,0.03); }
.qa-ic { width: 42px; height: 42px; border-radius: 11px; background: rgba(74,140,63,0.10); color: #4A8C3F; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.qa-ic svg { width: 20px; height: 20px; }
.qa-title { flex: 1; font-size: 14px; font-weight: 600; color: #1A1A1A; }
.qa-arrow { width: 17px; height: 17px; color: #C9C4B8; flex-shrink: 0; transition: color 0.15s, transform 0.15s; }
.qa-item:hover .qa-arrow { color: #4A8C3F; transform: translateX(2px); }

/* footer villagescape */
.dash-footer { position: relative; margin-top: 30px; height: 96px; display: flex; align-items: center; justify-content: center; }
.dash-footer-left, .dash-footer-right { position: absolute; bottom: 0; height: 92px; background-repeat: no-repeat; background-size: contain; opacity: 0.9; pointer-events: none; }
.dash-footer-left { left: 0; width: 34%; max-width: 340px; background-image: url('{{ asset("patterns/footer-left.png") }}'); background-position: left bottom; }
.dash-footer-right { right: 0; width: 33%; max-width: 360px; background-image: url('{{ asset("patterns/footer-right.png") }}'); background-position: right bottom; }
.dash-copyright { position: relative; z-index: 2; text-align: center; font-size: 12px; color: #5A5A5A; background: #FBF6EC; padding: 6px 22px; border-radius: 8px; }

@media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .content-grid { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .dash-title { font-size: 26px; } .stats-grid { grid-template-columns: 1fr; } .dash-header { flex-direction: column; } }
</style>

<div class="dash-header">
    <div>
        <h1 class="dash-title">Dashboard</h1>
        <p class="dash-subtitle">Welcome back, {{ Auth::user()->name }}. Here's what's happening today.</p>
        <div class="dash-accent"><span class="dash-accent-line"></span><span class="dash-accent-dot"></span><span class="dash-accent-line short"></span></div>
    </div>
    <form method="GET" action="{{ route('admin.dashboard') }}">
        <label class="date-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
            <span>{{ ($selectedDate ?? now())->format('d F Y') }}</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            <input type="date" name="date" value="{{ ($selectedDate ?? now())->format('Y-m-d') }}" max="{{ now()->format('Y-m-d') }}" onchange="this.form.submit()" onclick="if(this.showPicker){try{this.showPicker()}catch(e){}}" aria-label="Select date" />
        </label>
    </form>
</div>

<div class="stats-grid">
    <x-admin.stat-card value="{{ $stats['products'] }}" label="Total Products" icon="package" color="green" artimg="patterns/card-plant.png" badge="+2 this week" />
    <x-admin.stat-card value="{{ $stats['orders'] }}" label="Total Orders" icon="cart" color="green" artimg="patterns/card-goat.png" badge="+12%" />
    <x-admin.stat-card value="{{ $stats['enquiries'] }}" label="Active Enquiries" icon="message" color="amber" artimg="patterns/card-plant.png" badge="{{ $stats['enquiries'] }} pending" trend="dot" accent />
    <x-admin.stat-card value="₹{{ $stats['revenue'] > 0 ? number_format($stats['revenue'] / 100000, 1) . 'L' : '0' }}" label="Total Revenue" icon="dollar" color="green" art="chart" badge="+18%" />
</div>

@php
$svgMsg = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
$svgCart = '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>';
$svgDoc = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/>';
$svgUser = '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
$svgAlert = '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/>';

$activities = $recentEnquiries->count()
    ? $recentEnquiries->map(fn($e) => ['ic' => $svgMsg, 'tone' => 'green', 'title' => 'New enquiry from '.$e->name, 'sub' => Str::limit($e->message, 52), 'time' => $e->created_at->diffForHumans(), 'dot' => $e->status === 'new' ? 'green' : 'gold'])->all()
    : [
        ['ic' => $svgMsg, 'tone' => 'green', 'title' => 'New enquiry received from Rourkela', 'sub' => 'Goat farming consultation enquiry', 'time' => '2 mins ago', 'dot' => 'green'],
        ['ic' => $svgCart, 'tone' => 'gold', 'title' => 'Order #1042 status updated to Shipped', 'sub' => 'Customer: Abinash Behera', 'time' => '15 mins ago', 'dot' => 'gold'],
        ['ic' => $svgDoc, 'tone' => 'green', 'title' => 'New blog post published', 'sub' => '"Goat Farming Best Practices for 2026"', 'time' => '1 hour ago', 'dot' => 'green'],
        ['ic' => $svgUser, 'tone' => 'gold', 'title' => 'New customer registered', 'sub' => 'Samira Bhoi (Jagatsinghpur)', 'time' => '3 hours ago', 'dot' => 'gold'],
        ['ic' => $svgAlert, 'tone' => 'red', 'title' => 'Low stock alert for Goat Feed 25kg', 'sub' => 'Only 5 bags remaining', 'time' => '5 hours ago', 'dot' => 'red'],
    ];
@endphp

<div class="content-grid">
    <div class="card">
        <div class="card-head">
            <h2>Recent Enquiries</h2>
            <a href="{{ route('admin.enquiries.index') }}" class="view-all">View all <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
        </div>
        <div class="act-list">
            @foreach($activities as $a)
                <div class="act-row">
                    <span class="act-ic ic-{{ $a['tone'] }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $a['ic'] !!}</svg></span>
                    <div class="act-body">
                        <div class="act-title">{{ $a['title'] }}</div>
                        <div class="act-sub">{{ $a['sub'] }}</div>
                    </div>
                    <div class="act-meta">
                        <span class="act-time">{{ $a['time'] }}</span>
                        <span class="act-dot dot-{{ $a['dot'] }}"></span>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <div class="card">
        <div class="qa-head"><h2>Quick Actions</h2></div>
        <div class="qa-list">
            <a href="{{ route('admin.products.create') }}" class="qa-item">
                <span class="qa-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></span>
                <span class="qa-title">Add New Product</span>
                <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="{{ route('admin.blog.create') }}" class="qa-item">
                <span class="qa-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>
                <span class="qa-title">Create Blog Post</span>
                <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="{{ route('admin.enquiries.index') }}" class="qa-item">
                <span class="qa-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
                <span class="qa-title">View All Enquiries</span>
                <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="{{ route('admin.settings.edit') }}" class="qa-item">
                <span class="qa-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg></span>
                <span class="qa-title">Manage Settings</span>
                <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </div>
    </div>
</div>

<div class="dash-footer">
    <div class="dash-footer-left" aria-hidden="true"></div>
    <div class="dash-footer-right" aria-hidden="true"></div>
    <p class="dash-copyright">&copy; {{ date('Y') }} Manikstu Agro Private Limited. All Rights Reserved.</p>
</div>
@endsection
