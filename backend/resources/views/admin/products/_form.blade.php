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
    // Fixed 4-image layout: 1 main + 3 angle views.
    $imageSlots = [
        ['key' => 'main',   'label' => 'Main Image',    'sub' => 'Featured — shown first on the website'],
        ['key' => 'angle1', 'label' => 'Angle View 1',  'sub' => 'Side / detail view'],
        ['key' => 'angle2', 'label' => 'Angle View 2',  'sub' => 'Side / detail view'],
        ['key' => 'angle3', 'label' => 'Angle View 3',  'sub' => 'Side / detail view'],
    ];
    $slotValues = [
        'main'   => $galleryImages[0] ?? null,
        'angle1' => $galleryImages[1] ?? null,
        'angle2' => $galleryImages[2] ?? null,
        'angle3' => $galleryImages[3] ?? null,
    ];
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
                    <p class="gallery-hint">Upload <strong>4 images</strong> — one <strong>Main Image</strong> (featured, shown first on the website) and <strong>3 angle / side views</strong>. Uploaded images are stored and served to the website automatically.</p>

                    <div class="slot-grid">
                        @foreach($imageSlots as $slot)
                            @php $cur = $slotValues[$slot['key']]; @endphp
                            <div class="img-slot {{ $slot['key'] === 'main' ? 'is-main' : '' }}" data-slot="{{ $slot['key'] }}">
                                <div class="slot-label">
                                    <span>{{ $slot['label'] }}</span>
                                    @if($slot['key'] === 'main')<span class="slot-tag">Featured</span>@endif
                                </div>
                                <label class="slot-drop" id="drop-{{ $slot['key'] }}">
                                    <input type="file" name="images[{{ $slot['key'] }}]" id="input-{{ $slot['key'] }}" accept="image/*" hidden onchange="slotPreview('{{ $slot['key'] }}', this)">
                                    <input type="hidden" name="existing_images[{{ $slot['key'] }}]" id="existing-{{ $slot['key'] }}" value="{{ $cur }}">
                                    <div class="slot-preview {{ $cur ? '' : 'empty' }}" id="preview-{{ $slot['key'] }}">
                                        @if($cur)
                                            <img src="{{ $galSrc($cur) }}" alt="" onerror="this.style.display='none'">
                                        @endif
                                    </div>
                                    <div class="slot-placeholder" id="placeholder-{{ $slot['key'] }}" style="{{ $cur ? 'display:none;' : '' }}">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4-4 4 4"/></svg>
                                        <span>Upload</span>
                                        <small>{{ $slot['sub'] }}</small>
                                    </div>
                                    <button type="button" class="slot-remove" id="remove-{{ $slot['key'] }}" style="{{ $cur ? '' : 'display:none;' }}" title="Remove" onclick="slotRemove(event, '{{ $slot['key'] }}')">&times;</button>
                                </label>
                            </div>
                        @endforeach
                    </div>
                    <p class="slot-note">JPG, PNG, WebP — up to 5MB each. Leave slots empty if you have fewer images; the Main Image is recommended.</p>
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

.gallery-hint { font-size: 12.5px; color: #7A7A7A; margin-bottom: 16px; line-height: 1.55; }
.slot-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.img-slot.is-main { grid-column: span 1; }
.slot-label { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 7px; }
.slot-label span:first-child { font-size: 12px; font-weight: 700; color: #5A5A5A; }
.slot-tag { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #fff; background: #4A8C3F; padding: 2px 7px; border-radius: 5px; }
.slot-drop { position: relative; display: block; aspect-ratio: 1; border: 1.5px dashed #D9D2C4; border-radius: 12px; overflow: hidden; cursor: pointer; background: #FAF8F3; transition: border-color 0.15s, background 0.15s; }
.slot-drop:hover, .slot-drop.dragover { border-color: #4A8C3F; background: rgba(74,140,63,0.03); }
.is-main .slot-drop { border-color: rgba(74,140,63,0.5); border-style: solid; }
.slot-preview { position: absolute; inset: 0; }
.slot-preview.empty { display: none; }
.slot-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.slot-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; text-align: center; color: #9A9A8E; padding: 8px; }
.slot-placeholder svg { width: 24px; height: 24px; color: #4A8C3F; }
.slot-placeholder span { font-size: 12px; font-weight: 600; }
.slot-placeholder small { font-size: 10px; color: #B0A98E; line-height: 1.3; }
.slot-remove { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; border-radius: 50%; border: none; background: rgba(0,0,0,0.55); color: #fff; font-size: 15px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2; }
.slot-remove:hover { background: rgba(212,52,44,0.92); }
.slot-note { font-size: 11.5px; color: #A8A8A8; margin-top: 12px; }
@media (max-width: 700px) { .slot-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }
</style>

<script>
// Preview a picked file inside its slot.
function slotPreview(key, input) {
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        var preview = document.getElementById('preview-' + key);
        preview.innerHTML = '<img src="' + e.target.result + '" alt="">';
        preview.classList.remove('empty');
        document.getElementById('placeholder-' + key).style.display = 'none';
        document.getElementById('remove-' + key).style.display = 'flex';
    };
    reader.readAsDataURL(file);
}

// Clear a slot (removes the picked file and any existing stored image).
function slotRemove(ev, key) {
    ev.preventDefault();
    ev.stopPropagation();
    document.getElementById('input-' + key).value = '';
    document.getElementById('existing-' + key).value = '';
    var preview = document.getElementById('preview-' + key);
    preview.innerHTML = '';
    preview.classList.add('empty');
    document.getElementById('placeholder-' + key).style.display = '';
    document.getElementById('remove-' + key).style.display = 'none';
}

// Drag-and-drop onto each slot.
document.querySelectorAll('.slot-drop').forEach(function (drop) {
    var key = drop.id.replace('drop-', '');
    var input = document.getElementById('input-' + key);
    ['dragenter', 'dragover'].forEach(function (evn) {
        drop.addEventListener(evn, function (e) { e.preventDefault(); drop.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(function (evn) {
        drop.addEventListener(evn, function (e) { e.preventDefault(); drop.classList.remove('dragover'); });
    });
    drop.addEventListener('drop', function (e) {
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            input.files = e.dataTransfer.files;
            slotPreview(key, input);
        }
    });
});
</script>
