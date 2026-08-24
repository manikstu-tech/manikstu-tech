@props([
    'value' => '0',
    'label' => '',
    'icon' => 'chart',
    'badge' => null,
    'badgeType' => 'green',
    'trend' => 'up',
    'color' => 'green',
    'art' => 'plants',
    'artimg' => null,
    'accent' => false,
])

@php
$icons = [
    'cart' => '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    'message' => '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'dollar' => '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'package' => '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
];
$palette = [
    'green' => ['#4A8C3F', 'rgba(74,140,63,0.10)'],
    'amber' => ['#C4952A', 'rgba(196,149,42,0.12)'],
];
[$c, $bg] = $palette[$color] ?? $palette['green'];
$badgeC = $color === 'amber' ? ['rgba(196,149,42,0.14)', '#B5851F'] : ['rgba(74,140,63,0.10)', '#3A7030'];

$arts = [
    'plants' => '<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M40 74 C40 58 36 48 27 42"/><path d="M40 60 C33 59 28 55 26 48"/><path d="M40 52 C47 51 51 46 51 39"/><path d="M40 66 C35 65 31 62 30 56"/><path d="M40 44 C46 43 50 39 50 33"/><path d="M62 74 C62 64 66 57 73 54"/><path d="M62 63 C57 62 54 58 54 53"/><path d="M62 56 C67 55 70 52 71 47"/></g>',
    'goat'   => '<g fill="currentColor"><path d="M10 74 C6 70 7 64 11 65 C11 60 18 59 22 62 C24 58 31 58 36 62 C46 60 58 61 64 66 C66 60 72 57 76 61 C82 55 87 50 83 47 C90 52 90 64 81 69 C80 75 72 79 64 78 L64 96 L59 96 L59 78 L48 79 L48 96 L44 96 L44 78 L33 78 L33 96 L29 96 L29 77 C22 77 15 76 12 72 L12 96 L8 96 Z" opacity="0.85"/></g><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M96 96 L96 60 C96 54 100 50 106 50 C112 50 116 54 116 60 L116 96"/><circle cx="106" cy="42" r="6"/></g>',
    'chart'  => '<g fill="currentColor"><rect x="8" y="60" width="12" height="30" rx="2"/><rect x="26" y="48" width="12" height="42" rx="2"/><rect x="44" y="34" width="12" height="56" rx="2"/><rect x="62" y="20" width="12" height="70" rx="2"/></g><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 44 L26 36 L44 24 L70 10"/><path d="M58 10 L70 10 L70 22"/></g>',
];
@endphp

<div class="stat-card" style="border-bottom: 2.5px solid {{ $c }};">
    <div class="stat-corner-art {{ $artimg ? 'is-img' : '' }}" style="color: {{ $c }};">
        @if($artimg)
            <img src="{{ asset($artimg) }}" alt="" class="stat-corner-img" />
        @else
            <svg viewBox="0 0 120 96" aria-hidden="true">{!! $arts[$art] ?? $arts['plants'] !!}</svg>
        @endif
    </div>
    <div class="stat-top">
        <div class="stat-icon" style="background: {{ $bg }}; color: {{ $c }};">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $icons[$icon] ?? $icons['package'] !!}</svg>
        </div>
        @if($badge)
            <span class="stat-badge" style="background: {{ $badgeC[0] }}; color: {{ $badgeC[1] }};">
                @if($trend === 'up')
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
                @else
                    <span class="stat-badge-dot"></span>
                @endif
                {{ $badge }}
            </span>
        @endif
    </div>
    <div class="stat-number">{{ $value }}</div>
    <div class="stat-label">{{ $label }}</div>
</div>

<style>
.stat-card { position: relative; overflow: hidden; background: #fff; border: 1px solid #ECE7DC; border-radius: 16px; padding: 20px 22px 22px; box-shadow: 0 2px 10px rgba(26,26,26,0.04); transition: box-shadow 0.2s, transform 0.2s; }
.stat-card:hover { box-shadow: 0 8px 22px rgba(26,26,26,0.08); transform: translateY(-2px); }
.stat-corner-art { position: absolute; right: 12px; bottom: 6px; width: 78px; height: 62px; opacity: 0.13; pointer-events: none; }
.stat-corner-art svg { width: 100%; height: 100%; }
.stat-corner-art.is-img { width: 104px; height: 94px; right: 14px; bottom: 8px; opacity: 0.75; }
.stat-corner-img { width: 100%; height: 100%; object-fit: contain; object-position: bottom right; }
.stat-top { position: relative; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.stat-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.stat-icon svg { width: 22px; height: 22px; }
.stat-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; white-space: nowrap; }
.stat-badge svg { width: 12px; height: 12px; }
.stat-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.stat-number { position: relative; font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: #1A1A1A; line-height: 1.05; }
.stat-label { position: relative; font-size: 13px; color: #5A5A5A; margin-top: 4px; }
</style>
