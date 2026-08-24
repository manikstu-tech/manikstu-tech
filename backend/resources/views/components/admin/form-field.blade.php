@props([
    'label' => '',
    'name' => '',
    'type' => 'text',
    'value' => null,
    'placeholder' => '',
    'required' => false,
    'help' => '',
    'options' => null,
    'rows' => 3,
])

<div class="form-field">
    @if($label)
        <label for="{{ $name }}" class="form-label">
            {{ $label }}
            @if($required)<span class="required">*</span>@endif
        </label>
    @endif

    @if($type === 'textarea')
        <textarea
            id="{{ $name }}"
            name="{{ $name }}"
            class="form-input form-textarea @error($name) is-error @enderror"
            placeholder="{{ $placeholder }}"
            @if($required) required @endif
            rows="{{ $rows }}"
        >{{ old($name, $value) }}</textarea>

    @elseif($type === 'select' && $options)
        <select
            id="{{ $name }}"
            name="{{ $name }}"
            class="form-input form-select @error($name) is-error @enderror"
            @if($required) required @endif
        >
            <option value="">{{ $placeholder ?: 'Select...' }}</option>
            @foreach($options as $optValue => $optLabel)
                <option value="{{ $optValue }}" {{ old($name, $value) == $optValue ? 'selected' : '' }}>
                    {{ $optLabel }}
                </option>
            @endforeach
        </select>

    @elseif($type === 'toggle')
        <label class="form-toggle">
            <input type="hidden" name="{{ $name }}" value="0">
            <input
                type="checkbox"
                name="{{ $name }}"
                id="{{ $name }}"
                value="1"
                {{ old($name, $value) ? 'checked' : '' }}
            >
            <span class="toggle-slider"></span>
        </label>

    @else
        <input
            type="{{ $type }}"
            id="{{ $name }}"
            name="{{ $name }}"
            value="{{ old($name, $value) }}"
            class="form-input @error($name) is-error @enderror"
            placeholder="{{ $placeholder }}"
            @if($required) required @endif
        >
    @endif

    @error($name)
        <p class="form-error">{{ $message }}</p>
    @enderror

    @if($help && !$errors->has($name))
        <p class="form-help">{{ $help }}</p>
    @endif
</div>

<style>
.form-field { margin-bottom: 20px; }
.form-label { display: block; font-size: 13px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
.form-label .required { color: #D4342C; margin-left: 2px; }
.form-input {
    width: 100%;
    height: 42px;
    padding: 0 14px;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    font-size: 13.5px;
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    background: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus { border-color: #4A8C3F; box-shadow: 0 0 0 3px rgba(74,140,63,0.08); }
.form-input.is-error { border-color: #D4342C; }
.form-input.is-error:focus { box-shadow: 0 0 0 3px rgba(212,52,44,0.08); }
.form-textarea { height: auto; padding: 12px 14px; resize: vertical; min-height: 100px; }
.form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; cursor: pointer; }
.form-error { font-size: 12px; color: #D4342C; margin-top: 4px; }
.form-help { font-size: 12px; color: #999; margin-top: 4px; }
.form-toggle { position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer; }
.form-toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; inset: 0; background: #E5E5E5; border-radius: 24px; transition: background 0.2s; }
.toggle-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
.form-toggle input:checked + .toggle-slider { background: #4A8C3F; }
.form-toggle input:checked + .toggle-slider::before { transform: translateX(20px); }
</style>
