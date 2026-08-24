@extends('admin.layouts.app')
@section('title', 'Products')

@section('content')
<style>
/* villagescape theme for this page */
:root { --page-bg: #FBF6EC; }

.prod-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
.prod-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.prod-accent { display: flex; align-items: center; gap: 8px; margin: 9px 0; }
.prod-accent-line { width: 42px; height: 2px; background: #C4952A; opacity: 0.55; border-radius: 2px; }
.prod-accent-line.short { width: 22px; opacity: 0.3; }
.prod-accent-dot { width: 7px; height: 7px; background: #C4952A; transform: rotate(45deg); }
.prod-subtitle { font-size: 14px; color: #5A5A5A; }
.prod-art { flex: 1; max-width: 620px; height: 118px; background-image: url('{{ asset("patterns/dashboard-header.png") }}'); background-size: contain; background-position: right center; background-repeat: no-repeat; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%); mask-image: linear-gradient(to right, transparent 0%, #000 18%); }

.prod-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.toolbar-left { display: flex; gap: 12px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.prod-search { height: 46px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 280px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.prod-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.btn-filter { height: 46px; padding: 0 20px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg { width: 16px; height: 16px; }
.btn-add { height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.prod-table-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.prod-table { width: 100%; border-collapse: collapse; }
.prod-thead th { position: relative; padding: 15px 20px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.thead-plant { position: absolute; bottom: -6px; width: 54px; height: 46px; opacity: 0.45; background-image: url('{{ asset("patterns/card-plant.png") }}'); background-repeat: no-repeat; background-size: contain; pointer-events: none; }
.thead-plant.left { left: 8px; background-position: left bottom; }
.thead-plant.right { right: 8px; background-position: right bottom; transform: scaleX(-1); }
.prod-table td { padding: 14px 20px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; }
.prod-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.prod-table tbody tr.empty-row, .prod-table tbody tr.empty-row:hover { background: #fff; }
.prod-table tbody tr.empty-row td { border-bottom: none; }
.prod-table tbody tr:last-child td { border-bottom: none; }
.cell-img { width: 42px; height: 42px; border-radius: 9px; object-fit: cover; border: 1px solid #ECE7DC; }
.cell-img-ph { width: 42px; height: 42px; border-radius: 9px; background: #FBF8F1; border: 1px solid #ECE7DC; display: flex; align-items: center; justify-content: center; color: #B9A98A; }
.row-actions { display: flex; align-items: center; gap: 6px; }
.row-actions a, .row-actions button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.row-actions a:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.row-actions .btn-delete:hover { background: rgba(212,52,44,0.06); color: #D4342C; border-color: rgba(212,52,44,0.2); }
.row-actions svg { width: 16px; height: 16px; }

.prod-empty { padding: 56px 20px 64px; text-align: center; }
.empty-illus { margin: 0 auto 6px; display: block; }
.prod-empty h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #1A1A1A; margin-top: 6px; }
.prod-empty p { font-size: 13.5px; color: #8A8A8A; margin-top: 6px; }
.empty-btn { margin-top: 18px; display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border: 1.5px solid #4A8C3F; border-radius: 10px; background: #fff; color: #4A8C3F; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
.empty-btn:hover { background: #4A8C3F; color: #fff; }
.empty-btn svg { width: 16px; height: 16px; }

.prod-pagination { padding: 16px; display: flex; justify-content: center; }
.prod-pagination .pagination { display: flex; gap: 4px; list-style: none; }
.prod-pagination .pagination a, .prod-pagination .pagination span { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 8px; font-size: 13px; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; }
.prod-pagination .pagination .active span { background: #4A8C3F; color: #fff; border-color: #4A8C3F; }

.prod-footer { position: relative; margin-top: 30px; height: 88px; }
.prod-footer-left, .prod-footer-right { position: absolute; bottom: 0; height: 86px; background-repeat: no-repeat; background-size: contain; opacity: 0.85; pointer-events: none; }
.prod-footer-left { left: 0; width: 42%; max-width: 460px; background-image: url('{{ asset("patterns/footer-left.png") }}'); background-position: left bottom; }
.prod-footer-right { right: 0; width: 46%; max-width: 520px; background-image: url('{{ asset("patterns/footer-right.png") }}'); background-position: right bottom; }

@media (max-width: 1024px) { .prod-art { display: none; } }
@media (max-width: 768px) { .prod-toolbar { flex-direction: column; align-items: stretch; } .toolbar-left { flex-direction: column; } .prod-search { width: 100%; } }
</style>

<div class="prod-header">
    <div>
        <h1 class="prod-title">Products</h1>
        <div class="prod-accent"><span class="prod-accent-line"></span><span class="prod-accent-dot"></span><span class="prod-accent-line short"></span></div>
        <p class="prod-subtitle">Manage your product catalog</p>
    </div>
    <div class="prod-art" aria-hidden="true"></div>
</div>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<div class="prod-toolbar">
    <form method="GET" class="toolbar-left">
        <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products..." class="prod-search">
        </div>
        <button type="submit" class="btn-filter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filter
        </button>
    </form>
    <a href="{{ route('admin.products.create') }}" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Product
    </a>
</div>

<div class="prod-table-card">
    <table class="prod-table">
        <thead class="prod-thead">
            <tr>
                <th style="width:34%;"><span class="thead-plant left"></span>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th style="text-align:right;">Actions<span class="thead-plant right"></span></th>
            </tr>
        </thead>
        <tbody>
            @forelse($products as $product)
                <tr>
                    <td>
                        <div style="display:flex;align-items:center;gap:12px;">
                            @if($product->image)
                                <img src="{{ asset('storage/' . $product->image) }}" class="cell-img" alt="">
                            @else
                                <div class="cell-img-ph"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
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
                        <div class="row-actions" style="justify-content:flex-end;">
                            <a href="{{ route('admin.products.edit', $product) }}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a>
                            <button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.products.destroy', $product) }}')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                        </div>
                    </td>
                </tr>
            @empty
                <tr class="empty-row">
                    <td colspan="5" style="padding:0;">
                        <div class="prod-empty">
                            <svg class="empty-illus" width="132" height="118" viewBox="0 0 132 118" fill="none" aria-hidden="true">
                                <circle cx="66" cy="60" r="46" fill="rgba(74,140,63,0.06)"/>
                                <g fill="#C4952A" opacity="0.55">
                                    <path d="M30 40 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 z"/>
                                    <path d="M102 34 l1.3 3.2 3.2 1.3 -3.2 1.3 -1.3 3.2 -1.3 -3.2 -3.2 -1.3 3.2 -1.3 z"/>
                                    <path d="M100 78 l1.1 2.7 2.7 1.1 -2.7 1.1 -1.1 2.7 -1.1 -2.7 -2.7 -1.1 2.7 -1.1 z"/>
                                </g>
                                <g stroke="#4A8C3F" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M46 66 L66 74 L86 66 L86 92 L66 100 L46 92 Z"/>
                                    <path d="M66 74 L66 100"/>
                                    <path d="M46 66 L54 58 L66 62 L78 58 L86 66"/>
                                </g>
                                <g stroke="#4A8C3F" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M66 70 V40"/>
                                    <path d="M66 54 C57 53 52 47 53 39 C61 39 66 45 66 53"/>
                                    <path d="M66 50 C75 49 80 43 79 35 C71 35 66 41 66 49"/>
                                </g>
                            </svg>
                            <h3>No products found</h3>
                            <p>Add your first product to get started.</p>
                            <a href="{{ route('admin.products.create') }}" class="empty-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                                Add Product
                            </a>
                        </div>
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
    @if($products->hasPages())
        <div class="prod-pagination">{{ $products->links() }}</div>
    @endif
</div>

<div class="prod-footer">
    <div class="prod-footer-left" aria-hidden="true"></div>
    <div class="prod-footer-right" aria-hidden="true"></div>
</div>

<x-admin.modal />
@endsection
