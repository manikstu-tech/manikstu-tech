@php $active = $curSort === $col; @endphp
<span class="sort-ico">
    <svg class="up {{ $active && $curDir === 'asc' ? '' : 'dim' }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    <svg class="down {{ $active && $curDir === 'desc' ? '' : 'dim' }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
</span>
