@extends('admin.layouts.app')
@section('title', 'Order ' . $order->order_number)

@section('content')
@php
    use Illuminate\Support\Str;
    $statusMeta = [
        'pending'   => ['#B4711A', 'rgba(224,145,47,0.14)'],
        'confirmed' => ['#3E6FD0', 'rgba(91,141,239,0.14)'],
        'shipped'   => ['#7C4DD6', 'rgba(139,92,246,0.12)'],
        'delivered' => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'cancelled' => ['#CF3A32', 'rgba(212,52,44,0.10)'],
    ];
    $payMeta = [
        'paid'     => ['#3A7030', 'rgba(74,140,63,0.12)'],
        'unpaid'   => ['#B4711A', 'rgba(224,145,47,0.14)'],
        'refunded' => ['#5A5A5A', 'rgba(90,90,90,0.10)'],
    ];
    $st = strtolower($order->status);
    $pay = strtolower($order->payment_status);
    [$stx, $sbg] = $statusMeta[$st] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
    [$ptx, $pbg] = $payMeta[$pay] ?? ['#5A5A5A', 'rgba(90,90,90,0.10)'];
    $items = $order->items;
    $subtotal = $items->sum(fn ($i) => (float) $i->price * (int) $i->quantity);
    $itemCount = $items->sum('quantity');
    $galSrc = fn ($path) => $path ? (Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/' . $path)) : null;
    $cust = $order->customer;
    $initials = fn ($n) => strtoupper(implode('', array_map(fn ($w) => substr($w, 0, 1), array_slice(preg_split('/\s+/', trim((string) $n)) ?: [], 0, 2))));
@endphp

<div class="page-header">
    <div class="page-heading">
        <h1 class="page-title">Order {{ $order->order_number }}
            <span class="chip" style="background:{{ $sbg }};color:{{ $stx }};">{{ ucfirst($order->status) }}</span>
        </h1>
        <p class="page-subtitle">Placed on {{ $order->created_at->format('d M Y') }} at {{ $order->created_at->format('h:i A') }}</p>
    </div>
    <div class="header-actions">
        <a href="{{ route('admin.orders.index') }}" class="btn btn-light">← Back</a>
        <a href="{{ route('admin.orders.edit', $order) }}" class="btn btn-primary">Update Status</a>
    </div>
</div>

<div class="show-grid">
    <div class="show-main">
        <div class="card">
            <div class="card-header">Order Items ({{ $items->count() }})</div>
            @if($items->count())
                <div class="items-wrap">
                    <table class="items-table">
                        <thead>
                            <tr><th>Product</th><th class="ta-c">Qty</th><th class="ta-r">Unit Price</th><th class="ta-r">Total</th></tr>
                        </thead>
                        <tbody>
                            @foreach($items as $item)
                                @php
                                    $img = $galSrc($item->product->image ?? ($item->product->images[0] ?? null) ?? null);
                                    $line = (float) $item->price * (int) $item->quantity;
                                @endphp
                                <tr>
                                    <td>
                                        <div class="item-cell">
                                            @if($img)
                                                <img src="{{ $img }}" class="item-thumb" alt="" onerror="this.style.visibility='hidden'">
                                            @else
                                                <div class="item-thumb ph"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                                            @endif
                                            <div>
                                                <div class="item-name">
                                                    @if($item->product)
                                                        <a href="{{ route('admin.products.show', $item->product) }}">{{ $item->product_name ?: $item->product->name }}</a>
                                                    @else
                                                        {{ $item->product_name ?: 'Product' }}
                                                    @endif
                                                </div>
                                                @if($item->product && $item->product->sku)<div class="item-sku">SKU: {{ $item->product->sku }}</div>@endif
                                            </div>
                                        </div>
                                    </td>
                                    <td class="ta-c">{{ $item->quantity }}</td>
                                    <td class="ta-r">₹{{ number_format($item->price, 2) }}</td>
                                    <td class="ta-r"><strong>₹{{ number_format($line, 2) }}</strong></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @else
                <div class="pad empty-items">
                    <p>No line items are recorded for this order.</p>
                    <small>Items are attached automatically when an order is placed from the website checkout.</small>
                </div>
            @endif
        </div>

        @if($order->notes)
        <div class="card">
            <div class="card-header">Order Notes</div>
            <div class="pad"><p class="body-text">{{ $order->notes }}</p></div>
        </div>
        @endif
    </div>

    <div class="show-side">
        <div class="card">
            <div class="card-header">Summary</div>
            <div class="pad">
                <div class="kv"><span>Items</span><strong>{{ $itemCount }}</strong></div>
                @if($items->count())<div class="kv"><span>Subtotal</span><strong>₹{{ number_format($subtotal, 2) }}</strong></div>@endif
                <div class="kv total"><span>Order Total</span><strong>₹{{ number_format($order->total, 2) }}</strong></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">Status</div>
            <div class="pad">
                <div class="kv"><span>Order Status</span><span class="chip" style="background:{{ $sbg }};color:{{ $stx }};">{{ ucfirst($order->status) }}</span></div>
                <div class="kv"><span>Payment</span><span class="chip" style="background:{{ $pbg }};color:{{ $ptx }};">{{ ucfirst($order->payment_status) }}</span></div>
                <div class="kv"><span>Method</span><strong>{{ $order->payment_method ?: '—' }}</strong></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">Customer</div>
            <div class="pad">
                @if($cust)
                    <div class="cust-head">
                        <span class="cust-av">{{ $initials($cust->name) ?: 'G' }}</span>
                        <div>
                            <div class="cust-name">{{ $cust->name }}</div>
                            @if($cust->email)<div class="cust-sub">{{ $cust->email }}</div>@endif
                        </div>
                    </div>
                    @if($cust->phone)<div class="kv"><span>Phone</span><strong>{{ $cust->phone }}</strong></div>@endif
                    @php $addr = collect([$cust->address, $cust->city, $cust->state, $cust->pincode])->filter()->implode(', '); @endphp
                    @if($addr)<div class="kv addr"><span>Address</span><strong>{{ $addr }}</strong></div>@endif
                @else
                    <div class="cust-head">
                        <span class="cust-av">G</span>
                        <div><div class="cust-name">Guest customer</div><div class="cust-sub">No customer record linked</div></div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<style>
:root { --page-bg: #FBF6EC; }
.page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:22px; flex-wrap:wrap; }
.page-title { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.page-subtitle { font-size:13px; color:#5A5A5A; margin-top:6px; }
.header-actions { display:flex; gap:10px; }
.chip { font-size:11px; font-weight:700; padding:4px 11px; border-radius:9999px; white-space:nowrap; }
.btn { padding:11px 18px; border-radius:9px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; border:none; transition:all 0.15s; text-decoration:none; display:inline-flex; align-items:center; gap:6px; }
.btn-primary { background:#4A8C3F; color:#fff; } .btn-primary:hover { background:#3A7030; }
.btn-light { background:#fff; border:1px solid #E8E2D6; color:#5A5A5A; } .btn-light:hover { border-color:#D9D2C4; }

.show-grid { display:grid; grid-template-columns:1.7fr 1fr; gap:20px; align-items:start; }
.card { background:#fff; border:1px solid #EDE9E1; border-radius:14px; box-shadow:0 2px 10px rgba(26,26,26,0.04); margin-bottom:20px; overflow:hidden; }
.card-header { padding:14px 20px; border-bottom:1px solid #F0ECE2; background:#FBFAF7; font-family:'Playfair Display',serif; font-weight:700; font-size:15px; }
.pad { padding:20px; }
.body-text { font-size:14px; line-height:1.6; color:#3A3A3A; white-space:pre-line; }

.items-wrap { overflow-x:auto; }
.items-table { width:100%; border-collapse:collapse; }
.items-table th { padding:12px 20px; text-align:left; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#9A9A8E; border-bottom:1px solid #F0ECE2; background:#FCFBF8; }
.items-table td { padding:14px 20px; font-size:13.5px; color:#3A3A3A; border-bottom:1px solid #F4F1EB; vertical-align:middle; }
.items-table tbody tr:last-child td { border-bottom:none; }
.ta-c { text-align:center; } .ta-r { text-align:right; }
.item-cell { display:flex; align-items:center; gap:12px; }
.item-thumb { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #EDE9E1; background:#FAF6EC; flex-shrink:0; }
.item-thumb.ph { display:flex; align-items:center; justify-content:center; color:#C4B79A; }
.item-name a { color:#1A1A1A; font-weight:600; text-decoration:none; }
.item-name a:hover { color:#3A7030; text-decoration:underline; }
.item-sku { font-size:11.5px; color:#9A9A9A; margin-top:2px; }
.empty-items { text-align:center; color:#9A9A9A; }
.empty-items small { display:block; margin-top:6px; font-size:12px; }

.kv { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:9px 0; border-bottom:1px solid #F4F1EB; font-size:13.5px; }
.kv:last-child { border-bottom:none; }
.kv span { color:#8A8A8A; } .kv strong { color:#1A1A1A; font-weight:600; text-align:right; }
.kv.addr strong { max-width:60%; }
.kv.total { padding-top:12px; margin-top:4px; border-top:2px solid #F0ECE2; border-bottom:none; }
.kv.total span { color:#1A1A1A; font-weight:700; } .kv.total strong { color:#3A7030; font-size:17px; }

.cust-head { display:flex; align-items:center; gap:12px; padding-bottom:12px; margin-bottom:6px; border-bottom:1px solid #F4F1EB; }
.cust-av { width:42px; height:42px; border-radius:50%; background:#3A7030; color:#fff; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:700; flex-shrink:0; }
.cust-name { font-size:14px; font-weight:600; color:#1A1A1A; }
.cust-sub { font-size:12.5px; color:#9A9A9A; margin-top:2px; }

@media (max-width: 900px) { .show-grid { grid-template-columns:1fr; } }
</style>
@endsection
