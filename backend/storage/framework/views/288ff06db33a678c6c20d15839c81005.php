<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['headers' => [], 'pagination' => null]));

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

foreach (array_filter((['headers' => [], 'pagination' => null]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="admin-table-wrap">
    <div class="admin-table">
        <table>
            <thead>
                <tr>
                    <?php $__currentLoopData = $headers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $header): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <th><?php echo e($header); ?></th>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $slot; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <?php echo e($row); ?>

                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="<?php echo e(count($headers)); ?>" class="empty-cell">
                            <?php if (isset($component)) { $__componentOriginal99089f8e2ef4184d7d35db81d60c6521 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal99089f8e2ef4184d7d35db81d60c6521 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.admin.empty-state','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('admin.empty-state'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal99089f8e2ef4184d7d35db81d60c6521)): ?>
<?php $attributes = $__attributesOriginal99089f8e2ef4184d7d35db81d60c6521; ?>
<?php unset($__attributesOriginal99089f8e2ef4184d7d35db81d60c6521); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal99089f8e2ef4184d7d35db81d60c6521)): ?>
<?php $component = $__componentOriginal99089f8e2ef4184d7d35db81d60c6521; ?>
<?php unset($__componentOriginal99089f8e2ef4184d7d35db81d60c6521); ?>
<?php endif; ?>
                        </td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php if($pagination): ?>
        <div class="table-pagination">
            <?php echo e($pagination->links()); ?>

        </div>
    <?php endif; ?>
</div>

<style>
.admin-table-wrap { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(26,26,26,0.04); }
.admin-table { overflow-x: auto; }
.admin-table table { width: 100%; border-collapse: collapse; }
.admin-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #5A5A5A; background: #FAFAFA; border-bottom: 1px solid #E5E5E5; white-space: nowrap; }
.admin-table td { padding: 12px 16px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F0F0F0; }
.admin-table tbody tr:hover { background: #FAFAFA; }
.admin-table tbody tr:last-child td { border-bottom: none; }
.table-cell-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid #E5E5E5; }
.table-cell-img-placeholder { width: 40px; height: 40px; border-radius: 8px; background: #F5F5F5; border: 1px solid #E5E5E5; display: flex; align-items: center; justify-content: center; color: #999; }
.table-actions { display: flex; align-items: center; gap: 6px; }
.table-actions a, .table-actions button { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid #E5E5E5; background: #fff; color: #5A5A5A; cursor: pointer; transition: all 0.15s; }
.table-actions a:hover, .table-actions button:hover { background: #F5F5F5; color: #1A1A1A; }
.table-actions .btn-delete:hover { background: rgba(212,52,44,0.06); color: #D4342C; border-color: rgba(212,52,44,0.2); }
.table-actions svg { width: 16px; height: 16px; }
.table-pagination { padding: 16px; display: flex; justify-content: center; }
.table-pagination .pagination { display: flex; gap: 4px; }
.table-pagination .pagination a, .table-pagination .pagination span { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid #E5E5E5; color: #5A5A5A; background: #fff; text-decoration: none; transition: all 0.15s; }
.table-pagination .pagination a:hover { background: #F5F5F5; color: #1A1A1A; }
.table-pagination .pagination .active a { background: #4A8C3F; color: #fff; border-color: #4A8C3F; }
.empty-cell { text-align: center; padding: 40px 16px !important; }
</style>
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/table.blade.php ENDPATH**/ ?>