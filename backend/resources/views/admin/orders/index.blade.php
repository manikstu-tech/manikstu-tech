@extends('admin.layouts.app')
@section('title', 'Orders')

@section('content')
<style>
:root { --page-bg: #FDF7EF; }

.ord-header { position: relative; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.ord-title { display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.ord-title svg { width: 26px; height: 26px; color: #7BA05B; }
.ord-crumb { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #8A8A8A; margin-top: 6px; }
.ord-crumb svg { width: 13px; height: 13px; }
.ord-crumb .cur { color: #4A8C3F; font-weight: 600; }
.btn-add { flex-shrink: 0; height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.ord-toolbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.ord-search { height: 44px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 260px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.ord-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.ord-select { height: 44px; padding: 0 38px 0 16px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-weight: 500; font-family: 'Inter', sans-serif; background: #fff; color: #1A1A1A; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; cursor: pointer; outline: none; }
.ord-select:focus { border-color: #4A8C3F; }
.btn-filter, .date-pill { height: 44px; padding: 0 18px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover, .date-pill:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg, .date-pill svg { width: 16px; height: 16px; color: #4A8C3F; }
.date-pill { position: relative; }
.date-pill .chev { color: #999; margin-left: 2px; }
.date-pill input[type="date"] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; border: none; margin: 0; padding: 0; cursor: pointer; }
.date-pill input[type="date"]::-webkit-calendar-picker-indicator { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }

.ord-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.ord-table { width: 100%; border-collapse: collapse; }
.ord-table thead th { padding: 15px 18px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.th-inner { display: inline-flex; align-items: center; gap: 5px; }
.th-inner svg { width: 12px; height: 12px; color: #C4B89A; }
.ord-table td { padding: 14px 18px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; white-space: nowrap; }
.ord-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.ord-table tbody tr:last-child td { border-bottom: none; }
.ord-num { font-weight: 700; color: #3A7030; letter-spacing: 0.2px; }
.cust { display: flex; align-items: center; gap: 11px; }
.cust-av { width: 38px; height: 38px; border-radius: 50%; background: rgba(74,140,63,0.12); color: #3A7030; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.cust-name { font-weight: 600; color: #1A1A1A; }
.cust-phone { font-size: 12px; color: #999; margin-top: 1px; }
.ord-total { font-weight: 700; }
.obadge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; padding: 4px 11px; border-radius: 9999px; white-space: nowrap; }
.obadge svg { width: 13px; height: 13px; }
.ord-date { font-weight: 500; }
.ord-time { font-size: 12px; color: #999; margin-top: 1px; }
.ord-actions { display: flex; align-items: center; gap: 6px; }
.ord-actions a, .ord-actions button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.ord-actions a:hover, .ord-actions button:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.ord-actions svg { width: 16px; height: 16px; }

.ord-foot { display: flex; align-items: center; justify-content: flex-end; padding: 16px 20px; border-top: 1px solid #F0ECE2; }
.ord-pages { display: flex; align-items: center; gap: 6px; }
.ord-pages a, .ord-pages span { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 8px; border-radius: 9px; font-size: 13px; font-weight: 500; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; cursor: pointer; }
.ord-pages a:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.ord-pages .active { background: #fff; color: #4A8C3F; border-color: #4A8C3F; font-weight: 700; }
.ord-pages .gap { border: none; background: transparent; }

.ord-plant { position: absolute; right: 0; top: 8px; width: 120px; height: 96px; opacity: 0.5; background-image: url('{{ asset("patterns/card-plant.png") }}'); background-repeat: no-repeat; background-size: contain; background-position: right top; pointer-events: none; }

@media (max-width: 1024px) { .ord-plant { display: none; } .ord-card { overflow-x: auto; } }
</style>

@php
    $badgeColors = [
        'green'  => ['rgba(74,140,63,0.10)', '#3A7030'],
        'amber'  => ['rgba(196,149,42,0.14)', '#B5851F'],
        'blue'   => ['rgba(91,141,239,0.12)', '#3D6FD6'],
        'red'    => ['rgba(212,52,44,0.08)', '#D4342C'],
        'purple' => ['rgba(139,92,246,0.12)', '#7C4DE0'],
        'grey'   => ['rgba(90,90,90,0.10)', '#6B6B6B'],
    ];
    $ic = [
        'check' => '<path d="M20 6 9 17l-5-5"/>',
        'clock' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'truck' => '<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
        'x'     => '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
        'card'  => '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
        'undo'  => '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
        'dot'   => '<circle cx="12" cy="12" r="4"/>',
    ];
    $statusMeta = [
        'delivered'  => ['green', 'check', 'Delivered'],
        'processing' => ['amber', 'clock', 'Processing'],
        'confirmed'  => ['blue', 'check', 'Confirmed'],
        'shipped'    => ['blue', 'truck', 'Shipped'],
        'pending'    => ['amber', 'dot', 'Pending'],
        'cancelled'  => ['red', 'x', 'Cancelled'],
    ];
    $payMeta = [
        'paid'     => ['green', 'check', 'Paid'],
        'cod'      => ['purple', 'card', 'COD'],
        'pending'  => ['amber', 'dot', 'Pending'],
        'refunded' => ['grey', 'undo', 'Refunded'],
        'failed'   => ['red', 'x', 'Failed'],
    ];

    $rows = $orders->count()
        ? $orders->map(fn($o) => [
            'id' => $o->id,
            'num' => $o->order_number,
            'name' => $o->customer->name ?? 'Guest',
            'phone' => $o->customer->phone ?? '',
            'total' => number_format($o->total, 2),
            'status' => strtolower($o->status),
            'pay' => strtolower($o->payment_status),
            'date' => $o->created_at->format('d M Y'),
            'time' => $o->created_at->format('h:i A'),
        ])->all()
        : [
            ['num'=>'ORD-10024','name'=>'Ramesh Sahu','phone'=>'+91 91753 46321','total'=>'12,450.00','status'=>'delivered','pay'=>'paid','date'=>'28 May 2024','time'=>'10:30 AM'],
            ['num'=>'ORD-10023','name'=>'Pooja Patel','phone'=>'+91 79986 12544','total'=>'8,950.00','status'=>'processing','pay'=>'paid','date'=>'27 May 2024','time'=>'04:15 PM'],
            ['num'=>'ORD-10022','name'=>'Mahesh Kumar','phone'=>'+91 98271 65432','total'=>'5,320.00','status'=>'shipped','pay'=>'cod','date'=>'25 May 2024','time'=>'11:20 AM'],
            ['num'=>'ORD-10021','name'=>'Sunita Koshle','phone'=>'+91 97541 22311','total'=>'2,150.00','status'=>'pending','pay'=>'pending','date'=>'24 May 2024','time'=>'09:05 AM'],
            ['num'=>'ORD-10020','name'=>'Arvind Rao','phone'=>'+91 93400 88521','total'=>'9,870.00','status'=>'cancelled','pay'=>'refunded','date'=>'22 May 2024','time'=>'02:40 PM'],
        ];
    $initials = function($n){ $p = preg_split('/\s+/', trim($n)); return strtoupper(substr($p[0] ?? '', 0, 1) . substr($p[1] ?? '', 0, 1)); };
@endphp

<div class="ord-header">
    <div>
        <h1 class="ord-title">Orders
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
        </h1>
        <div class="ord-crumb">Dashboard <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg> <span class="cur">Orders</span></div>
    </div>
    <div class="ord-plant" aria-hidden="true"></div>
    <a href="{{ route('admin.orders.create') }}" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        New Order
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="ord-toolbar">
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search order number, customer..." class="ord-search">
    </div>
    <select name="status" class="ord-select">
        <option value="">All Status</option>
        <option value="pending" {{ request('status')==='pending'?'selected':'' }}>Pending</option>
        <option value="confirmed" {{ request('status')==='confirmed'?'selected':'' }}>Confirmed</option>
        <option value="shipped" {{ request('status')==='shipped'?'selected':'' }}>Shipped</option>
        <option value="delivered" {{ request('status')==='delivered'?'selected':'' }}>Delivered</option>
        <option value="cancelled" {{ request('status')==='cancelled'?'selected':'' }}>Cancelled</option>
    </select>
    <button type="submit" class="btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
    <label class="date-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
        <span>{{ request('date') ? \Illuminate\Support\Carbon::parse(request('date'))->format('d M Y') : now()->format('d M Y') }}</span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        <input type="date" name="date" value="{{ request('date') }}" max="{{ now()->format('Y-m-d') }}" aria-label="Filter by date" onchange="this.form.submit()" onclick="if(this.showPicker){try{this.showPicker()}catch(e){}}">
    </label>
</form>

<div class="ord-card">
    <table class="ord-table">
        <thead>
            <tr>
                @foreach(['Order #','Customer','Total','Status','Payment','Date','Actions'] as $h)
                    <th><span class="th-inner">{{ $h }}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></span></th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($rows as $r)
                @php
                    [$sc, $si, $sl] = $statusMeta[$r['status']] ?? ['grey','dot',ucfirst($r['status'])];
                    [$pc, $pi, $pl] = $payMeta[$r['pay']] ?? ['grey','dot',ucfirst($r['pay'])];
                    [$sbg,$stx] = $badgeColors[$sc]; [$pbg,$ptx] = $badgeColors[$pc];
                @endphp
                @php $oid = $r['id'] ?? null; @endphp
                <tr>
                    <td>@if($oid)<a href="{{ route('admin.orders.show', $oid) }}" class="ord-num ord-num-link">{{ $r['num'] }}</a>@else<span class="ord-num">{{ $r['num'] }}</span>@endif</td>
                    <td>
                        <div class="cust">
                            <span class="cust-av">{{ $initials($r['name']) }}</span>
                            <div>
                                <div class="cust-name">{{ $r['name'] }}</div>
                                @if($r['phone'])<div class="cust-phone">{{ $r['phone'] }}</div>@endif
                            </div>
                        </div>
                    </td>
                    <td><span class="ord-total">&#8377; {{ $r['total'] }}</span></td>
                    <td><span class="obadge" style="background:{{ $sbg }};color:{{ $stx }};"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $ic[$si] !!}</svg>{{ $sl }}</span></td>
                    <td><span class="obadge" style="background:{{ $pbg }};color:{{ $ptx }};"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $ic[$pi] !!}</svg>{{ $pl }}</span></td>
                    <td><div class="ord-date">{{ $r['date'] }}</div><div class="ord-time">{{ $r['time'] }}</div></td>
                    <td>
                        <div class="ord-actions">
                            <a href="{{ $oid ? route('admin.orders.show', $oid) : '#' }}" title="View details"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></a>
                            @if($oid)<a href="{{ route('admin.orders.edit', $oid) }}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a>@endif
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="ord-foot">
        @if($orders->count())
            <div class="ord-pages">{{ $orders->onEachSide(1)->links() }}</div>
        @else
            <div class="ord-pages">
                <a href="#" aria-label="Previous"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>
                <span class="active">1</span><a href="#">2</a><a href="#">3</a><span class="gap">…</span><a href="#">5</a>
                <a href="#" aria-label="Next"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            </div>
        @endif
    </div>
</div>

<x-admin.modal />
@endsection
