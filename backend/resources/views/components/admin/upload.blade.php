@props(['name' => 'image', 'label' => 'Image', 'current' => null, 'required' => false])

<div class="upload-field">
    <label class="form-label">
        {{ $label }}
        @if($required)<span class="required">*</span>@endif
    </label>

    <div class="upload-zone" id="{{ $name }}-dropzone">
        @if($current)
            <div class="upload-preview" id="{{ $name }}-preview">
                <img src="{{ asset('storage/' . $current) }}" alt="Current image">
                <button type="button" class="upload-remove" onclick="removeUpload('{{ $name }}')">&times;</button>
            </div>
        @else
            <div class="upload-preview" id="{{ $name }}-preview" style="display:none;">
                <img src="" alt="Preview">
                <button type="button" class="upload-remove" onclick="removeUpload('{{ $name }}')">&times;</button>
            </div>
            <div class="upload-placeholder" id="{{ $name }}-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <p>Drag & drop or <span class="upload-browse">browse</span></p>
            </div>
        @endif
    </div>
    <input type="file" name="{{ $name }}" id="{{ $name }}-input" accept="image/*" style="display:none;" {{ $required ? 'required' : '' }}>
    @error($name)
        <p class="form-error">{{ $message }}</p>
    @enderror
</div>

<style>
.upload-field { margin-bottom: 20px; }
.upload-zone { border: 2px dashed #E5E5E5; border-radius: 10px; overflow: hidden; transition: border-color 0.2s, background 0.2s; cursor: pointer; }
.upload-zone:hover, .upload-zone.dragover { border-color: #4A8C3F; background: rgba(74,140,63,0.02); }
.upload-placeholder { padding: 32px; text-align: center; color: #999; }
.upload-placeholder svg { width: 36px; height: 36px; margin-bottom: 8px; opacity: 0.4; }
.upload-placeholder p { font-size: 13px; }
.upload-browse { color: #4A8C3F; font-weight: 600; cursor: pointer; }
.upload-preview { position: relative; }
.upload-preview img { width: 100%; max-height: 200px; object-fit: contain; display: block; background: #FAFAFA; }
.upload-remove { position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: 50%; border: none; background: rgba(0,0,0,0.6); color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
.upload-remove:hover { background: rgba(212,52,44,0.9); }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const zone = document.getElementById('{{ $name }}-dropzone');
    const input = document.getElementById('{{ $name }}-input');
    const preview = document.getElementById('{{ $name }}-preview');
    const placeholder = document.getElementById('{{ $name }}-placeholder');

    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; showPreview(input.files[0]); }
    });

    input.addEventListener('change', function() {
        if (this.files.length) showPreview(this.files[0]);
    });

    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.querySelector('img').src = e.target.result;
            preview.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

function removeUpload(name) {
    const input = document.getElementById(name + '-input');
    const preview = document.getElementById(name + '-preview');
    const placeholder = document.getElementById(name + '-placeholder');
    if (input) input.value = '';
    if (preview) preview.style.display = 'none';
    if (placeholder) placeholder.style.display = '';
}
</script>
