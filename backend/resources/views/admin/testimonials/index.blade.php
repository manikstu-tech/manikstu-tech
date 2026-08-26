@extends('admin.layouts.app')
@section('title', 'Testimonials')

@section('content')
@php
    $curSort = request('sort');
    $curDir = request('dir') === 'desc' ? 'desc' : 'asc';
    $sortUrl = function ($col) use ($curSort, $curDir) {
        $dir = ($curSort === $col && $curDir === 'asc') ? 'desc' : 'asc';
        return request()->fullUrlWithQuery(['sort' => $col, 'dir' => $dir, 'page' => null]);
    };
    $avatarColors = ['#4A8C3F', '#D2703A', '#7C4DD6', '#2F73C4', '#D4342C'];
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Testimonials<svg class="title-sprig" viewBox="0 0 24 24" fill="none" stroke="#C4952A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></h1>
        <p class="page-subtitle">Manage farmer &amp; customer stories</p>
    </div>
    <a href="{{ route('admin.testimonials.create') }}" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Testimonial
    </a>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<form method="GET" class="toolbar" id="tsToolbar">
    @if(request('sort'))<input type="hidden" name="sort" value="{{ request('sort') }}">@endif
    @if(request('dir'))<input type="hidden" name="dir" value="{{ request('dir') }}">@endif
    <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search..." class="search-input">
    </div>
    <button type="submit" class="btn btn-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
    </button>
</form>

<div class="ts-card">
    <div class="ts-scroll">
        <table class="ts-table">
            <thead>
                <tr>
                    <th><a href="{{ $sortUrl('name') }}" class="th-sort {{ $curSort === 'name' ? 'active' : '' }}">Name @include('admin.testimonials._sorticon', ['col' => 'name'])</a></th>
                    <th>Location</th>
                    <th><a href="{{ $sortUrl('rating') }}" class="th-sort {{ $curSort === 'rating' ? 'active' : '' }}">Rating @include('admin.testimonials._sorticon', ['col' => 'rating'])</a></th>
                    <th><a href="{{ $sortUrl('status') }}" class="th-sort {{ $curSort === 'status' ? 'active' : '' }}">Status @include('admin.testimonials._sorticon', ['col' => 'status'])</a></th>
                    <th class="th-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($testimonials as $t)
                    @php
                        $abg = $avatarColors[($t->id - 1) % count($avatarColors)];
                        $initial = strtoupper(substr($t->name, 0, 1));
                        $rating = (int) ($t->rating ?? 0);
                    @endphp
                    <tr>
                        <td>
                            <div class="ts-name-cell">
                                @if($t->image)
                                    <img src="{{ asset('storage/' . $t->image) }}" class="ts-avatar" alt="{{ $t->name }}">
                                @else
                                    <span class="ts-avatar ts-avatar-initial" style="background:{{ $abg }};">{{ $initial }}</span>
                                @endif
                                <div class="ts-name-info">
                                    <span class="ts-name">{{ $t->name }}</span>
                                    @if($t->quote)<span class="ts-quote">"{{ Str::limit($t->quote, 34) }}"</span>@endif
                                </div>
                            </div>
                        </td>
                        <td>
                            @if($t->location)
                                <span class="ts-loc">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#D96A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {{ $t->location }}
                                </span>
                            @else
                                <span class="muted">—</span>
                            @endif
                        </td>
                        <td>
                            <span class="ts-stars">
                                @for($i = 1; $i <= 5; $i++)
                                    <svg class="star {{ $i <= $rating ? 'on' : 'off' }}" viewBox="0 0 24 24"><path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.3 6.54L12 17.3l-5.9 3.2 1.3-6.54-4.9-4.5 6.6-.7L12 2z"/></svg>
                                @endfor
                            </span>
                        </td>
                        <td>
                            @if($t->is_active)
                                <span class="status-pill status-published"><span class="status-dot"></span>Published</span>
                            @else
                                <span class="status-pill status-pending"><span class="status-dot"></span>Pending</span>
                            @endif
                        </td>
                        <td>
                            <div class="ts-actions">
                                <a href="{{ route('admin.testimonials.edit', $t) }}" class="act-btn" title="Edit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                </a>
                                <div class="ts-menu">
                                    <button type="button" class="act-btn kebab-btn" onclick="toggleMenu(this)" title="More">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                    <div class="kebab-menu">
                                        <a href="{{ route('admin.testimonials.edit', $t) }}" class="kebab-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.testimonials.destroy', $t) }}" onsubmit="return confirm('Delete testimonial by {{ addslashes($t->name) }}?')">
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
                    <tr><td colspan="5" class="ts-empty">No testimonials yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($testimonials->hasPages())
        @php $cur = $testimonials->currentPage(); $last = $testimonials->lastPage(); $prev = null; @endphp
        <div class="ts-pagination">
            <a href="{{ $testimonials->previousPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ $testimonials->onFirstPage() ? 'disabled' : '' }}" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </a>
            @for($i = 1; $i <= $last; $i++)
                @if($i <= 3 || $i == $last || abs($i - $cur) <= 1)
                    <a href="{{ $testimonials->url($i) }}" class="pg-btn {{ $i == $cur ? 'active' : '' }}">{{ $i }}</a>
                    @php $prev = $i; @endphp
                @elseif($prev !== '...')
                    <span class="pg-ellipsis">…</span>
                    @php $prev = '...'; @endphp
                @endif
            @endfor
            <a href="{{ $testimonials->nextPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ !$testimonials->hasMorePages() ? 'disabled' : '' }}" aria-label="Next">
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
.search-input{height:42px;padding:0 14px 0 36px;border:1px solid #E8E2D6;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;width:280px;background:#fff;color:#1A1A1A;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.search-input::placeholder{color:rgba(90,90,90,0.5)}
.search-input:focus{border-color:#4A8C3F;box-shadow:0 0 0 3px rgba(74,140,63,0.08)}
.btn-filter{height:42px;background:#fff;color:#5A5A5A;border:1px solid #E8E2D6}
.btn-filter:hover{background:#FAFAFA;border-color:#D9D2C4}

.ts-card{background:#fff;border:1px solid #EDE9E1;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(26,26,26,0.04)}
.ts-scroll{overflow-x:auto}
.ts-table{width:100%;border-collapse:collapse}
.ts-table th{padding:15px 22px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#9A9A8E;background:#FBFAF7;border-bottom:1px solid #EDE9E1;white-space:nowrap}
.th-actions{text-align:left}
.th-sort{display:inline-flex;align-items:center;gap:5px;color:#9A9A8E;text-decoration:none}
.th-sort:hover{color:#6A6A5E}
.th-sort.active{color:#3A7030}
.sort-ico{display:inline-flex;flex-direction:column;line-height:0}
.sort-ico svg{width:9px;height:9px;display:block}
.sort-ico .up{margin-bottom:-1px}
.sort-ico .dim{opacity:0.35}
.ts-table td{padding:14px 22px;font-size:13.5px;color:#1A1A1A;border-bottom:1px solid #F2EFEA;vertical-align:middle}
.ts-table tbody tr:last-child td{border-bottom:none}
.ts-table tbody tr:hover{background:#FCFBF9}
.muted{color:#B0B0B0}

.ts-name-cell{display:flex;align-items:center;gap:13px}
.ts-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0}
.ts-avatar-initial{display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;font-family:'Inter',sans-serif}
.ts-name-info{display:flex;flex-direction:column;min-width:0}
.ts-name{font-size:14px;font-weight:700;color:#1A1A1A}
.ts-quote{font-size:12.5px;color:#9A9A9A;font-style:italic;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px}

.ts-loc{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;color:#3A3A3A}
.ts-loc svg{width:15px;height:15px;flex-shrink:0}

.ts-stars{display:inline-flex;gap:2px}
.star{width:17px;height:17px}
.star.on{fill:#E0A82E}
.star.off{fill:none;stroke:#D8CDB8;stroke-width:1.5}

.status-pill{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:5px 12px;border-radius:9999px;white-space:nowrap}
.status-pill .status-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.status-published{background:rgba(74,140,63,0.12);color:#3A7030}
.status-published .status-dot{background:#4A8C3F}
.status-pending{background:rgba(224,145,47,0.16);color:#B4711A}
.status-pending .status-dot{background:#E0912F}

.ts-actions{display:flex;align-items:center;gap:8px}
.act-btn{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;border:1px solid #E8E2D6;background:#fff;color:#6A6A6A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.act-btn svg{width:16px;height:16px}
.act-btn:hover{background:#FAFAFA;border-color:#D9D2C4;color:#1A1A1A}
.ts-menu{position:relative}
.kebab-menu{display:none;position:absolute;top:40px;right:0;background:#fff;border:1px solid #E5E5E5;border-radius:10px;box-shadow:0 8px 24px rgba(26,26,26,0.12);padding:5px;min-width:140px;z-index:20}
.kebab-menu.open{display:block}
.kebab-item{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border:none;background:transparent;font-size:12.5px;font-weight:500;font-family:'Inter',sans-serif;color:#5A5A5A;border-radius:7px;cursor:pointer;text-decoration:none;text-align:left}
.kebab-item svg{width:14px;height:14px}
.kebab-item:hover{background:#F5F5F5;color:#1A1A1A}
.kebab-danger{color:#D4342C}
.kebab-danger:hover{background:rgba(212,52,44,0.08);color:#D4342C}
.ts-empty{text-align:center;color:#9A9A9A;font-size:13px;padding:48px 16px}

.ts-pagination{display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:16px 22px}
.pg-btn{min-width:34px;height:34px;padding:0 8px;display:flex;align-items:center;justify-content:center;border:1px solid #E8E2D6;background:#fff;border-radius:9px;font-size:13px;font-weight:600;color:#5A5A5A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.pg-btn:hover{border-color:#4A8C3F;color:#3A7030}
.pg-btn.active{background:#fff;border-color:#4A8C3F;color:#3A7030;box-shadow:0 0 0 1px #4A8C3F inset}
.pg-arrow svg{width:15px;height:15px}
.pg-btn.disabled{opacity:0.4;pointer-events:none}
.pg-ellipsis{min-width:24px;text-align:center;color:#B0B0B0;font-weight:600}

@media (max-width:600px){.toolbar{flex-wrap:wrap}.search-input{width:100%}.ts-quote{display:none}}
</style>

<script>
function toggleMenu(btn){
    var menu = btn.parentElement.querySelector('.kebab-menu');
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    if(!isOpen) menu.classList.add('open');
}
document.addEventListener('click', function(e){
    if(!e.target.closest('.ts-menu')){
        document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    }
});
</script>
@endsection
