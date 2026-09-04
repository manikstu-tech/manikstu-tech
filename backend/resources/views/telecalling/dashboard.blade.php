@extends('telecalling.layouts.app')
@section('title', 'Telecalling Dashboard')

@section('content')
@php
    use Illuminate\Support\Str;

    // status -> [text color, soft bg, donut color]
    $statusMeta = [
        'new'       => ['#3A7030', 'rgba(74,140,63,0.12)',  '#4A8C3F'],
        'contacted' => ['#B4711A', 'rgba(196,149,42,0.14)', '#C4952A'],
        'converted' => ['#3E6FD0', 'rgba(91,141,239,0.14)', '#3E6FD0'],
        'closed'    => ['#5A5A5A', 'rgba(90,90,90,0.10)',   '#9A9A9A'],
    ];
    $badge = function ($status) use ($statusMeta) {
        $s = strtolower($status ?: 'new');
        [$tx, $bg] = $statusMeta[$s] ?? $statusMeta['new'];
        return '<span class="tc-badge" style="background:' . $bg . ';color:' . $tx . '">' . ucfirst($s) . '</span>';
    };
    $initials = fn ($n) => strtoupper(implode('', array_map(fn ($w) => substr($w, 0, 1), array_slice(preg_split('/\s+/', trim((string) $n)) ?: [], 0, 2))));
    $waNum = fn ($p) => preg_replace('/\D+/', '', (string) $p);

    $total = max(1, (int) $stats['total']);
    $segs = [
        ['New', (int) $stats['new'], $statusMeta['new'][2]],
        ['Contacted', (int) $stats['contacted'], $statusMeta['contacted'][2]],
        ['Converted', (int) $stats['converted'], $statusMeta['converted'][2]],
        ['Closed', (int) $stats['closed'], $statusMeta['closed'][2]],
    ];
    $acc = 0; $stops = [];
    foreach ($segs as [$lbl, $cnt, $col]) {
        if ($cnt <= 0) continue;
        $start = round($acc / $total * 100, 2); $acc += $cnt; $end = round($acc / $total * 100, 2);
        $stops[] = "{$col} {$start}% {$end}%";
    }
    $donut = count($stops) ? 'conic-gradient(' . implode(',', $stops) . ')' : '#EDE9E1';
    $hour = (int) now()->format('G');
    $greet = $hour < 12 ? 'Good Morning' : ($hour < 17 ? 'Good Afternoon' : 'Good Evening');
@endphp

<div class="tc-head">
    <div>
        <h1 class="tc-title">{{ $greet }}, {{ Str::of(Auth::user()->name)->explode(' ')->first() }}</h1>
        <div class="tc-orn"><span class="tc-orn-line"></span><span class="tc-orn-dot"></span><span class="tc-orn-line"></span></div>
        <p class="tc-sub">Here are the leads that need your call today.</p>
    </div>
    <div class="date-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
        <span>{{ now()->format('d M Y') }}</span>
    </div>
</div>

<div class="stat-grid">
    @php
        $cards = [
            ['New Leads', $stats['new'], 'green', '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>', 'To call'],
            ['Contacted', $stats['contacted'], 'gold', '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', 'Followed up'],
            ['Converted', $stats['converted'], 'blue', '<polyline points="20 6 9 17 4 12"/>', 'Won leads'],
            ['Total Enquiries', $stats['total'], 'leaf', '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>', $stats['today'].' today'],
        ];
    @endphp
    @foreach($cards as [$label, $num, $tone, $path, $trend])
        <div class="stat-card">
            <span class="stat-ic ic-{{ $tone }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $path !!}</svg></span>
            <div class="stat-label">{{ $label }}</div>
            <div class="stat-num">{{ $num }}</div>
            <div class="stat-trend">{{ $trend }}</div>
        </div>
    @endforeach
</div>

<div class="tc-grid">
    <div class="card">
        <div class="card-head"><h3>Call Queue</h3><span class="head-note">{{ $queue->count() }} to call</span></div>
        <div class="pad-sm">
            @forelse($queue as $lead)
                <div class="call-item">
                    <span class="call-av">{{ $initials($lead->name) ?: 'L' }}</span>
                    <div class="call-main">
                        <div class="call-name">{{ $lead->name }}</div>
                        <div class="call-sub">{{ $lead->type ? ucwords(str_replace('_',' ',$lead->type)).' · ' : '' }}{{ Str::limit($lead->message, 38) }}</div>
                        <div class="call-meta">{{ $lead->phone ?: 'No phone' }} · {{ $lead->created_at->diffForHumans() }}</div>
                    </div>
                    @if($lead->phone)
                        <div class="call-actions">
                            <a class="ic-round ic-call" href="tel:{{ $lead->phone }}" title="Call"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
                            <a class="ic-round ic-wa" href="https://wa.me/{{ $waNum($lead->phone) }}" target="_blank" rel="noopener" title="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg></a>
                        </div>
                    @endif
                </div>
            @empty
                <p class="empty">No new leads to call. New website enquiries appear here.</p>
            @endforelse
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Lead Status</h3></div>
        <div class="donut-wrap">
            <div class="donut" style="background:{{ $donut }}"><div class="donut-c"><div class="donut-n">{{ $stats['total'] }}</div><div class="donut-l">Total Leads</div></div></div>
            <div class="legend">
                @foreach($segs as [$lbl, $cnt, $col])
                    <div class="leg-row"><span class="sw" style="background:{{ $col }}"></span><span class="ln">{{ $lbl }}</span><span class="lv">{{ $cnt }}</span><span class="lp">({{ $stats['total'] ? round($cnt / max(1,$stats['total']) * 100) : 0 }}%)</span></div>
                @endforeach
            </div>
        </div>
        <div class="quote">
            <p>"Every call is a step towards a stronger farmer community."</p>
            <span>— Manikstu</span>
        </div>
    </div>
</div>

<div class="card" id="leads">
    <div class="card-head"><h3>Recent Leads</h3><span class="head-note">Latest enquiries</span></div>
    <div class="tc-table-wrap">
        <table class="tc-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Type</th><th>Message</th><th>Status</th><th>Date</th><th></th></tr></thead>
            <tbody>
                @forelse($recent as $lead)
                    <tr>
                        <td><strong>{{ $lead->name }}</strong>@if($lead->email)<div class="muted">{{ $lead->email }}</div>@endif</td>
                        <td>{{ $lead->phone ?: '—' }}</td>
                        <td>{{ $lead->type ? ucwords(str_replace('_',' ',$lead->type)) : '—' }}</td>
                        <td class="muted" title="{{ $lead->message }}">{{ Str::limit($lead->message, 38) }}</td>
                        <td>{!! $badge($lead->status) !!}</td>
                        <td>{{ $lead->created_at->format('d M Y') }}</td>
                        <td>@if($lead->phone)<a href="tel:{{ $lead->phone }}" class="call-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call</a>@else<span class="muted">—</span>@endif</td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="empty">No leads yet. New enquiries from the website appear here.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<div class="tc-footer">
    <div class="tc-foot-left" aria-hidden="true"></div>
    <div class="tc-foot-right" aria-hidden="true"></div>
    <p class="tc-copy">&copy; {{ date('Y') }} Manikstu Agro Private Limited. All Rights Reserved.</p>
</div>

<style>
.tc-head { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:22px; flex-wrap:wrap; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-orn { display:flex; align-items:center; gap:6px; margin-top:6px; }
.tc-orn-line { width:36px; height:2px; background:#C4952A; opacity:.55; border-radius:2px; }
.tc-orn-dot { width:7px; height:7px; background:#C4952A; transform:rotate(45deg); }
.tc-sub { font-size:14px; color:#5A5A5A; margin-top:8px; }
.date-pill { display:inline-flex; align-items:center; gap:10px; background:#fff; border:1px solid #ECE7DC; border-radius:12px; padding:10px 14px; font-size:13.5px; font-weight:600; color:#1A1A1A; box-shadow:0 2px 8px rgba(26,26,26,0.04); }
.date-pill svg { width:16px; height:16px; color:#4A8C3F; }

.stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:20px; }
.stat-card { background:#fff; border:1px solid #ECE7DC; border-radius:16px; padding:18px 20px; box-shadow:0 2px 10px rgba(26,26,26,0.04); }
.stat-ic { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; }
.stat-ic svg { width:20px; height:20px; }
.ic-green { background:rgba(74,140,63,0.10); color:#4A8C3F; }
.ic-gold { background:rgba(196,149,42,0.12); color:#C4952A; }
.ic-blue { background:rgba(91,141,239,0.12); color:#3E6FD0; }
.ic-leaf { background:rgba(58,112,48,0.10); color:#3A7030; }
.stat-label { font-size:12.5px; color:#8A8A8A; }
.stat-num { font-family:'Playfair Display',serif; font-size:30px; font-weight:700; color:#1A1A1A; margin-top:2px; }
.stat-trend { font-size:11.5px; color:#9A9A9A; margin-top:4px; font-weight:600; }

.tc-grid { display:grid; grid-template-columns:2fr 1.3fr; gap:20px; margin-bottom:20px; align-items:start; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); overflow:hidden; }
.card-head { display:flex; align-items:center; justify-content:space-between; padding:15px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.head-note { font-size:12px; font-weight:600; color:#3A7030; }
.pad-sm { padding:8px; }

.call-item { display:flex; align-items:center; gap:12px; padding:11px 12px; border-radius:11px; transition:background .13s; }
.call-item:hover { background:#FBF9F4; }
.call-av { width:40px; height:40px; border-radius:50%; background:rgba(74,140,63,0.10); color:#3A7030; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0; }
.call-main { flex:1; min-width:0; }
.call-name { font-size:13.5px; font-weight:700; color:#1A1A1A; }
.call-sub { font-size:12px; color:#8A8A8A; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:230px; }
.call-meta { font-size:11.5px; color:#3A7030; font-weight:600; margin-top:3px; }
.call-actions { display:flex; gap:6px; }
.ic-round { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
.ic-round svg { width:15px; height:15px; }
.ic-call { background:rgba(74,140,63,0.12); color:#3A7030; }
.ic-call:hover { background:rgba(74,140,63,0.22); }
.ic-wa { background:rgba(196,149,42,0.14); color:#B4711A; }
.ic-wa:hover { background:rgba(196,149,42,0.24); }

.donut-wrap { display:flex; align-items:center; gap:18px; padding:18px 20px; }
.donut { width:128px; height:128px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; position:relative; }
.donut::after { content:''; position:absolute; inset:20px; background:#fff; border-radius:50%; }
.donut-c { position:relative; z-index:1; text-align:center; }
.donut-n { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; }
.donut-l { font-size:9.5px; color:#9A9A9A; }
.legend { flex:1; display:flex; flex-direction:column; gap:9px; }
.leg-row { display:flex; align-items:center; gap:8px; font-size:12.5px; }
.leg-row .sw { width:10px; height:10px; border-radius:3px; }
.leg-row .ln { flex:1; color:#3A3A3A; }
.leg-row .lv { font-weight:700; }
.leg-row .lp { color:#9A9A9A; font-size:11px; }
.quote { background:#3A7030; color:#fff; border-radius:12px; padding:16px 18px; margin:0 18px 18px; }
.quote p { font-family:'Playfair Display',serif; font-style:italic; font-size:14px; margin:0 0 6px; line-height:1.5; }
.quote span { font-size:11px; opacity:.85; }

.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:12px 18px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:13px 18px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; vertical-align:middle; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.muted { color:#9A9A9A; font-size:12px; margin-top:2px; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:600; padding:4px 11px; border-radius:9999px; }
.call-pill { display:inline-flex; align-items:center; gap:5px; padding:6px 12px; border-radius:8px; background:rgba(74,140,63,0.12); color:#3A7030; font-size:12px; font-weight:700; }
.call-pill:hover { background:rgba(74,140,63,0.2); }
.call-pill svg { width:13px; height:13px; }
.empty { text-align:center; color:#9A9A9A; padding:36px; }

.tc-footer { position:relative; margin-top:24px; min-height:92px; }
.tc-foot-left, .tc-foot-right { position:absolute; bottom:0; height:92px; background-repeat:no-repeat; background-size:contain; opacity:.9; pointer-events:none; }
.tc-foot-left { left:0; width:34%; max-width:340px; background-image:url('{{ asset("patterns/footer-left.png") }}'); background-position:left bottom; }
.tc-foot-right { right:0; width:33%; max-width:360px; background-image:url('{{ asset("patterns/footer-right.png") }}'); background-position:right bottom; }
.tc-copy { position:relative; z-index:2; text-align:center; font-size:12px; color:#5A5A5A; padding-top:36px; }

@media (max-width:1000px){ .tc-grid { grid-template-columns:1fr; } }
@media (max-width:640px){ .stat-grid { grid-template-columns:1fr 1fr; } }
</style>
@endsection
