@extends('admin.layouts.app')
@section('title', 'Orders')
@section('content')
<div class="page-header"><div><h1 class="page-title">Orders</h1></div><a href="{{ route('admin.orders.create') }}" class="btn btn-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg> New Order</a></div>
@if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
<div class="filter-bar"><form method="GET" class="filter-form"><input type="text" name="search" value="{{ request('search') }}" placeholder="Search order number..." class="filter-input"><select name="status" class="filter-select"><option value="">All Status</option><option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option><option value="confirmed" {{ request('status') === 'confirmed' ? 'selected' : '' }}>Confirmed</option><option value="shipped" {{ request('status') === 'shipped' ? 'selected' : '' }}>Shipped</option><option value="delivered" {{ request('status') === 'delivered' ? 'selected' : '' }}>Delivered</option><option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Cancelled</option></select><button type="submit" class="btn btn-secondary">Filter</button></form></div>
<x-admin.table :headers="['Order #', 'Customer', 'Total', 'Status', 'Payment', 'Actions']">
    @foreach($orders as $o)
        @php $statusColors = ['pending'=>'gold','confirmed'=>'blue','shipped'=>'green','delivered'=>'green','cancelled'=>'red']; @endphp
        <tr>
            <td><strong>{{ $o->order_number }}</strong></td>
            <td>{{ $o->customer->name ?? '—' }}</td>
            <td>₹{{ number_format($o->total, 2) }}</td>
            <td><x-admin.badge :type="$statusColors[$o->status] ?? 'default'" dot>{{ ucfirst($o->status) }}</x-admin.badge></td>
            <td><x-admin.badge :type="$o->payment_status === 'paid' ? 'green' : 'gold'" dot>{{ ucfirst($o->payment_status) }}</x-admin.badge></td>
            <td><div class="table-actions"><a href="{{ route('admin.orders.edit', $o) }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a><button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.orders.destroy', $o) }}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></td>
        </tr>
    @endforeach
</x-admin.table>
<div class="table-pagination">{{ $orders->links() }}</div>
<x-admin.modal />
<style>.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-success{background:rgba(74,140,63,0.08);color:#3A7030;border:1px solid rgba(74,140,63,0.15)}.filter-bar{margin-bottom:16px}.filter-form{display:flex;gap:10px}.filter-input{height:38px;padding:0 12px;border:1px solid #E5E5E5;border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;width:240px}.filter-input:focus{border-color:#4A8C3F;outline:none}.filter-select{height:38px;padding:0 30px 0 12px;border:1px solid #E5E5E5;border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;background:#fff;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;cursor:pointer}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}.btn-secondary:hover{background:#E5E5E5}.table-pagination{padding:16px;display:flex;justify-content:center}</style>
@endsection
