@props(['model' => null, 'locales' => null])

@if(!$locales)
    @php
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
    @endphp
@endif

<div class="translation-tabs" data-controller="translation-tabs">
    <div class="tabs-bar" role="tablist">
        @foreach($locales as $code => $label)
            <button
                type="button"
                class="tab-btn {{ $loop->first ? 'active' : '' }}"
                data-translation-tabs-target="tab"
                data-locale="{{ $code }}"
                role="tab"
                onclick="window.translationTabs && window.translationTabs('{{ $code }}')"
            >
                {{ $label }}
                @if($model && $model->translations()->where('locale', $code)->exists())
                    <span class="tab-dot" title="Translation exists"></span>
                @endif
            </button>
        @endforeach
    </div>
    <div class="tabs-content">
        {{ $slot }}
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
