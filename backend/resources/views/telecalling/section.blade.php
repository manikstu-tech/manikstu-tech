@extends('telecalling.layouts.app')
@section('title', $sectionTitle)

@section('content')
<div class="sec-head">
    <h1 class="sec-title">{{ $sectionTitle }}</h1>
    <div class="sec-orn"><span class="sec-line"></span><span class="sec-dot"></span><span class="sec-line"></span></div>
    <p class="sec-sub">This section is being prepared for the telecalling panel.</p>
</div>

<div class="sec-card">
    <span class="sec-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
    <h2>{{ $sectionTitle }} — Coming Soon</h2>
    <p>This part of the telecalling workspace isn't built yet. Head back to your dashboard to work through today's leads and calls.</p>
    <a href="{{ route('telecalling.dashboard') }}" class="sec-btn">← Back to Dashboard</a>
</div>

<style>
.sec-head { margin-bottom:22px; }
.sec-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.sec-orn { display:flex; align-items:center; gap:6px; margin-top:6px; }
.sec-line { width:36px; height:2px; background:#C4952A; opacity:.55; border-radius:2px; }
.sec-dot { width:7px; height:7px; background:#C4952A; transform:rotate(45deg); }
.sec-sub { font-size:14px; color:#5A5A5A; margin-top:8px; }
.sec-card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); text-align:center; padding:56px 24px; }
.sec-ic { width:64px; height:64px; border-radius:16px; background:rgba(74,140,63,0.10); color:#4A8C3F; display:flex; align-items:center; justify-content:center; margin:0 auto 18px; }
.sec-ic svg { width:30px; height:30px; }
.sec-card h2 { font-family:'Playfair Display',serif; font-size:22px; margin:0 0 8px; }
.sec-card p { font-size:14px; color:#5A5A5A; max-width:440px; margin:0 auto 20px; }
.sec-btn { display:inline-flex; align-items:center; gap:6px; padding:11px 22px; border-radius:10px; background:#4A8C3F; color:#fff; font-size:13px; font-weight:600; }
.sec-btn:hover { background:#3A7030; }
</style>
@endsection
