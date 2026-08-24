@props([
    'title' => 'No records found',
    'description' => 'There are no items to display yet.',
    'icon' => 'folder',
    'action' => null,
    'actionText' => 'Add New',
])

@php
$icons = [
    'folder' => '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/>',
    'plus' => '<path d="M12 5v14"/><path d="M5 12h14"/>',
    'search' => '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
];
@endphp

<div class="empty-state">
    <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{!! $icons[$icon] ?? $icons['folder'] !!}</svg>
    </div>
    <h3 class="empty-title">{{ $title }}</h3>
    <p class="empty-desc">{{ $description }}</p>
    @if($action)
        <a href="{{ $action }}" class="empty-action">{{ $actionText }}</a>
    @endif
</div>

<style>
.empty-state { padding: 48px 20px; text-align: center; }
.empty-icon { width: 56px; height: 56px; border-radius: 14px; background: rgba(74,140,63,0.06); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon svg { width: 26px; height: 26px; color: #4A8C3F; opacity: 0.6; }
.empty-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #1A1A1A; margin-bottom: 6px; }
.empty-desc { font-size: 13px; color: #999; margin-bottom: 16px; }
.empty-action { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; background: #4A8C3F; color: #fff; font-size: 13px; font-weight: 600; border-radius: 8px; text-decoration: none; transition: background 0.15s; }
.empty-action:hover { background: #3A7030; }
</style>
