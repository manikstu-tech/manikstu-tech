@extends('admin.layouts.app')
@section('title', 'Enquiry Details')
@section('content')
<div class="page-header"><div><h1 class="page-title">Enquiry from {{ $enquiry->name }}</h1><p class="page-subtitle">{{ $enquiry->created_at->format('M d, Y \a\t g:i A') }}</p></div><a href="{{ route('admin.enquiries.index') }}" class="btn btn-secondary">Back</a></div>
<div class="detail-card">
    <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">{{ $enquiry->name }}</span></div>
    <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value"><a href="mailto:{{ $enquiry->email }}" style="color:#4A8C3F;">{{ $enquiry->email }}</a></span></div>
    <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">{{ $enquiry->phone ?? '—' }}</span></div>
    <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value"><x-admin.badge type="blue">{{ ucfirst($enquiry->type) }}</x-admin.badge></span></div>
    <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><x-admin.badge :type="$enquiry->status === 'new' ? 'gold' : ($enquiry->status === 'replied' ? 'green' : 'default')" dot>{{ ucfirst($enquiry->status) }}</x-admin.badge></span></div>
    <div class="detail-row" style="align-items:flex-start;"><span class="detail-label">Message</span><span class="detail-value" style="white-space:pre-wrap;">{{ $enquiry->message }}</span></div>
</div>
<style>.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.page-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:700}.page-subtitle{font-size:14px;color:#5A5A5A;margin-top:4px}.detail-card{background:#fff;border:1px solid #E5E5E5;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(26,26,26,0.04)}.detail-row{display:flex;gap:16px;padding:14px 0;border-bottom:1px solid #F0F0F0}.detail-row:last-child{border-bottom:none}.detail-label{width:120px;font-size:13px;font-weight:600;color:#5A5A5A;flex-shrink:0}.detail-value{font-size:13.5px;color:#1A1A1A}.btn{padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.btn-secondary{background:#F5F5F5;color:#5A5A5A;border:1px solid #E5E5E5}.btn-secondary:hover{background:#E5E5E5}</style>
@endsection
