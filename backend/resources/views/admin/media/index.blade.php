@extends('admin.layouts.app')
@section('title', 'Media Library')
@section('content')
<div class="page-header"><div><h1 class="page-title">Media Library</h1><p class="page-subtitle">Upload and manage images</p></div></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif

<div class="upload-area" id="uploadArea">
    <form method="POST" action="{{ route('admin.media.upload') }}" enctype="multipart/form-data" id="uploadForm">
        @csrf
        <div class="upload-zone" id="dropzone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40" style="opacity:0.3;"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <p>Drag & drop files here or <span style="color:#4A8C3F;font-weight:600;cursor:pointer;" onclick="document.getElementById('fileInput').click()">browse</span></p>
            <small style="color:#999;">JPG, PNG, GIF, WebP, SVG, PDF — Max 10MB</small>
        </div>
        <input type="file" name="file" id="fileInput" accept="image/*,.pdf" style="display:none;" onchange="this.form.submit()">
    </form>
</div>

<div class="filter-bar"><form method="GET" class="filter-form"><input type="text" name="search" value="{{ request('search') }}" placeholder="Search files..." class="filter-input"><button type="submit" class="btn btn-secondary">Search</button></form></div>

<div class="media-grid">
    @forelse($media as $m)
        <div class="media-item">
            @if(str_starts_with($m->mime_type, 'image/'))
                <img src="{{ asset('storage/' . $m->path) }}" alt="{{ $m->name }}" class="media-thumb">
            @else
                <div class="media-thumb media-doc">{{ strtoupper(pathinfo($m->file_name, PATHINFO_EXTENSION)) }}</div>
            @endif
            <div class="media-info">
                <p class="media-name" title="{{ $m->file_name }}">{{ Str::limit($m->file_name, 20) }}</p>
                <p class="media-size">{{ round($m->size / 1024, 1) }}KB</p>
            </div>
            <form method="POST" action="{{ route('admin.media.destroy', $m) }}" onsubmit="return confirm('Delete this file?')">
                @csrf @method('DELETE')
                <button type="submit" class="media-delete" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            </form>
        </div>
    @empty
        <p style="color:#999;font-size:13px;text-align:center;padding:40px;grid-column:1/-1;">No files uploaded yet.</p>
    @endforelse
</div>
<div class="table-pagination">{{ $media->links() }}</div>

<style>
.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}
.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}
.upload-area{margin-bottom:24px}
.upload-zone{border:2px dashed #E5E5E5;border-radius:12px;padding:40px;text-align:center;cursor:pointer;transition:border-color 0.2s,background 0.2s}
.upload-zone:hover{border-color:#4A8C3F;background:rgba(74,140,63,0.02)}
.upload-zone p{font-size:14px;color:#5A5A5A;margin-top:8px}
.filter-bar{margin-bottom:16px}.filter-form{display:flex;gap:10px}
.filter-input{height:38px;padding:0 12px;border:1px solid #E5E5E5;border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;width:240px}
.filter-input:focus{border-color:#4A8C3F;outline:none}
.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}.btn-secondary:hover{background:#E5E5E5}
.media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:20px}
.media-item{background:#fff;border:1px solid #E5E5E5;border-radius:10px;overflow:hidden;position:relative;transition:box-shadow 0.15s}
.media-item:hover{box-shadow:0 2px 8px rgba(26,26,26,0.08)}
.media-thumb{width:100%;height:140px;object-fit:cover;display:block;background:#FAFAFA}
.media-doc{display:flex;align-items:center;justify-content:center;background:#F5F5F5;color:#999;font-size:14px;font-weight:700}
.media-info{padding:10px 12px}
.media-name{font-size:12px;font-weight:500;color:#1A1A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.media-size{font-size:11px;color:#999;margin-top:2px}
.media-delete{position:absolute;top:6px;right:6px;width:26px;height:26px;border-radius:6px;border:none;background:rgba(0,0,0,0.5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.15s}
.media-item:hover .media-delete{opacity:1}
.media-delete:hover{background:rgba(212,52,44,0.9)}
.table-pagination{padding:16px;display:flex;justify-content:center}
</style>
@endsection
