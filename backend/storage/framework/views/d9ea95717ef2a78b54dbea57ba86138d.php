<?php $__env->startSection('title', 'Franchise Leads'); ?>

<?php $__env->startSection('content'); ?>
<?php
    $statusColors = [
        'New'       => ['#7C5CB0', 'rgba(124,92,176,0.14)'],
        'Contacted' => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'Qualified' => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'Site Visit'=> ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Approved'  => ['#3A7030', 'rgba(74,140,63,0.12)'],
    ];
    $filters = ['All', 'New', 'Contacted', 'Qualified', 'Site Visit', 'Approved'];
    $active = request('status', 'All');
?>

<div class="tc-toolbar">
    <div>
        <h1 class="tc-title">Franchise Leads</h1>
        <p class="tc-sub"><?php echo e(count($allLeads)); ?> leads in the pipeline</p>
    </div>
    <div class="chips">
        <?php $__currentLoopData = $filters; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $f): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <a href="<?php echo e($f === 'All' ? url()->current() : url()->current().'?status='.urlencode($f)); ?>" class="chip <?php echo e($active === $f ? 'active' : ''); ?>"><?php echo e($f); ?></a>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
</div>

<div class="card">
    <div class="tc-table-wrap">
        <table class="tc-table">
            <thead>
                <tr><th>Lead ID</th><th>Name</th><th>Location</th><th>Investment</th><th>Status</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $leads; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $l): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <?php [$tx, $bg] = $statusColors[$l['status']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)']; ?>
                    <tr>
                        <td><a href="<?php echo e(route('telecalling.franchise.show', $l['id'])); ?>" class="lead-id"><?php echo e($l['id']); ?></a></td>
                        <td><?php echo e($l['name']); ?></td>
                        <td><?php echo e($l['location']); ?></td>
                        <td><?php echo e($l['investment']); ?></td>
                        <td><span class="tc-badge" style="background:<?php echo e($bg); ?>;color:<?php echo e($tx); ?>;"><?php echo e($l['status']); ?></span></td>
                        <td><?php echo e($l['date']); ?></td>
                        <td>
                            <a href="<?php echo e(route('telecalling.franchise.show', $l['id'])); ?>" class="eye-btn" title="View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            </a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr><td colspan="7" class="empty">No leads in this filter.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<style>
.tc-toolbar { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-sub { font-size:13.5px; color:#5A5A5A; margin-top:4px; }
.chips { display:flex; gap:8px; flex-wrap:wrap; }
.chip { padding:8px 16px; border-radius:9999px; border:1px solid #E8E2D6; background:#fff; font-size:12.5px; font-weight:600; color:#5A5A5A; transition:all .15s; }
.chip:hover { border-color:#4A8C3F; color:#3A7030; }
.chip.active { background:#4A8C3F; border-color:#4A8C3F; color:#fff; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); overflow:hidden; }
.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:14px 20px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:15px 20px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; vertical-align:middle; white-space:nowrap; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.lead-id { color:#C4952A; font-weight:700; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:600; padding:4px 11px; border-radius:9999px; }
.eye-btn { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:9px; border:1px solid #E8E2D6; background:#fff; color:#6A6A6A; cursor:pointer; transition:all .15s; }
.eye-btn:hover { background:#FAFAFA; border-color:#D9D2C4; color:#3A7030; }
.eye-btn svg { width:16px; height:16px; }
.empty { text-align:center; color:#9A9A9A; padding:40px; }
</style>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('telecalling.layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH E:\Manikstu Website\backend\resources\views/telecalling/franchise.blade.php ENDPATH**/ ?>