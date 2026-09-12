<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'label' => '',
    'name' => '',
    'type' => 'text',
    'value' => null,
    'placeholder' => '',
    'required' => false,
    'help' => '',
    'options' => null,
    'rows' => 3,
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
    'label' => '',
    'name' => '',
    'type' => 'text',
    'value' => null,
    'placeholder' => '',
    'required' => false,
    'help' => '',
    'options' => null,
    'rows' => 3,
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="form-field">
    <?php if($label): ?>
        <label for="<?php echo e($name); ?>" class="form-label">
            <?php echo e($label); ?>

            <?php if($required): ?><span class="required">*</span><?php endif; ?>
        </label>
    <?php endif; ?>

    <?php if($type === 'textarea'): ?>
        <textarea
            id="<?php echo e($name); ?>"
            name="<?php echo e($name); ?>"
            class="form-input form-textarea <?php $__errorArgs = [$name];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-error <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>"
            placeholder="<?php echo e($placeholder); ?>"
            <?php if($required): ?> required <?php endif; ?>
            rows="<?php echo e($rows); ?>"
        ><?php echo e(old($name, $value)); ?></textarea>

    <?php elseif($type === 'select' && $options): ?>
        <select
            id="<?php echo e($name); ?>"
            name="<?php echo e($name); ?>"
            class="form-input form-select <?php $__errorArgs = [$name];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-error <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>"
            <?php if($required): ?> required <?php endif; ?>
        >
            <option value=""><?php echo e($placeholder ?: 'Select...'); ?></option>
            <?php $__currentLoopData = $options; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $optValue => $optLabel): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <option value="<?php echo e($optValue); ?>" <?php echo e(old($name, $value) == $optValue ? 'selected' : ''); ?>>
                    <?php echo e($optLabel); ?>

                </option>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </select>

    <?php elseif($type === 'toggle'): ?>
        <label class="form-toggle">
            <input type="hidden" name="<?php echo e($name); ?>" value="0">
            <input
                type="checkbox"
                name="<?php echo e($name); ?>"
                id="<?php echo e($name); ?>"
                value="1"
                <?php echo e(old($name, $value) ? 'checked' : ''); ?>

            >
            <span class="toggle-slider"></span>
        </label>

    <?php else: ?>
        <input
            type="<?php echo e($type); ?>"
            id="<?php echo e($name); ?>"
            name="<?php echo e($name); ?>"
            value="<?php echo e(old($name, $value)); ?>"
            class="form-input <?php $__errorArgs = [$name];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-error <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>"
            placeholder="<?php echo e($placeholder); ?>"
            <?php if($required): ?> required <?php endif; ?>
        >
    <?php endif; ?>

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

    <?php if($help && !$errors->has($name)): ?>
        <p class="form-help"><?php echo e($help); ?></p>
    <?php endif; ?>
</div>

<style>
.form-field { margin-bottom: 20px; }
.form-label { display: block; font-size: 13px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
.form-label .required { color: #D4342C; margin-left: 2px; }
.form-input {
    width: 100%;
    height: 42px;
    padding: 0 14px;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    font-size: 13.5px;
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    background: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.08); }
.form-input.is-error { border-color: #D4342C; }
.form-input.is-error:focus { box-shadow: 0 0 0 3px rgba(212,52,44,0.08); }
.form-textarea { height: auto; padding: 12px 14px; resize: vertical; min-height: 100px; }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; cursor: pointer; }
.form-error { font-size: 12px; color: #D4342C; margin-top: 4px; }
.form-help { font-size: 12px; color: #999; margin-top: 4px; }
.form-toggle { position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer; }
.form-toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; inset: 0; background: #E5E5E5; border-radius: 24px; transition: background 0.2s; }
.toggle-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
.form-toggle input:checked + .toggle-slider { background: #4A8C3F; }
.form-toggle input:checked + .toggle-slider::before { transform: translateX(20px); }
</style>
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/form-field.blade.php ENDPATH**/ ?>