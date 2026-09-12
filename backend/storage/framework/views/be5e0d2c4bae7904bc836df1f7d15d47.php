<?php $active = $curSort === $col; ?>
<span class="sort-ico">
    <svg class="up <?php echo e($active && $curDir === 'asc' ? '' : 'dim'); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    <svg class="down <?php echo e($active && $curDir === 'desc' ? '' : 'dim'); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
</span>
<?php /**PATH E:\Manikstu Website\backend\resources\views/admin/team/_sorticon.blade.php ENDPATH**/ ?>