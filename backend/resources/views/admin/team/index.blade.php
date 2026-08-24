@extends('admin.layouts.app')
@section('title', 'Team Members')

@section('content')
<div class="page-header">
    <div><h1 class="page-title">Team Members</h1><p class="page-subtitle">Manage your team</p></div>
    <a href="{{ route('admin.team.create') }}" class="btn btn-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg> Add Member</a>
</div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
<div class="filter-bar"><form method="GET" class="filter-form"><input type="text" name="search" value="{{ request('search') }}" placeholder="Search..." class="filter-input"><button type="submit" class="btn btn-secondary">Filter</button></form></div>
<x-admin.table :headers="['Name', 'Role', 'Status', 'Actions']">
    @foreach($members as $m)
        <tr>
            <td><div style="display:flex;align-items:center;gap:10px;">@if($m->image)<img src="{{ asset('storage/' . $m->image) }}" class="table-cell-img" alt="">@else<div class="table-cell-img-placeholder">{{ substr($m->name,0,1) }}</div>@endif<strong>{{ $m->name }}</strong></div></td>
            <td>{{ $m->role }}</td>
            <td><x-admin.badge :type="$m->is_active ? 'green' : 'red'" dot>{{ $m->is_active ? 'Active' : 'Inactive' }}</x-admin.badge></td>
            <td><div class="table-actions"><a href="{{ route('admin.team.edit', $m) }}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a><button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.team.destroy', $m) }}')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></td>
        </tr>
    @endforeach
</x-admin.table>
<div class="table-pagination">{{ $members->links() }}</div>
<x-admin.modal />
<style>.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}.filter-bar{margin-bottom:16px}.filter-form{display:flex;gap:10px}.filter-input{height:38px;padding:0 12px;border:1px solid #E5E5E5;border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;width:240px}.filter-input:focus{border-color:#4A8C3F;outline:none}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}.btn-secondary:hover{background:#E5E5E5}.table-pagination{padding:16px;display:flex;justify-content:center}</style>
@endsection
