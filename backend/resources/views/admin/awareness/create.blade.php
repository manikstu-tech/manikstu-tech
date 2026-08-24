@extends('admin.layouts.app')
@section('title', isset($initiative) ? 'Edit Initiative' : 'Add Initiative')
@section('content')
<div class="page-header"><h1 class="page-title">{{ isset($initiative) ? 'Edit Initiative' : 'Add Initiative' }}</h1></div>
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>@endif
<form method="POST" action="{{ isset($initiative) ? route('admin.awareness.update', $initiative) : route('admin.awareness.store') }}">
    @csrf @if(isset($initiative)) @method('PUT') @endif
    <div class="form-card">
        <x-admin.form-field label="Title" name="title" :value="$initiative->title ?? ''" required />
        <x-admin.form-field label="Description" name="description" type="textarea" :value="$initiative->description ?? ''" :rows="4" />
        <x-admin.form-field label="Icon" name="icon" :value="$initiative->icon ?? ''" />
        <x-admin.form-field label="Order" name="order" type="number" :value="$initiative->order ?? 0" />
        <x-admin.form-field label="Active" name="is_active" type="toggle" :value="$initiative->is_active ?? true" />
    </div>
    <div class="form-actions"><a href="{{ route('admin.awareness.index') }}" class="btn btn-secondary">Cancel</a><button type="submit" class="btn btn-primary">{{ isset($initiative) ? 'Update' : 'Create' }}</button></div>
</form>
<style>.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.form-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(26,26,26,0.04);margin-bottom:20px}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-danger{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}.form-actions{display:flex;gap:10px}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}</style>
@endsection
