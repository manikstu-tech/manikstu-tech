@props([
    'id' => 'deleteModal',
    'title' => 'Confirm Delete',
    'message' => 'Are you sure you want to delete this? This action cannot be undone.',
])

<div class="modal-overlay" id="{{ $id }}" style="display:none;">
    <div class="modal-box">
        <div class="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        </div>
        <h3 class="modal-title">{{ $title }}</h3>
        <p class="modal-message">{{ $message }}</p>
        <div class="modal-actions">
            <button type="button" class="modal-btn modal-btn-cancel" onclick="closeModal('{{ $id }}')">Cancel</button>
            <form id="{{ $id }}-form" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="modal-btn modal-btn-delete">Delete</button>
            </form>
        </div>
    </div>
</div>

<style>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: #fff; border-radius: 14px; padding: 28px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
.modal-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(212,52,44,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.modal-icon svg { width: 24px; height: 24px; color: #D4342C; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1A1A1A; margin-bottom: 8px; }
.modal-message { font-size: 13.5px; color: #5A5A5A; line-height: 1.5; margin-bottom: 24px; }
.modal-actions { display: flex; gap: 10px; justify-content: center; }
.modal-btn { padding: 9px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; }
.modal-btn-cancel { background: #F5F5F5; color: #5A5A5A; }
.modal-btn-cancel:hover { background: #E5E5E5; }
.modal-btn-delete { background: #D4342C; color: #fff; }
.modal-btn-delete:hover { background: #b82e27; }
</style>

<script>
function openModal(id, url) {
    const modal = document.getElementById(id);
    const form = document.getElementById(id + '-form');
    if (modal) modal.style.display = 'flex';
    if (form) form.action = url;
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.modal-overlay').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    });
});
</script>
