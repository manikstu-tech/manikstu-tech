@extends('admin.layouts.app')
@section('title', 'Press Releases')

@section('content')
<style>
:root { --page-bg: #FBF6EC; }

.pr-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.pr-title { display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.pr-title svg { width: 24px; height: 24px; color: #7BA05B; }
.pr-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 6px; }
.btn-add { flex-shrink: 0; height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.pr-toolbar { display: flex; gap: 12px; margin-bottom: 18px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.pr-search { height: 44px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 260px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.pr-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.pr-select { height: 44px; padding: 0 38px 0 16px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-weight: 500; font-family: 'Inter', sans-serif; background: #fff; color: #1A1A1A; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; cursor: pointer; outline: none; }
.pr-select:focus { border-color: #4A8C3F; }
.btn-filter { height: 44px; padding: 0 20px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg { width: 16px; height: 16px; color: #4A8C3F; }

.pr-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.pr-table { width: 100%; border-collapse: collapse; }
.pr-table thead th { padding: 15px 18px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.th-inner { display: inline-flex; align-items: center; gap: 5px; }
.th-inner svg { width: 12px; height: 12px; color: #C4B89A; }
.pr-table td { padding: 12px 18px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; vertical-align: middle; }
.pr-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.pr-table tbody tr:last-child td { border-bottom: none; }
.post-cell { display: flex; align-items: center; gap: 14px; }
.post-thumb-wrap { position: relative; width: 58px; height: 44px; flex-shrink: 0; }
.post-thumb { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 10px; object-fit: cover; border: 1px solid #ECE7DC; }
.post-thumb-ph { position: absolute; inset: 0; border-radius: 10px; background: linear-gradient(135deg, #EEE9DE, #E4DCC9); border: 1px solid #ECE7DC; display: flex; align-items: center; justify-content: center; color: #B9A98A; }
.post-thumb-ph svg { width: 20px; height: 20px; }
.post-title { font-weight: 600; color: #1A1A1A; line-height: 1.35; white-space: normal; max-width: 260px; }
.obadge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 4px 13px; border-radius: 9999px; white-space: nowrap; }
.obadge .bdot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pr-date { font-weight: 700; }
.pr-time { font-size: 12px; color: #999; margin-top: 1px; font-weight: 400; }
.pr-actions button, .pr-actions a { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.pr-actions button:hover, .pr-actions a:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.pr-actions svg { width: 16px; height: 16px; }

.pr-foot { display: flex; align-items: center; justify-content: flex-end; padding: 16px 20px; border-top: 1px solid #F0ECE2; }
.pr-pages { display: flex; align-items: center; gap: 6px; }
.pr-pages a, .pr-pages span { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 8px; border-radius: 9px; font-size: 13px; font-weight: 500; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; cursor: pointer; }
.pr-pages a:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.pr-pages .active { color: #4A8C3F; border-color: #4A8C3F; font-weight: 700; }
.pr-pages .gap { border: none; background: transparent; }

@media (max-width: 1024px) { .pr-card { overflow-x: auto; } }
</style>

@php
    $imgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
    $sortIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>';
    $palette = [
        'amber'  => ['rgba(196,149,42,0.14)', '#B5851F'],
        'purple' => ['rgba(139,92,246,0.12)', '#7C4DE0'],
        'blue'   => ['rgba(91,141,239,0.12)', '#3D6FD6'],
        'teal'   => ['rgba(31,156,142,0.12)', '#1F9C8E'],
        'green'  => ['rgba(74,140,63,0.10)', '#3A7030'],
    ];
    $catMap = [
        'insurance' => 'amber', 'csr' => 'purple', 'partnership' => 'blue',
        'innovation' => 'teal', 'sustainability' => 'green',
    ];
    $palKeys = array_keys($palette);
    $catColor = function($name) use ($catMap, $palKeys) {
        $k = strtolower(trim($name));
        return $catMap[$k] ?? $palKeys[crc32($k) % count($palKeys)];
    };

    $rows = $releases->count()
        ? $releases->map(fn($p) => [
            'title' => $p->title,
            'img' => $p->featured_image ? asset('storage/' . $p->featured_image) : null,
            'category' => $p->category->name ?? '—',
            'published' => (bool) $p->is_published,
            'date' => ($p->published_at ?? $p->created_at)->format('d M Y'),
            'time' => ($p->published_at ?? $p->created_at)->format('h:i A'),
            'id' => $p->id,
        ])->all()
        : [
            ['title'=>'Manikstu Agro Expands Goat Insurance to New Districts','img'=>null,'category'=>'Insurance','published'=>true,'date'=>'21 Aug 2024','time'=>'10:30 AM','id'=>null],
            ['title'=>'Strengthening Rural Livelihoods Through Goat Farming','img'=>null,'category'=>'CSR','published'=>false,'date'=>'18 Aug 2024','time'=>'04:15 PM','id'=>null],
            ['title'=>'Manikstu Agro Partners with Local Cooperatives','img'=>null,'category'=>'Partnership','published'=>true,'date'=>'15 Aug 2024','time'=>'11:20 AM','id'=>null],
            ['title'=>'Innovations in Livestock Health & Farmer Support','img'=>null,'category'=>'Innovation','published'=>true,'date'=>'12 Aug 2024','time'=>'09:05 AM','id'=>null],
            ['title'=>'Sustainable Farming for a Stronger Tomorrow','img'=>null,'category'=>'Sustainability','published'=>false,'date'=>'08 Aug 2024','time'=>'02:40 PM','id'=>null],
        ];
@endphp

<div class="pr-header">
    <div>
        <h1 class="pr-title">Press Releases
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
        </h1>
        <p class="pr-subtitle">Manage press releases</p>
    </div>
    <a href="{{ route('admin.press.create') }}" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        New Release
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="pr-toolbar">
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search releases..." class="pr-search">
    </div>
    <select name="status" class="pr-select">
        <option value="">All Status</option>
        <option value="published" {{ request('status')==='published'?'selected':'' }}>Published</option>
        <option value="draft" {{ request('status')==='draft'?'selected':'' }}>Draft</option>
    </select>
    <button type="submit" class="btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="pr-card">
    <table class="pr-table">
        <thead>
            <tr>
                <th style="width:38%;"><span class="th-inner">Title{!! $sortIcon !!}</span></th>
                <th><span class="th-inner">Category{!! $sortIcon !!}</span></th>
                <th><span class="th-inner">Status{!! $sortIcon !!}</span></th>
                <th><span class="th-inner">Date{!! $sortIcon !!}</span></th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rows as $r)
                @php [$cbg, $ctx] = $palette[$catColor($r['category'])]; @endphp
                <tr>
                    <td>
                        <div class="post-cell">
                            <span class="post-thumb-wrap">
                                <span class="post-thumb-ph">{!! $imgIcon !!}</span>
                                @if($r['img'])<img src="{{ $r['img'] }}" class="post-thumb" alt="" onerror="this.remove()">@endif
                            </span>
                            <span class="post-title">{{ $r['title'] }}</span>
                        </div>
                    </td>
                    <td>@if($r['category'] === '—')<span style="color:#B9A98A;">—</span>@else<span class="obadge" style="background:{{ $cbg }};color:{{ $ctx }};">{{ $r['category'] }}</span>@endif</td>
                    <td>
                        @if($r['published'])
                            <span class="obadge" style="background:rgba(74,140,63,0.10);color:#3A7030;"><span class="bdot"></span>Published</span>
                        @else
                            <span class="obadge" style="background:rgba(196,149,42,0.14);color:#B5851F;"><span class="bdot"></span>Draft</span>
                        @endif
                    </td>
                    <td><div class="pr-date">{{ $r['date'] }}</div><div class="pr-time">{{ $r['time'] }}</div></td>
                    <td>
                        <div class="pr-actions">
                            @if($r['id'])
                                <a href="{{ route('admin.press.edit', $r['id']) }}" title="Options"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></a>
                            @else
                                <button type="button" title="Options"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                            @endif
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="pr-foot">
        @if($releases->count())
            <div class="pr-pages">{{ $releases->onEachSide(1)->links() }}</div>
        @else
            <div class="pr-pages">
                <a href="#" aria-label="Previous"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>
                <span class="active">1</span><a href="#">2</a><a href="#">3</a><span class="gap">…</span><a href="#">5</a>
                <a href="#" aria-label="Next"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
            </div>
        @endif
    </div>
</div>

<x-admin.modal />
@endsection
