<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['type' => 'default', 'dot' => false]));

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

foreach (array_filter((['type' => 'default', 'dot' => false]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<?php
$colors = [
    'default' => ['bg' => '#F5F5F5', 'text' => '#5A5A5A'],
    'green' => ['bg' => 'rgba(74,140,63,0.08)', 'text' => '#3A7030'],
    'gold' => ['bg' => 'rgba(196,149,42,0.1)', 'text' => '#C4952A'],
    'red' => ['bg' => 'rgba(212,52,44,0.08)', 'text' => '#D4342C'],
    'blue' => ['bg' => 'rgba(91,141,239,0.1)', 'text' => '#5B8DEF'],
];
$style = $colors[$type] ?? $colors['default'];
?>

<span class="admin-badge" style="background:<?php echo e($style['bg']); ?>;color:<?php echo e($style['text']); ?>;">
    <?php if($dot): ?>
        <span class="badge-dot" style="background:<?php echo e($style['text']); ?>;"></span>
    <?php endif; ?>
    <?php echo e($slot); ?>

</span>

<style>
.admin-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 9999px; white-space: nowrap; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
</style>
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/badge.blade.php ENDPATH**/ ?>