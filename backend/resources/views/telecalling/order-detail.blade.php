@extends('telecalling.layouts.app')
@section('title', 'Order ' . $order['id'])

@section('content')
@php
    $statusColors = [
        'In Transit' => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'Issue Reported' => ['#D4342C', 'rgba(212,52,44,0.10)'],
        'Delivered' => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'Pending' => ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Confirmed' => ['#7C5CB0', 'rgba(124,92,176,0.14)'],
    ];
    [$stx, $sbg] = $statusColors[$order['status']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
    $trackDigits = preg_replace('/\D+/', '', $order['phone']);
    $city = explode(',', $order['location'])[0];
    $paid = str_contains(strtolower($order['payment']), 'paid');
@endphp

<a href="{{ route('telecalling.orders') }}" class="back-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    Back to Orders
</a>

<div class="od-head">
    <div>
        <h1 class="od-title">Order #{{ $order['id'] }} <span class="tc-badge" style="background:{{ $sbg }};color:{{ $stx }};">{{ $order['status'] }}</span></h1>
        <p class="od-sub">Placed on {{ $order['date'] }}</p>
    </div>
    <div class="od-actions">
        <button type="button" class="icon-btn" title="Share" onclick="shareOrder(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg></button>
        <button type="button" class="icon-btn" title="Print" onclick="window.print()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></button>
    </div>
</div>

<div class="card info-card">
    <div class="info-col">
        <div class="info-col-title">Farmer Details</div>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg><span class="v">{{ $order['farmer'] }}</span></div>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:{{ $order['phone'] }}" class="v">{{ $order['phone'] }}</a></div>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span class="v">{{ $order['location'] }}</span></div>
    </div>
    <div class="info-col">
        <div class="info-col-title">Order Details</div>
        <div class="kv"><span class="k">Product</span><span class="sep">:</span><span class="v">{{ $order['product'] }}</span></div>
        <div class="kv"><span class="k">Quantity</span><span class="sep">:</span><span class="v">{{ $order['qty'] }}</span></div>
        <div class="kv"><span class="k">Amount</span><span class="sep">:</span><span class="v">₹{{ number_format($order['amount']) }}</span></div>
        <div class="kv"><span class="k">Seller</span><span class="sep">:</span><span class="v">{{ $order['seller'] }}</span></div>
        <div class="kv"><span class="k">Payment</span><span class="sep">:</span><span class="v" style="color:{{ $paid ? '#3A7030' : '#B4711A' }};font-weight:700;">{{ $order['payment'] }}</span></div>
    </div>
</div>

<div class="card">
    <div class="card-head"><h3>Delivery Journey</h3></div>
    <div class="stepper">
        @foreach($steps as $i => $step)
            @php $n = $i + 1; $done = $n < $current; $isCur = $n === $current; @endphp
            <div class="step">
                @if($i > 0)<span class="step-line {{ $n <= $current ? 'done' : '' }}"></span>@endif
                <span class="step-circle {{ $done ? 'done' : ($isCur ? 'current' : '') }}">
                    @if($done)<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>@else{{ $n }}@endif
                </span>
                <span class="step-label {{ $isCur ? 'current' : '' }}">{{ $step }}</span>
                @if($n <= $current)<span class="step-time">{{ explode(',', $order['date'])[0] }}</span>@endif
            </div>
        @endforeach
    </div>
</div>

<div class="od-grid">
    <div class="card">
        <div class="card-head"><h3>Current Location</h3></div>
        <div class="pad">
            <div class="route-box">
                <div class="route-line">
                    <span class="route-node"></span>
                    <span class="route-dash"></span>
                    <span class="route-node"></span>
                    <span class="route-dash"></span>
                    <span class="route-node dim"></span>
                </div>
                <div class="route-caption">{{ $order['seller'] }} Warehouse → Local Hub → {{ $city }}</div>
            </div>
            <p class="route-meta">Last updated: Today, {{ now()->format('h:i A') }} · Expected delivery: {{ now()->addDay()->format('d M Y') }} (By EOD)</p>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Logistics Partner</h3></div>
        <div class="pad">
            <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg><span class="v">Manikstu Logistics</span></div>
            <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:+919123456789" class="v">+91 91234 56789</a></div>
            <div class="kv"><span class="k">Tracking ID</span><span class="sep">:</span><span class="v mono">ML-{{ substr($trackDigits . '0000000000', 0, 10) }}</span></div>
            <a href="tel:+919123456789" class="btn-outline">Contact Partner</a>
        </div>
    </div>
</div>

<div class="od-help">
    <p><strong>Need help?</strong> Facing any issue with this order?</p>
    <a href="{{ route('telecalling.complaints') }}" class="btn-issue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Report an Issue
    </a>
</div>

<div id="od-toast" class="od-toast"></div>

<script>
function odToast(msg) {
    var t = document.getElementById('od-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
}
async function shareOrder(btn) {
    var data = {
        title: 'Order #{{ $order['id'] }}',
        text: 'Order #{{ $order['id'] }} — {{ $order['product'] }} for {{ $order['farmer'] }} ({{ $order['status'] }})',
        url: window.location.href,
    };
    if (navigator.share) {
        try { await navigator.share(data); } catch (e) { /* user cancelled */ }
        return;
    }
    try {
        await navigator.clipboard.writeText(data.url);
        odToast('Order link copied to clipboard');
    } catch (e) {
        window.prompt('Copy this order link:', data.url);
    }
}
</script>

<style>
.back-btn { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:600; color:#3A7030; background:#fff; border:1px solid #E8E2D6; border-radius:9px; padding:9px 16px; margin-bottom:14px; cursor:pointer; transition:all .15s; }
.back-btn:hover { background:#F4F1EA; border-color:#4A8C3F; }
.back-btn svg { width:16px; height:16px; }
.od-head { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
.od-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.od-sub { font-size:13px; color:#5A5A5A; margin-top:6px; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:700; padding:4px 11px; border-radius:9999px; }
.od-actions { display:flex; gap:8px; }
.icon-btn { width:38px; height:38px; border-radius:10px; border:1px solid #E8E2D6; background:#fff; display:flex; align-items:center; justify-content:center; color:#6A6A6A; cursor:pointer; }
.icon-btn:hover { border-color:#D9D2C4; color:#3A7030; }
.icon-btn svg { width:18px; height:18px; }

.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-head { padding:15px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.pad { padding:20px; }

.info-card { display:grid; grid-template-columns:1fr 1fr; }
.info-col { padding:20px 22px; }
.info-col:first-child { border-right:1px solid #F0ECE2; }
.info-col-title { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#9A9A8E; margin-bottom:14px; }
.info-line { display:flex; align-items:center; gap:9px; font-size:13.5px; margin-bottom:11px; }
.info-line svg { width:15px; height:15px; color:#9A9A8E; flex-shrink:0; }
.info-line .v { font-weight:600; color:#1A1A1A; }
.kv { display:flex; align-items:center; gap:8px; font-size:13.5px; margin-bottom:11px; }
.kv .k { color:#9A9A8E; min-width:76px; }
.kv .sep { color:#C4B79A; }
.kv .v { font-weight:600; }
.mono { font-family:ui-monospace,Menlo,monospace; letter-spacing:.02em; }

.stepper { display:flex; align-items:flex-start; padding:24px 18px 14px; overflow-x:auto; }
.step { display:flex; flex-direction:column; align-items:center; flex:1; min-width:96px; position:relative; }
.step-line { position:absolute; top:15px; left:-50%; width:100%; height:2px; background:#EDE9E1; z-index:0; }
.step-line.done { background:#4A8C3F; }
.step-circle { width:30px; height:30px; border-radius:50%; background:#fff; border:2px solid #EDE9E1; display:flex; align-items:center; justify-content:center; z-index:1; color:#9A9A8E; font-size:12px; font-weight:700; }
.step-circle.done { background:#4A8C3F; border-color:#4A8C3F; color:#fff; }
.step-circle.current { background:#C4952A; border-color:#C4952A; color:#fff; }
.step-circle svg { width:15px; height:15px; }
.step-label { font-size:10.5px; font-weight:600; margin-top:8px; text-align:center; color:#5A5A5A; }
.step-label.current { color:#B4711A; }
.step-time { font-size:9.5px; color:#9A9A8E; margin-top:2px; }

.od-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.route-box { background:#FBF6EC; border-radius:10px; padding:18px; display:flex; flex-direction:column; align-items:center; gap:10px; }
.route-line { display:flex; align-items:center; width:100%; gap:6px; }
.route-node { width:12px; height:12px; border-radius:50%; background:#C4952A; flex-shrink:0; }
.route-node.dim { background:#EDE9E1; }
.route-dash { flex:1; height:2px; background:repeating-linear-gradient(90deg,#C4952A 0 6px, transparent 6px 11px); }
.route-caption { font-size:11.5px; color:#8A8A8A; text-align:center; }
.route-meta { font-size:12px; color:#9A9A9A; margin-top:14px; }
.btn-outline { display:block; text-align:center; margin-top:16px; padding:11px; border:1px solid #E8E2D6; border-radius:10px; font-size:13px; font-weight:600; color:#3A7030; }
.btn-outline:hover { background:#FBFAF7; border-color:#4A8C3F; }

.od-help { margin-top:6px; }
.od-help p { font-size:14px; color:#3A3A3A; margin-bottom:12px; }
.btn-issue { display:inline-flex; align-items:center; gap:8px; padding:12px 20px; border-radius:10px; background:#D4342C; color:#fff; font-size:13px; font-weight:700; box-shadow:0 4px 12px rgba(212,52,44,0.22); }
.btn-issue:hover { background:#b82e27; }
.btn-issue svg { width:16px; height:16px; }

@media (max-width:900px){ .info-card, .od-grid { grid-template-columns:1fr; } .info-col:first-child { border-right:none; border-bottom:1px solid #F0ECE2; } }

.od-toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); background:#2A2A2A; color:#fff; font-size:13px; font-weight:600; padding:11px 18px; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:9999; }
.od-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media print {
    .topbar-strip, .topbar, .sidebar, .hamburger, .back-link, .od-actions, .btn-outline, .btn-issue, .od-help, .tc-footer, .od-toast { display:none !important; }
    .main-area { margin-left:0 !important; overflow:visible !important; height:auto !important; }
    body { background:#fff !important; }
    .card { box-shadow:none !important; border:1px solid #ccc !important; break-inside:avoid; }
    .od-grid { grid-template-columns:1fr 1fr !important; }
}
</style>
@endsection
