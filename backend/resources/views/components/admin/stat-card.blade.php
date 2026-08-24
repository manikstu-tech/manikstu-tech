@props([
    'title' => '',
    'value' => '0',
    'label' => '',
    'icon' => 'chart',
    'badge' => null,
    'badgeType' => 'green',
])

@php
$icons = [
    'chart' => '<line x1="12" x2="12" y1="20" y2="10"/><path d="M12 20v-4"/><path d="M12 6V2"/><path d="M4.93 10.93l2.83-2.83"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="M19.07 10.93l-2.83-2.83"/>',
    'cart' => '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    'message' => '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'dollar' => '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'users' => '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'package' => '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
];
@endphp

<div class="stat-card">
    <div class="stat-top">
        <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $icons[$icon] ?? $icons['chart'] !!}</svg>
        </div>
        @if($badge)
            <x-admin.badge :type="$badgeType" dot>{{ $badge }}</x-admin.badge>
        @endif
    </div>
    <div class="stat-number">{{ $value }}</div>
    <div class="stat-label">{{ $label }}</div>
</div>

<style>
.stat-card { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; padding: 20px 22px; box-shadow: 0 2px 8px rgba(26,26,26,0.04); transition: box-shadow 0.2s, transform 0.2s; }
.stat-card:hover { box-shadow: 0 4px 16px rgba(26,26,26,0.08); transform: translateY(-1px); }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.stat-icon svg { width: 20px; height: 20px; }
.stat-icon.green { background: rgba(74,140,63,0.08); color: #4A8C3F; }
.stat-number { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #1A1A1A; line-height: 1.1; }
.stat-label { font-size: 13px; color: #5A5A5A; margin-top: 4px; }
</style>
