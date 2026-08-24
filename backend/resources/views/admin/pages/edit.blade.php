@extends('admin.layouts.app')
@section('title', 'Edit Page: ' . $page->title)
@section('content')
<div class="page-header"><h1 class="page-title">Edit Page: {{ $page->title }}</h1></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>@endif

<form method="POST" action="{{ route('admin.pages.update', $page) }}">
    @csrf @method('PUT')
    <div class="form-card">
        <x-admin.form-field label="Title" name="title" :value="$page->title" required />
        <x-admin.form-field label="Meta Description" name="meta_description" type="textarea" :value="$page->meta_description" :rows="2" />
        <x-admin.form-field label="Published" name="is_published" type="toggle" :value="$page->is_published" />
        <button type="submit" class="btn btn-primary">Update Page</button>
    </div>
</form>

<h2 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin:28px 0 16px;">Content Blocks</h2>

<div class="blocks-list" id="blocksList">
    @forelse($page->blocks->sortBy('order') as $block)
        <div class="block-item" data-id="{{ $block->id }}">
            <div class="block-header">
                <span class="block-type"><x-admin.badge type="blue">{{ ucfirst($block->type) }}</x-admin.badge></span>
                <span class="block-title">{{ $block->title ?? 'Untitled block' }}</span>
                <div class="block-actions">
                    <form method="POST" action="{{ route('admin.blocks.destroy', $block) }}" style="display:inline;" onsubmit="return confirm('Delete this block?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="btn-delete-sm" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </form>
                </div>
            </div>
            @if($block->content)<div class="block-preview">{{ Str::limit(strip_tags($block->content), 120) }}</div>@endif
        </div>
    @empty
        <p style="color:#999;font-size:13px;text-align:center;padding:20px;">No blocks yet. Add one below.</p>
    @endforelse
</div>

<h3 style="font-family:'Playfair Display',serif;font-size:16px;font-weight:700;margin:24px 0 12px;">Add Block</h3>
<form method="POST" action="{{ route('admin.pages.blocks.store', $page) }}">
    @csrf
    <div class="form-card" style="padding:20px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <x-admin.form-field label="Type" name="type" type="select" :options="['hero'=>'Hero','text'=>'Text','stats'=>'Stats','cta'=>'CTA','image'=>'Image','testimonials'=>'Testimonials','partners'=>'Partners']" required />
            <x-admin.form-field label="Title" name="title" />
        </div>
        <x-admin.form-field label="Content" name="content" type="textarea" :rows="3" />
        <x-admin.form-field label="Settings (JSON)" name="settings" type="textarea" help='e.g. {"subtitle":"...", "buttonText":"..."}' :rows="2" />
        <x-admin.form-field label="Order" name="order" type="number" value="0" />
        <button type="submit" class="btn btn-primary">Add Block</button>
    </div>
</form>

<style>
.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}
.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}
.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}
.alert-danger{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}
.form-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(26,26,26,0.04);margin-bottom:20px}
.blocks-list{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.block-item{background:#fff;border:1px solid #E5E5E5;border-radius:10px;padding:14px 16px;transition:box-shadow 0.15s}
.block-item:hover{box-shadow:0 2px 8px rgba(26,26,26,0.06)}
.block-header{display:flex;align-items:center;gap:10px}
.block-title{flex:1;font-size:13.5px;font-weight:500}
.block-preview{font-size:12px;color:#999;margin-top:6px;line-height:1.4}
.btn-delete-sm{width:28px;height:28px;border-radius:6px;border:1px solid #E5E5E5;background:#fff;color:#999;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.btn-delete-sm:hover{background:rgba(212,52,44,0.06);color:#D4342C;border-color:rgba(212,52,44,0.2)}
.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}
</style>
@endsection
