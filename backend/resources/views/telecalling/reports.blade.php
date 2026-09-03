@extends('telecalling.layouts.app')
@section('title', 'Reports')

@section('content')
@php
    $icons = [
        'orders'    => '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
        'revenue'   => '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
        'time'      => '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'franchise' => '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    ];
    $tints = [
        'blue'   => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'green'  => ['#3A7030', 'rgba(74,140,63,0.14)'],
        'gold'   => ['#B4711A', 'rgba(196,149,42,0.16)'],
        'purple' => ['#7C5CB0', 'rgba(124,92,176,0.14)'],
    ];

    $maxBar = max(array_column($ordersPerMonth, 'value'));

    // Build the donut gradient from the status breakdown.
    $grad = [];
    $acc = 0;
    foreach ($statusBreakdown['items'] as $s) {
        $start = $acc;
        $acc += $s['pct'];
        $grad[] = $s['color'] . ' ' . $start . '% ' . $acc . '%';
    }
    $donut = 'conic-gradient(' . implode(', ', $grad) . ')';
@endphp

<div class="tc-toolbar">
    <div>
        <h1 class="tc-title">Reports</h1>
        <p class="tc-sub">Performance overview across orders, calls and franchise growth.</p>
    </div>
</div>

{{-- KPI cards --}}
<div class="kpi-grid">
    @foreach($kpis as $k)
        @php [$ic, $ib] = $tints[$k['tint']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)']; @endphp
        <div class="kpi-card">
            <span class="kpi-ico" style="background:{{ $ib }};color:{{ $ic }};">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $icons[$k['icon']] ?? '' !!}</svg>
            </span>
            <p class="kpi-label">{{ $k['label'] }}</p>
            <p class="kpi-value">{{ $k['value'] }}</p>
            <p class="kpi-delta {{ $k['up'] ? 'up' : 'down' }}">{{ $k['delta'] }}</p>
        </div>
    @endforeach
</div>

<div class="rp-grid2">
    {{-- Orders per month bar chart --}}
    <div class="card">
        <div class="card-head"><h3>Orders per Month</h3></div>
        <div class="pad">
            <div class="bars">
                @foreach($ordersPerMonth as $b)
                    <div class="bar-col">
                        <div class="bar-track">
                            <div class="bar" style="height:{{ round($b['value'] / $maxBar * 100) }}%;" title="{{ $b['value'] }} orders"></div>
                        </div>
                        <span class="bar-label">{{ $b['month'] }}</span>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    {{-- Order status donut --}}
    <div class="card">
        <div class="card-head"><h3>Order Status Breakdown</h3></div>
        <div class="pad">
            <div class="donut-row">
                <div class="donut" style="background:{{ $donut }};">
                    <div class="donut-hole">
                        <span class="donut-num">{{ $statusBreakdown['total'] }}</span>
                        <span class="donut-cap">This month</span>
                    </div>
                </div>
                <ul class="legend">
                    @foreach($statusBreakdown['items'] as $s)
                        <li>
                            <span class="dot" style="background:{{ $s['color'] }};"></span>
                            <span class="leg-label">{{ $s['label'] }}</span>
                            <span class="leg-count">{{ $s['count'] }}</span>
                            <span class="leg-pct">({{ $s['pct'] }}%)</span>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>

{{-- Top products --}}
<div class="card">
    <div class="card-head"><h3>Top Products</h3></div>
    <div class="tc-table-wrap">
        <table class="tc-table">
            <thead>
                <tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr>
            </thead>
            <tbody>
                @foreach($topProducts as $p)
                    <tr>
                        <td class="strong">{{ $p['product'] }}</td>
                        <td class="num">{{ number_format($p['units']) }}</td>
                        <td class="num">₹{{ number_format($p['revenue']) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

<style>
.tc-toolbar { margin-bottom:20px; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-sub { font-size:13.5px; color:#5A5A5A; margin-top:4px; }

.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-head { padding:15px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.pad { padding:22px 20px; }

.kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:20px; }
.kpi-card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); padding:20px; }
.kpi-ico { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
.kpi-ico svg { width:22px; height:22px; }
.kpi-label { font-size:13px; color:#7A7A7A; }
.kpi-value { font-size:30px; font-weight:800; color:#1A1A1A; margin-top:6px; line-height:1.1; }
.kpi-delta { font-size:12.5px; font-weight:600; margin-top:10px; }
.kpi-delta.up { color:#3A7030; }
.kpi-delta.down { color:#D4342C; }

.rp-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }

.bars { display:flex; align-items:flex-end; justify-content:space-between; gap:14px; height:190px; }
.bar-col { flex:1; display:flex; flex-direction:column; align-items:center; height:100%; }
.bar-track { flex:1; width:100%; display:flex; align-items:flex-end; justify-content:center; }
.bar { width:60%; max-width:46px; background:linear-gradient(180deg,#C4952A,#B4711A); border-radius:6px 6px 0 0; min-height:6px; transition:height .3s; }
.bar-label { font-size:11.5px; color:#9A9A9A; margin-top:10px; }

.donut-row { display:flex; align-items:center; gap:26px; flex-wrap:wrap; }
.donut { width:150px; height:150px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
.donut-hole { width:100px; height:100px; border-radius:50%; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.donut-num { font-size:26px; font-weight:800; color:#1A1A1A; }
.donut-cap { font-size:10.5px; color:#9A9A9A; margin-top:2px; }
.legend { list-style:none; flex:1; min-width:180px; }
.legend li { display:flex; align-items:center; gap:9px; padding:7px 0; font-size:13px; }
.dot { width:11px; height:11px; border-radius:3px; flex-shrink:0; }
.leg-label { flex:1; color:#3A3A3A; }
.leg-count { font-weight:700; color:#1A1A1A; }
.leg-pct { color:#9A9A9A; font-size:12px; min-width:44px; text-align:right; }

.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:14px 20px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:15px 20px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.tc-table .strong { font-weight:700; }
.tc-table .num { color:#3A7030; font-weight:600; }

@media (max-width:1100px){ .kpi-grid { grid-template-columns:repeat(2,1fr); } }
@media (max-width:900px){ .rp-grid2 { grid-template-columns:1fr; } }
@media (max-width:520px){ .kpi-grid { grid-template-columns:1fr; } }
</style>
@endsection
