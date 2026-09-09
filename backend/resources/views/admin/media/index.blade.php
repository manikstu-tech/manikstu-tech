@extends('admin.layouts.app')
@section('title', 'Media Library')
@section('content')

<form method="POST" action="{{ route('admin.media.upload') }}" enctype="multipart/form-data" id="uploadForm">
    @csrf
    <input type="hidden" name="type" id="typeInput" value="photo">
    <input type="file" name="file" id="fileInput" accept="image/*,.pdf" style="display:none;" onchange="onFileChosen(this)">

    <!-- Upload details (inside the form so name/category submit with the file) -->
    <div class="details-overlay" id="detailsOverlay" onclick="if(event.target===this)closeDetails()">
        <div class="details" role="dialog" aria-modal="true" aria-label="Upload details">
            <h3 class="details-title" id="detailsHeading">Photo details</h3>
            <p class="details-sub">Give it a name and category, then upload.</p>

            <div class="details-body">
                <div class="details-preview" id="detailsPreview"><!-- filled by JS --></div>
                <div class="details-fields">
                    <label class="fld">
                        <span class="fld-label">Name</span>
                        <input type="text" name="title" id="titleInput" class="fld-input" placeholder="e.g. Field day at Kalahandi" maxlength="150">
                    </label>
                    <label class="fld">
                        <span class="fld-label">Category</span>
                        <select name="category" id="categoryInput" class="fld-input">
                            <option value="">— Select category —</option>
                            <option value="Events">Events</option>
                            <option value="News">News</option>
                            <option value="Fields">Fields</option>
                            <option value="Training">Training</option>
                            <option value="Awareness">Awareness</option>
                            <option value="Farmers">Farmers</option>
                            <option value="General">General</option>
                        </select>
                    </label>
                    <label class="fld">
                        <span class="fld-label">Date</span>
                        <input type="text" id="dateDisplay" class="fld-input fld-readonly" value="{{ now()->format('d M Y') }}" readonly>
                        <span class="fld-hint">Automatically set to the upload date</span>
                    </label>
                </div>
            </div>

            <div class="details-actions">
                <button type="button" class="btn btn-secondary" onclick="closeDetails()">Cancel</button>
                <button type="submit" class="btn btn-primary" id="detailsUploadBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    Upload
                </button>
            </div>
        </div>
    </div>
</form>

<!-- Photo / Video chooser -->
<div class="chooser-overlay" id="chooserOverlay" onclick="if(event.target===this)closeChooser()">
    <div class="chooser" role="dialog" aria-modal="true" aria-label="Choose media type">
        <h3 class="chooser-title">What are you uploading?</h3>
        <p class="chooser-sub">Choose the type of media to add to the website.</p>
        <div class="chooser-options">
            <button type="button" class="chooser-opt" onclick="pickType('photo')">
                <span class="chooser-ico photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.35-4.35a2 2 0 0 0-2.83 0L4 21"/></svg></span>
                <span class="chooser-name">Photo</span>
                <span class="chooser-hint">JPG, PNG, GIF, WebP — Max 10MB</span>
            </button>
            <button type="button" class="chooser-opt" onclick="pickType('video')">
                <span class="chooser-ico video"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg></span>
                <span class="chooser-name">Video</span>
                <span class="chooser-hint">MP4, WebM, MOV — Max 50MB</span>
            </button>
        </div>
        <button type="button" class="chooser-cancel" onclick="closeChooser()">Cancel</button>
    </div>
</div>

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Media Library<svg class="title-sprig" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26C10 18 16 14 26 12" stroke="#C4952A" stroke-width="1.6" stroke-linecap="round"/><path d="M13 20c-1.6-1-3.6-1-5.4-.2 1 1.7 2.8 2.6 4.7 2.2M17 16.6c-1.4-1.2-3.4-1.5-5.3-.9.8 1.8 2.5 2.9 4.4 2.7M21 13.8c-1.2-1.3-3.1-1.9-5.1-1.5.6 1.9 2.2 3.1 4.1 3.1M25 11.8c-1-1.4-2.9-2.2-4.9-2 .4 1.9 1.9 3.3 3.8 3.4" stroke="#4A8C3F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></h1>
        <p class="page-subtitle">Upload and manage images</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="openChooser()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        Upload Media
    </button>
</div>

@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
@if($errors->any())<div class="alert alert-error">{{ $errors->first() }}</div>@endif

<div class="upload-zone" id="dropzone" onclick="openChooser()">
    <div class="upload-cloud">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4-4 4 4"/></svg>
    </div>
    <p class="upload-text">Drag &amp; drop files here or <span class="upload-browse">browse</span></p>
    <small class="upload-hint">Photos: JPG, PNG, GIF, WebP (10MB) &nbsp;·&nbsp; Videos: MP4, WebM, MOV (50MB)</small>
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
            $isVideo = str_starts_with($m->mime_type, 'video/');
        @endphp
        <div class="media-item">
            <div class="media-thumb-wrap">
                @if($isVideo)
                    <div class="media-thumb media-video">
                        <video src="{{ asset('storage/' . $m->path) }}#t=0.5" preload="metadata" muted class="media-video-el"></video>
                        <span class="media-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                        <span class="type-tag video">Video</span>
                    </div>
                @elseif($isImage)
                    <div class="media-thumb-img">
                        <img src="{{ asset('storage/' . $m->path) }}" alt="{{ $m->name }}" class="media-thumb" loading="lazy">
                        <span class="type-tag photo">Photo</span>
                    </div>
                @else
                    <div class="media-thumb media-doc">{{ $ext }}</div>
                @endif
            </div>
            <div class="media-info">
                <div class="media-info-main">
                    <div class="media-name-row">
                        <span class="ext-badge">{{ $ext }}</span>
                        <span class="media-name" title="{{ $m->name }} ({{ $m->file_name }})">{{ $m->name }}</span>
                    </div>
                    @if($m->category)
                        <span class="cat-chip">{{ $m->category }}</span>
                    @endif
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
.media-item{background:#fff;border:1px solid #EDE9E1;border-radius:14px;position:relative;transition:box-shadow 0.15s,transform 0.15s}
.media-item:hover{box-shadow:0 6px 18px rgba(26,26,26,0.08);transform:translateY(-2px)}
/* Elevate a card while its options menu is open so the dropdown isn't clipped/covered */
.media-item.menu-open{z-index:50}
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

/* Type tags + video thumbs */
.media-thumb-img,.media-video{position:relative}
.media-thumb-img{padding:0;background:transparent}
.type-tag{position:absolute;top:8px;left:8px;font-size:9px;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;padding:3px 7px;border-radius:6px;color:#fff}
.type-tag.photo{background:rgba(74,140,63,0.92)}
.type-tag.video{background:rgba(62,111,208,0.92)}
.media-video{display:flex;align-items:center;justify-content:center;background:#111;overflow:hidden}
.media-video-el{width:100%;height:118px;object-fit:cover;display:block}
.media-play{position:absolute;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;color:#3E6FD0;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
.media-play svg{width:18px;height:18px;margin-left:2px}

/* Photo / Video chooser modal */
.chooser-overlay{display:none;position:fixed;inset:0;background:rgba(26,26,26,0.45);z-index:200;align-items:center;justify-content:center;padding:20px}
.chooser-overlay.open{display:flex}
.chooser{background:#fff;border-radius:18px;padding:26px 24px 20px;max-width:460px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,0.25);text-align:center}
.chooser-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1A1A1A}
.chooser-sub{font-size:13px;color:#8A8A8A;margin-top:4px}
.chooser-options{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:22px 0 8px}
.chooser-opt{display:flex;flex-direction:column;align-items:center;gap:8px;padding:22px 14px;border:1.5px solid #E8E2D6;border-radius:14px;background:#FBFAF7;cursor:pointer;transition:all 0.15s;font-family:'Inter',sans-serif}
.chooser-opt:hover{border-color:#4A8C3F;background:rgba(74,140,63,0.05);transform:translateY(-2px)}
.chooser-ico{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center}
.chooser-ico svg{width:26px;height:26px}
.chooser-ico.photo{background:rgba(74,140,63,0.12);color:#3A7030}
.chooser-ico.video{background:rgba(62,111,208,0.12);color:#3E6FD0}
.chooser-name{font-size:15px;font-weight:700;color:#1A1A1A}
.chooser-hint{font-size:11px;color:#9A9A9A;line-height:1.4}
.chooser-cancel{margin-top:10px;background:none;border:none;color:#8A8A8A;font-size:13px;font-weight:600;cursor:pointer;padding:8px 14px;font-family:'Inter',sans-serif}
.chooser-cancel:hover{color:#1A1A1A}

/* Category chip on cards */
.cat-chip{display:inline-block;margin-top:7px;font-size:10px;font-weight:700;letter-spacing:0.02em;color:#B4711A;background:rgba(196,149,42,0.14);padding:2px 8px;border-radius:6px;text-transform:uppercase}

/* Upload details modal */
.details-overlay{display:none;position:fixed;inset:0;background:rgba(26,26,26,0.45);z-index:200;align-items:center;justify-content:center;padding:20px}
.details-overlay.open{display:flex}
.details{background:#fff;border-radius:18px;padding:24px;max-width:560px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,0.25)}
.details-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1A1A1A}
.details-sub{font-size:13px;color:#8A8A8A;margin-top:3px}
.details-body{display:grid;grid-template-columns:180px 1fr;gap:20px;margin:20px 0}
.details-preview{border-radius:12px;overflow:hidden;background:#F5F3EE;border:1px solid #EDE9E1;display:flex;align-items:center;justify-content:center;aspect-ratio:1/1}
.dp-media{width:100%;height:100%;object-fit:cover;display:block}
.details-fields{display:flex;flex-direction:column;gap:14px}
.fld{display:flex;flex-direction:column;gap:6px}
.fld-label{font-size:12px;font-weight:600;color:#5A5A5A}
.fld-input{height:42px;padding:0 13px;border:1px solid #E3DECF;border-radius:10px;font-size:14px;font-family:'Inter',sans-serif;color:#1A1A1A;background:#fff;outline:none;transition:border-color 0.15s,box-shadow 0.15s}
select.fld-input{cursor:pointer;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%239A9A9A'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:15px;padding-right:34px}
.fld-input:focus{border-color:#4A8C3F;box-shadow:0 0 0 3px rgba(74,140,63,0.08)}
.fld-readonly{background:#F6F4EF;color:#8A8A8A;cursor:default}
.fld-hint{font-size:11px;color:#9A9A9A}
.details-actions{display:flex;justify-content:flex-end;gap:10px;border-top:1px solid #F0ECE2;padding-top:16px}

@media (max-width:1100px){.media-grid{grid-template-columns:repeat(4,1fr)}}
@media (max-width:860px){.media-grid{grid-template-columns:repeat(3,1fr)}}
@media (max-width:600px){.media-grid{grid-template-columns:repeat(2,1fr)}.toolbar-left,.search-input{flex:1}.search-input{width:100%}.chooser-options{grid-template-columns:1fr}.details-body{grid-template-columns:1fr}.details-preview{aspect-ratio:16/9;max-height:200px}}
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

function closeAllMenus(){
    document.querySelectorAll('.kebab-menu.open').forEach(function(m){ m.classList.remove('open'); });
    document.querySelectorAll('.media-item.menu-open').forEach(function(i){ i.classList.remove('menu-open'); });
}
function toggleMenu(btn){
    var menu = btn.nextElementSibling;
    var isOpen = menu.classList.contains('open');
    closeAllMenus();
    if(!isOpen){
        menu.classList.add('open');
        var item = btn.closest('.media-item');
        if(item) item.classList.add('menu-open');
    }
}
document.addEventListener('click', function(e){
    if(!e.target.closest('.media-menu')){
        closeAllMenus();
    }
});

// Photo / Video chooser
function openChooser(){ document.getElementById('chooserOverlay').classList.add('open'); }
function closeChooser(){ document.getElementById('chooserOverlay').classList.remove('open'); }
function pickType(type){
    document.getElementById('typeInput').value = type;
    var input = document.getElementById('fileInput');
    input.setAttribute('accept', type === 'video' ? 'video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.mov,.m4v' : 'image/*,.pdf');
    closeChooser();
    input.click();
}

// After a file is chosen (picker or drop), show the details form
function onFileChosen(input){
    if(!input.files || !input.files.length) return;
    showDetails(input.files[0]);
}
function showDetails(file){
    var type = document.getElementById('typeInput').value;
    var isVideo = type === 'video' || (file.type && file.type.indexOf('video/') === 0);
    document.getElementById('typeInput').value = isVideo ? 'video' : 'photo';

    // Heading + default name (file name without extension)
    document.getElementById('detailsHeading').textContent = isVideo ? 'Video details' : 'Photo details';
    var base = file.name.replace(/\.[^.]+$/, '');
    document.getElementById('titleInput').value = base;

    // Preview
    var prev = document.getElementById('detailsPreview');
    var url = URL.createObjectURL(file);
    if(isVideo){
        prev.innerHTML = '<video src="'+url+'" controls class="dp-media"></video>';
    } else {
        prev.innerHTML = '<img src="'+url+'" alt="preview" class="dp-media">';
    }

    document.getElementById('detailsOverlay').classList.add('open');
    setTimeout(function(){ document.getElementById('titleInput').focus(); }, 50);
}
function closeDetails(){
    document.getElementById('detailsOverlay').classList.remove('open');
    // Reset the file input so re-selecting the same file fires change again
    document.getElementById('fileInput').value = '';
    document.getElementById('detailsPreview').innerHTML = '';
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeChooser(); closeDetails(); } });

(function(){
    var dz = document.getElementById('dropzone');
    var input = document.getElementById('fileInput');
    var typeInput = document.getElementById('typeInput');
    ['dragenter','dragover'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.add('dragover'); }); });
    ['dragleave','drop'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.remove('dragover'); }); });
    dz.addEventListener('drop', function(e){
        if(e.dataTransfer.files.length){
            var f = e.dataTransfer.files[0];
            typeInput.value = (f.type && f.type.indexOf('video/') === 0) ? 'video' : 'photo';
            input.files = e.dataTransfer.files;
            showDetails(f);
        }
    });
})();
</script>
@endsection
