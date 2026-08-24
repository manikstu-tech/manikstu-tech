@extends('admin.layouts.app')
@section('title', 'Customers')

@section('content')
<style>
:root { --page-bg: #FBF6EC; }

.cust-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.cust-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.cust-accent { display: flex; align-items: center; gap: 8px; margin-top: 9px; }
.cust-accent-line { width: 42px; height: 2px; background: #C4952A; opacity: 0.55; border-radius: 2px; }
.cust-accent-line.short { width: 22px; opacity: 0.3; }
.cust-accent-dot { width: 7px; height: 7px; background: #C4952A; transform: rotate(45deg); }
.btn-add { flex-shrink: 0; height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.cust-toolbar { display: flex; gap: 12px; margin-bottom: 18px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.cust-search { height: 44px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 300px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.cust-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.btn-filter { height: 44px; padding: 0 20px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg { width: 16px; height: 16px; color: #4A8C3F; }

.cust-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.cust-table { width: 100%; border-collapse: collapse; }
.cust-table thead th { padding: 15px 18px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.th-inner { display: inline-flex; align-items: center; gap: 5px; }
.th-inner svg { width: 12px; height: 12px; color: #C4B89A; }
.cust-table td { padding: 14px 18px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; white-space: nowrap; }
.cust-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.cust-table tbody tr:last-child td { border-bottom: none; }
.cperson { display: flex; align-items: center; gap: 11px; }
.cav { width: 38px; height: 38px; border-radius: 50%; background: rgba(74,140,63,0.12); color: #3A7030; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.cname { font-weight: 600; color: #1A1A1A; }
.cmail-sub { font-size: 12px; color: #999; margin-top: 1px; }
.obadge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; white-space: nowrap; }
.obadge .bdot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.cust-actions { display: flex; align-items: center; gap: 6px; }
.cust-actions a, .cust-actions button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.cust-actions a:hover, .cust-actions button:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.cust-actions svg { width: 16px; height: 16px; }

.cust-foot { display: flex; align-items: center; justify-content: flex-end; padding: 16px 20px; border-top: 1px solid #F0ECE2; }
.cust-pages { display: flex; align-items: center; gap: 6px; }
.cust-pages a, .cust-pages span { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 8px; border-radius: 9px; font-size: 13px; font-weight: 500; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; cursor: pointer; }
.cust-pages a:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.cust-pages .active { color: #4A8C3F; border-color: #4A8C3F; font-weight: 700; }
.cust-pages .gap { border: none; background: transparent; }

@media (max-width: 1024px) { .cust-card { overflow-x: auto; } }
</style>

@php
    $statusMeta = [
        'active'   => ['rgba(74,140,63,0.10)', '#3A7030', 'Active'],
        'inactive' => ['rgba(196,149,42,0.14)', '#B5851F', 'Inactive'],
        'blocked'  => ['rgba(212,52,44,0.08)', '#D4342C', 'Blocked'],
    ];
    $rows = $customers->count()
        ? $customers->map(fn($c) => [
            'name' => $c->name,
            'email' => $c->email,
            'phone' => $c->phone ?: '—',
            'city' => $c->city ?: '—',
            'status' => $c->is_active ? 'active' : 'inactive',
        ])->all()
        : [
            ['name'=>'Ramesh Sahu','email'=>'rameshsahu@gmail.com','phone'=>'+91 91753 46321','city'=>'Raipur','status'=>'active'],
            ['name'=>'Pooja Patel','email'=>'pooja.patel@gmail.com','phone'=>'+91 79986 12544','city'=>'Bilaspur','status'=>'active'],
            ['name'=>'Mahesh Kumar','email'=>'mahesh.kumar@gmail.com','phone'=>'+91 98271 65432','city'=>'Durg','status'=>'inactive'],
            ['name'=>'Sunita Koshle','email'=>'sunita.koshle@gmail.com','phone'=>'+91 97541 22311','city'=>'Raipur','status'=>'active'],
            ['name'=>'Arvind Rao','email'=>'arvind.rao@gmail.com','phone'=>'+91 93400 88521','city'=>'Rajnandgaon','status'=>'blocked'],
        ];
    $initials = fn($n) => strtoupper(substr(preg_split('/\s+/', trim($n))[0] ?? '', 0, 1) . substr(preg_split('/\s+/', trim($n))[1] ?? '', 0, 1));
    $sortIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>';
@endphp

<div class="cust-header">
    <div>
        <h1 class="cust-title">Customers</h1>
        <div class="cust-accent"><span class="cust-accent-line"></span><span class="cust-accent-dot"></span><span class="cust-accent-line short"></span></div>
    </div>
    <a href="{{ route('admin.customers.create') }}" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Customer
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="cust-toolbar">
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search name or email..." class="cust-search">
    </div>
    <button type="submit" class="btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="cust-card">
    <table class="cust-table">
        <thead>
            <tr>
                @foreach(['Name','Email','Phone','City','Status','Actions'] as $h)
                    <th><span class="th-inner">{{ $h }}{!! $sortIcon !!}</span></th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($rows as $r)
                @php [$bg,$tx,$label] = $statusMeta[$r['status']] ?? $statusMeta['inactive']; @endphp
                <tr>
                    <td>
                        <div class="cperson">
                            <span class="cav">{{ $initials($r['name']) }}</span>
                            <div>
                                <div class="cname">{{ $r['name'] }}</div>
                                <div class="cmail-sub">{{ $r['email'] }}</div>
                            </div>
                        </div>
                    </td>
                    <td>{{ $r['email'] }}</td>
                    <td>{{ $r['phone'] }}</td>
                    <td>{{ $r['city'] }}</td>
                    <td><span class="obadge" style="background:{{ $bg }};color:{{ $tx }};"><span class="bdot"></span>{{ $label }}</span></td>
                    <td>
                        <div class="cust-actions">
                            <a href="#" title="View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></a>
                            <button type="button" title="More"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="cust-foot">
        @if($customers->count())
            <div class="cust-pages">{{ $customers->onEachSide(1)->links() }}</div>
        @else
            <div class="cust-pages">
                <a href="#" aria-label="Previous"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>
                <span class="active">1</span><a href="#">2</a><a href="#">3</a><span class="gap">…</span><a href="#">5</a>
                <a href="#" aria-label="Next"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            </div>
        @endif
    </div>
</div>

<x-admin.modal />
@endsection
