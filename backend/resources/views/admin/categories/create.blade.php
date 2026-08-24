@extends('admin.layouts.app')
@section('title', isset($category) ? 'Edit Category' : 'Create Category')

@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">{{ isset($category) ? 'Edit Category' : 'Create Category' }}</h1>
        <p class="page-subtitle">{{ isset($category) ? 'Update category details' : 'Add a new category' }}</p>
    </div>
</div>

@if($errors->any())
    <div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>
@endif

<form method="POST" action="{{ isset($category) ? route('admin.categories.update', $category) : route('admin.categories.store') }}">
    @csrf
    @if(isset($category)) @method('PUT') @endif

    <div class="form-card">
        <x-admin.form-field label="Name" name="name" :value="$category->name ?? ''" required />
        <x-admin.form-field label="Slug" name="slug" :value="$category->slug ?? ''" help="Leave blank to auto-generate from name" />
        <x-admin.form-field label="Description" name="description" type="textarea" :value="$category->description ?? ''" :rows="3" />
        <x-admin.form-field label="Type" name="type" type="select" :options="['blog' => 'Blog', 'product' => 'Product', 'gallery' => 'Gallery', 'training' => 'Training']" :value="$category->type ?? 'blog'" required />
        <x-admin.form-field label="Order" name="order" type="number" :value="$category->order ?? 0" />
        <x-admin.form-field label="Active" name="is_active" type="toggle" :value="$category->is_active ?? true" />
    </div>

    <div class="form-actions">
        <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">{{ isset($category) ? 'Update' : 'Create' }}</button>
    </div>
</form>

<style>
.page-header { margin-bottom: 24px; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.form-card { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(26,26,26,0.04); margin-bottom: 20px; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; }
.alert-danger { background: rgba(212,52,44,0.08); color: #D4342C; border: 1px solid rgba(212,52,44,0.15); }
.form-actions { display: flex; gap: 10px; }
.btn { padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; }
.btn-primary:hover { background: #3A7030; }
.btn-secondary { background: #F5F5F5; color: #5A5A5A; border: 1px solid #E5E5E5; }
.btn-secondary:hover { background: #E5E5E5; }
</style>
@endsection
