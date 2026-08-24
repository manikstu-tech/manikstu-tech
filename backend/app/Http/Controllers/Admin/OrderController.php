<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('customer')
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->search, fn($q, $s) => $q->where('order_number', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.orders.index', compact('orders'));
    }

    public function create()
    {
        return view('admin.orders.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'total' => 'required|numeric|min:0',
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'required|in:unpaid,paid,refunded',
            'payment_method' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['order_number'] = 'ORD-' . strtoupper(uniqid());

        Order::create($validated);

        return redirect()->route('admin.orders.index')->with('success', 'Order created.');
    }

    public function edit(Order $order)
    {
        return view('admin.orders.edit', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'required|in:unpaid,paid,refunded',
            'payment_method' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.index')->with('success', 'Order updated.');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('admin.orders.index')->with('success', 'Order deleted.');
    }
}
