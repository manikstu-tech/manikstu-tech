<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames((['model' => null, 'locales' => null]));

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

foreach (array_filter((['model' => null, 'locales' => null]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<?php if(!$locales): ?>
    <?php
    $locales = [
        'en' => 'English',
        'hi' => 'हिन्दी',
        'bn' => 'বাংলা',
        'ta' => 'தமிழ்',
        'te' => 'తెలుగు',
        'mr' => 'मराठी',
        'gu' => 'ગુજરાતી',
        'kn' => 'ಕನ್ನಡ',
        'ml' => 'മലയാളം',
        'or' => 'ଓଡ଼ିଆ',
        'ja' => '日本語',
        'de' => 'Deutsch',
        'fr' => 'Français',
        'es' => 'Español',
    ];
    ?>
<?php endif; ?>

<div class="translation-tabs" data-controller="translation-tabs">
    <div class="tabs-bar" role="tablist">
        <?php $__currentLoopData = $locales; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $code => $label): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <button
                type="button"
                class="tab-btn <?php echo e($loop->first ? 'active' : ''); ?>"
                data-translation-tabs-target="tab"
                data-locale="<?php echo e($code); ?>"
                role="tab"
                onclick="window.translationTabs && window.translationTabs('<?php echo e($code); ?>')"
            >
                <?php echo e($label); ?>

                <?php if($model && $model->translations()->where('locale', $code)->exists()): ?>
                    <span class="tab-dot" title="Translation exists"></span>
                <?php endif; ?>
            </button>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
    <div class="tabs-content">
        <?php echo e($slot); ?>

    </div>
</div>

<style>
.translation-tabs { margin-bottom: 4px; }
.tabs-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-bottom: 2px solid #E5E5E5;
    margin-bottom: 20px;
}
.tab-btn {
    padding: 8px 16px;
    font-size: 12.5px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    color: #5A5A5A;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
}
.tab-btn:hover { color: #1A1A1A; }
.tab-btn.active {
    color: #4A8C3F;
    border-bottom-color: #4A8C3F;
    font-weight: 600;
}
.tab-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4A8C3F;
}
.translation-panel {
    display: none;
}
.translation-panel.active {
    display: block;
}
</style>

<script>
(function() {
    function switchTab(locale) {
        document.querySelectorAll('.translation-panel').forEach(function(panel) {
            panel.classList.toggle('active', panel.dataset.locale === locale);
        });
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.locale === locale);
        });
    }
    window.translationTabs = switchTab;
    // init: show English, hide others
    document.addEventListener('DOMContentLoaded', function() {
        switchTab('en');
    });
})();
</script>
<?php /**PATH E:\Manikstu Website\backend\resources\views/components/admin/translation-tabs.blade.php ENDPATH**/ ?>