@extends('telecalling.layouts.app')
@section('title', 'Telecalling Dashboard')

@section('content')
@php
    $statusMeta = [
        'new'       => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'contacted' => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'converted' => ['#B4711A', 'rgba(224,145,47,0.16)'],
        'closed'    => ['#5A5A5A', 'rgba(90,90,90,0.10)'],
    ];
@endphp

<div class="page-head">
    <div>
        <h1 class="page-title">Welcome, {{ Auth::user()->name }}</h1>
        <p class="page-sub">Your leads and enquiries to follow up.</p>
    </div>
</div>

<div class="stat-row">
    <div class="stat"><span class="stat-label">New Leads</span><span class="stat-num" style="color:#3A7030;">{{ $stats['new'] }}</span></div>
    <div class="stat"><span class="stat-label">Contacted</span><span class="stat-num" style="color:#3E6FD0;">{{ $stats['contacted'] }}</span></div>
    <div class="stat"><span class="stat-label">Total Enquiries</span><span class="stat-num">{{ $stats['total'] }}</span></div>
</div>

<div class="card">
    <div class="card-head">
        <h3>Leads</h3>
        <form method="GET" class="filters">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search name or phone..." class="f-input">
            <select name="status" class="f-select" onchange="this.form.submit()">
                <option value="">All Status</option>
                <option value="new" {{ request('status')==='new'?'selected':'' }}>New</option>
                <option value="contacted" {{ request('status')==='contacted'?'selected':'' }}>Contacted</option>
                <option value="converted" {{ request('status')==='converted'?'selected':'' }}>Converted</option>
                <option value="closed" {{ request('status')==='closed'?'selected':'' }}>Closed</option>
            </select>
            <button type="submit" class="f-btn">Filter</button>
        </form>
    </div>
    <div class="table-wrap">
        <table class="lead-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Type</th><th>Message</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
                @forelse($leads as $lead)
                    @php [$stx,$sbg] = $statusMeta[strtolower($lead->status ?? 'new')] ?? ['#5A5A5A','rgba(90,90,90,.1)']; @endphp
                    <tr>
                        <td><strong>{{ $lead->name }}</strong>@if($lead->email)<div class="muted">{{ $lead->email }}</div>@endif</td>
                        <td>{{ $lead->phone ?: '—' }}</td>
                        <td>{{ $lead->type ? ucwords(str_replace('_',' ',$lead->type)) : '—' }}</td>
                        <td class="msg" title="{{ $lead->message }}">{{ \Illuminate\Support\Str::limit($lead->message, 48) }}</td>
                        <td><span class="badge" style="background:{{ $sbg }};color:{{ $stx }};">{{ ucfirst($lead->status ?? 'new') }}</span></td>
                        <td>
                            @if($lead->phone)
                                <a href="tel:{{ $lead->phone }}" class="call-btn" title="Call {{ $lead->name }}">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    Call
                                </a>
                            @else <span class="muted">No phone</span> @endif
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="empty">No leads yet. New enquiries from the website will appear here.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="pagi">{{ $leads->links() }}</div>
</div>

<style>
.page-head{margin-bottom:22px}
.page-title{font-size:26px;font-weight:700}
.page-sub{font-size:14px;color:#5A5A5A;margin-top:4px}
.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:22px}
.stat{background:#fff;border:1px solid #EDE9E1;border-radius:14px;padding:18px 20px;box-shadow:0 2px 10px rgba(26,26,26,.04);display:flex;flex-direction:column;gap:6px}
.stat-label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#9A9A8E}
.stat-num{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#1A1A1A}
.card{background:#fff;border:1px solid #EDE9E1;border-radius:14px;box-shadow:0 2px 10px rgba(26,26,26,.04);overflow:hidden}
.card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid #F0ECE2;flex-wrap:wrap}
.card-head h3{font-size:16px;font-weight:700}
.filters{display:flex;gap:8px;flex-wrap:wrap}
.f-input,.f-select{height:38px;padding:0 12px;border:1px solid #E8E2D6;border-radius:9px;font-size:13px;font-family:'Inter',sans-serif;background:#fff;outline:none}
.f-input{width:200px}.f-input:focus,.f-select:focus{border-color:#4A8C3F}
.f-btn{height:38px;padding:0 16px;border:none;border-radius:9px;background:#4A8C3F;color:#fff;font-size:13px;font-weight:600;cursor:pointer}
.table-wrap{overflow-x:auto}
.lead-table{width:100%;border-collapse:collapse}
.lead-table th{padding:12px 20px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#9A9A8E;background:#FBFAF7;border-bottom:1px solid #EDE9E1;white-space:nowrap}
.lead-table td{padding:13px 20px;font-size:13.5px;color:#1A1A1A;border-bottom:1px solid #F2EFEA;vertical-align:middle}
.lead-table tbody tr:last-child td{border-bottom:none}
.lead-table tbody tr:hover{background:#FCFBF9}
.muted{color:#9A9A9A;font-size:12px;margin-top:2px}
.msg{max-width:260px;color:#5A5A5A}
.badge{display:inline-flex;font-size:11px;font-weight:600;padding:3px 10px;border-radius:9999px}
.call-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:9px;background:#4A8C3F;color:#fff;font-size:12.5px;font-weight:600}
.call-btn:hover{background:#3A7030}.call-btn svg{width:14px;height:14px}
.empty{text-align:center;color:#9A9A9A;padding:40px 16px}
.pagi{padding:14px 20px;display:flex;justify-content:center}
@media(max-width:640px){.stat-row{grid-template-columns:1fr}}
</style>
@endsection
