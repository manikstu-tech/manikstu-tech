@extends('admin.layouts.app')
@section('title', isset($member) ? 'Edit Member' : 'Add Member')

@section('content')
<div class="page-header"><h1 class="page-title">{{ isset($member) ? 'Edit Member' : 'Add Member' }}</h1></div>
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>@endif
<form method="POST" action="{{ isset($member) ? route('admin.team.update', $member) : route('admin.team.store') }}">
    @csrf @if(isset($member)) @method('PUT') @endif
    <div class="form-grid">
        <div class="form-main"><div class="form-card">
            <x-admin.form-field label="Name" name="name" :value="$member->name ?? ''" required />
            <x-admin.form-field label="Role" name="role" :value="$member->role ?? ''" required />
            <x-admin.form-field label="Bio" name="bio" type="textarea" :value="$member->bio ?? ''" :rows="3" />
            <x-admin.form-field label="Email" name="email" type="email" :value="$member->email ?? ''" />
            <x-admin.form-field label="Phone" name="phone" :value="$member->phone ?? ''" />
        </div></div>
        <div class="form-side">
            <div class="form-card"><div class="card-header" style="padding:14px 18px;border-bottom:1px solid #E5E5E5;font-weight:700;font-size:14px;">Settings</div><div style="padding:18px;">
                <x-admin.form-field label="Order" name="order" type="number" :value="$member->order ?? 0" />
                <x-admin.form-field label="Active" name="is_active" type="toggle" :value="$member->is_active ?? true" />
                <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">{{ isset($member) ? 'Update' : 'Create' }}</button>
            </div></div>
            <div class="form-card"><div class="card-header" style="padding:14px 18px;border-bottom:1px solid #E5E5E5;font-weight:700;font-size:14px;">Photo</div><div style="padding:18px;">
                <x-admin.upload name="image" label="Photo" :current="$member->image ?? null" />
            </div></div>
        </div>
    </div>
</form>
<style>.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.form-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px;align-items:start}.form-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;box-shadow:0 2px 8px rgba(26,26,26,0.04)}.form-main .form-card{padding:24px}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-danger{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}@media(max-width:900px){.form-grid{grid-template-columns:1fr}}</style>
@endsection
