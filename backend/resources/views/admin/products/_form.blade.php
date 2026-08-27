@php
    use Illuminate\Support\Str;
    $isEdit = isset($product);
    $galleryImages = (array) ($product->images ?? []);
    $highlightsText = implode("\n", (array) ($product->highlights ?? []));
    $recommendedText = implode("\n", (array) ($product->recommended_for ?? []));
    $specsText = collect((array) ($product->specifications ?? []))
        ->map(fn ($s) => ($s['label'] ?? '') . ' | ' . ($s['value'] ?? ''))
        ->implode("\n");
    $galSrc = fn ($path) => Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/' . $path);
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">{{ $isEdit ? 'Edit Product' : 'Add Product' }}</h1>
        <p class="page-subtitle">{{ $isEdit ? 'Update product information and gallery' : 'Create a product that will appear on the website' }}</p>
    </div>
    <a href="{{ route('admin.products.index') }}" class="btn btn-light">← Back to Products</a>
</div>

@if($errors->any())
    <div class="alert alert-danger">@foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach</div>
@endif

<form method="POST" action="{{ $isEdit ? route('admin.products.update', $product) : route('admin.products.store') }}" enctype="multipart/form-data" id="productForm">
    @csrf
    @if($isEdit) @method('PUT') @endif
    <input type="hidden" name="gallery_sequence" id="gallerySequence" value="">

    <div class="form-grid">
        <div class="form-main">
            <div class="form-card pad">
                <x-admin.translation-tabs>
                    <div class="translation-panel active" data-locale="en">
                        <x-admin.form-field label="Product Name" name="name" :value="$product->name ?? ''" required />
                        <x-admin.form-field label="Slug" name="slug" :value="$product->slug ?? ''" help="Leave blank to auto-generate from the name." />
                        <x-admin.form-field label="Short Description" name="description" type="textarea" :value="$product->description ?? ''" :rows="2" help="One-line summary shown on the product cards." />
                        <x-admin.form-field label="Full Description" name="long_description" type="textarea" :value="$product->long_description ?? ''" :rows="5" help="Detailed description shown on the product detail page." />
                    </div>
                    @foreach(['hi'=>'हिन्दी','bn'=>'বাংলা','ta'=>'தமிழ்','te'=>'తెలుగు','mr'=>'मराठी','gu'=>'ગુજરાતી','kn'=>'ಕನ್ನಡ','ml'=>'മലയാളം','or'=>'ଓଡ଼ିଆ','ja'=>'日本語','de'=>'Deutsch','fr'=>'Français','es'=>'Español'] as $code => $label)
                        <div class="translation-panel" data-locale="{{ $code }}">
                            <h4 class="translation-heading">{{ $label }} Translation</h4>
                            @php $tr = $isEdit ? $product->translations->firstWhere('locale', $code) : null; @endphp
                            <x-admin.form-field label="Name" name="name_{{ $code }}" :value="optional($tr)->name" placeholder="Translation in {{ $label }}" />
                            <x-admin.form-field label="Short Description" name="description_{{ $code }}" type="textarea" :rows="3" :value="optional($tr)->description" placeholder="Translation in {{ $label }}" />
                        </div>
                    @endforeach
                </x-admin.translation-tabs>
            </div>

            <div class="form-card">
                <div class="card-header">Highlights &amp; Details</div>
                <div class="pad">
                    <x-admin.form-field label="Highlights (Why farmers choose it)" name="highlights" type="textarea" :value="$highlightsText" :rows="4" help="One highlight per line — shown as the bullet checklist." />
                    <x-admin.form-field label="Recommended For" name="recommended_for" type="textarea" :value="$recommendedText" :rows="4" help="One item per line." />
                    <x-admin.form-field label="Specifications" name="specifications" type="textarea" :value="$specsText" :rows="6" help="One per line, in the format: Label | Value  (e.g. Form | Pellet)" />
                    <x-admin.form-field label="Usage / Dosage" name="usage_instructions" type="textarea" :value="$product->usage_instructions ?? ''" :rows="3" />
                    <x-admin.form-field label="Storage &amp; Handling" name="storage_instructions" type="textarea" :value="$product->storage_instructions ?? ''" :rows="3" />
                    <x-admin.form-field label="Composition / Ingredients" name="ingredients" type="textarea" :value="$product->ingredients ?? ''" :rows="3" />
                </div>
            </div>

            <div class="form-card">
                <div class="card-header">Product Images &amp; Gallery</div>
                <div class="pad">
                    <p class="gallery-hint">Upload one or more images. Drag to reorder — the <strong>first image is the main/featured image</strong> shown on the website. Uploaded images are stored and served to the website automatically.</p>

                    <div class="gallery-grid" id="galleryList">
                        @foreach($galleryImages as $path)
                            <div class="gallery-item" draggable="true" data-kind="existing" data-path="{{ $path }}">
                                <span class="main-badge">Main</span>
                                <img src="{{ $galSrc($path) }}" alt="" onerror="this.classList.add('img-missing')">
                                <button type="button" class="gal-remove" title="Remove" onclick="galRemove(this)">&times;</button>
                                <span class="drag-dot" title="Drag to reorder">⠿</span>
                            </div>
                        @endforeach
                    </div>

                    <label class="gallery-upload" id="galleryDrop">
                        <input type="file" name="gallery_files[]" id="galleryInput" accept="image/*" multiple hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4-4 4 4"/></svg>
                        <span>Click or drag images here to add to the gallery</span>
                        <small>JPG, PNG, WebP — up to 5MB each</small>
                    </label>
                </div>
            </div>
        </div>

        <div class="form-side">
            <div class="form-card">
                <div class="card-header">Publish</div>
                <div class="pad">
                    <x-admin.form-field label="Status (Published)" name="is_active" type="toggle" :value="$product->is_active ?? true" help="On = live on the website. Off = draft (hidden)." />
                    <x-admin.form-field label="Featured" name="is_featured" type="toggle" :value="$product->is_featured ?? false" />
                    <button type="submit" class="btn btn-primary full">{{ $isEdit ? 'Update Product' : 'Create Product' }}</button>
                </div>
            </div>

            <div class="form-card">
                <div class="card-header">Organisation</div>
                <div class="pad">
                    <x-admin.form-field label="Category" name="category_id" type="select" :options="$categories->pluck('name','id')->toArray()" :value="$product->category_id ?? ''" />
                    <x-admin.form-field label="Order" name="order" type="number" :value="$product->order ?? 0" help="Lower numbers show first." />
                </div>
            </div>

            <div class="form-card">
                <div class="card-header">Pricing &amp; Stock</div>
                <div class="pad">
                    <x-admin.form-field label="Price (₹)" name="price" type="number" :value="$product->price ?? ''" />
                    <x-admin.form-field label="Size / Unit" name="size" :value="$product->size ?? ''" placeholder="e.g. 25 kg" help="Shown as “per 25 kg” next to the price." />
                    <x-admin.form-field label="SKU / Product ID" name="sku" :value="$product->sku ?? ''" />
                    <x-admin.form-field label="Stock Quantity" name="stock_quantity" type="number" :value="$product->stock_quantity ?? 0" help="Used for availability and future ordering." />
                </div>
            </div>

            <div class="form-card">
                <div class="card-header">Ratings</div>
                <div class="pad">
                    <x-admin.form-field label="Rating (0–5)" name="rating" type="number" :value="$product->rating ?? ''" placeholder="e.g. 4.5" />
                    <x-admin.form-field label="Ratings Count" name="rating_count" type="number" :value="$product->rating_count ?? 0" />
                </div>
            </div>
        </div>
    </div>
</form>

<style>
.page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom: 22px; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.btn { padding: 11px 18px; border-radius: 9px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; justify-content:center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; }
.btn-primary:hover { background: #3A7030; }
.btn-light { background:#fff; border:1px solid #E8E2D6; color:#5A5A5A; }
.btn-light:hover { border-color:#D9D2C4; }
.btn.full { width: 100%; margin-top: 6px; }
.form-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; align-items: start; }
.form-card { background: #fff; border: 1px solid #EDE9E1; border-radius: 14px; box-shadow: 0 2px 10px rgba(26,26,26,0.04); margin-bottom: 20px; }
.form-card .pad { padding: 20px; }
.form-card.pad { padding: 22px; }
.card-header { padding: 15px 20px; border-bottom: 1px solid #F0ECE2; background:#FBFAF7; font-family:'Playfair Display',serif; font-weight: 700; font-size: 15px; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; }
.alert-danger { background: rgba(212,52,44,0.08); color: #D4342C; border: 1px solid rgba(212,52,44,0.15); }
.translation-heading { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 600; color: #5A5A5A; margin: 0 0 16px; padding-bottom: 10px; border-bottom: 1px solid #E5E5E5; }

.gallery-hint { font-size: 12.5px; color: #7A7A7A; margin-bottom: 14px; line-height: 1.5; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-bottom: 16px; }
.gallery-item { position: relative; border: 1px solid #E8E2D6; border-radius: 11px; overflow: hidden; background: #FAF8F3; aspect-ratio: 1; cursor: grab; }
.gallery-item.dragging { opacity: 0.5; }
.gallery-item.drag-over { outline: 2px dashed #4A8C3F; outline-offset: -2px; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-item img.img-missing { opacity: 0; }
.gallery-item .main-badge { position: absolute; top: 6px; left: 6px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #fff; background: #4A8C3F; padding: 2px 7px; border-radius: 5px; display: none; z-index: 2; }
.gallery-item:first-child .main-badge { display: inline-block; }
.gallery-item:first-child { outline: 2px solid #4A8C3F; outline-offset: -2px; }
.gal-remove { position: absolute; top: 5px; right: 5px; width: 22px; height: 22px; border-radius: 50%; border: none; background: rgba(0,0,0,0.55); color: #fff; font-size: 14px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2; }
.gal-remove:hover { background: rgba(212,52,44,0.92); }
.drag-dot { position: absolute; bottom: 5px; right: 7px; color: rgba(255,255,255,0.9); font-size: 13px; text-shadow: 0 1px 2px rgba(0,0,0,0.6); pointer-events: none; }
.gallery-upload { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 26px 16px; border: 1.5px dashed #D9D2C4; border-radius: 12px; cursor: pointer; text-align: center; color: #7A7A7A; transition: border-color 0.15s, background 0.15s; }
.gallery-upload:hover, .gallery-upload.dragover { border-color: #4A8C3F; background: rgba(74,140,63,0.03); }
.gallery-upload svg { width: 26px; height: 26px; color: #4A8C3F; }
.gallery-upload span { font-size: 13px; font-weight: 500; }
.gallery-upload small { font-size: 11px; color: #A8A8A8; }
@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }
</style>

<script>
(function () {
    var list = document.getElementById('galleryList');
    var input = document.getElementById('galleryInput');
    var drop = document.getElementById('galleryDrop');
    var form = document.getElementById('productForm');
    if (!list || !input || !form) return;

    // Add newly-selected files as thumbnails (a single selection batch).
    function loadFiles() {
        // remove previous "new" thumbs (a fresh selection replaces them)
        list.querySelectorAll('.gallery-item[data-kind="new"]').forEach(function (n) { n.remove(); });
        Array.prototype.forEach.call(input.files, function (file, idx) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var el = document.createElement('div');
                el.className = 'gallery-item';
                el.setAttribute('draggable', 'true');
                el.dataset.kind = 'new';
                el.dataset.newidx = String(idx);
                el.innerHTML =
                    '<span class="main-badge">Main</span>' +
                    '<img src="' + e.target.result + '" alt="">' +
                    '<button type="button" class="gal-remove" title="Remove" onclick="galRemove(this)">&times;</button>' +
                    '<span class="drag-dot">⠿</span>';
                bindDrag(el);
                list.appendChild(el);
            };
            reader.readAsDataURL(file);
        });
    }
    input.addEventListener('change', loadFiles);

    // Dropzone click / drag-drop for adding files.
    drop.addEventListener('click', function (e) { if (e.target !== input) input.click(); });
    ['dragenter', 'dragover'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('dragover'); });
    });
    drop.addEventListener('drop', function (e) {
        if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; loadFiles(); }
    });

    // Drag-to-reorder within the gallery grid.
    var dragEl = null;
    function bindDrag(el) {
        el.addEventListener('dragstart', function () { dragEl = el; el.classList.add('dragging'); });
        el.addEventListener('dragend', function () { el.classList.remove('dragging'); list.querySelectorAll('.drag-over').forEach(function (n) { n.classList.remove('drag-over'); }); });
        el.addEventListener('dragover', function (e) { e.preventDefault(); if (el !== dragEl) el.classList.add('drag-over'); });
        el.addEventListener('dragleave', function () { el.classList.remove('drag-over'); });
        el.addEventListener('drop', function (e) {
            e.preventDefault();
            el.classList.remove('drag-over');
            if (!dragEl || dragEl === el) return;
            var items = Array.prototype.slice.call(list.children);
            if (items.indexOf(dragEl) < items.indexOf(el)) list.insertBefore(dragEl, el.nextSibling);
            else list.insertBefore(dragEl, el);
        });
    }
    list.querySelectorAll('.gallery-item').forEach(bindDrag);

    // Serialize the final order into gallery_sequence on submit.
    form.addEventListener('submit', function () {
        var seq = [];
        list.querySelectorAll('.gallery-item').forEach(function (el) {
            if (el.dataset.kind === 'existing') seq.push('e:' + el.dataset.path);
            else if (el.dataset.kind === 'new') seq.push('n:' + el.dataset.newidx);
        });
        document.getElementById('gallerySequence').value = JSON.stringify(seq);
    });

    window.galRemove = function (btn) {
        var el = btn.closest('.gallery-item');
        if (el) el.remove();
    };
})();
</script>
