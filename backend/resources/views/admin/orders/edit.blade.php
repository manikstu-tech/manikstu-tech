@extends('admin.layouts.app')
@section('title', 'Edit Order')
@section('content')
<div class="page-header"><h1 class="page-title">Edit Order #{{ $order->order_number }}</h1></div>
@if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e) {{ $e }} @endforeach</div>@endif
<form method="POST" action="{{ route('admin.orders.update', $order) }}">
    @csrf @method('PUT')
    <div class="form-card">
        <x-admin.form-field label="Status" name="status" type="select" :options="['pending'=>'Pending','confirmed'=>'Confirmed','shipped'=>'Shipped','delivered'=>'Delivered','cancelled'=>'Cancelled']" :value="$order->status" required />
        <x-admin.form-field label="Payment Status" name="payment_status" type="select" :options="['unpaid'=>'Unpaid','paid'=>'Paid','refunded'=>'Refunded']" :value="$order->payment_status" required />
        <x-admin.form-field label="Payment Method" name="payment_method" :value="$order->payment_method" />
        <x-admin.form-field label="Notes" name="notes" type="textarea" :value="$order->notes" :rows="3" />
    </div>
    <div class="form-actions"><a href="{{ route('admin.orders.index') }}" class="btn btn-secondary">Cancel</a><button type="submit" class="btn btn-primary">Update</button></div>
</form>
<style>.page-header{margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.form-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(26,26,26,0.04);margin-bottom:20px}.alert{padding:12px 16px;border-radius:8px;font-size:13.5px;font-weight:500;margin-bottom:20px}.alert-danger{background:rgba(212,52,44,0.08);color:#D4342C;border:1px solid rgba(212,52,44,0.15)}.form-actions{display:flex;gap:10px}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-primary{background:#4A8C3F;color:#fff}.btn-primary:hover{background:#3A7030}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}</style>
@endsection
