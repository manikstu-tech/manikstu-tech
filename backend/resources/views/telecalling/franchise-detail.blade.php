@extends('telecalling.layouts.app')
@section('title', 'Lead ' . $lead['id'])

@section('content')
@php
    $statusColors = [
        'New'        => ['#7C5CB0', 'rgba(124,92,176,0.14)'],
        'Contacted'  => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'Qualified'  => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'Site Visit' => ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Approved'   => ['#3A7030', 'rgba(74,140,63,0.12)'],
    ];
    [$stx, $sbg] = $statusColors[$lead['status']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
@endphp

<a href="{{ route('telecalling.franchise') }}" class="back-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    Back to Leads
</a>

<div class="fd-head">
    <div>
        <h1 class="fd-title">{{ $lead['name'] }} <span class="tc-badge" style="background:{{ $sbg }};color:{{ $stx }};">{{ $lead['status'] }}</span></h1>
        <p class="fd-sub">Lead ID: {{ $lead['id'] }} · Enquiry on {{ $lead['date'] }}</p>
    </div>
    <button type="button" class="icon-btn" title="Edit lead" onclick="fdToast('Edit lead — coming soon')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </button>
</div>

<div class="fd-grid-top">
    <div class="card">
        <div class="card-head"><h3>Lead Information</h3></div>
        <div class="pad">
            <div class="li-grid">
                <div class="li"><span class="li-k">Mobile</span><a href="tel:{{ $lead['mobile'] }}" class="li-v">{{ $lead['mobile'] }}</a></div>
                <div class="li"><span class="li-k">Location</span><span class="li-v">{{ $lead['location'] }}</span></div>
                <div class="li"><span class="li-k">Investment Range</span><span class="li-v">{{ $lead['investment'] }}</span></div>
                <div class="li"><span class="li-k">Land Available</span><span class="li-v">{{ $lead['land'] }}</span></div>
                <div class="li"><span class="li-k">Experience</span><span class="li-v">{{ $lead['experience'] }}</span></div>
                <div class="li"><span class="li-k">Desired Farm Size</span><span class="li-v">{{ $lead['farmSize'] }}</span></div>
                <div class="li"><span class="li-k">Lead Source</span><span class="li-v">{{ $lead['source'] }}</span></div>
                <div class="li"><span class="li-k">Assigned To</span><span class="li-v">{{ $lead['assigned'] }}</span></div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Next Action</h3></div>
        <div class="pad">
            <div class="next-box">
                <div class="next-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {{ $lead['next']['title'] }}
                </div>
                <p class="next-meta">{{ $lead['next']['date'] }}<br>Location: {{ $lead['next']['location'] }}</p>
                <button type="button" class="next-btn" onclick="fdToast('Reschedule — coming soon')">View / Reschedule</button>
            </div>
            <p class="notes-label">Notes</p>
            <p class="notes-text">{{ $lead['notes'] }}</p>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-head"><h3>Lead Journey</h3></div>
    <div class="pad">
        <div class="vstep">
            @foreach($steps as $i => $step)
                @php $n = $i + 1; $isDone = $n <= $done; @endphp
                <div class="vstep-item {{ $loop->last ? 'last' : '' }}">
                    <span class="vstep-dot {{ $isDone ? 'done' : '' }}">
                        @if($isDone)<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>@endif
                    </span>
                    <div class="vstep-body">
                        <p class="vstep-label {{ $isDone ? 'done' : '' }}">{{ $step }}</p>
                        <p class="vstep-note">{{ $isDone ? $lead['date'] : 'Pending' }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>

<div class="fd-grid-bottom">
    <div class="card">
        <div class="card-head"><h3>Call History</h3></div>
        <div class="tc-table-wrap">
            <table class="tc-table">
                <thead>
                    <tr><th>Date &amp; Time</th><th>By</th><th>Activity</th><th>Remarks</th></tr>
                </thead>
                <tbody>
                    @foreach($lead['calls'] as $c)
                        <tr>
                            <td>{{ $c['time'] }}</td>
                            <td>{{ $c['by'] }}</td>
                            <td class="strong">{{ $c['activity'] }}</td>
                            <td>{{ $c['remarks'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Quick Actions</h3></div>
        <div class="pad">
            <div class="qa-grid">
                <a href="tel:{{ $lead['mobile'] }}" class="qa-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Call Lead
                </a>
                <a href="https://wa.me/{{ preg_replace('/\D+/', '', $lead['mobile']) }}" target="_blank" rel="noopener" class="qa-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    WhatsApp
                </a>
                <button type="button" class="qa-btn" onclick="fdToast('Schedule visit — coming soon')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Schedule Visit
                </button>
                <button type="button" class="qa-btn" onclick="fdToast('Add follow-up — coming soon')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Follow-up
                </button>
            </div>
        </div>
    </div>
</div>

<div id="fd-toast" class="fd-toast"></div>

<script>
function fdToast(msg) {
    var t = document.getElementById('fd-toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
}
</script>

<style>
.back-btn { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:600; color:#3A7030; background:#fff; border:1px solid #E8E2D6; border-radius:9px; padding:9px 16px; margin-bottom:14px; cursor:pointer; transition:all .15s; }
.back-btn:hover { background:#F4F1EA; border-color:#4A8C3F; }
.back-btn svg { width:16px; height:16px; }

.fd-head { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
.fd-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.fd-sub { font-size:13px; color:#8A8A8A; margin-top:6px; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:700; padding:4px 11px; border-radius:9999px; }
.icon-btn { width:40px; height:40px; border-radius:10px; border:1px solid #E8E2D6; background:#fff; display:flex; align-items:center; justify-content:center; color:#6A6A6A; cursor:pointer; }
.icon-btn:hover { border-color:#4A8C3F; color:#3A7030; }
.icon-btn svg { width:17px; height:17px; }

.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-head { padding:15px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.pad { padding:20px; }

.fd-grid-top { display:grid; grid-template-columns:1.6fr 1fr; gap:20px; align-items:start; }
.li-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px 20px; }
.li { display:flex; flex-direction:column; gap:4px; }
.li-k { font-size:11.5px; color:#9A9A8E; }
.li-v { font-size:14px; font-weight:600; color:#1A1A1A; }

.next-box { background:#FBF6EC; border:1px solid #F0E4CE; border-radius:12px; padding:16px; margin-bottom:16px; }
.next-title { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:700; color:#B4711A; }
.next-title svg { width:16px; height:16px; }
.next-meta { font-size:12.5px; color:#8A7A5E; margin:8px 0 14px; line-height:1.6; }
.next-btn { width:100%; background:#4A8C3F; color:#fff; border:none; border-radius:9px; padding:11px; font-size:13px; font-weight:700; cursor:pointer; transition:background .15s; }
.next-btn:hover { background:#3A7030; }
.notes-label { font-size:12.5px; font-weight:700; color:#1A1A1A; margin-bottom:6px; }
.notes-text { font-size:13px; color:#6A6A6A; line-height:1.6; }

.vstep { position:relative; }
.vstep-item { position:relative; display:flex; gap:14px; padding-bottom:20px; }
.vstep-item.last { padding-bottom:0; }
.vstep-item::before { content:''; position:absolute; left:11px; top:22px; bottom:-2px; width:2px; background:#EDE9E1; }
.vstep-item.last::before { display:none; }
.vstep-dot { width:24px; height:24px; border-radius:50%; background:#fff; border:2px solid #E3DECF; display:flex; align-items:center; justify-content:center; flex-shrink:0; z-index:1; color:#fff; }
.vstep-dot.done { background:#4A8C3F; border-color:#4A8C3F; }
.vstep-dot svg { width:13px; height:13px; }
.vstep-body { padding-top:1px; }
.vstep-label { font-size:13.5px; font-weight:700; color:#9A9A9A; }
.vstep-label.done { color:#1A1A1A; }
.vstep-note { font-size:12px; color:#9A9A9A; margin-top:2px; }

.fd-grid-bottom { display:grid; grid-template-columns:1.5fr 1fr; gap:20px; align-items:start; }
.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:13px 18px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:13px 18px; border-bottom:1px solid #F2EFEA; font-size:13px; color:#1A1A1A; vertical-align:middle; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table .strong { font-weight:700; }

.qa-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.qa-btn { display:inline-flex; align-items:center; gap:8px; justify-content:flex-start; padding:13px 15px; border:1px solid #E8E2D6; border-radius:10px; background:#fff; font-size:13px; font-weight:600; color:#3A3A3A; cursor:pointer; transition:all .15s; }
.qa-btn:hover { background:#FBFAF7; border-color:#4A8C3F; color:#3A7030; }
.qa-btn svg { width:16px; height:16px; color:#4A8C3F; }

.fd-toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); background:#2A2A2A; color:#fff; font-size:13px; font-weight:600; padding:11px 18px; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:9999; }
.fd-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media (max-width:900px){ .fd-grid-top, .fd-grid-bottom, .li-grid, .qa-grid { grid-template-columns:1fr; } }
</style>
@endsection
