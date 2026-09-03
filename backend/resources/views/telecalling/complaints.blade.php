@extends('telecalling.layouts.app')
@section('title', 'Complaints')

@section('content')
@php
    $statusColors = [
        'Open'        => ['#D4342C', 'rgba(212,52,44,0.10)'],
        'In Progress' => ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Resolved'    => ['#3A7030', 'rgba(74,140,63,0.12)'],
    ];
    $priorityColors = [
        'High'   => '#D4342C',
        'Medium' => '#B4711A',
        'Low'    => '#3A7030',
    ];
    $filters = ['All', 'Open', 'In Progress', 'Resolved'];
    $active = request('status', 'All');
@endphp

<div class="tc-toolbar">
    <div>
        <h1 class="tc-title">Complaints</h1>
        <p class="tc-sub">{{ $open }} open, {{ count($allComplaints) }} total</p>
    </div>
    <div class="chips">
        @foreach($filters as $f)
            <a href="{{ $f === 'All' ? url()->current() : url()->current().'?status='.urlencode($f) }}" class="chip {{ $active === $f ? 'active' : '' }}">{{ $f }}</a>
        @endforeach
    </div>
</div>

<div class="card">
    <div class="tc-table-wrap">
        <table class="tc-table">
            <thead>
                <tr><th>Complaint ID</th><th>Farmer</th><th>Related Order</th><th>Issue</th><th>Priority</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
                @forelse($complaints as $c)
                    @php
                        [$tx, $bg] = $statusColors[$c['status']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
                        $pc = $priorityColors[$c['priority']] ?? '#5A5A5A';
                    @endphp
                    <tr>
                        <td><a href="{{ route('telecalling.complaint.show', $c['id']) }}" class="cmp-id">{{ $c['id'] }}</a></td>
                        <td>{{ $c['farmer'] }}</td>
                        <td><a href="{{ route('telecalling.order.show', $c['order']) }}" class="ord-id">{{ $c['order'] }}</a></td>
                        <td>{{ $c['issue'] }}</td>
                        <td><span style="color:{{ $pc }};font-weight:600;">{{ $c['priority'] }}</span></td>
                        <td><span class="tc-badge" style="background:{{ $bg }};color:{{ $tx }};">{{ $c['status'] }}</span></td>
                        <td>
                            <a href="{{ route('telecalling.complaint.show', $c['id']) }}" class="eye-btn" title="View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="empty">No complaints in this filter.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<style>
.tc-toolbar { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-sub { font-size:13.5px; color:#5A5A5A; margin-top:4px; }
.chips { display:flex; gap:8px; flex-wrap:wrap; }
.chip { padding:8px 16px; border-radius:9999px; border:1px solid #E8E2D6; background:#fff; font-size:12.5px; font-weight:600; color:#5A5A5A; transition:all .15s; }
.chip:hover { border-color:#4A8C3F; color:#3A7030; }
.chip.active { background:#4A8C3F; border-color:#4A8C3F; color:#fff; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); overflow:hidden; }
.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:14px 20px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:15px 20px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; vertical-align:middle; white-space:nowrap; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.cmp-id { color:#C4952A; font-weight:700; }
.ord-id { color:#3A7030; font-weight:700; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:600; padding:4px 11px; border-radius:9999px; }
.eye-btn { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:9px; border:1px solid #E8E2D6; background:#fff; color:#6A6A6A; cursor:pointer; transition:all .15s; }
.eye-btn:hover { background:#FAFAFA; border-color:#D9D2C4; color:#3A7030; }
.eye-btn svg { width:16px; height:16px; }
.empty { text-align:center; color:#9A9A9A; padding:40px; }
</style>
@endsection
