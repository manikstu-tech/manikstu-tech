@props([
    'name' => 'content',
    'label' => 'Content',
    'value' => '',
    'required' => false,
])

<div class="rich-text-field">
    <label class="form-label">
        {{ $label }}
        @if($required)<span class="required">*</span>@endif
    </label>
    <div id="quill-{{ $name }}" class="rich-editor">{!! old($name, $value) !!}</div>
    <input type="hidden" name="{{ $name }}" id="hidden-{{ $name }}">
    @error($name)
        <p class="form-error">{{ $message }}</p>
    @enderror
</div>

<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const quill = new Quill('#quill-{{ $name }}', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'link', 'image'],
                [{ align: [] }],
                ['clean']
            ]
        },
        placeholder: 'Write something...'
    });

    const hidden = document.getElementById('hidden-{{ $name }}');
    quill.on('text-change', function() { hidden.value = quill.root.innerHTML; });
    hidden.value = quill.root.innerHTML;
});
</script>

<style>
.rich-editor { min-height: 200px; border: 1px solid #E5E5E5; border-radius: 8px; background: #fff; }
.rich-editor .ql-toolbar { border: none; border-bottom: 1px solid #E5E5E5; border-radius: 8px 8px 0 0; background: #FAFAFA; }
.rich-editor .ql-container { border: none; font-family: 'Inter', sans-serif; font-size: 13.5px; }
.rich-editor .ql-editor { min-height: 180px; padding: 14px; }
.rich-editor .ql-editor.ql-blank::before { color: #999; font-style: normal; }
</style>
