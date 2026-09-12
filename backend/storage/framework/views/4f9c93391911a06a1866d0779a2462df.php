<?php $__env->startSection('title', 'Complaint ' . $complaint['id']); ?>

<?php $__env->startSection('content'); ?>
<?php
    $statusColors = [
        'Open'        => ['#D4342C', 'rgba(212,52,44,0.10)'],
        'In Progress' => ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Resolved'    => ['#3A7030', 'rgba(74,140,63,0.12)'],
    ];
    $priorityColors = [
        'High'   => ['#D4342C', 'rgba(212,52,44,0.10)'],
        'Medium' => ['#B4711A', 'rgba(196,149,42,0.14)'],
        'Low'    => ['#3A7030', 'rgba(74,140,63,0.12)'],
    ];
    [$stx, $sbg] = $statusColors[$complaint['status']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
    [$ptx, $pbg] = $priorityColors[$complaint['priority']] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
?>

<a href="<?php echo e(route('telecalling.complaints')); ?>" class="back-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    Back to Complaints
</a>

<div class="cd-head">
    <div>
        <h1 class="cd-title">Complaint #<?php echo e($complaint['id']); ?> <span class="tc-badge" style="background:<?php echo e($sbg); ?>;color:<?php echo e($stx); ?>;"><?php echo e($complaint['status']); ?></span></h1>
        <p class="cd-sub">Opened on <?php echo e($complaint['date']); ?></p>
    </div>
    <div class="cd-priority">Priority: <span class="tc-badge" style="background:<?php echo e($pbg); ?>;color:<?php echo e($ptx); ?>;"><?php echo e($complaint['priority']); ?></span></div>
</div>

<div class="cd-grid2">
    <div class="card">
        <div class="card-head"><h3>Farmer Information</h3></div>
        <div class="pad">
            <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg><span class="v"><?php echo e($complaint['farmer']); ?></span></div>
            <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:<?php echo e($farmer['phone'] ?? ''); ?>" class="v"><?php echo e($farmer['phone'] ?? '—'); ?></a></div>
            <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span class="v"><?php echo e($farmer['location'] ?? '—'); ?></span></div>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Related Order</h3></div>
        <div class="pad">
            <div class="kv"><span class="k">Order ID</span><span class="sep">:</span><a href="<?php echo e(route('telecalling.order.show', $complaint['order'])); ?>" class="v" style="color:#C4952A;"><?php echo e($complaint['order']); ?></a></div>
            <div class="kv"><span class="k">Product</span><span class="sep">:</span><span class="v"><?php echo e($order['product'] ?? '—'); ?></span></div>
            <div class="kv"><span class="k">Amount</span><span class="sep">:</span><span class="v">₹<?php echo e(isset($order['amount']) ? number_format($order['amount']) : '—'); ?></span></div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-head"><h3>Issue Type</h3></div>
    <div class="pad">
        <div class="issue-row">
            <span class="issue-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
            <div>
                <p class="issue-name"><?php echo e($complaint['issue']); ?></p>
                <p class="issue-time">Reported on <?php echo e($complaint['date']); ?></p>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-head"><h3>Farmer's Report</h3></div>
    <div class="pad">
        <blockquote class="report">"<?php echo e($complaint['report']); ?>"</blockquote>
    </div>
</div>

<div class="cd-grid2">
    <div class="card">
        <div class="card-head"><h3>Complaint Status</h3></div>
        <div class="pad">
            <div class="vstep">
                <?php $__currentLoopData = $statusSteps; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $s): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php $n = $i + 1; $isDone = $n <= $statusDone; ?>
                    <div class="vstep-item <?php echo e($loop->last ? 'last' : ''); ?>">
                        <span class="vstep-dot <?php echo e($isDone ? 'done' : ''); ?>">
                            <?php if($isDone): ?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><?php endif; ?>
                        </span>
                        <div class="vstep-body">
                            <p class="vstep-label <?php echo e($isDone ? 'done' : ''); ?>"><?php echo e($s['label']); ?></p>
                            <p class="vstep-note"><?php echo e($s['note']); ?></p>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Investigation &amp; Actions</h3></div>
        <div class="pad">
            <div class="vstep">
                <?php $__currentLoopData = $investSteps; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $s): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php $n = $i + 1; $isDone = $n <= $investDone; ?>
                    <div class="vstep-item <?php echo e($loop->last ? 'last' : ''); ?>">
                        <span class="vstep-dot <?php echo e($isDone ? 'done' : ''); ?>">
                            <?php if($isDone): ?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><?php endif; ?>
                        </span>
                        <div class="vstep-body">
                            <p class="vstep-label <?php echo e($isDone ? 'done' : ''); ?>"><?php echo e($s['label']); ?></p>
                            <p class="vstep-note"><?php echo e($isDone ? $s['note'] : 'Pending'); ?></p>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-head"><h3>Add Internal Note</h3></div>
    <div class="pad">
        <form class="note-form" onsubmit="return addNote(event)">
            <input type="text" id="note-input" class="note-input" placeholder="Write internal note..." />
            <button type="submit" class="btn-primary">Add Note</button>
        </form>
        <ul id="note-list" class="note-list"></ul>
    </div>
</div>

<div class="cd-footer">
    <div class="cd-foot-left">
        <a href="tel:<?php echo e($farmer['phone'] ?? ''); ?>" class="btn-outline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call Farmer</a>
        <a href="tel:+919123456780" class="btn-outline">Contact Seller</a>
        <a href="tel:+919123456789" class="btn-outline">Contact Logistics</a>
    </div>
    <button type="button" class="btn-primary lg" onclick="odToast('Complaint status update coming soon')">Update Complaint Status</button>
</div>

<div id="od-toast" class="od-toast"></div>

<script>
function odToast(msg) {
    var t = document.getElementById('od-toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
}
function addNote(e) {
    e.preventDefault();
    var inp = document.getElementById('note-input');
    var val = inp.value.trim();
    if (!val) return false;
    var li = document.createElement('li');
    li.className = 'note-item';
    var now = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    li.innerHTML = '<span class="note-meta">Priya · ' + now + '</span>' + val.replace(/</g, '&lt;');
    document.getElementById('note-list').prepend(li);
    inp.value = '';
    odToast('Note added');
    return false;
}
</script>

<style>
.back-btn { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:600; color:#3A7030; background:#fff; border:1px solid #E8E2D6; border-radius:9px; padding:9px 16px; margin-bottom:14px; cursor:pointer; transition:all .15s; }
.back-btn:hover { background:#F4F1EA; border-color:#4A8C3F; }
.back-btn svg { width:16px; height:16px; }

.cd-head { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
.cd-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.cd-sub { font-size:13px; color:#5A5A5A; margin-top:6px; }
.cd-priority { font-size:13px; color:#8A8A8A; display:flex; align-items:center; gap:8px; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:700; padding:4px 11px; border-radius:9999px; }

.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-head { padding:15px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.pad { padding:20px; }

.cd-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.info-line { display:flex; align-items:center; gap:9px; font-size:13.5px; margin-bottom:12px; }
.info-line:last-child { margin-bottom:0; }
.info-line svg { width:15px; height:15px; color:#9A9A8E; flex-shrink:0; }
.info-line .v { font-weight:600; color:#1A1A1A; }
.kv { display:flex; align-items:center; gap:8px; font-size:13.5px; margin-bottom:12px; }
.kv:last-child { margin-bottom:0; }
.kv .k { color:#9A9A8E; min-width:70px; }
.kv .sep { color:#C4B79A; }
.kv .v { font-weight:600; }

.issue-row { display:flex; align-items:center; gap:14px; }
.issue-ico { width:42px; height:42px; border-radius:10px; background:rgba(212,52,44,0.10); color:#D4342C; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.issue-ico svg { width:20px; height:20px; }
.issue-name { font-size:14.5px; font-weight:700; color:#1A1A1A; }
.issue-time { font-size:12px; color:#9A9A9A; margin-top:3px; }

.report { background:#FBF6EC; border-left:3px solid #C4952A; border-radius:0 8px 8px 0; padding:16px 18px; font-size:14px; font-style:italic; color:#4A4A4A; }

.vstep { position:relative; }
.vstep-item { position:relative; display:flex; gap:14px; padding-bottom:20px; }
.vstep-item.last { padding-bottom:0; }
.vstep-item::before { content:''; position:absolute; left:11px; top:22px; bottom:-2px; width:2px; background:#EDE9E1; }
.vstep-item.last::before { display:none; }
.vstep-dot { width:24px; height:24px; border-radius:50%; background:#fff; border:2px solid #E3DECF; display:flex; align-items:center; justify-content:center; flex-shrink:0; z-index:1; color:#fff; }
.vstep-dot.done { background:#4A8C3F; border-color:#4A8C3F; }
.vstep-dot svg { width:13px; height:13px; }
.vstep-body { padding-top:1px; }
.vstep-label { font-size:13.5px; font-weight:700; color:#9A9A9A; }
.vstep-label.done { color:#1A1A1A; }
.vstep-note { font-size:12px; color:#9A9A9A; margin-top:2px; }

.note-form { display:flex; gap:12px; }
.note-input { flex:1; border:1px solid #E3DECF; border-radius:10px; padding:12px 14px; font-size:13.5px; background:#fff; }
.note-input:focus { outline:none; border-color:#4A8C3F; box-shadow:0 0 0 3px rgba(74,140,63,0.10); }
.btn-primary { background:#4A8C3F; color:#fff; border:none; border-radius:10px; padding:12px 22px; font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap; transition:background .15s; }
.btn-primary:hover { background:#3A7030; }
.btn-primary.lg { padding:13px 26px; box-shadow:0 4px 12px rgba(74,140,63,0.22); }
.note-list { list-style:none; margin-top:14px; }
.note-item { font-size:13px; color:#3A3A3A; padding:11px 14px; background:#FBFAF7; border:1px solid #F0ECE2; border-radius:9px; margin-top:8px; }
.note-meta { display:block; font-size:11px; color:#9A9A8E; font-weight:600; margin-bottom:3px; }

.cd-footer { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-top:4px; }
.cd-foot-left { display:flex; gap:10px; flex-wrap:wrap; }
.btn-outline { display:inline-flex; align-items:center; gap:7px; padding:11px 18px; border:1px solid #E8E2D6; border-radius:10px; font-size:13px; font-weight:600; color:#3A3A3A; background:#fff; }
.btn-outline:hover { background:#FBFAF7; border-color:#4A8C3F; color:#3A7030; }
.btn-outline svg { width:15px; height:15px; }

.od-toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); background:#2A2A2A; color:#fff; font-size:13px; font-weight:600; padding:11px 18px; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:9999; }
.od-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media (max-width:900px){ .cd-grid2 { grid-template-columns:1fr; } .cd-footer { flex-direction:column; align-items:stretch; } .btn-primary.lg { width:100%; } }
</style>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('telecalling.layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH E:\Manikstu Website\backend\resources\views/telecalling/complaint-detail.blade.php ENDPATH**/ ?>