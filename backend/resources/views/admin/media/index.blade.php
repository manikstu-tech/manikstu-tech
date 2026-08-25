@extends('admin.layouts.app')
@section('title', 'Media Library')
@section('content')

<form method="POST" action="{{ route('admin.media.upload') }}" enctype="multipart/form-data" id="uploadForm">
    @csrf
    <input type="file" name="file" id="fileInput" accept="image/*,.pdf" style="display:none;" onchange="this.form.submit()">
</form>

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Media Library<svg class="title-sprig" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26C10 18 16 14 26 12" stroke="#C4952A" stroke-width="1.6" stroke-linecap="round"/><path d="M13 20c-1.6-1-3.6-1-5.4-.2 1 1.7 2.8 2.6 4.7 2.2M17 16.6c-1.4-1.2-3.4-1.5-5.3-.9.8 1.8 2.5 2.9 4.4 2.7M21 13.8c-1.2-1.3-3.1-1.9-5.1-1.5.6 1.9 2.2 3.1 4.1 3.1M25 11.8c-1-1.4-2.9-2.2-4.9-2 .4 1.9 1.9 3.3 3.8 3.4" stroke="#4A8C3F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></h1>
        <p class="page-subtitle">Upload and manage images</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        Upload Media
    </button>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
@if($errors->any())<div class="alert alert-error">{{ $errors->first() }}</div>@endif

<div class="upload-zone" id="dropzone" onclick="document.getElementById('fileInput').click()">
    <div class="upload-cloud">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4-4 4 4"/></svg>
    </div>
    <p class="upload-text">Drag &amp; drop files here or <span class="upload-browse">browse</span></p>
    <small class="upload-hint">JPG, PNG, GIF, WebP, SVG, PDF — Max 10MB</small>
</div>

<form method="GET" class="toolbar" id="toolbar">
    <div class="toolbar-left">
        <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search files..." class="search-input">
        </div>
        <button type="submit" class="btn btn-secondary">Search</button>
    </div>
    <div class="toolbar-right">
        <div class="view-toggle" role="group" aria-label="View mode">
            <button type="button" class="view-btn active" data-view="grid" onclick="setView('grid')" aria-label="Grid view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </button>
            <button type="button" class="view-btn" data-view="list" onclick="setView('list')" aria-label="List view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
            </button>
        </div>
        <div class="sort-wrap">
            <select name="sort" class="sort-select" onchange="document.getElementById('toolbar').submit()">
                <option value="newest" {{ request('sort') !== 'oldest' ? 'selected' : '' }}>Newest First</option>
                <option value="oldest" {{ request('sort') === 'oldest' ? 'selected' : '' }}>Oldest First</option>
            </select>
            <svg class="sort-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
    </div>
</form>

<div class="media-grid" id="mediaGrid">
    @forelse($media as $m)
        @php
            $bytes = (int) $m->size;
            $sizeLabel = $bytes >= 1048576 ? round($bytes / 1048576, 2) . ' MB' : round($bytes / 1024) . ' KB';
            $ext = strtoupper(pathinfo($m->file_name, PATHINFO_EXTENSION)) ?: 'FILE';
            $isImage = str_starts_with($m->mime_type, 'image/');
        @endphp
        <div class="media-item">
            <div class="media-thumb-wrap">
                @if($isImage)
                    <img src="{{ asset('storage/' . $m->path) }}" alt="{{ $m->name }}" class="media-thumb" loading="lazy">
                @else
                    <div class="media-thumb media-doc">{{ $ext }}</div>
                @endif
            </div>
            <div class="media-info">
                <div class="media-info-main">
                    <div class="media-name-row">
                        <span class="ext-badge">{{ $ext }}</span>
                        <span class="media-name" title="{{ $m->file_name }}">{{ $m->file_name }}</span>
                    </div>
                    <p class="media-size">{{ $sizeLabel }}</p>
                    <p class="media-date">{{ $m->created_at?->format('d M Y') }}</p>
                </div>
                <div class="media-menu">
                    <button type="button" class="kebab-btn" onclick="toggleMenu(this)" aria-label="Options">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                    <div class="kebab-menu">
                        <a href="{{ asset('storage/' . $m->path) }}" target="_blank" rel="noopener" class="kebab-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                            View
                        </a>
                        <form method="POST" action="{{ route('admin.media.destroy', $m) }}" onsubmit="return confirm('Delete this file?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="kebab-item kebab-danger">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @empty
        <p class="media-empty">No files uploaded yet.</p>
    @endforelse
</div>

@if($media->hasPages())
    @php $cur = $media->currentPage(); $last = $media->lastPage(); $prev = null; @endphp
    <nav class="media-pagination" aria-label="Pagination">
        <a href="{{ $media->previousPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ $media->onFirstPage() ? 'disabled' : '' }}" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </a>
        @for($i = 1; $i <= $last; $i++)
            @if($i <= 3 || $i == $last || abs($i - $cur) <= 1)
                <a href="{{ $media->url($i) }}" class="pg-btn {{ $i == $cur ? 'active' : '' }}">{{ $i }}</a>
                @php $prev = $i; @endphp
            @elseif($prev !== '...')
                <span class="pg-ellipsis">…</span>
                @php $prev = '...'; @endphp
            @endif
        @endfor
        <a href="{{ $media->nextPageUrl() ?: '#' }}" class="pg-btn pg-arrow {{ !$media->hasMorePages() ? 'disabled' : '' }}" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
    </nav>
@endif

<style>
:root { --page-bg: #FBF6EC; } /* warm cream page to match the villagescape theme */
.page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:24px}
.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;display:flex;align-items:center;gap:8px;line-height:1.1}
.title-sprig{width:30px;height:30px;flex-shrink:0}
.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}
.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}
.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}
.alert-error{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}

.btn{padding:11px 18px;border-radius:9px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
.btn-primary{background:#4A8C3F;color:#fff}
.btn-primary:hover{background:#3A7030}
.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}
.btn-secondary:hover{background:#EDEDED}

.upload-zone{border:1.5px dashed #D9D5CC;border-radius:14px;padding:34px 20px;text-align:center;cursor:pointer;background:rgba(255,255,255,0.35);transition:border-color 0.2s,background 0.2s;margin-bottom:22px}
.upload-zone:hover,.upload-zone.dragover{border-color:#4A8C3F;background:rgba(74,140,63,0.04)}
.upload-cloud{width:56px;height:56px;border-radius:50%;background:rgba(74,140,63,0.10);color:#4A8C3F;display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
.upload-text{font-size:14px;color:#5A5A5A}
.upload-browse{color:#4A8C3F;font-weight:600}
.upload-hint{display:block;font-size:12px;color:#9A9A9A;margin-top:6px}

.toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;flex-wrap:wrap}
.toolbar-left{display:flex;align-items:center;gap:10px}
.search-wrap{position:relative}
.search-wrap svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9A9A9A;pointer-events:none}
.search-input{height:40px;padding:0 14px 0 34px;border:1px solid #E5E5E5;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;width:260px;background:#fff;color:#1A1A1A;outline:none;transition:border-color 0.2s,box-shadow 0.2s}
.search-input::placeholder{color:rgba(90,90,90,0.5)}
.search-input:focus{border-color:#4A8C3F;box-shadow:0 0 0 3px rgba(74,140,63,0.08)}
.toolbar-right{display:flex;align-items:center;gap:10px}
.view-toggle{display:flex;background:#fff;border:1px solid #E5E5E5;border-radius:10px;padding:3px;gap:2px}
.view-btn{width:32px;height:30px;border:none;background:transparent;border-radius:7px;color:#9A9A9A;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.view-btn svg{width:16px;height:16px}
.view-btn:hover{color:#5A5A5A}
.view-btn.active{background:rgba(74,140,63,0.12);color:#4A8C3F}
.sort-wrap{position:relative}
.sort-select{height:40px;padding:0 34px 0 14px;border:1px solid #E5E5E5;border-radius:10px;font-size:13px;font-weight:500;font-family:'Inter',sans-serif;color:#1A1A1A;background:#fff;cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;transition:border-color 0.2s}
.sort-select:focus{border-color:#4A8C3F}
.sort-chev{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9A9A9A;pointer-events:none}

.media-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:24px}
.media-item{background:#fff;border:1px solid #EDE9E1;border-radius:14px;overflow:hidden;transition:box-shadow 0.15s,transform 0.15s}
.media-item:hover{box-shadow:0 6px 18px rgba(26,26,26,0.08);transform:translateY(-2px)}
.media-thumb-wrap{padding:8px 8px 0}
.media-thumb{width:100%;height:118px;object-fit:cover;display:block;background:#FAFAFA;border-radius:9px}
.media-doc{display:flex;align-items:center;justify-content:center;background:#F5F5F5;color:#B0B0B0;font-size:15px;font-weight:700;letter-spacing:0.04em}
.media-info{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;padding:10px 12px 12px}
.media-info-main{min-width:0;flex:1}
.media-name-row{display:flex;align-items:center;gap:6px;min-width:0}
.ext-badge{flex-shrink:0;font-size:9px;font-weight:700;letter-spacing:0.03em;color:#3A7030;background:rgba(74,140,63,0.12);padding:2px 6px;border-radius:5px;text-transform:uppercase}
.media-name{font-size:12.5px;font-weight:600;color:#1A1A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.media-size{font-size:11.5px;color:#8A8A8A;margin-top:6px}
.media-date{font-size:11px;color:#B0B0B0;margin-top:2px}
.media-menu{position:relative;flex-shrink:0}
.kebab-btn{width:26px;height:26px;border:none;background:transparent;border-radius:6px;color:#9A9A9A;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.kebab-btn svg{width:16px;height:16px}
.kebab-btn:hover{background:#F2F2F2;color:#5A5A5A}
.kebab-menu{display:none;position:absolute;top:28px;right:0;background:#fff;border:1px solid #E5E5E5;border-radius:10px;box-shadow:0 8px 24px rgba(26,26,26,0.12);padding:5px;min-width:132px;z-index:20}
.kebab-menu.open{display:block}
.kebab-item{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border:none;background:transparent;font-size:12.5px;font-weight:500;font-family:'Inter',sans-serif;color:#5A5A5A;border-radius:7px;cursor:pointer;text-decoration:none;text-align:left}
.kebab-item svg{width:14px;height:14px}
.kebab-item:hover{background:#F5F5F5;color:#1A1A1A}
.kebab-danger{color:#D4342C}
.kebab-danger:hover{background:rgba(212,52,44,0.08);color:#D4342C}
.media-empty{color:#9A9A9A;font-size:13px;text-align:center;padding:48px;grid-column:1/-1}

/* List view */
.media-grid.list-view{grid-template-columns:1fr;gap:8px}
.media-grid.list-view .media-item{display:flex;align-items:center;border-radius:12px}
.media-grid.list-view .media-thumb-wrap{padding:8px;flex-shrink:0}
.media-grid.list-view .media-thumb{width:70px;height:52px}
.media-grid.list-view .media-doc{width:70px;height:52px}
.media-grid.list-view .media-info{flex:1;padding:10px 14px}
.media-grid.list-view .media-size{display:inline-block;margin-top:4px}
.media-grid.list-view .media-date{display:inline-block;margin-top:4px;margin-left:12px}

.media-pagination{display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:4px 0 8px}
.pg-btn{min-width:36px;height:36px;padding:0 8px;display:flex;align-items:center;justify-content:center;border:1px solid #E5E5E5;background:#fff;border-radius:9px;font-size:13px;font-weight:600;color:#5A5A5A;cursor:pointer;transition:all 0.15s;text-decoration:none}
.pg-btn:hover{border-color:#4A8C3F;color:#3A7030}
.pg-btn.active{background:#4A8C3F;border-color:#4A8C3F;color:#fff}
.pg-arrow svg{width:16px;height:16px}
.pg-btn.disabled{opacity:0.4;pointer-events:none}
.pg-ellipsis{min-width:24px;text-align:center;color:#B0B0B0;font-weight:600}

@media (max-width:1100px){.media-grid{grid-template-columns:repeat(4,1fr)}}
@media (max-width:860px){.media-grid{grid-template-columns:repeat(3,1fr)}}
@media (max-width:600px){.media-grid{grid-template-columns:repeat(2,1fr)}.toolbar-left,.search-input{flex:1}.search-input{width:100%}}
</style>

<script>
function setView(view){
    var grid = document.getElementById('mediaGrid');
    grid.classList.toggle('list-view', view === 'list');
    document.querySelectorAll('.view-btn').forEach(function(b){
        b.classList.toggle('active', b.dataset.view === view);
    });
    try { localStorage.setItem('mediaView', view); } catch(e){}
}
(function(){
    try { if (localStorage.getItem('mediaView') === 'list') setView('list'); } catch(e){}
})();

function toggleMenu(btn){
    var menu = btn.nextElementSibling;
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    if(!isOpen) menu.classList.add('open');
}
document.addEventListener('click', function(e){
    if(!e.target.closest('.media-menu')){
        document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    }
});

(function(){
    var dz = document.getElementById('dropzone');
    var input = document.getElementById('fileInput');
    ['dragenter','dragover'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.add('dragover'); }); });
    ['dragleave','drop'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.remove('dragover'); }); });
    dz.addEventListener('drop', function(e){
        if(e.dataTransfer.files.length){ input.files = e.dataTransfer.files; input.form.submit(); }
    });
})();
</script>
@endsection
