@extends('telecalling.layouts.app')
@section('title', 'Telecalling')

@section('content')
@php
    $initials = function ($name) {
        $clean = trim(preg_replace('/\(.*?\)/', '', $name));
        $parts = preg_split('/\s+/', $clean);
        $first = mb_substr($parts[0] ?? '', 0, 1);
        $second = mb_substr($parts[1] ?? '', 0, 1);
        return strtoupper($first . $second);
    };
@endphp

<div class="tc-toolbar">
    <div>
        <h1 class="tc-title">Telecalling</h1>
        <p class="tc-sub">Your queue for today, and recent call history.</p>
    </div>
</div>

<div class="tc-cols">
    {{-- Call Queue --}}
    <div class="card">
        <div class="card-head">
            <h3>Call Queue</h3>
            <span class="head-meta">{{ count($queue) }} pending</span>
        </div>
        <div class="queue">
            @foreach($queue as $q)
                <div class="queue-item">
                    <span class="avatar">{{ $initials($q['name']) }}</span>
                    <div class="queue-body">
                        <p class="queue-name">{{ $q['name'] }}</p>
                        <p class="queue-note">{{ $q['note'] }}</p>
                        <p class="queue-due"><span class="due-tag">{{ $q['tag'] }}</span> · {{ $q['due'] }}</p>
                    </div>
                    <div class="queue-actions">
                        <a href="tel:{{ $q['phone'] }}" class="act-btn call" title="Call">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </a>
                        <button type="button" class="act-btn msg" title="Message" onclick="tcToast('Messaging {{ $q['name'] }} — coming soon')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    {{-- Recent Calls --}}
    <div class="card">
        <div class="card-head">
            <h3>Recent Calls</h3>
            <a href="#" class="head-meta link" onclick="return false;">View All</a>
        </div>
        <div class="tc-table-wrap">
            <table class="tc-table">
                <thead>
                    <tr><th>Name</th><th>Time</th><th>Type</th><th>Duration</th></tr>
                </thead>
                <tbody>
                    @foreach($recent as $r)
                        <tr>
                            <td class="strong">{{ $r['name'] }}</td>
                            <td>{{ $r['time'] }}</td>
                            <td>
                                <span class="call-type {{ $r['type'] === 'Incoming' ? 'in' : 'out' }}">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        @if($r['type'] === 'Incoming')<polyline points="7 17 17 17 17 7"/><line x1="7" y1="7" x2="17" y2="17"/>@else<polyline points="17 7 7 7 7 17"/><line x1="17" y1="17" x2="7" y2="7"/>@endif
                                    </svg>
                                    {{ $r['type'] }}
                                </span>
                            </td>
                            <td>{{ $r['duration'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="tc-toast" class="tc-toast"></div>

<script>
function tcToast(msg) {
    var t = document.getElementById('tc-toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
}
</script>

<style>
.tc-toolbar { margin-bottom:20px; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-sub { font-size:13.5px; color:#5A5A5A; margin-top:4px; }

.tc-cols { display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); overflow:hidden; }
.card-head { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.head-meta { font-size:12.5px; font-weight:700; color:#C4952A; }
.head-meta.link:hover { color:#3A7030; }

.queue { padding:14px; display:flex; flex-direction:column; gap:12px; }
.queue-item { display:flex; align-items:center; gap:13px; padding:14px; border:1px solid #EDE9E1; border-radius:12px; transition:box-shadow .15s; }
.queue-item:hover { box-shadow:0 4px 14px rgba(26,26,26,0.06); }
.avatar { width:40px; height:40px; border-radius:50%; background:#F0E4CE; color:#B4711A; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.queue-body { flex:1; min-width:0; }
.queue-name { font-size:14px; font-weight:700; color:#1A1A1A; }
.queue-note { font-size:12.5px; color:#8A8A8A; margin-top:2px; }
.queue-due { font-size:12px; color:#B4711A; font-weight:600; margin-top:5px; }
.due-tag { color:#B4711A; }
.queue-actions { display:flex; gap:8px; flex-shrink:0; }
.act-btn { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; transition:filter .15s; }
.act-btn:hover { filter:brightness(0.94); }
.act-btn svg { width:17px; height:17px; }
.act-btn.call { background:rgba(74,140,63,0.14); color:#3A7030; }
.act-btn.msg { background:rgba(91,141,239,0.14); color:#3E6FD0; }

.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:14px 20px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:15px 20px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; vertical-align:middle; white-space:nowrap; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.tc-table .strong { font-weight:700; }
.call-type { display:inline-flex; align-items:center; gap:5px; font-size:12.5px; font-weight:600; }
.call-type svg { width:14px; height:14px; }
.call-type.out { color:#3A7030; }
.call-type.in { color:#3E6FD0; }

.tc-toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); background:#2A2A2A; color:#fff; font-size:13px; font-weight:600; padding:11px 18px; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:9999; }
.tc-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media (max-width:900px){ .tc-cols { grid-template-columns:1fr; } }
</style>
@endsection
