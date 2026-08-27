@extends('admin.layouts.app')
@section('title', $product->name)

@section('content')
@php
    use Illuminate\Support\Str;
    $galSrc = fn ($path) => Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/' . $path);
    $gallery = (array) ($product->images ?? []);
    if (empty($gallery) && $product->image) { $gallery = [$product->image]; }
    $highlights = (array) ($product->highlights ?? []);
    $specs = (array) ($product->specifications ?? []);
    $recommended = (array) ($product->recommended_for ?? []);
    $rating = (float) ($product->rating ?? 0);
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">{{ $product->name }}
            <span class="status-chip {{ $product->is_active ? 'pub' : 'draft' }}">{{ $product->is_active ? 'Published' : 'Draft' }}</span>
            @if($product->is_featured)<span class="status-chip feat">Featured</span>@endif
        </h1>
        <p class="page-subtitle">Slug: <code>{{ $product->slug }}</code> @if($product->sku) &middot; SKU: <code>{{ $product->sku }}</code> @endif</p>
    </div>
    <div class="header-actions">
        <a href="{{ route('admin.products.index') }}" class="btn btn-light">← Back</a>
        <form method="POST" action="{{ route('admin.products.togglePublish', $product) }}">
            @csrf @method('PUT')
            <button type="submit" class="btn btn-light">{{ $product->is_active ? 'Unpublish' : 'Publish' }}</button>
        </form>
        <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-primary">Edit Product</a>
    </div>
</div>

<div class="show-grid">
    <div class="show-main">
        <div class="card">
            <div class="gallery-view">
                <div class="gallery-main">
                    @if(count($gallery))
                        <img id="mainImg" src="{{ $galSrc($gallery[0]) }}" alt="{{ $product->name }}" onerror="this.classList.add('miss')">
                        @if($product->size)<span class="size-badge">{{ $product->size }}</span>@endif
                    @else
                        <div class="no-img">No images</div>
                    @endif
                </div>
                @if(count($gallery) > 1)
                    <div class="gallery-thumbs">
                        @foreach($gallery as $i => $path)
                            <button type="button" class="thumb {{ $i === 0 ? 'active' : '' }}" onclick="swapMain(this, '{{ $galSrc($path) }}')">
                                <img src="{{ $galSrc($path) }}" alt="" onerror="this.classList.add('miss')">
                            </button>
                        @endforeach
                    </div>
                @endif
            </div>
        </div>

        @if($product->description)
        <div class="card">
            <div class="card-header">Short Description</div>
            <div class="pad"><p class="body-text">{{ $product->description }}</p></div>
        </div>
        @endif

        @if($product->long_description)
        <div class="card">
            <div class="card-header">Full Description</div>
            <div class="pad"><p class="body-text">{{ $product->long_description }}</p></div>
        </div>
        @endif

        @if(count($highlights))
        <div class="card">
            <div class="card-header">Highlights</div>
            <div class="pad">
                <ul class="check-list">
                    @foreach($highlights as $h)
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#4A8C3F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{{ $h }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        @if(count($specs))
        <div class="card">
            <div class="card-header">Specifications</div>
            <div class="pad">
                <table class="spec-table">
                    @foreach($specs as $s)
                        <tr><td class="spec-label">{{ $s['label'] ?? '' }}</td><td>{{ $s['value'] ?? '' }}</td></tr>
                    @endforeach
                </table>
            </div>
        </div>
        @endif

        @if(count($recommended))
        <div class="card">
            <div class="card-header">Recommended For</div>
            <div class="pad">
                <ul class="dot-list">
                    @foreach($recommended as $r)<li>{{ $r }}</li>@endforeach
                </ul>
            </div>
        </div>
        @endif

        @if($product->usage_instructions || $product->storage_instructions || $product->ingredients)
        <div class="card">
            <div class="card-header">Usage &amp; Handling</div>
            <div class="pad">
                @if($product->ingredients)<div class="info-block"><h4>Composition / Ingredients</h4><p class="body-text">{{ $product->ingredients }}</p></div>@endif
                @if($product->usage_instructions)<div class="info-block"><h4>Usage / Dosage</h4><p class="body-text">{{ $product->usage_instructions }}</p></div>@endif
                @if($product->storage_instructions)<div class="info-block"><h4>Storage &amp; Handling</h4><p class="body-text">{{ $product->storage_instructions }}</p></div>@endif
            </div>
        </div>
        @endif
    </div>

    <div class="show-side">
        <div class="card">
            <div class="card-header">Overview</div>
            <div class="pad">
                <div class="kv"><span>Price</span><strong class="price">{{ $product->price !== null ? '₹' . number_format($product->price, 2) : '—' }}</strong></div>
                @if($product->size)<div class="kv"><span>Size / Unit</span><strong>{{ $product->size }}</strong></div>@endif
                <div class="kv"><span>Category</span><strong>{{ $product->category->name ?? '—' }}</strong></div>
                <div class="kv"><span>SKU</span><strong>{{ $product->sku ?? '—' }}</strong></div>
                <div class="kv"><span>Stock</span><strong>{{ $product->stock_quantity }} @if($product->stock_quantity > 0)<span class="in-stock">In stock</span>@else<span class="out-stock">Out of stock</span>@endif</strong></div>
                <div class="kv"><span>Status</span><strong>{{ $product->is_active ? 'Published' : 'Draft' }}</strong></div>
                <div class="kv"><span>Featured</span><strong>{{ $product->is_featured ? 'Yes' : 'No' }}</strong></div>
                <div class="kv"><span>Order</span><strong>{{ $product->order }}</strong></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">Ratings</div>
            <div class="pad">
                <div class="rating-row">
                    <span class="rating-num">{{ $rating ? number_format($rating, 1) : '—' }}</span>
                    <span class="stars">
                        @for($i = 1; $i <= 5; $i++)
                            <svg class="star {{ $i <= round($rating) ? 'on' : '' }}" viewBox="0 0 24 24"><path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.3 6.54L12 17.3l-5.9 3.2 1.3-6.54-4.9-4.5 6.6-.7L12 2z"/></svg>
                        @endfor
                    </span>
                </div>
                <p class="rating-count">{{ number_format($product->rating_count ?? 0) }} ratings</p>
            </div>
        </div>

        @if($product->translations && $product->translations->count())
        <div class="card">
            <div class="card-header">Translations ({{ $product->translations->count() }})</div>
            <div class="pad">
                @foreach($product->translations as $t)
                    <div class="kv"><span>{{ strtoupper($t->locale) }}</span><strong>{{ $t->name ?: '—' }}</strong></div>
                @endforeach
            </div>
        </div>
        @endif

        <div class="card">
            <div class="card-header">On the Website</div>
            <div class="pad">
                <p class="body-text" style="margin-bottom:10px;">Public product page path:</p>
                <code class="url-code">/products/{{ $product->slug }}</code>
                <p class="hint">Visible on the website only while <strong>Published</strong>.</p>
            </div>
        </div>
    </div>
</div>

<style>
:root { --page-bg: #FBF6EC; }
.page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:22px; flex-wrap:wrap; }
.page-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.page-subtitle { font-size:13px; color:#5A5A5A; margin-top:6px; }
.page-subtitle code { background:#F0ECE2; padding:2px 7px; border-radius:5px; font-size:12px; color:#5A5A5A; }
.status-chip { font-size:11px; font-weight:700; padding:3px 10px; border-radius:9999px; }
.status-chip.pub { background:rgba(74,140,63,0.12); color:#3A7030; }
.status-chip.draft { background:rgba(224,145,47,0.16); color:#B4711A; }
.status-chip.feat { background:rgba(196,149,42,0.14); color:#B07D1E; }
.header-actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.btn { padding:11px 18px; border-radius:9px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; border:none; transition:all 0.15s; text-decoration:none; display:inline-flex; align-items:center; gap:6px; }
.btn-primary { background:#4A8C3F; color:#fff; } .btn-primary:hover { background:#3A7030; }
.btn-light { background:#fff; border:1px solid #E8E2D6; color:#5A5A5A; } .btn-light:hover { border-color:#D9D2C4; }

.show-grid { display:grid; grid-template-columns:1.6fr 1fr; gap:20px; align-items:start; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:14px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-header { padding:14px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; font-family:'Playfair Display',serif; font-weight:700; font-size:15px; }
.pad { padding:20px; }
.body-text { font-size:14px; line-height:1.65; color:#3A3A3A; white-space:pre-line; }

.gallery-view { padding:16px; }
.gallery-main { position:relative; border-radius:12px; overflow:hidden; background:#FAF6EC; aspect-ratio:4/3; display:flex; align-items:center; justify-content:center; }
.gallery-main img { width:100%; height:100%; object-fit:contain; }
.gallery-main img.miss { display:none; }
.size-badge { position:absolute; bottom:10px; left:10px; background:#fff; border:1px solid #E8E2D6; font-size:12px; font-weight:700; color:#3A7030; padding:4px 10px; border-radius:8px; }
.no-img { color:#B0B0B0; font-size:14px; }
.gallery-thumbs { display:flex; gap:10px; margin-top:12px; flex-wrap:wrap; }
.thumb { width:66px; height:66px; border-radius:10px; overflow:hidden; border:2px solid #EDE9E1; background:#FAF6EC; cursor:pointer; padding:0; }
.thumb.active { border-color:#4A8C3F; }
.thumb img { width:100%; height:100%; object-fit:cover; } .thumb img.miss { opacity:0; }

.check-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
.check-list li { display:flex; align-items:flex-start; gap:10px; font-size:14px; color:#3A3A3A; }
.check-list svg { width:17px; height:17px; flex-shrink:0; margin-top:2px; }
.dot-list { padding-left:18px; display:flex; flex-direction:column; gap:8px; }
.dot-list li { font-size:14px; color:#3A3A3A; }

.spec-table { width:100%; border-collapse:collapse; }
.spec-table td { padding:10px 4px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#3A3A3A; }
.spec-table tr:last-child td { border-bottom:none; }
.spec-label { color:#8A8A8A; width:45%; font-weight:500; }

.info-block { margin-bottom:16px; } .info-block:last-child { margin-bottom:0; }
.info-block h4 { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#8A8A8A; margin-bottom:6px; }

.kv { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:9px 0; border-bottom:1px solid #F4F1EB; font-size:13.5px; }
.kv:last-child { border-bottom:none; }
.kv span { color:#8A8A8A; } .kv strong { color:#1A1A1A; font-weight:600; text-align:right; }
.price { color:#3A7030 !important; font-size:16px; }
.in-stock { color:#3A8C3F; font-weight:600; font-size:11px; margin-left:4px; }
.out-stock { color:#D4342C; font-weight:600; font-size:11px; margin-left:4px; }

.rating-row { display:flex; align-items:center; gap:12px; }
.rating-num { font-size:28px; font-weight:800; font-family:'Playfair Display',serif; color:#1A1A1A; }
.stars { display:inline-flex; gap:2px; }
.star { width:18px; height:18px; fill:#D8CDB8; } .star.on { fill:#E0A82E; }
.rating-count { font-size:12.5px; color:#9A9A9A; margin-top:8px; }
.url-code { display:block; background:#F0ECE2; padding:9px 12px; border-radius:8px; font-size:12.5px; color:#3A7030; word-break:break-all; }
.hint { font-size:12px; color:#9A9A9A; margin-top:10px; }

@media (max-width: 900px) { .show-grid { grid-template-columns:1fr; } }
</style>

<script>
function swapMain(btn, src) {
    var img = document.getElementById('mainImg');
    if (img) { img.src = src; img.classList.remove('miss'); }
    document.querySelectorAll('.gallery-thumbs .thumb').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
}
</script>
@endsection
