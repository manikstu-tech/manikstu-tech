<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'name' => 'content',
    'label' => 'Content',
    'value' => '',
    'required' => false,
]));

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

foreach (array_filter(([
    'name' => 'content',
    'label' => 'Content',
    'value' => '',
    'required' => false,
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="rich-text-field">
    <label class="form-label">
        <?php echo e($label); ?>

        <?php if($required): ?><span class="required">*</span><?php endif; ?>
    </label>
    <div id="quill-<?php echo e($name); ?>" class="rich-editor"><?php echo old($name, $value); ?></div>
    <input type="hidden" name="<?php echo e($name); ?>" id="hidden-<?php echo e($name); ?>">
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

<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const quill = new Quill('#quill-<?php echo e($name); ?>', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'link', 'image'],
                [{ align: [] }],
                ['clean']
            ]
        },
        placeholder: 'Write something...'
    });

    const hidden = document.getElementById('hidden-<?php echo e($name); ?>');
    quill.on('text-change', function() { hidden.value = quill.root.innerHTML; });
    hidden.value = quill.root.innerHTML;
});
</script>

<style>
.rich-editor { min-height: 200px; border: 1px solid #E5E5E5; border-radius: 8px; background: #fff; }
.rich-editor .ql-toolbar { border: none; border-bottom: 1px solid #E5E5E5; border-radius: 8px 8px 0 0; background: #FAFAFA; }
.rich-editor .ql-container { border: none; font-family: 'Inter', sans-serif; font-size: 13.5px; }
.rich-editor .ql-editor { min-height: 180px; padding: 14px; }
.rich-editor .ql-editor.ql-blank::before { color: #999; font-style: normal; }
</style>
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/rich-text.blade.php ENDPATH**/ ?>