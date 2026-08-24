@extends('admin.layouts.app')
@section('title', 'Awareness Initiatives')
@section('content')
<div class="page-header"><div><h1 class="page-title">Awareness Initiatives</h1></div><a href="{{ route('admin.awareness.create') }}" class="btn btn-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg> Add Initiative</a></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
<x-admin.table :headers="['Title', 'Order', 'Status', 'Actions']">
    @foreach($initiatives as $i)<tr><td><strong>{{ $i->title }}</strong></td><td>{{ $i->order }}</td><td><x-admin.badge :type="$i->is_active ? 'green' : 'red'" dot>{{ $i->is_active ? 'Active' : 'Inactive' }}</x-admin.badge></td><td><div class="table-actions"><a href="{{ route('admin.awareness.edit', $i) }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a><button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.awareness.destroy', $i) }}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></td></tr>@endforeach
</x-admin.table>
<div class="table-pagination">{{ $initiatives->links() }}</div>
<x-admin.modal />
<style>.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.table-pagination{padding:16px;display:flex;justify-content:center}</style>
@endsection
