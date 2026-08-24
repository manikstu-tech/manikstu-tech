@extends('admin.layouts.app')
@section('title', 'Categories')

@section('content')
<style>
:root { --page-bg: #FDF7EF; } /* matches the header illustration's background so it blends seamlessly */

.cat-header { position: relative; margin-bottom: 22px; min-height: 118px; }
.cat-header-text { position: relative; z-index: 2; }
.cat-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #2D5016; }
.cat-accent { display: flex; align-items: center; gap: 8px; margin: 9px 0; }
.cat-accent-line { width: 42px; height: 2px; background: #C4952A; opacity: 0.55; border-radius: 2px; }
.cat-accent-line.short { width: 22px; opacity: 0.3; }
.cat-accent-dot { width: 7px; height: 7px; background: #C4952A; transform: rotate(45deg); }
.cat-subtitle { font-size: 14px; color: #5A5A5A; }
.cat-art { position: absolute; right: 0; top: -6px; width: 58%; max-width: 660px; height: 130px; z-index: 0; background-image: url('{{ asset("patterns/category-header.png") }}'); background-size: contain; background-position: right center; background-repeat: no-repeat; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 20%); mask-image: linear-gradient(to right, transparent 0%, #000 20%); }

.btn-add { flex-shrink: 0; height: 46px; padding: 0 24px; border-radius: 12px; background: linear-gradient(135deg, #4A8C3F, #3A7030); color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; text-decoration: none; box-shadow: 0 6px 16px rgba(58,112,48,0.22); transition: transform 0.15s, box-shadow 0.15s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(58,112,48,0.3); }
.btn-add svg { width: 18px; height: 18px; }

.alert { padding: 12px 16px; border-radius: 10px; font-size: 13.5px; font-weight: 500; margin-bottom: 18px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }

.cat-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.toolbar-left { display: flex; gap: 12px; }
.search-wrap { position: relative; }
.search-wrap > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #999; pointer-events: none; }
.cat-search { height: 46px; padding: 0 14px 0 40px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; width: 280px; background: #fff; color: #1A1A1A; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.cat-search:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.1); }
.cat-select { height: 46px; padding: 0 40px 0 16px; border: 1px solid #ECE7DC; border-radius: 12px; font-size: 13.5px; font-weight: 500; font-family: 'Inter', sans-serif; background: #fff; color: #1A1A1A; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; cursor: pointer; outline: none; }
.cat-select:focus { border-color: #4A8C3F; }
.btn-filter { height: 46px; padding: 0 20px; border: 1px solid #ECE7DC; border-radius: 12px; background: #fff; color: #5A5A5A; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.15s; }
.btn-filter:hover { border-color: rgba(74,140,63,0.4); color: #4A8C3F; }
.btn-filter svg { width: 16px; height: 16px; }

.cat-table-card { position: relative; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,26,26,0.05); }
.cat-table { width: 100%; border-collapse: collapse; }
.cat-thead th { position: relative; padding: 15px 20px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #5A6B4E; background: #FBF8F1; border-bottom: 1px solid #F0ECE2; white-space: nowrap; }
.thead-plant { position: absolute; bottom: -6px; width: 54px; height: 46px; opacity: 0.45; background-image: url('{{ asset("patterns/card-plant.png") }}'); background-repeat: no-repeat; background-size: contain; pointer-events: none; }
.thead-plant.left { left: 8px; background-position: left bottom; }
.thead-plant.right { right: 8px; background-position: right bottom; transform: scaleX(-1); }
.cat-table td { padding: 14px 20px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F4F1EA; }
.cat-table tbody tr:not(.empty-row):hover { background: #FBF9F4; }
.cat-table tbody tr.empty-row, .cat-table tbody tr.empty-row:hover { background: #fff; }
.cat-table tbody tr:last-child td { border-bottom: none; }
.row-actions { display: flex; align-items: center; gap: 6px; }
.row-actions a, .row-actions button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; border: 1px solid #ECE7DC; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.row-actions a:hover { background: rgba(74,140,63,0.06); color: #4A8C3F; border-color: rgba(74,140,63,0.3); }
.row-actions .btn-delete:hover { background: rgba(212,52,44,0.06); color: #D4342C; border-color: rgba(212,52,44,0.2); }
.row-actions svg { width: 16px; height: 16px; }

.cat-empty { padding: 48px 20px 60px; text-align: center; }
.empty-illus { margin: 0 auto 6px; display: block; }
.cat-empty h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2D5016; margin-top: 6px; }
.cat-empty p { font-size: 13.5px; color: #8A8A8A; margin-top: 6px; }
.empty-btn { margin-top: 20px; display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border: 1.5px solid #4A8C3F; border-radius: 10px; background: #fff; color: #4A8C3F; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
.empty-btn:hover { background: #4A8C3F; color: #fff; }
.empty-btn svg { width: 16px; height: 16px; }

.cat-pagination { padding: 16px; display: flex; justify-content: center; }
.cat-pagination .pagination { display: flex; gap: 4px; list-style: none; }
.cat-pagination .pagination a, .cat-pagination .pagination span { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 8px; font-size: 13px; border: 1px solid #ECE7DC; color: #5A5A5A; background: #fff; text-decoration: none; }
.cat-pagination .pagination .active span { background: #4A8C3F; color: #fff; border-color: #4A8C3F; }

.cat-footer { position: relative; margin-top: 30px; height: 88px; }
.cat-footer-left, .cat-footer-right { position: absolute; bottom: 0; height: 86px; background-repeat: no-repeat; background-size: contain; opacity: 0.85; pointer-events: none; }
.cat-footer-left { left: 0; width: 42%; max-width: 460px; background-image: url('{{ asset("patterns/footer-left.png") }}'); background-position: left bottom; }
.cat-footer-right { right: 0; width: 46%; max-width: 520px; background-image: url('{{ asset("patterns/footer-right.png") }}'); background-position: right bottom; }

@media (max-width: 1024px) { .cat-art { display: none; } }
@media (max-width: 768px) { .btn-add { position: static; margin-top: 12px; } .cat-toolbar { flex-wrap: wrap; } .cat-search { width: 100%; } }
</style>

<div class="cat-header">
    <div class="cat-header-text">
        <h1 class="cat-title">Categories</h1>
        <div class="cat-accent"><span class="cat-accent-line"></span><span class="cat-accent-dot"></span><span class="cat-accent-line short"></span></div>
        <p class="cat-subtitle">Manage content categories</p>
    </div>
    <div class="cat-art" aria-hidden="true"></div>
</div>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<div class="cat-toolbar">
    <form method="GET" class="toolbar-left">
        <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Search categories..." class="cat-search">
        </div>
        <select name="type" class="cat-select">
            <option value="">All Types</option>
            <option value="blog" {{ request('type') === 'blog' ? 'selected' : '' }}>Blog</option>
            <option value="product" {{ request('type') === 'product' ? 'selected' : '' }}>Product</option>
            <option value="gallery" {{ request('type') === 'gallery' ? 'selected' : '' }}>Gallery</option>
            <option value="training" {{ request('type') === 'training' ? 'selected' : '' }}>Training</option>
        </select>
        <button type="submit" class="btn-filter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filter
        </button>
    </form>
    <a href="{{ route('admin.categories.create') }}" class="btn-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Add Category
    </a>
</div>

<div class="cat-table-card">
    <table class="cat-table">
        <thead class="cat-thead">
            <tr>
                <th style="width:30%;"><span class="thead-plant left"></span>Name</th>
                <th>Type</th>
                <th>Order</th>
                <th>Status</th>
                <th style="text-align:right;">Actions<span class="thead-plant right"></span></th>
            </tr>
        </thead>
        <tbody>
            @forelse($categories as $category)
                <tr>
                    <td><strong>{{ $category->name }}</strong><br><small style="color:#999;">{{ $category->slug }}</small></td>
                    <td><x-admin.badge type="green">{{ ucfirst($category->type) }}</x-admin.badge></td>
                    <td>{{ $category->order }}</td>
                    <td><x-admin.badge :type="$category->is_active ? 'green' : 'red'" dot>{{ $category->is_active ? 'Active' : 'Inactive' }}</x-admin.badge></td>
                    <td>
                        <div class="row-actions" style="justify-content:flex-end;">
                            <a href="{{ route('admin.categories.edit', $category) }}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></a>
                            <button type="button" class="btn-delete" onclick="openModal('deleteModal','{{ route('admin.categories.destroy', $category) }}')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                        </div>
                    </td>
                </tr>
            @empty
                <tr class="empty-row">
                    <td colspan="5" style="padding:0;">
                        <div class="cat-empty">
                            <svg class="empty-illus" width="140" height="120" viewBox="0 0 140 120" fill="none" aria-hidden="true">
                                <circle cx="70" cy="60" r="48" fill="rgba(74,140,63,0.06)"/>
                                <g fill="#C4952A" opacity="0.55">
                                    <path d="M32 42 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 z"/>
                                    <path d="M108 36 l1.3 3.2 3.2 1.3 -3.2 1.3 -1.3 3.2 -1.3 -3.2 -3.2 -1.3 3.2 -1.3 z"/>
                                    <path d="M106 80 l1.1 2.7 2.7 1.1 -2.7 1.1 -1.1 2.7 -1.1 -2.7 -2.7 -1.1 2.7 -1.1 z"/>
                                    <path d="M34 82 l1 2.5 2.5 1 -2.5 1 -1 2.5 -1 -2.5 -2.5 -1 2.5 -1 z"/>
                                </g>
                                <g stroke="#3A7030" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M70 68 V44" fill="none"/>
                                    <path d="M70 60 C59 59 52 51 54 42 C64 42 71 50 70 60 Z" fill="rgba(74,140,63,0.16)"/>
                                    <path d="M70 55 C81 54 88 46 86 37 C76 37 69 45 70 55 Z" fill="rgba(74,140,63,0.16)"/>
                                </g>
                                <path d="M46 96 L46 66 C46 63.8 47.8 62 50 62 L62 62 L67 68 L90 68 C92.2 68 94 69.8 94 72 L94 96 C94 98.2 92.2 100 90 100 L50 100 C47.8 100 46 98.2 46 96 Z" fill="rgba(74,140,63,0.18)" stroke="#3A7030" stroke-width="2.4" stroke-linejoin="round"/>
                            </svg>
                            <h3>No categories found</h3>
                            <p>Looks like you haven't added any categories yet.</p>
                            <a href="{{ route('admin.categories.create') }}" class="empty-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                                Add Category
                            </a>
                        </div>
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
    @if($categories->hasPages())
        <div class="cat-pagination">{{ $categories->links() }}</div>
    @endif
</div>

<div class="cat-footer">
    <div class="cat-footer-left" aria-hidden="true"></div>
    <div class="cat-footer-right" aria-hidden="true"></div>
</div>

<x-admin.modal />
@endsection
