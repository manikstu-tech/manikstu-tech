@extends('admin.layouts.app')
@section('title', 'Products')

@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Products</h1>
        <p class="page-subtitle">Manage your product catalog</p>
    </div>
    <a href="{{ route('admin.products.create') }}" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Product
    </a>
</div>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<div class="filter-bar">
    <form method="GET" class="filter-form">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products..." class="filter-input">
        <button type="submit" class="btn btn-secondary">Filter</button>
    </form>
</div>

<x-admin.table :headers="['Product', 'Category', 'Price', 'Status', 'Actions']">
    @foreach($products as $product)
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:10px;">
                    @if($product->image)
                        <img src="{{ asset('storage/' . $product->image) }}" class="table-cell-img" alt="">
                    @else
                        <div class="table-cell-img-placeholder"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                    @endif
                    <div>
                        <strong>{{ $product->name }}</strong>
                        @if($product->is_featured)<br><small style="color:#C4952A;">Featured</small>@endif
                    </div>
                </div>
            </td>
            <td>{{ $product->category->name ?? '—' }}</td>
            <td>{{ $product->price ? '₹' . number_format($product->price, 2) : '—' }}</td>
            <td><x-admin.badge :type="$product->is_active ? 'green' : 'red'" dot>{{ $product->is_active ? 'Active' : 'Inactive' }}</x-admin.badge></td>
            <td>
                <div class="table-actions">
                    <a href="{{ route('admin.products.edit', $product) }}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a>
                    <button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.products.destroy', $product) }}')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                </div>
            </td>
        </tr>
    @endforeach
</x-admin.table>

<div class="table-pagination">{{ $products->links() }}</div>
<x-admin.modal />

<style>
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }
.filter-bar { margin-bottom: 16px; }
.filter-form { display: flex; gap: 10px; }
.filter-input { height: 38px; padding: 0 12px; border: 1px solid #E5E5E5; border-radius: 8px; font-size: 13px; font-family: 'Inter', sans-serif; width: 240px; }
.filter-input:focus { border-color: #4A8C3F; outline: none; }
.btn { padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; }
.btn-primary:hover { background: #3A7030; }
.btn-secondary { background: #F5F5F5; color: #5A5A5A; border: 1px solid #E5E5E5; }
.btn-secondary:hover { background: #E5E5E5; }
.table-pagination { padding: 16px; display: flex; justify-content: center; }
</style>
@endsection
