<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['name' => 'image', 'label' => 'Image', 'current' => null, 'required' => false]));

foreach ($attributes->all() as $__key => $__value) {
    if (in_array($__key, $__propNames)) {
        $$__key = $$__key ?? $__value;
    } else {
        $__newAttributes[$__key] = $__value;
    }
}

$attributes = new \Illuminate\View\ComponentAttributeBag($__newAttributes);

unset($__propNames);
unset($__newAttributes);

foreach (array_filter((['name' => 'image', 'label' => 'Image', 'current' => null, 'required' => false]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="upload-field">
    <label class="form-label">
        <?php echo e($label); ?>

        <?php if($required): ?><span class="required">*</span><?php endif; ?>
    </label>

    <div class="upload-zone" id="<?php echo e($name); ?>-dropzone">
        <?php if($current): ?>
            <div class="upload-preview" id="<?php echo e($name); ?>-preview">
                <img src="<?php echo e(asset('storage/' . $current)); ?>" alt="Current image">
                <button type="button" class="upload-remove" onclick="removeUpload('<?php echo e($name); ?>')">&times;</button>
            </div>
        <?php else: ?>
            <div class="upload-preview" id="<?php echo e($name); ?>-preview" style="display:none;">
                <img src="" alt="Preview">
                <button type="button" class="upload-remove" onclick="removeUpload('<?php echo e($name); ?>')">&times;</button>
            </div>
            <div class="upload-placeholder" id="<?php echo e($name); ?>-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <p>Drag & drop or <span class="upload-browse">browse</span></p>
            </div>
        <?php endif; ?>
    </div>
    <input type="file" name="<?php echo e($name); ?>" id="<?php echo e($name); ?>-input" accept="image/*" style="display:none;" <?php echo e($required ? 'required' : ''); ?>>
    <?php $__errorArgs = [$name];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
        <p class="form-error"><?php echo e($message); ?></p>
    <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
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
    const zone = document.getElementById('<?php echo e($name); ?>-dropzone');
    const input = document.getElementById('<?php echo e($name); ?>-input');
    const preview = document.getElementById('<?php echo e($name); ?>-preview');
    const placeholder = document.getElementById('<?php echo e($name); ?>-placeholder');

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
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/upload.blade.php ENDPATH**/ ?>