@extends('admin.layouts.app')
@section('title', 'Settings')

@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Site Settings</h1>
        <p class="page-subtitle">Manage your website configuration</p>
    </div>
</div>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<form method="POST" action="{{ route('admin.settings.update') }}">
    @csrf
    @method('PUT')

    <div class="settings-grid">
        <div class="card">
            <div class="card-header">General</div>
            <div class="card-body" style="padding:20px;">
                <x-admin.form-field label="Site Name" name="site_name" :value="$settings['site_name'] ?? ''" />
                <x-admin.form-field label="Tagline" name="site_tagline" :value="$settings['site_tagline'] ?? ''" />
                <x-admin.form-field label="Phone" name="phone" :value="$settings['phone'] ?? ''" />
                <x-admin.form-field label="Email" name="email" type="email" :value="$settings['email'] ?? ''" />
                <x-admin.form-field label="Secondary Email" name="secondary_email" type="email" :value="$settings['secondary_email'] ?? ''" />
                <x-admin.form-field label="WhatsApp" name="whatsapp" :value="$settings['whatsapp'] ?? ''" />
                <x-admin.form-field label="Address" name="address" type="textarea" :value="$settings['address'] ?? ''" :rows="3" />
            </div>
        </div>

        <div class="card">
            <div class="card-header">Social Media</div>
            <div class="card-body" style="padding:20px;">
                <x-admin.form-field label="Facebook URL" name="facebook" type="url" :value="$settings['facebook'] ?? ''" placeholder="https://facebook.com/..." />
                <x-admin.form-field label="Instagram URL" name="instagram" type="url" :value="$settings['instagram'] ?? ''" placeholder="https://instagram.com/..." />
                <x-admin.form-field label="LinkedIn URL" name="linkedin" type="url" :value="$settings['linkedin'] ?? ''" placeholder="https://linkedin.com/..." />
                <x-admin.form-field label="Twitter URL" name="twitter" type="url" :value="$settings['twitter'] ?? ''" placeholder="https://twitter.com/..." />
                <x-admin.form-field label="YouTube URL" name="youtube" type="url" :value="$settings['youtube'] ?? ''" placeholder="https://youtube.com/..." />
            </div>
        </div>

        <div class="card">
            <div class="card-header">Legal</div>
            <div class="card-body" style="padding:20px;">
                <x-admin.form-field label="GST Number" name="gst_number" :value="$settings['gst_number'] ?? ''" />
                <x-admin.form-field label="CIN Number" name="cin_number" :value="$settings['cin_number'] ?? ''" />
            </div>
        </div>

        <div class="card">
            <div class="card-header">Content</div>
            <div class="card-body" style="padding:20px;">
                <x-admin.form-field label="About Text" name="about_text" type="textarea" :value="$settings['about_text'] ?? ''" :rows="4" />
                <x-admin.form-field label="Footer Text" name="footer_text" type="textarea" :value="$settings['footer_text'] ?? ''" :rows="3" />
            </div>
        </div>
    </div>

    <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save Settings</button>
    </div>
</form>

<style>
.page-header { margin-bottom: 24px; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #1A1A1A; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.card { background: #fff; border: 1px solid #E5E5E5; border-radius: 12px; box-shadow: 0 2px 8px rgba(26,26,26,0.04); }
.card-header { padding: 16px 22px; border-bottom: 1px solid #E5E5E5; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #1A1A1A; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }
.form-actions { display: flex; gap: 10px; }
.btn { padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: all 0.15s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; }
.btn-primary:hover { background: #3A7030; }
.btn-secondary { background: #F5F5F5; color: #5A5A5A; border: 1px solid #E5E5E5; }
.btn-secondary:hover { background: #E5E5E5; }
.btn-danger { background: #D4342C; color: #fff; }
.btn-danger:hover { background: #b82e27; }
@media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }
</style>
@endsection
