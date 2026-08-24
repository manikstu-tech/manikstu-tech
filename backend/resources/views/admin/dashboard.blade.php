@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="mb-6">
    <div class="flex items-center gap-2">
        <span class="h-px w-10 bg-manikstu-gold/60"></span>
        <span class="h-1.5 w-1.5 rotate-45 bg-manikstu-gold"></span>
        <h1 class="font-heading text-2xl font-bold text-charcoal">Dashboard</h1>
        <span class="h-1.5 w-1.5 rotate-45 bg-manikstu-gold"></span>
        <span class="h-px w-10 bg-manikstu-gold/60"></span>
    </div>
    <p class="text-sm text-grey mt-1">Welcome back, {{ Auth::user()->name }}. Here is what's happening today.</p>
</div>

<!-- Stat Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    
    <!-- Products -->
    <div class="rounded-xl border border-light-grey bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
            <div class="h-12 w-12 rounded-full bg-manikstu-green/10 flex items-center justify-center text-manikstu-green">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+2 this week</span>
        </div>
        <h2 class="font-heading text-3xl font-bold text-charcoal mt-4">12</h2>
        <p class="text-sm text-grey mt-1">Total Products</p>
    </div>
    
    <!-- Orders -->
    <div class="rounded-xl border border-light-grey bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
            <div class="h-12 w-12 rounded-full bg-manikstu-green/10 flex items-center justify-center text-manikstu-green">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
        </div>
        <h2 class="font-heading text-3xl font-bold text-charcoal mt-4">48</h2>
        <p class="text-sm text-grey mt-1">Total Orders</p>
    </div>
    
    <!-- Enquiries -->
    <div class="rounded-xl border border-light-grey bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
            <div class="h-12 w-12 rounded-full bg-manikstu-green/10 flex items-center justify-center text-manikstu-green">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">5 pending</span>
        </div>
        <h2 class="font-heading text-3xl font-bold text-charcoal mt-4">23</h2>
        <p class="text-sm text-grey mt-1">Active Enquiries</p>
    </div>
    
    <!-- Revenue -->
    <div class="rounded-xl border border-light-grey bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
            <div class="h-12 w-12 rounded-full bg-manikstu-green/10 flex items-center justify-center text-manikstu-green">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+18%</span>
        </div>
        <h2 class="font-heading text-3xl font-bold text-charcoal mt-4">₹5.2L</h2>
        <p class="text-sm text-grey mt-1">Total Revenue</p>
    </div>

</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Recent Activity -->
    <div class="lg:col-span-2">
        <h3 class="font-heading text-lg font-bold text-charcoal mb-4">Recent Activity</h3>
        <div class="rounded-xl border border-light-grey bg-white shadow-sm overflow-hidden">
            <div class="flex items-center gap-3 px-6 py-4 border-b border-light-grey">
                <span class="h-2.5 w-2.5 rounded-full bg-manikstu-green"></span>
                <div>
                    <p class="text-sm font-medium text-charcoal">New enquiry received from Rourkela</p>
                    <p class="text-xs text-grey">Goat farming consultation enquiry</p>
                </div>
                <span class="text-xs text-grey ml-auto">2 mins ago</span>
            </div>
            <div class="flex items-center gap-3 px-6 py-4 border-b border-light-grey">
                <span class="h-2.5 w-2.5 rounded-full bg-manikstu-gold"></span>
                <div>
                    <p class="text-sm font-medium text-charcoal">Order #1042 status updated to Shipped</p>
                    <p class="text-xs text-grey">Customer: Abinash Behera</p>
                </div>
                <span class="text-xs text-grey ml-auto">15 mins ago</span>
            </div>
            <div class="flex items-center gap-3 px-6 py-4 border-b border-light-grey">
                <span class="h-2.5 w-2.5 rounded-full bg-manikstu-green"></span>
                <div>
                    <p class="text-sm font-medium text-charcoal">New blog post published</p>
                    <p class="text-xs text-grey">"Goat Farming Best Practices for 2026"</p>
                </div>
                <span class="text-xs text-grey ml-auto">1 hour ago</span>
            </div>
            <div class="flex items-center gap-3 px-6 py-4">
                <span class="h-2.5 w-2.5 rounded-full bg-manikstu-gold"></span>
                <div>
                    <p class="text-sm font-medium text-charcoal">New customer registered</p>
                    <p class="text-xs text-grey">Samira Bhoi (Jagatsinghpur)</p>
                </div>
                <span class="text-xs text-grey ml-auto">3 hours ago</span>
            </div>
        </div>
    </div>
    
    <!-- Quick Actions -->
    <div>
        <h3 class="font-heading text-lg font-bold text-charcoal mb-4">Quick Actions</h3>
        <div class="rounded-xl border border-light-grey bg-white p-6 shadow-sm space-y-3">
            <a href="#" class="flex items-center justify-between p-3 rounded-lg border border-light-grey hover:border-manikstu-green hover:bg-manikstu-cream/35 transition-all group">
                <span class="text-sm font-semibold text-charcoal group-hover:text-manikstu-green">+ Add New Product</span>
                <svg class="h-4 w-4 text-grey group-hover:text-manikstu-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="flex items-center justify-between p-3 rounded-lg border border-light-grey hover:border-manikstu-green hover:bg-manikstu-cream/35 transition-all group">
                <span class="text-sm font-semibold text-charcoal group-hover:text-manikstu-green">+ Create Blog Post</span>
                <svg class="h-4 w-4 text-grey group-hover:text-manikstu-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="flex items-center justify-between p-3 rounded-lg border border-light-grey hover:border-manikstu-green hover:bg-manikstu-cream/35 transition-all group">
                <span class="text-sm font-semibold text-charcoal group-hover:text-manikstu-green">View All Enquiries</span>
                <svg class="h-4 w-4 text-grey group-hover:text-manikstu-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#" class="flex items-center justify-between p-3 rounded-lg border border-light-grey hover:border-manikstu-green hover:bg-manikstu-cream/35 transition-all group">
                <span class="text-sm font-semibold text-charcoal group-hover:text-manikstu-green">Manage Settings</span>
                <svg class="h-4 w-4 text-grey group-hover:text-manikstu-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </div>
    </div>

</div>
@endsection