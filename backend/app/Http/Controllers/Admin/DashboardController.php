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
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Selected date (defaults to today); everything below is reported "as of" this date.
        try {
            $selectedDate = $request->filled('date')
                ? Carbon::parse($request->query('date'))
                : Carbon::now();
        } catch (\Exception $e) {
            $selectedDate = Carbon::now();
        }
        if ($selectedDate->isFuture()) {
            $selectedDate = Carbon::now();
        }
        $asOf = $selectedDate->copy()->endOfDay();

        $stats = [
            'products' => Product::where('created_at', '<=', $asOf)->count(),
            'orders' => Order::where('created_at', '<=', $asOf)->count(),
            'enquiries' => Enquiry::where('status', 'new')->where('created_at', '<=', $asOf)->count(),
            'revenue' => Order::where('payment_status', 'paid')->where('created_at', '<=', $asOf)->sum('total'),
            'blog_posts' => BlogPost::where('created_at', '<=', $asOf)->count(),
            'team_members' => TeamMember::where('created_at', '<=', $asOf)->count(),
            'customers' => Customer::where('created_at', '<=', $asOf)->count(),
            'job_openings' => JobOpening::active()->where('created_at', '<=', $asOf)->count(),
        ];

        $recentEnquiries = Enquiry::where('created_at', '<=', $asOf)->latest()->take(12)->get();
        $recentOrders = Order::with('customer')->where('created_at', '<=', $asOf)->latest()->take(5)->get();
        $recentBlog = BlogPost::where('created_at', '<=', $asOf)->latest('created_at')->take(3)->get();

        return view('admin.dashboard', compact('stats', 'recentEnquiries', 'recentOrders', 'recentBlog', 'selectedDate'));
    }
}
