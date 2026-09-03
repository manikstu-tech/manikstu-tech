@extends('telecalling.layouts.app')
@section('title', 'Settings')

@section('content')
@php $user = auth()->user(); @endphp

<div class="tc-toolbar">
    <div>
        <h1 class="tc-title">Settings</h1>
        <p class="tc-sub">Manage your profile, team and notification preferences.</p>
    </div>
</div>

{{-- Tabs --}}
<div class="tabs" role="tablist">
    <button type="button" class="tab active" data-tab="profile" onclick="showTab('profile', this)">Profile</button>
    <button type="button" class="tab" data-tab="notifications" onclick="showTab('notifications', this)">Notifications</button>
    <button type="button" class="tab" data-tab="team" onclick="showTab('team', this)">Team</button>
</div>

{{-- Profile panel --}}
<div class="tab-panel" data-panel="profile">
    <div class="card">
        <div class="card-head"><h3>Profile</h3></div>
        <div class="pad">
            @if(session('status'))
                <div class="alert-ok">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ session('status') }}
                </div>
            @endif
            <form method="POST" action="{{ route('telecalling.settings.profile') }}">
                @csrf
                @method('PUT')
                <div class="form-grid">
                    <div class="field">
                        <label>Full name</label>
                        <input type="text" name="name" value="{{ old('name', $user->name) }}" required />
                        @error('name')<span class="err">{{ $message }}</span>@enderror
                    </div>
                    <div class="field">
                        <label>Role</label>
                        <input type="text" value="{{ ucfirst($user->role) }}" readonly class="ro" />
                    </div>
                    <div class="field">
                        <label>Phone</label>
                        <input type="text" name="phone" value="{{ old('phone', $user->phone ?? '+91 98765 43210') }}" />
                        @error('phone')<span class="err">{{ $message }}</span>@enderror
                    </div>
                    <div class="field">
                        <label>Region</label>
                        <input type="text" name="region" value="{{ old('region', $user->region ?? 'Mayurbhanj, Odisha') }}" />
                        @error('region')<span class="err">{{ $message }}</span>@enderror
                    </div>
                </div>
                <button type="submit" class="btn-primary">Save changes</button>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-head"><h3>Notification preferences</h3></div>
        <div class="pref-list">
            @foreach($notifications as $i => $n)
                <div class="pref-row">
                    <div>
                        <p class="pref-label">{{ $n['label'] }}</p>
                        <p class="pref-desc">{{ $n['desc'] }}</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" {{ $n['on'] ? 'checked' : '' }} onchange="settToast('Preference updated')" />
                        <span class="slider"></span>
                    </label>
                </div>
            @endforeach
        </div>
    </div>
</div>

{{-- Notifications panel --}}
<div class="tab-panel" data-panel="notifications" hidden>
    <div class="card">
        <div class="card-head"><h3>Notification preferences</h3></div>
        <div class="pref-list">
            @foreach($notifications as $n)
                <div class="pref-row">
                    <div>
                        <p class="pref-label">{{ $n['label'] }}</p>
                        <p class="pref-desc">{{ $n['desc'] }}</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" {{ $n['on'] ? 'checked' : '' }} onchange="settToast('Preference updated')" />
                        <span class="slider"></span>
                    </label>
                </div>
            @endforeach
        </div>
    </div>
</div>

{{-- Team panel --}}
<div class="tab-panel" data-panel="team" hidden>
    <div class="card">
        <div class="card-head"><h3>Team members</h3></div>
        <div class="tc-table-wrap">
            <table class="tc-table">
                <thead>
                    <tr><th>Name</th><th>Role</th><th>Region</th><th>Status</th></tr>
                </thead>
                <tbody>
                    @foreach($team as $m)
                        <tr>
                            <td class="strong">{{ $m['name'] }}</td>
                            <td>{{ $m['role'] }}</td>
                            <td>{{ $m['region'] }}</td>
                            <td>
                                <span class="tc-badge" style="background:{{ $m['status'] === 'Active' ? 'rgba(74,140,63,0.12)' : 'rgba(196,149,42,0.14)' }};color:{{ $m['status'] === 'Active' ? '#3A7030' : '#B4711A' }};">{{ $m['status'] }}</span>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="sett-toast" class="sett-toast"></div>

<script>
function showTab(name, btn) {
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.hidden = (p.dataset.panel !== name); });
}
function settToast(msg) {
    var t = document.getElementById('sett-toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2000);
    return false;
}
</script>

<style>
.tc-toolbar { margin-bottom:18px; }
.tc-title { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; }
.tc-sub { font-size:13.5px; color:#5A5A5A; margin-top:4px; }

.tabs { display:flex; gap:6px; border-bottom:1px solid #EAE4D6; margin-bottom:20px; }
.tab { padding:11px 20px; font-size:13.5px; font-weight:600; color:#7A7A7A; background:transparent; border:1px solid transparent; border-bottom:none; border-radius:8px 8px 0 0; cursor:pointer; margin-bottom:-1px; transition:all .15s; }
.tab:hover { color:#3A7030; }
.tab.active { color:#3A7030; background:#fff; border-color:#EAE4D6; border-bottom:2px solid #4A8C3F; }

.card { background:#fff; border:1px solid #EDE9E1; border-radius:16px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-head { padding:16px 22px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; position:relative; }
.card-head::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#C4952A; }
.card-head h3 { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; }
.pad { padding:24px 22px; }

.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px 24px; margin-bottom:22px; }
.field { display:flex; flex-direction:column; gap:7px; }
.field label { font-size:12.5px; color:#7A7A7A; font-weight:500; }
.field input { border:1px solid #E3DECF; border-radius:10px; padding:12px 14px; font-size:14px; background:#fff; color:#1A1A1A; }
.field input:focus { outline:none; border-color:#4A8C3F; box-shadow:0 0 0 3px rgba(74,140,63,0.10); }
.field input.ro { background:#F6F4EF; color:#8A8A8A; }
.btn-primary { background:#4A8C3F; color:#fff; border:none; border-radius:10px; padding:12px 24px; font-size:13.5px; font-weight:700; cursor:pointer; transition:background .15s; }
.btn-primary:hover { background:#3A7030; }
.alert-ok { display:flex; align-items:center; gap:9px; background:rgba(74,140,63,0.10); border:1px solid rgba(74,140,63,0.30); color:#3A7030; font-size:13.5px; font-weight:600; padding:12px 16px; border-radius:10px; margin-bottom:20px; }
.alert-ok svg { width:17px; height:17px; flex-shrink:0; }
.err { font-size:12px; color:#D4342C; margin-top:2px; }

.pref-list { padding:6px 22px; }
.pref-row { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 0; border-bottom:1px solid #F2EFEA; }
.pref-row:last-child { border-bottom:none; }
.pref-label { font-size:14px; font-weight:600; color:#1A1A1A; }
.pref-desc { font-size:12.5px; color:#9A9A9A; margin-top:3px; }

.switch { position:relative; display:inline-block; width:46px; height:26px; flex-shrink:0; }
.switch input { opacity:0; width:0; height:0; }
.slider { position:absolute; inset:0; background:#DCD6C8; border-radius:9999px; transition:.2s; cursor:pointer; }
.slider::before { content:''; position:absolute; height:20px; width:20px; left:3px; top:3px; background:#fff; border-radius:50%; transition:.2s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
.switch input:checked + .slider { background:#4A8C3F; }
.switch input:checked + .slider::before { transform:translateX(20px); }

.tc-table-wrap { overflow-x:auto; }
.tc-table { width:100%; border-collapse:collapse; }
.tc-table th { text-align:left; padding:14px 20px; color:#9A9A8E; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid #EDE9E1; background:#FBFAF7; white-space:nowrap; }
.tc-table td { padding:15px 20px; border-bottom:1px solid #F2EFEA; font-size:13.5px; color:#1A1A1A; }
.tc-table tbody tr:last-child td { border-bottom:none; }
.tc-table tbody tr:hover { background:#FCFBF9; }
.tc-table .strong { font-weight:700; }
.tc-badge { display:inline-flex; font-size:11px; font-weight:600; padding:4px 11px; border-radius:9999px; }

.sett-toast { position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(20px); background:#2A2A2A; color:#fff; font-size:13px; font-weight:600; padding:11px 18px; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:9999; }
.sett-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

@media (max-width:760px){ .form-grid { grid-template-columns:1fr; } }
</style>
@endsection
