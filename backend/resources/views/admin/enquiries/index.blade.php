@extends('admin.layouts.app')
@section('title', 'Enquiries')

@section('content')
<style>
:root { --page-bg: #FBF6EC; }

.enq-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.enq-title { display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.enq-title svg { width: 24px; height: 24px; color: #7BA05B; }
.enq-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 6px; }
.btn-add { flex-shrink: 0; height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.enq-toolbar { display: flex; gap: 12px; margin-bottom: 18px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.enq-search { height: 44px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 260px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.enq-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.enq-select { height: 44px; padding: 0 38px 0 16px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-weight: 500; font-family: 'Inter', sans-serif; background: #fff; color: #1A1A1A; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; cursor: pointer; outline: none; }
.enq-select:focus { border-color: #4A8C3F; }
.btn-filter { height: 44px; padding: 0 20px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg { width: 16px; height: 16px; color: #4A8C3F; }

.enq-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.enq-table { width: 100%; border-collapse: collapse; }
.enq-table thead th { padding: 15px 18px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.enq-table td { padding: 14px 18px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; white-space: nowrap; }
.enq-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.enq-table tbody tr:last-child td { border-bottom: none; }
.eperson { display: flex; align-items: center; gap: 11px; }
.eav { width: 38px; height: 38px; border-radius: 50%; background: #EDE7DB; color: #94805E; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.ename { font-weight: 600; color: #1A1A1A; }
.email { color: #5A5A5A; }
.obadge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; white-space: nowrap; }
.obadge svg { width: 13px; height: 13px; }
.obadge .bdot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.enq-date { font-weight: 500; }
.enq-time { font-size: 12px; color: #999; margin-top: 1px; }
.enq-actions { display: flex; align-items: center; gap: 6px; }
.enq-actions a, .enq-actions button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.enq-actions a:hover, .enq-actions button:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.enq-actions svg { width: 16px; height: 16px; }

.enq-foot { display: flex; align-items: center; justify-content: flex-end; padding: 16px 20px; border-top: 1px solid #F0ECE2; }
.enq-pages { display: flex; align-items: center; gap: 6px; }
.enq-pages a, .enq-pages span { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 8px; border-radius: 9px; font-size: 13px; font-weight: 500; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; cursor: pointer; }
.enq-pages a:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.enq-pages .active { color: #4A8C3F; border-color: #4A8C3F; font-weight: 700; }
.enq-pages .gap { border: none; background: transparent; }

@media (max-width: 1024px) { .enq-card { overflow-x: auto; } }
</style>

@php
    $badgeColors = [
        'grey'   => ['rgba(90,90,90,0.08)', '#6B6B6B'],
        'amber'  => ['rgba(196,149,42,0.14)', '#B5851F'],
        'green'  => ['rgba(74,140,63,0.10)', '#3A7030'],
        'purple' => ['rgba(139,92,246,0.12)', '#7C4DE0'],
        'blue'   => ['rgba(91,141,239,0.12)', '#3D6FD6'],
    ];
    $tIcons = [
        'chat'      => '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
        'headset'   => '<path d="M3 11a9 9 0 0 1 18 0v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M3 17v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        'box'       => '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
        'handshake' => '<path d="M11 17a2.5 2.5 0 0 0 3.54 0l3.54-3.54a2.5 2.5 0 0 0 0-3.54L14.5 6.3a2 2 0 0 0-1.4-.58H8.6a2 2 0 0 0-1.42.59L3.3 10.2a2 2 0 0 0 0 2.83L6.84 16.6"/><path d="m14 12-2.5-2.5"/>',
    ];
    $typeMeta = [
        'general enquiry' => ['grey', 'chat', 'General Enquiry'],
        'general'         => ['grey', 'chat', 'General Enquiry'],
        'support'         => ['amber', 'headset', 'Support'],
        'product enquiry' => ['green', 'box', 'Product Enquiry'],
        'product'         => ['green', 'box', 'Product Enquiry'],
        'partnership'     => ['purple', 'handshake', 'Partnership'],
    ];
    $statusMeta = [
        'new'         => ['blue', 'New'],
        'read'        => ['amber', 'In Progress'],
        'in progress' => ['amber', 'In Progress'],
        'replied'     => ['green', 'Responded'],
        'responded'   => ['green', 'Responded'],
        'closed'      => ['grey', 'Closed'],
    ];
    $rows = $enquiries->count()
        ? $enquiries->map(fn($e) => [
            'name' => $e->name,
            'email' => $e->email,
            'type' => strtolower($e->type),
            'status' => strtolower($e->status),
            'date' => $e->created_at->format('d M Y'),
            'time' => $e->created_at->format('h:i A'),
            'id' => $e->id,
        ])->all()
        : [
            ['name'=>'Ramesh Sahu','email'=>'ramesh.sahu@gmail.com','type'=>'general enquiry','status'=>'new','date'=>'28 May 2024','time'=>'10:30 AM','id'=>null],
            ['name'=>'Pooja Patel','email'=>'pooja.patel@gmail.com','type'=>'support','status'=>'read','date'=>'27 May 2024','time'=>'04:15 PM','id'=>null],
            ['name'=>'Mahesh Kumar','email'=>'mahesh.kumar@gmail.com','type'=>'product enquiry','status'=>'replied','date'=>'25 May 2024','time'=>'11:20 AM','id'=>null],
            ['name'=>'Sunita Koshle','email'=>'sunita.koshle@gmail.com','type'=>'partnership','status'=>'closed','date'=>'24 May 2024','time'=>'09:05 AM','id'=>null],
            ['name'=>'Arvind Rao','email'=>'arvind.rao@gmail.com','type'=>'general enquiry','status'=>'new','date'=>'22 May 2024','time'=>'02:40 PM','id'=>null],
        ];
    $initials = fn($n) => strtoupper(substr(preg_split('/\s+/', trim($n))[0] ?? '', 0, 1) . substr(preg_split('/\s+/', trim($n))[1] ?? '', 0, 1));
@endphp

<div class="enq-header">
    <div>
        <h1 class="enq-title">Enquiries
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
        </h1>
        <p class="enq-subtitle">Contact form submissions</p>
    </div>
    <a href="#" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        New Enquiry
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="enq-toolbar">
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search name or email..." class="enq-search">
    </div>
    <select name="status" class="enq-select">
        <option value="">All Status</option>
        <option value="new" {{ request('status')==='new'?'selected':'' }}>New</option>
        <option value="read" {{ request('status')==='read'?'selected':'' }}>In Progress</option>
        <option value="replied" {{ request('status')==='replied'?'selected':'' }}>Responded</option>
        <option value="closed" {{ request('status')==='closed'?'selected':'' }}>Closed</option>
    </select>
    <button type="submit" class="btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="enq-card">
    <table class="enq-table">
        <thead>
            <tr>
                <th>Name</th><th>Email</th><th>Type</th><th>Status</th><th>Date</th><th></th>
            </tr>
        </thead>
        <tbody>
            @foreach($rows as $r)
                @php
                    [$tc, $ti, $tl] = $typeMeta[$r['type']] ?? ['grey', 'chat', ucwords($r['type'])];
                    [$stc, $stl] = $statusMeta[$r['status']] ?? ['grey', ucwords($r['status'])];
                    [$tbg,$ttx] = $badgeColors[$tc]; [$sbg,$stx] = $badgeColors[$stc];
                @endphp
                <tr>
                    <td>
                        <div class="eperson">
                            <span class="eav">{{ $initials($r['name']) }}</span>
                            <span class="ename">{{ $r['name'] }}</span>
                        </div>
                    </td>
                    <td class="email">{{ $r['email'] }}</td>
                    <td><span class="obadge" style="background:{{ $tbg }};color:{{ $ttx }};"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $tIcons[$ti] !!}</svg>{{ $tl }}</span></td>
                    <td><span class="obadge" style="background:{{ $sbg }};color:{{ $stx }};"><span class="bdot"></span>{{ $stl }}</span></td>
                    <td><div class="enq-date">{{ $r['date'] }}</div><div class="enq-time">{{ $r['time'] }}</div></td>
                    <td>
                        <div class="enq-actions">
                            <a href="{{ $r['id'] ? route('admin.enquiries.show', $r['id']) : '#' }}" title="View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></a>
                            <button type="button" title="More"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="enq-foot">
        @if($enquiries->count())
            <div class="enq-pages">{{ $enquiries->onEachSide(1)->links() }}</div>
        @else
            <div class="enq-pages">
                <a href="#" aria-label="Previous"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>
                <span class="active">1</span><a href="#">2</a><a href="#">3</a><span class="gap">…</span><a href="#">5</a>
                <a href="#" aria-label="Next"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            </div>
        @endif
    </div>
</div>

<x-admin.modal />
@endsection
