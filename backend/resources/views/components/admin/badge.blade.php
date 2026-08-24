@props(['type' => 'default', 'dot' => false])

@php
$colors = [
    'default' => ['bg' => '#F5F5F5', 'text' => '#5A5A5A'],
    'green' => ['bg' => 'rgba(74,140,63,0.08)', 'text' => '#3A7030'],
    'gold' => ['bg' => 'rgba(196,149,42,0.1)', 'text' => '#C4952A'],
    'red' => ['bg' => 'rgba(212,52,44,0.08)', 'text' => '#D4342C'],
    'blue' => ['bg' => 'rgba(91,141,239,0.1)', 'text' => '#5B8DEF'],
];
$style = $colors[$type] ?? $colors['default'];
@endphp

<span class="admin-badge" style="background:{{ $style['bg'] }};color:{{ $style['text'] }};">
    @if($dot)
        <span class="badge-dot" style="background:{{ $style['text'] }};"></span>
    @endif
    {{ $slot }}
</span>

<style>
.admin-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: 9999px; white-space: nowrap; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
</style>
