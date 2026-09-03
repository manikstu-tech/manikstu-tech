<?php

namespace App\Http\Controllers\Telecalling;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;

class TelecallingController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'new' => Enquiry::where('status', 'new')->count(),
            'contacted' => Enquiry::where('status', 'contacted')->count(),
            'total' => Enquiry::count(),
        ];

        $leads = Enquiry::latest()
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('phone', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $st) => $q->where('status', $st))
            ->paginate(10)
            ->withQueryString();

        return view('telecalling.dashboard', compact('stats', 'leads'));
    }
}
