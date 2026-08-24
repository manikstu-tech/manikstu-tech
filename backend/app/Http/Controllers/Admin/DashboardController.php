<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\BlogPost;
use App\Models\Enquiry;
use App\Models\Order;
use App\Models\Customer;
use App\Models\TeamMember;
use App\Models\JobOpening;
use App\Models\Partner;
use App\Models\Testimonial;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products' => Product::count(),
            'orders' => Order::count(),
            'enquiries' => Enquiry::where('status', 'new')->count(),
            'revenue' => Order::where('payment_status', 'paid')->sum('total'),
            'blog_posts' => BlogPost::count(),
            'team_members' => TeamMember::count(),
            'customers' => Customer::count(),
            'job_openings' => JobOpening::active()->count(),
        ];

        $recentEnquiries = Enquiry::latest()->take(5)->get();
        $recentOrders = Order::with('customer')->latest()->take(5)->get();
        $recentBlog = BlogPost::latest('created_at')->take(3)->get();

        return view('admin.dashboard', compact('stats', 'recentEnquiries', 'recentOrders', 'recentBlog'));
    }
}
