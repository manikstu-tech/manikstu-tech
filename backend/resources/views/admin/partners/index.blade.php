@extends('admin.layouts.app')
@section('title', 'Partners')

@section('content')
@php
    $curSort = request('sort');
    $curDir = request('dir') === 'desc' ? 'desc' : 'asc';
    $sortUrl = function ($col) use ($curSort, $curDir) {
        $dir = ($curSort === $col && $curDir === 'asc') ? 'desc' : 'asc';
        return request()->fullUrlWithQuery(['sort' => $col, 'dir' => $dir, 'page' => null]);
    };
    $catColors = [
        'Banking'    => ['bg' => 'rgba(74,140,63,0.12)',  'text' => '#3A7030'],
        'Incubation' => ['bg' => 'rgba(224,145,47,0.14)', 'text' => '#B4711A'],
        'Supporting' => ['bg' => 'rgba(91,141,239,0.14)', 'text' => '#3E6FD0'],
        'Technology' => ['bg' => 'rgba(139,92,246,0.12)', 'text' => '#7C4DD6'],
        'CSR'        => ['bg' => 'rgba(212,52,44,0.10)',  'text' => '#CF3A32'],
        'Investing'  => ['bg' => 'rgba(32,160,140,0.14)', 'text' => '#1F8F7E'],
    ];
    $catDefault = ['bg' => 'rgba(90,90,90,0.10)', 'text' => '#5A5A5A'];
    $nameTag = [
        'Nabard' => 'Rural development',
        'AIC Nalanda' => 'Startup incubator',
        'Odisha Livelihoods Mission' => 'Govt. programme',
        'AgriTech Labs' => 'Farm technology',
        'Tata Trusts' => 'CSR grants',
        'GreenSeed Ventures' => 'Impact investor',
    ];
    $catTag = [
        'Banking' => 'Financial partner', 'Incubation' => 'Startup incubator',
        'Supporting' => 'Support partner', 'Technology' => 'Technology partner',
        'CSR' => 'CSR partner', 'Investing' => 'Impact investor',
    ];
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Partners<svg class="title-sprig" viewBox="0 0 24 24" fill="none" stroke="#C4952A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></h1>
        <p class="page-subtitle">Manage ecosystem partners &amp; collaborators</p>
    </div>
    <a href="{{ route('admin.partners.create') }}" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Partner
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="toolbar" id="ptToolbar">
    @if(request('sort'))<input type="hidden" name="sort" value="{{ request('sort') }}">@endif
    @if(request('dir'))<input type="hidden" name="dir" value="{{ request('dir') }}">@endif
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search..." class="search-input">
    </div>
    <div class="cat-wrap">
        <select name="category" class="cat-select" onchange="document.getElementById('ptToolbar').submit()">
            <option value="">All Categories</option>
            @foreach($categories as $c)
                <option value="{{ $c }}" {{ request('category') === $c ? 'selected' : '' }}>{{ $c }}</option>
            @endforeach
        </select>
        <svg class="cat-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
    <button type="submit" class="btn btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="pt-card">
    <div class="pt-scroll">
        <table class="pt-table">
            <thead>
                <tr>
                    <th><a href="{{ $sortUrl('name') }}" class="th-sort {{ $curSort === 'name' ? 'active' : '' }}">Name @include('admin.partners._sorticon', ['col' => 'name'])</a></th>
                    <th><a href="{{ $sortUrl('category') }}" class="th-sort {{ $curSort === 'category' ? 'active' : '' }}">Category @include('admin.partners._sorticon', ['col' => 'category'])</a></th>
                    <th>Website</th>
                    <th><a href="{{ $sortUrl('status') }}" class="th-sort {{ $curSort === 'status' ? 'active' : '' }}">Status @include('admin.partners._sorticon', ['col' => 'status'])</a></th>
                    <th class="th-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($partners as $p)
                    @php
                        $cat = $p->category;
                        $col = $catColors[$cat] ?? $catDefault;
                        $initial = strtoupper(substr($p->name, 0, 1));
                        $tag = $nameTag[$p->name] ?? ($catTag[$cat] ?? null);
                        $host = $p->website_url ? preg_replace(['#^https?://#', '#^www\.#', '#/$#'], '', $p->website_url) : null;
                    @endphp
                    <tr>
                        <td>
                            <div class="pt-name-cell">
                                @if($p->logo)
                                    <img src="{{ asset('storage/' . $p->logo) }}" class="pt-logo" alt="{{ $p->name }}">
                                @else
                                    <span class="pt-logo pt-logo-initial" style="color:{{ $col['text'] }};">{{ $initial }}</span>
                                @endif
                                <div class="pt-name-info">
                                    <span class="pt-name">{{ $p->name }}</span>
                                    @if($tag)<span class="pt-tag">{{ $tag }}</span>@endif
                                </div>
                            </div>
                        </td>
                        <td>
                            @if($cat)
                                <span class="cat-pill" style="background:{{ $col['bg'] }};color:{{ $col['text'] }};">{{ $cat }}</span>
                            @else
                                <span class="muted">—</span>
                            @endif
                        </td>
                        <td>
                            @if($host)
                                <a href="{{ $p->website_url }}" target="_blank" rel="noopener" class="pt-web">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                    {{ $host }}
                                </a>
                            @else
                                <span class="muted">—</span>
                            @endif
                        </td>
                        <td>
                            @if($p->is_active)
                                <span class="status status-active"><span class="status-dot"></span>Active</span>
                            @else
                                <span class="status status-inactive"><span class="status-dot"></span>Inactive</span>
                            @endif
                        </td>
                        <td>
                            <div class="pt-actions">
                                <a href="{{ route('admin.partners.edit', $p) }}" class="act-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                </a>
                                <div class="pt-menu">
                                    <button type="button" class="act-btn kebab-btn" onclick="toggleMenu(this)" title="More">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                    <div class="kebab-menu">
                                        <a href="{{ route('admin.partners.edit', $p) }}" class="kebab-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.partners.destroy', $p) }}" onsubmit="return confirm('Delete {{ addslashes($p->name) }}?')">
                                            @csrf @method('DELETE')
                                            <button type="submit" class="kebab-item kebab-danger">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="pt-empty">No partners yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($partners->hasPages())
        @php $cur = $partners->currentPage(); $last = $partners->lastPage(); $prev = null; @endphp
        <div class="pt-pagination">
            <a href="{{ $partners->previousPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ $partners->onFirstPage() ? 'disabled' : '' }}" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </a>
            @for($i = 1; $i <= $last; $i++)
                @if($i <= 3 || $i == $last || abs($i - $cur) <= 1)
                    <a href="{{ $partners->url($i) }}" class="pg-btn {{ $i == $cur ? 'active' : '' }}">{{ $i }}</a>
                    @php $prev = $i; @endphp
                @elseif($prev !== '...')
                    <span class="pg-ellipsis">…</span>
                    @php $prev = '...'; @endphp
                @endif
            @endfor
            <a href="{{ $partners->nextPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ !$partners->hasMorePages() ? 'disabled' : '' }}" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </div>
    @endif
</div>

<style>
:root { --page-bg: #FBF6EC; } /* warm cream page to match the villagescape theme */
.page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:22px}
.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;display:flex;align-items:center;gap:9px;line-height:1.1}
.title-sprig{width:24px;height:24px;flex-shrink:0;transform:rotate(8deg)}
.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}
.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}
.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}
.btn{padding:11px 18px;border-radius:9px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
.btn-primary{background:#4A8C3F;color:#fff}
.btn-primary:hover{background:#3A7030}

.toolbar{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.search-wrap{position:relative}
.search-wrap svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9A9A9A;pointer-events:none}
.search-input{height:42px;padding:0 14px 0 36px;border:1px solid #E8E2D6;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;width:260px;background:#fff;color:#1A1A1A;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.search-input::placeholder{color:rgba(90,90,90,0.5)}
.search-input:focus{border-color:#4A8C3F;box-shadow:0 0 0 3px rgba(74,140,63,0.08)}
.cat-wrap{position:relative}
.cat-select{height:42px;padding:0 34px 0 14px;border:1px solid #E8E2D6;border-radius:10px;font-size:13px;font-weight:500;font-family:'Inter',sans-serif;color:#1A1A1A;background:#fff;cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;transition:border-color 0.2s}
.cat-select:focus{border-color:#4A8C3F}
.cat-chev{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9A9A9A;pointer-events:none}
.btn-filter{height:42px;background:#fff;color:#5A5A5A;border:1px solid #E8E2D6}
.btn-filter:hover{background:#FAFAFA;border-color:#D9D2C4}

.pt-card{background:#fff;border:1px solid #EDE9E1;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(26,26,26,0.04)}
.pt-scroll{overflow-x:auto}
.pt-table{width:100%;border-collapse:collapse}
.pt-table th{padding:15px 22px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#9A9A8E;background:#FBFAF7;border-bottom:1px solid #EDE9E1;white-space:nowrap}
.th-actions{text-align:left}
.th-sort{display:inline-flex;align-items:center;gap:5px;color:#9A9A8E;text-decoration:none}
.th-sort:hover{color:#6A6A5E}
.th-sort.active{color:#3A7030}
.sort-ico{display:inline-flex;flex-direction:column;line-height:0}
.sort-ico svg{width:9px;height:9px;display:block}
.sort-ico .up{margin-bottom:-1px}
.sort-ico .dim{opacity:0.35}
.pt-table td{padding:14px 22px;font-size:13.5px;color:#1A1A1A;border-bottom:1px solid #F2EFEA;vertical-align:middle}
.pt-table tbody tr:last-child td{border-bottom:none}
.pt-table tbody tr:hover{background:#FCFBF9}
.muted{color:#B0B0B0}

.pt-name-cell{display:flex;align-items:center;gap:13px}
.pt-logo{width:44px;height:44px;border-radius:11px;object-fit:cover;flex-shrink:0}
.pt-logo-initial{display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;background:#F6EDE4;font-family:'Inter',sans-serif}
.pt-name-info{display:flex;flex-direction:column;min-width:0}
.pt-name{font-size:14px;font-weight:700;color:#1A1A1A}
.pt-tag{font-size:12.5px;color:#9A9A9A;margin-top:3px}

.cat-pill{display:inline-flex;align-items:center;font-size:12px;font-weight:600;padding:5px 13px;border-radius:9999px;white-space:nowrap}

.pt-web{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;color:#3A7030;text-decoration:none}
.pt-web svg{width:15px;height:15px;color:#8A8A8A;flex-shrink:0}
.pt-web:hover{text-decoration:underline}

.status{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600}
.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.status-active{color:#3A8C3F}
.status-active .status-dot{background:#4A8C3F}
.status-inactive{color:#E0912F}
.status-inactive .status-dot{background:#E0912F}

.pt-actions{display:flex;align-items:center;gap:8px}
.act-btn{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;border:1px solid #E8E2D6;background:#fff;color:#6A6A6A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.act-btn svg{width:16px;height:16px}
.act-btn:hover{background:#FAFAFA;border-color:#D9D2C4;color:#1A1A1A}
.pt-menu{position:relative}
.kebab-menu{display:none;position:absolute;top:40px;right:0;background:#fff;border:1px solid #E5E5E5;border-radius:10px;box-shadow:0 8px 24px rgba(26,26,26,0.12);padding:5px;min-width:140px;z-index:20}
.kebab-menu.open{display:block}
.kebab-item{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border:none;background:transparent;font-size:12.5px;font-weight:500;font-family:'Inter',sans-serif;color:#5A5A5A;border-radius:7px;cursor:pointer;text-decoration:none;text-align:left}
.kebab-item svg{width:14px;height:14px}
.kebab-item:hover{background:#F5F5F5;color:#1A1A1A}
.kebab-danger{color:#D4342C}
.kebab-danger:hover{background:rgba(212,52,44,0.08);color:#D4342C}
.pt-empty{text-align:center;color:#9A9A9A;font-size:13px;padding:48px 16px}

.pt-pagination{display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:16px 22px}
.pg-btn{min-width:34px;height:34px;padding:0 8px;display:flex;align-items:center;justify-content:center;border:1px solid #E8E2D6;background:#fff;border-radius:9px;font-size:13px;font-weight:600;color:#5A5A5A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.pg-btn:hover{border-color:#4A8C3F;color:#3A7030}
.pg-btn.active{background:#fff;border-color:#4A8C3F;color:#3A7030;box-shadow:0 0 0 1px #4A8C3F inset}
.pg-arrow svg{width:15px;height:15px}
.pg-btn.disabled{opacity:0.4;pointer-events:none}
.pg-ellipsis{min-width:24px;text-align:center;color:#B0B0B0;font-weight:600}

@media (max-width:640px){.toolbar{flex-wrap:wrap}.search-input{width:100%}.pt-tag{display:none}}
</style>

<script>
function toggleMenu(btn){
    var menu = btn.parentElement.querySelector('.kebab-menu');
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    if(!isOpen) menu.classList.add('open');
}
document.addEventListener('click', function(e){
    if(!e.target.closest('.pt-menu')){
        document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    }
});
</script>
@endsection
