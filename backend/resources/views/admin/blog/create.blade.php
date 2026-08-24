@extends('admin.layouts.app')
@section('title', isset($post) ? 'Edit Post' : 'New Post')

@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">{{ isset($post) ? 'Edit Post' : 'New Post' }}</h1>
        <p class="page-subtitle">{{ isset($post) ? 'Update article details' : 'Write a new blog post' }}</p>
    </div>
</div>

@if($errors->any())
    <div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>
@endif

<form method="POST" action="{{ isset($post) ? route('admin.blog.update', $post) : route('admin.blog.store') }}">
    @csrf
    @if(isset($post)) @method('PUT') @endif

    <div class="form-grid">
        <div class="form-main">
            <div class="form-card">
                <x-admin.form-field label="Title" name="title" :value="$post->title ?? ''" required />
                <x-admin.form-field label="Slug" name="slug" :value="$post->slug ?? ''" help="Leave blank to auto-generate" />
                <x-admin.form-field label="Excerpt" name="excerpt" type="textarea" :value="$post->excerpt ?? ''" :rows="2" />
                <x-admin.rich-text name="content" label="Content" :value="$post->content ?? ''" />
            </div>
        </div>

        <div class="form-side">
            <div class="form-card">
                <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #E5E5E5;font-weight:700;font-size:14px;">Publish</div>
                <div style="padding:18px;">
                    <x-admin.form-field label="Status" name="is_published" type="toggle" :value="$post->is_published ?? false" />
                    <x-admin.form-field label="Featured" name="is_featured" type="toggle" :value="$post->is_featured ?? false" />
                    <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">{{ isset($post) ? 'Update' : 'Publish' }}</button>
                </div>
            </div>

            <div class="form-card">
                <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #E5E5E5;font-weight:700;font-size:14px;">Category</div>
                <div style="padding:18px;">
                    <x-admin.form-field label="Category" name="category_id" type="select" :options="$categories->pluck('name','id')->toArray()" :value="$post->category_id ?? ''" />
                </div>
            </div>

            <div class="form-card">
                <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #E5E5E5;font-weight:700;font-size:14px;">Featured Image</div>
                <div style="padding:18px;">
                    <x-admin.upload name="featured_image" label="Image" :current="$post->featured_image ?? null" />
                </div>
            </div>
        </div>
    </div>
</form>

<style>
.page-header { margin-bottom: 24px; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.form-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; align-items: start; }
.form-card { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; box-shadow: 0 2px 8px rgba(26,26,26,0.04); }
.form-main .form-card { padding: 24px; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; }
.alert-danger { background: rgba(212,52,44,0.08); color: #D4342C; border: 1px solid rgba(212,52,44,0.15); }
.btn { padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; }
.btn-primary:hover { background: #3A7030; }
@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }
</style>
@endsection
