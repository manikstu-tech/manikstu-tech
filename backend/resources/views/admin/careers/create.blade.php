@extends('admin.layouts.app')
@section('title', isset($job) ? 'Edit Opening' : 'Add Opening')

@section('content')
<div class="page-header"><h1 class="page-title">{{ isset($job) ? 'Edit Opening' : 'Add Opening' }}</h1></div>
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>@endif
<form method="POST" action="{{ isset($job) ? route('admin.careers.update', $job) : route('admin.careers.store') }}">
    @csrf @if(isset($job)) @method('PUT') @endif
    <div class="form-card">
        <x-admin.form-field label="Title" name="title" :value="$job->title ?? ''" required />
        <x-admin.form-field label="Department" name="department" :value="$job->department ?? ''" />
        <x-admin.form-field label="Location" name="location" :value="$job->location ?? ''" />
        <x-admin.form-field label="Type" name="type" type="select" :options="['full_time'=>'Full Time','part_time'=>'Part Time','contract'=>'Contract','internship'=>'Internship']" :value="$job->type ?? 'full_time'" required />
        <x-admin.form-field label="Description" name="description" type="textarea" :value="$job->description ?? ''" :rows="4" />
        <x-admin.form-field label="Requirements (one per line)" name="requirements" type="textarea" :value="$job->requirements ? implode('\n', $job->requirements) : ''" :rows="4" />
        <x-admin.form-field label="Benefits (one per line)" name="benefits" type="textarea" :value="$job->benefits ? implode('\n', $job->benefits) : ''" :rows="3" />
        <x-admin.form-field label="Deadline" name="deadline" type="date" :value="$job->deadline?->format('Y-m-d') ?? ''" />
        <x-admin.form-field label="Active" name="is_active" type="toggle" :value="$job->is_active ?? true" />
    </div>
    <div class="form-actions">
        <a href="{{ route('admin.careers.index') }}" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">{{ isset($job) ? 'Update' : 'Create' }}</button>
    </div>
</form>
<style>.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.form-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(26,26,26,0.04);margin-bottom:20px}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-danger{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}.form-actions{display:flex;gap:10px}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}.btn-secondary:hover{background:#E5E5E5}</style>
@endsection
