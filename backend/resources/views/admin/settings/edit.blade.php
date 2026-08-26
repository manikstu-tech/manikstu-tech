@extends('admin.layouts.app')
@section('title', 'Settings')

@section('content')
<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Site Settings<svg class="title-sprig" viewBox="0 0 24 24" fill="none" stroke="#C4952A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></h1>
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
                <x-admin.form-field label="Facebook URL" name="facebook" :value="$settings['facebook'] ?? ''" />
                <x-admin.form-field label="Instagram URL" name="instagram" :value="$settings['instagram'] ?? ''" />
                <x-admin.form-field label="LinkedIn URL" name="linkedin" :value="$settings['linkedin'] ?? ''" />
                <x-admin.form-field label="Twitter URL" name="twitter" :value="$settings['twitter'] ?? ''" />
                <x-admin.form-field label="YouTube URL" name="youtube" :value="$settings['youtube'] ?? ''" />
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
:root { --page-bg: #FBF6EC; } /* warm cream page to match the villagescape theme */
.page-header { margin-bottom: 24px; }
.page-heading { animation: fadeDown 0.5s ease both; }
.page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #1A1A1A; display: inline-flex; align-items: center; gap: 9px; line-height: 1.1; }
.title-sprig { width: 24px; height: 24px; flex-shrink: 0; transform: rotate(8deg); transform-origin: bottom left; animation: sprigWave 3.2s ease-in-out 0.5s infinite; }
.page-subtitle { font-size: 14px; color: #5A5A5A; margin-top: 4px; }
.settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.card { background: #fff; border: 1px solid #EDE9E1; border-radius: 14px; box-shadow: 0 2px 10px rgba(26,26,26,0.04); overflow: hidden; opacity: 0; animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
.card:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(26,26,26,0.08); border-color: #E0D8C6; }
.settings-grid .card:nth-child(1) { animation-delay: 0.05s; }
.settings-grid .card:nth-child(2) { animation-delay: 0.13s; }
.settings-grid .card:nth-child(3) { animation-delay: 0.21s; }
.settings-grid .card:nth-child(4) { animation-delay: 0.29s; }
.card-header { padding: 16px 22px; border-bottom: 1px solid #F0ECE2; background: #FBFAF7; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #1A1A1A; position: relative; }
.card-header::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; border-radius: 0 3px 3px 0; background: #C4952A; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 500; margin-bottom: 20px; animation: fadeDown 0.4s ease both; }
.alert-success { background: rgba(74,140,63,0.08); color: #3A7030; border: 1px solid rgba(74,140,63,0.15); }
.form-actions { display: flex; gap: 10px; animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
.btn { padding: 12px 26px; border-radius: 10px; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.btn-primary { background: #4A8C3F; color: #fff; box-shadow: 0 4px 12px rgba(58,112,48,0.22); }
.btn-primary:hover { background: #3A7030; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(58,112,48,0.28); }
.btn-primary:active { transform: translateY(0); box-shadow: 0 3px 8px rgba(58,112,48,0.22); }
.btn-secondary { background: #F5F5F5; color: #5A5A5A; border: 1px solid #E5E5E5; }
.btn-secondary:hover { background: #E5E5E5; }
.btn-danger { background: #D4342C; color: #fff; }
.btn-danger:hover { background: #b82e27; }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes sprigWave { 0%, 100% { transform: rotate(8deg); } 50% { transform: rotate(-6deg); } }
@media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .card, .page-heading, .form-actions, .alert, .title-sprig { animation: none !important; opacity: 1 !important; } }
</style>
@endsection
