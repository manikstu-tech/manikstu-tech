@extends('admin.layouts.app')
@section('title', 'Team Members')

@section('content')
@php
    $curSort = request('sort');
    $curDir = request('dir') === 'desc' ? 'desc' : 'asc';
    $sortUrl = function ($col) use ($curSort, $curDir) {
        $dir = ($curSort === $col && $curDir === 'asc') ? 'desc' : 'asc';
        return request()->fullUrlWithQuery(['sort' => $col, 'dir' => $dir, 'page' => null]);
    };
    $palette = [
        ['bg' => 'rgba(74,140,63,0.12)',  'text' => '#3A7030'], // green
        ['bg' => 'rgba(224,145,47,0.14)', 'text' => '#B4711A'], // amber/gold
        ['bg' => 'rgba(139,92,246,0.12)', 'text' => '#7C4DD6'], // purple
        ['bg' => 'rgba(212,52,44,0.10)',  'text' => '#CF3A32'], // red/pink
        ['bg' => 'rgba(91,141,239,0.14)', 'text' => '#3E6FD0'], // blue
    ];
    $roleMap = [
        'Managing Director' => 0, 'Operations Head' => 1, 'Marketing Manager' => 2,
        'Content Manager' => 3, 'Field Coordinator' => 4,
    ];
    $avatarBg = ['#E8F0E4', '#F6E9D5', '#EEE6FB', '#FBE3E2', '#E1EAFB'];
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Team Members<svg class="title-sprig" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26C10 18 16 14 26 12" stroke="#C4952A" stroke-width="1.6" stroke-linecap="round"/><path d="M13 20c-1.6-1-3.6-1-5.4-.2 1 1.7 2.8 2.6 4.7 2.2M17 16.6c-1.4-1.2-3.4-1.5-5.3-.9.8 1.8 2.5 2.9 4.4 2.7M21 13.8c-1.2-1.3-3.1-1.9-5.1-1.5.6 1.9 2.2 3.1 4.1 3.1M25 11.8c-1-1.4-2.9-2.2-4.9-2 .4 1.9 1.9 3.3 3.8 3.4" stroke="#4A8C3F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></h1>
        <p class="page-subtitle">Manage your team</p>
    </div>
    <a href="{{ route('admin.team.create') }}" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Member
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="toolbar" id="teamToolbar">
    @if(request('sort'))<input type="hidden" name="sort" value="{{ request('sort') }}">@endif
    @if(request('dir'))<input type="hidden" name="dir" value="{{ request('dir') }}">@endif
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search members..." class="search-input">
    </div>
    <button type="submit" class="btn btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="tm-card">
    <div class="tm-scroll">
        <table class="tm-table">
            <thead>
                <tr>
                    <th><a href="{{ $sortUrl('name') }}" class="th-sort {{ $curSort === 'name' ? 'active' : '' }}">Name @include('admin.team._sorticon', ['col' => 'name'])</a></th>
                    <th><a href="{{ $sortUrl('role') }}" class="th-sort {{ $curSort === 'role' ? 'active' : '' }}">Role @include('admin.team._sorticon', ['col' => 'role'])</a></th>
                    <th><a href="{{ $sortUrl('status') }}" class="th-sort {{ $curSort === 'status' ? 'active' : '' }}">Status @include('admin.team._sorticon', ['col' => 'status'])</a></th>
                    <th class="th-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($members as $m)
                    @php
                        $idx = $roleMap[$m->role] ?? (crc32($m->role) % count($palette));
                        $pill = $palette[$idx];
                        $initial = strtoupper(substr($m->name, 0, 1));
                        $abg = $avatarBg[$idx % count($avatarBg)];
                    @endphp
                    <tr>
                        <td>
                            <div class="tm-name-cell">
                                @if($m->image)
                                    <img src="{{ asset('storage/' . $m->image) }}" class="tm-avatar" alt="{{ $m->name }}">
                                @else
                                    <span class="tm-avatar tm-avatar-initial" style="background:{{ $abg }};color:{{ $pill['text'] }};">{{ $initial }}</span>
                                @endif
                                <div class="tm-name-info">
                                    <span class="tm-name">{{ $m->name }}</span>
                                    @if($m->email)<span class="tm-email">{{ $m->email }}</span>@endif
                                </div>
                            </div>
                        </td>
                        <td><span class="role-pill" style="background:{{ $pill['bg'] }};color:{{ $pill['text'] }};">{{ $m->role }}</span></td>
                        <td>
                            @if($m->is_active)
                                <span class="status status-active"><span class="status-dot"></span>Active</span>
                            @else
                                <span class="status status-inactive"><span class="status-dot"></span>Inactive</span>
                            @endif
                        </td>
                        <td>
                            <div class="tm-actions">
                                <a href="{{ route('admin.team.edit', $m) }}" class="act-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                </a>
                                <div class="tm-menu">
                                    <button type="button" class="act-btn kebab-btn" onclick="toggleMenu(this)" title="More">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                    <div class="kebab-menu">
                                        <a href="{{ route('admin.team.edit', $m) }}" class="kebab-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.team.destroy', $m) }}" onsubmit="return confirm('Delete {{ addslashes($m->name) }}?')">
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
                    <tr><td colspan="4" class="tm-empty">No team members yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($members->hasPages())
        @php $cur = $members->currentPage(); $last = $members->lastPage(); $prev = null; @endphp
        <div class="tm-pagination">
            <a href="{{ $members->previousPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ $members->onFirstPage() ? 'disabled' : '' }}" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </a>
            @for($i = 1; $i <= $last; $i++)
                @if($i <= 3 || $i == $last || abs($i - $cur) <= 1)
                    <a href="{{ $members->url($i) }}" class="pg-btn {{ $i == $cur ? 'active' : '' }}">{{ $i }}</a>
                    @php $prev = $i; @endphp
                @elseif($prev !== '...')
                    <span class="pg-ellipsis">…</span>
                    @php $prev = '...'; @endphp
                @endif
            @endfor
            <a href="{{ $members->nextPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ !$members->hasMorePages() ? 'disabled' : '' }}" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </div>
    @endif
</div>

<style>
:root { --page-bg: #FBF6EC; } /* warm cream page to match the villagescape theme */
.page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:22px}
.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;display:flex;align-items:center;gap:8px;line-height:1.1}
.title-sprig{width:28px;height:28px;flex-shrink:0}
.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}
.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}
.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}
.btn{padding:11px 18px;border-radius:9px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
.btn-primary{background:#4A8C3F;color:#fff}
.btn-primary:hover{background:#3A7030}

.toolbar{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.search-wrap{position:relative}
.search-wrap svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9A9A9A;pointer-events:none}
.search-input{height:42px;padding:0 14px 0 36px;border:1px solid #E5E5E5;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;width:280px;background:#fff;color:#1A1A1A;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.search-input::placeholder{color:rgba(90,90,90,0.5)}
.search-input:focus{border-color:#4A8C3F;box-shadow:0 0 0 3px rgba(74,140,63,0.08)}
.btn-filter{height:42px;background:#fff;color:#5A5A5A;border:1px solid #E5E5E5}
.btn-filter:hover{background:#FAFAFA;border-color:#D5D5D5}

.tm-card{background:#fff;border:1px solid #EDE9E1;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(26,26,26,0.04)}
.tm-scroll{overflow-x:auto}
.tm-table{width:100%;border-collapse:collapse}
.tm-table th{padding:14px 22px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#8A8A8A;background:#FBFAF7;border-bottom:1px solid #EDE9E1;white-space:nowrap}
.th-actions{text-align:left}
.th-sort{display:inline-flex;align-items:center;gap:5px;color:#8A8A8A;text-decoration:none}
.th-sort:hover{color:#5A5A5A}
.th-sort.active{color:#3A7030}
.sort-ico{display:inline-flex;flex-direction:column;line-height:0}
.sort-ico svg{width:9px;height:9px;display:block}
.sort-ico .up{margin-bottom:-1px}
.sort-ico .dim{opacity:0.35}
.tm-table td{padding:14px 22px;font-size:13.5px;color:#1A1A1A;border-bottom:1px solid #F2EFEA;vertical-align:middle}
.tm-table tbody tr:last-child td{border-bottom:none}
.tm-table tbody tr:hover{background:#FCFBF9}

.tm-name-cell{display:flex;align-items:center;gap:12px}
.tm-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0}
.tm-avatar-initial{display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;font-family:'Inter',sans-serif}
.tm-name-info{display:flex;flex-direction:column;min-width:0}
.tm-name{font-size:14px;font-weight:600;color:#1A1A1A}
.tm-email{font-size:12px;color:#9A9A9A;margin-top:2px}

.role-pill{display:inline-flex;align-items:center;font-size:12px;font-weight:600;padding:5px 12px;border-radius:8px;white-space:nowrap}

.status{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600}
.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.status-active{color:#3A8C3F}
.status-active .status-dot{background:#4A8C3F}
.status-inactive{color:#E0912F}
.status-inactive .status-dot{background:#E0912F}

.tm-actions{display:flex;align-items:center;gap:8px}
.act-btn{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;border:1px solid #E5E5E5;background:#fff;color:#6A6A6A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.act-btn svg{width:16px;height:16px}
.act-btn:hover{background:#FAFAFA;border-color:#D5D5D5;color:#1A1A1A}
.tm-menu{position:relative}
.kebab-menu{display:none;position:absolute;top:40px;right:0;background:#fff;border:1px solid #E5E5E5;border-radius:10px;box-shadow:0 8px 24px rgba(26,26,26,0.12);padding:5px;min-width:140px;z-index:20}
.kebab-menu.open{display:block}
.kebab-item{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border:none;background:transparent;font-size:12.5px;font-weight:500;font-family:'Inter',sans-serif;color:#5A5A5A;border-radius:7px;cursor:pointer;text-decoration:none;text-align:left}
.kebab-item svg{width:14px;height:14px}
.kebab-item:hover{background:#F5F5F5;color:#1A1A1A}
.kebab-danger{color:#D4342C}
.kebab-danger:hover{background:rgba(212,52,44,0.08);color:#D4342C}
.tm-empty{text-align:center;color:#9A9A9A;font-size:13px;padding:48px 16px}

.tm-pagination{display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:16px 22px}
.pg-btn{min-width:34px;height:34px;padding:0 8px;display:flex;align-items:center;justify-content:center;border:1px solid #E5E5E5;background:#fff;border-radius:9px;font-size:13px;font-weight:600;color:#5A5A5A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.pg-btn:hover{border-color:#4A8C3F;color:#3A7030}
.pg-btn.active{background:#4A8C3F;border-color:#4A8C3F;color:#fff}
.pg-arrow svg{width:15px;height:15px}
.pg-btn.disabled{opacity:0.4;pointer-events:none}
.pg-ellipsis{min-width:24px;text-align:center;color:#B0B0B0;font-weight:600}

@media (max-width:600px){.toolbar{flex-wrap:wrap}.search-input{width:100%}.tm-email{display:none}}
</style>

<script>
function toggleMenu(btn){
    var menu = btn.parentElement.querySelector('.kebab-menu');
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    if(!isOpen) menu.classList.add('open');
}
document.addEventListener('click', function(e){
    if(!e.target.closest('.tm-menu')){
        document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    }
});
</script>
@endsection
