<?php

namespace App\Http\Controllers\Telecalling;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;

class TelecallingController extends Controller
{
    public function index(Request $request)
    {
        $byStatus = fn (string $s) => Enquiry::where('status', $s)->count();

        $stats = [
            'new' => $byStatus('new'),
            'contacted' => $byStatus('contacted'),
            'converted' => $byStatus('converted'),
            'closed' => $byStatus('closed'),
            'total' => Enquiry::count(),
            'today' => Enquiry::whereDate('created_at', today())->count(),
        ];

        // Leads still needing a call (queue) + the latest leads overall.
        $queue = Enquiry::where('status', 'new')->latest()->take(6)->get();
        $recent = Enquiry::latest()->take(8)->get();

        return view('telecalling.dashboard', compact('stats', 'queue', 'recent'));
    }

    /** Placeholder pages for the other sidebar sections. */
    public function section(Request $request)
    {
        $key = str_replace('telecalling.', '', (string) $request->route()->getName());

        if ($key === 'farmers') {
            return view('telecalling.farmers', ['farmers' => $this->farmerList()]);
        }

        if ($key === 'orders') {
            $all = $this->orderList();
            $status = $request->query('status');
            $orders = ($status && $status !== 'All')
                ? array_values(array_filter($all, fn ($o) => $o['status'] === $status))
                : $all;

            return view('telecalling.orders', ['allOrders' => $all, 'orders' => $orders]);
        }

        if ($key === 'franchise') {
            $all = $this->franchiseList();
            $status = $request->query('status');
            $leads = ($status && $status !== 'All')
                ? array_values(array_filter($all, fn ($l) => $l['status'] === $status))
                : $all;

            return view('telecalling.franchise', ['allLeads' => $all, 'leads' => $leads]);
        }

        if ($key === 'telecalling') {
            return view('telecalling.telecalling', [
                'queue' => $this->callQueue(),
                'recent' => $this->recentCalls(),
            ]);
        }

        if ($key === 'complaints') {
            $all = $this->complaintList();
            $status = $request->query('status');
            $complaints = ($status && $status !== 'All')
                ? array_values(array_filter($all, fn ($c) => $c['status'] === $status))
                : $all;

            $open = count(array_filter($all, fn ($c) => $c['status'] === 'Open'));

            return view('telecalling.complaints', [
                'allComplaints' => $all,
                'complaints' => $complaints,
                'open' => $open,
            ]);
        }

        if ($key === 'delivery') {
            // Active deliveries = orders that are still on their way.
            $farmerLoc = collect($this->farmerList())->keyBy('name');
            $deliveries = collect($this->orderList())
                ->filter(fn ($o) => in_array($o['status'], ['In Transit', 'Pending', 'Confirmed'], true))
                ->map(fn ($o) => [
                    'id' => $o['id'],
                    'farmer' => $o['farmer'],
                    'location' => $farmerLoc[$o['farmer']]['location'] ?? '—',
                    'product' => $o['product'],
                    'status' => $o['status'],
                    'expected' => now()->addDay()->format('d M Y'),
                ])
                ->values()
                ->all();

            return view('telecalling.delivery', ['deliveries' => $deliveries]);
        }

        $titles = [
            'farmers' => 'Farmers',
            'orders' => 'Orders',
            'products' => 'Products',
            'delivery' => 'Delivery Tracking',
            'complaints' => 'Complaints',
            'telecalling' => 'Telecalling',
            'franchise' => 'Franchise Leads',
            'reports' => 'Reports',
            'settings' => 'Settings',
        ];

        return view('telecalling.section', [
            'sectionKey' => $key,
            'sectionTitle' => $titles[$key] ?? ucfirst($key),
        ]);
    }

    /** Demo farmer directory (from the telecalling design). */
    private function farmerList(): array
    {
        return [
            ['name' => 'Ramesh Kumar', 'phone' => '+91 98765 43210', 'location' => 'Mayurbhanj, Odisha', 'goats' => 42, 'orders' => 6, 'status' => 'Active'],
            ['name' => 'Sita Tudu', 'phone' => '+91 90123 44567', 'location' => 'Baripada, Odisha', 'goats' => 18, 'orders' => 3, 'status' => 'Active'],
            ['name' => 'Mohan Nayak', 'phone' => '+91 91234 56780', 'location' => 'Rairangpur, Odisha', 'goats' => 65, 'orders' => 9, 'status' => 'Active'],
            ['name' => 'Ganga Majhi', 'phone' => '+91 89012 33445', 'location' => 'Kendujhar, Odisha', 'goats' => 12, 'orders' => 2, 'status' => 'Inactive'],
            ['name' => 'Laxman Sahu', 'phone' => '+91 93456 78901', 'location' => 'Betnoti, Odisha', 'goats' => 30, 'orders' => 5, 'status' => 'Active'],
            ['name' => 'Suresh Kumar', 'phone' => '+91 98765 32109', 'location' => 'Mayurbhanj, Odisha', 'goats' => 8, 'orders' => 1, 'status' => 'Active'],
            ['name' => 'Anita Hembram', 'phone' => '+91 90876 54321', 'location' => 'Bangriposi, Odisha', 'goats' => 24, 'orders' => 4, 'status' => 'Active'],
            ['name' => 'Dilip Marndi', 'phone' => '+91 97654 12098', 'location' => 'Rairangpur, Odisha', 'goats' => 50, 'orders' => 7, 'status' => 'Active'],
        ];
    }

    /** Demo order list (from the telecalling design). */
    private function orderList(): array
    {
        return [
            ['id' => 'MS-2026-00482', 'farmer' => 'Ramesh Kumar', 'phone' => '+91 98765 43210', 'location' => 'Mayurbhanj, Odisha', 'product' => 'Goat Feed - 100 KG', 'qty' => '2 Bags', 'seller' => 'ABC Agro', 'amount' => 2400, 'payment' => 'Paid (Online)', 'status' => 'In Transit', 'date' => '01 Sep 2026, 09:20 AM'],
            ['id' => 'MS-2026-00481', 'farmer' => 'Sita Tudu', 'phone' => '+91 90123 44567', 'location' => 'Baripada, Odisha', 'product' => 'Goat Medicine', 'qty' => '1 Kit', 'seller' => 'ABC Agro', 'amount' => 1280, 'payment' => 'COD', 'status' => 'Issue Reported', 'date' => '01 Sep 2026, 08:10 AM'],
            ['id' => 'MS-2026-00480', 'farmer' => 'Mohan Nayak', 'phone' => '+91 91234 56780', 'location' => 'Rairangpur, Odisha', 'product' => 'Equipment Set', 'qty' => '1 Set', 'seller' => 'Coastal Traders', 'amount' => 3560, 'payment' => 'Paid (Online)', 'status' => 'Delivered', 'date' => '31 Aug 2026, 04:20 PM'],
            ['id' => 'MS-2026-00479', 'farmer' => 'Ganga Majhi', 'phone' => '+91 89012 33445', 'location' => 'Kendujhar, Odisha', 'product' => 'Mineral Mixture', 'qty' => '3 Packs', 'seller' => 'ABC Agro', 'amount' => 950, 'payment' => 'COD', 'status' => 'Pending', 'date' => '31 Aug 2026, 11:05 AM'],
            ['id' => 'MS-2026-00478', 'farmer' => 'Laxman Sahu', 'phone' => '+91 93456 78901', 'location' => 'Betnoti, Odisha', 'product' => 'Vaccination Kit', 'qty' => '1 Kit', 'seller' => 'Coastal Traders', 'amount' => 1750, 'payment' => 'Paid (Online)', 'status' => 'Confirmed', 'date' => '31 Aug 2026, 09:40 AM'],
            ['id' => 'MS-2026-00477', 'farmer' => 'Suresh Kumar', 'phone' => '+91 98765 32109', 'location' => 'Mayurbhanj, Odisha', 'product' => 'Goat Feed - 50 KG', 'qty' => '1 Bag', 'seller' => 'ABC Agro', 'amount' => 1200, 'payment' => 'COD', 'status' => 'Delivered', 'date' => '30 Aug 2026, 03:15 PM'],
            ['id' => 'MS-2026-00476', 'farmer' => 'Anita Hembram', 'phone' => '+91 90876 54321', 'location' => 'Bangriposi, Odisha', 'product' => 'Fodder Chopper', 'qty' => '1 Unit', 'seller' => 'Coastal Traders', 'amount' => 6200, 'payment' => 'Paid (Online)', 'status' => 'In Transit', 'date' => '30 Aug 2026, 10:00 AM'],
            ['id' => 'MS-2026-00475', 'farmer' => 'Dilip Marndi', 'phone' => '+91 97654 12098', 'location' => 'Rairangpur, Odisha', 'product' => 'Goat Shelter Kit', 'qty' => '1 Kit', 'seller' => 'ABC Agro', 'amount' => 14500, 'payment' => 'Pending', 'status' => 'Pending', 'date' => '29 Aug 2026, 01:30 PM'],
        ];
    }

    /** Demo complaints list (from the telecalling design). */
    private function complaintList(): array
    {
        return [
            ['id' => 'CMP-10245', 'farmer' => 'Ramesh Kumar', 'order' => 'MS-2026-00482', 'issue' => 'Product Not Received', 'priority' => 'High', 'status' => 'Open', 'date' => '01 Sep 2026, 10:05 AM', 'report' => 'My product was supposed to arrive yesterday but I haven\'t received anything.'],
            ['id' => 'CMP-10244', 'farmer' => 'Sita Tudu', 'order' => 'MS-2026-00481', 'issue' => 'Wrong Product Delivered', 'priority' => 'Medium', 'status' => 'In Progress', 'date' => '01 Sep 2026, 08:30 AM', 'report' => 'I ordered goat medicine but received a different item in the package.'],
            ['id' => 'CMP-10243', 'farmer' => 'Ganga Majhi', 'order' => 'MS-2026-00473', 'issue' => 'Damaged Packaging', 'priority' => 'Low', 'status' => 'Resolved', 'date' => '30 Aug 2026, 02:15 PM', 'report' => 'The outer packaging was torn and the mineral mixture had spilled a little.'],
            ['id' => 'CMP-10242', 'farmer' => 'Dilip Marndi', 'order' => 'MS-2026-00468', 'issue' => 'Delayed Delivery', 'priority' => 'Medium', 'status' => 'Resolved', 'date' => '29 Aug 2026, 11:40 AM', 'report' => 'My order took almost a week to reach me, much later than promised.'],
            ['id' => 'CMP-10241', 'farmer' => 'Anita Hembram', 'order' => 'MS-2026-00460', 'issue' => 'Billing Mismatch', 'priority' => 'High', 'status' => 'Open', 'date' => '28 Aug 2026, 04:50 PM', 'report' => 'I was charged more than the price shown when I placed the order.'],
        ];
    }

    /** Demo franchise leads pipeline (from the telecalling design). */
    private function franchiseList(): array
    {
        return [
            [
                'id' => 'FL-2026-00124', 'name' => 'Suresh Kumar', 'mobile' => '+91 98765 32109', 'location' => 'Mayurbhanj, Odisha',
                'investment' => '₹5-10 Lakhs', 'status' => 'Qualified', 'date' => '30 Aug 2026',
                'experience' => 'Beginner', 'land' => 'Yes (2 Acres)', 'farmSize' => '100-200 Goats', 'source' => 'Website', 'assigned' => 'Priya Singh',
                'next' => ['title' => 'Site Visit Scheduled', 'date' => '04 Sep 2026, 11:00 AM', 'location' => 'Mayurbhanj'],
                'notes' => 'Interested in starting a 150-goat farm. Wants support with shed construction and training.',
                'calls' => [
                    ['time' => '30 Aug 2026, 10:30 AM', 'by' => 'Priya Singh', 'activity' => 'Called', 'remarks' => 'Discussed investment and land availability.'],
                    ['time' => '30 Aug 2026, 03:20 PM', 'by' => 'System', 'activity' => 'Enquiry Received', 'remarks' => 'Lead submitted from website.'],
                    ['time' => '30 Aug 2026, 03:25 PM', 'by' => 'Priya Singh', 'activity' => 'WhatsApp Sent', 'remarks' => 'Sent franchise brochure.'],
                ],
            ],
            [
                'id' => 'FL-2026-00123', 'name' => 'Bijay Patra', 'mobile' => '+91 90876 11223', 'location' => 'Cuttack, Odisha',
                'investment' => '₹10-15 Lakhs', 'status' => 'Site Visit', 'date' => '29 Aug 2026',
                'experience' => 'Intermediate', 'land' => 'Yes (4 Acres)', 'farmSize' => '200-300 Goats', 'source' => 'Referral', 'assigned' => 'Priya Singh',
                'next' => ['title' => 'Site Visit Scheduled', 'date' => '05 Sep 2026, 12:30 PM', 'location' => 'Cuttack'],
                'notes' => 'Existing dairy farmer expanding into goat farming. Site inspection booked.',
                'calls' => [
                    ['time' => '29 Aug 2026, 11:15 AM', 'by' => 'Priya Singh', 'activity' => 'Called', 'remarks' => 'Confirmed site visit date.'],
                    ['time' => '29 Aug 2026, 09:00 AM', 'by' => 'System', 'activity' => 'Enquiry Received', 'remarks' => 'Lead added via referral.'],
                ],
            ],
            [
                'id' => 'FL-2026-00122', 'name' => 'Manoj Behera', 'mobile' => '+91 91234 77889', 'location' => 'Puri, Odisha',
                'investment' => '₹2-5 Lakhs', 'status' => 'Contacted', 'date' => '27 Aug 2026',
                'experience' => 'Beginner', 'land' => 'No', 'farmSize' => '50-100 Goats', 'source' => 'Facebook', 'assigned' => 'Priya Singh',
                'next' => ['title' => 'Follow-up Call', 'date' => '04 Sep 2026, 04:00 PM', 'location' => 'Phone'],
                'notes' => 'Needs guidance on arranging land. Follow-up scheduled to discuss options.',
                'calls' => [
                    ['time' => '27 Aug 2026, 02:40 PM', 'by' => 'Priya Singh', 'activity' => 'Called', 'remarks' => 'Explained franchise model and costs.'],
                    ['time' => '27 Aug 2026, 10:10 AM', 'by' => 'System', 'activity' => 'Enquiry Received', 'remarks' => 'Lead from Facebook campaign.'],
                ],
            ],
            [
                'id' => 'FL-2026-00121', 'name' => 'Rina Das', 'mobile' => '+91 89012 44556', 'location' => 'Bhubaneswar, Odisha',
                'investment' => '₹15-20 Lakhs', 'status' => 'New', 'date' => '26 Aug 2026',
                'experience' => 'Beginner', 'land' => 'Yes (5 Acres)', 'farmSize' => '300+ Goats', 'source' => 'Website', 'assigned' => 'Priya Singh',
                'next' => ['title' => 'First Call Pending', 'date' => 'To be scheduled', 'location' => 'Phone'],
                'notes' => 'High-investment lead, first call not yet made. Prioritise for callback.',
                'calls' => [
                    ['time' => '26 Aug 2026, 06:15 PM', 'by' => 'System', 'activity' => 'Enquiry Received', 'remarks' => 'Lead submitted from website.'],
                ],
            ],
            [
                'id' => 'FL-2026-00120', 'name' => 'Ajit Nayak', 'mobile' => '+91 97654 33221', 'location' => 'Balasore, Odisha',
                'investment' => '₹5-10 Lakhs', 'status' => 'Approved', 'date' => '20 Aug 2026',
                'experience' => 'Intermediate', 'land' => 'Yes (3 Acres)', 'farmSize' => '100-200 Goats', 'source' => 'Referral', 'assigned' => 'Priya Singh',
                'next' => ['title' => 'Franchise Onboarding', 'date' => '06 Sep 2026, 10:00 AM', 'location' => 'Balasore'],
                'notes' => 'Approved for franchise. Onboarding and agreement signing in progress.',
                'calls' => [
                    ['time' => '20 Aug 2026, 12:00 PM', 'by' => 'Priya Singh', 'activity' => 'Called', 'remarks' => 'Confirmed approval and next steps.'],
                    ['time' => '20 Aug 2026, 09:30 AM', 'by' => 'System', 'activity' => 'Approved', 'remarks' => 'Lead approved by management.'],
                ],
            ],
        ];
    }

    /** Franchise lead detail page. */
    public function franchiseDetail(Request $request, string $id)
    {
        $lead = collect($this->franchiseList())->firstWhere('id', $id);
        abort_if(! $lead, 404);

        // Lead journey — how far the lead has progressed through the pipeline.
        $steps = ['Enquiry Received', 'First Call Completed', 'Interested', 'Qualified', 'Documentation', 'Site Visit', 'Approval', 'Franchise Created'];
        $doneByStatus = ['New' => 1, 'Contacted' => 2, 'Qualified' => 4, 'Site Visit' => 6, 'Approved' => 8];
        $done = $doneByStatus[$lead['status']] ?? 1;

        return view('telecalling.franchise-detail', [
            'lead' => $lead,
            'steps' => $steps,
            'done' => $done,
        ]);
    }

    /** Today's call queue (from the telecalling design). */
    private function callQueue(): array
    {
        return [
            ['name' => 'Mohan Nayak', 'phone' => '+91 91234 56780', 'note' => 'Farmer callback due — asked about bulk feed pricing', 'tag' => 'Callback', 'due' => 'Due in 20 min'],
            ['name' => 'ABC Agro (Seller)', 'phone' => '+91 91234 56781', 'note' => 'Confirm dispatch for order MS-2026-00479', 'tag' => 'Seller Confirmation', 'due' => 'Due in 40 min'],
            ['name' => 'Ganga Majhi', 'phone' => '+91 89012 33445', 'note' => 'Follow up on complaint CMP-10243 resolution', 'tag' => 'Complaint Follow-up', 'due' => 'Due in 1 hr'],
            ['name' => 'Coastal Traders (Seller)', 'phone' => '+91 91234 56782', 'note' => 'Confirm dispatch for order MS-2026-00475', 'tag' => 'Seller Confirmation', 'due' => 'Due in 2 hr'],
            ['name' => 'Suresh Kumar', 'phone' => '+91 98765 32109', 'note' => 'New franchise lead — first call not yet made', 'tag' => 'Franchise Lead', 'due' => 'Today'],
        ];
    }

    /** Recent call history (from the telecalling design). */
    private function recentCalls(): array
    {
        return [
            ['name' => 'Ramesh Kumar', 'time' => '01 Sep, 10:30 AM', 'type' => 'Outgoing', 'duration' => '4m 12s'],
            ['name' => 'Sita Tudu', 'time' => '01 Sep, 09:15 AM', 'type' => 'Outgoing', 'duration' => '2m 40s'],
            ['name' => 'ABC Agro', 'time' => '31 Aug, 04:10 PM', 'type' => 'Outgoing', 'duration' => '1m 55s'],
            ['name' => 'Suresh Kumar', 'time' => '30 Aug, 03:20 PM', 'type' => 'Incoming', 'duration' => '6m 05s'],
            ['name' => 'Mohan Nayak', 'time' => '30 Aug, 11:00 AM', 'type' => 'Outgoing', 'duration' => '3m 30s'],
        ];
    }

    /** Order tracking detail page. */
    public function orderDetail(Request $request, string $id)
    {
        $order = collect($this->orderList())->firstWhere('id', $id);
        abort_if(! $order, 404);

        // Delivery journey — how far the order has progressed by status.
        $steps = ['Order Placed', 'Seller Confirmed', 'Product Packed', 'Dispatched', 'In Transit', 'Reached Local Hub', 'Delivered'];
        $currentByStatus = [
            'Pending' => 1, 'Confirmed' => 2, 'Issue Reported' => 5, 'In Transit' => 5, 'Delivered' => 7,
        ];
        $current = $currentByStatus[$order['status']] ?? 1;

        return view('telecalling.order-detail', [
            'order' => $order,
            'steps' => $steps,
            'current' => $current,
        ]);
    }

    /** Complaint detail page — what the farmer reported + resolution progress. */
    public function complaintDetail(Request $request, string $id)
    {
        $complaint = collect($this->complaintList())->firstWhere('id', $id);
        abort_if(! $complaint, 404);

        // Join in the farmer's contact details and the related order.
        $farmer = collect($this->farmerList())->firstWhere('name', $complaint['farmer']);
        $order = collect($this->orderList())->firstWhere('id', $complaint['order']);

        // How far the resolution has progressed, keyed by complaint status.
        $done = ['Open' => 2, 'In Progress' => 3, 'Resolved' => 5][$complaint['status']] ?? 2;
        $investDone = ['Open' => 1, 'In Progress' => 2, 'Resolved' => 3][$complaint['status']] ?? 1;

        $statusSteps = [
            ['label' => 'Farmer Reported', 'note' => $complaint['date']],
            ['label' => 'Telecaller Assigned (Priya)', 'note' => $complaint['date']],
            ['label' => 'Seller Contacted', 'note' => 'Pending'],
            ['label' => 'Resolution Confirmed', 'note' => 'Pending'],
            ['label' => 'Closed', 'note' => 'Pending'],
        ];

        $investSteps = [
            ['label' => 'Contacted Seller', 'note' => 'Confirmed receipt of complaint'],
            ['label' => 'Checked Tracking', 'note' => 'Pending'],
            ['label' => 'Resolution Applied', 'note' => 'Awaiting seller response'],
        ];

        return view('telecalling.complaint-detail', [
            'complaint' => $complaint,
            'farmer' => $farmer,
            'order' => $order,
            'statusSteps' => $statusSteps,
            'statusDone' => $done,
            'investSteps' => $investSteps,
            'investDone' => $investDone,
        ]);
    }
}
