<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $sortable = ['name' => 'name', 'category' => 'category', 'status' => 'is_active'];
        $sort = $request->sort;
        $dir = $request->dir === 'desc' ? 'desc' : 'asc';

        $partners = Partner::when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->category, fn($q, $c) => $q->where('category', $c))
            ->when(
                isset($sortable[$sort]),
                fn($q) => $q->orderBy($sortable[$sort], $dir),
                fn($q) => $q->orderBy('order'),
            )
            ->paginate(6)
            ->withQueryString();

        $categories = Partner::query()->whereNotNull('category')->distinct()->orderBy('category')->pluck('category');

        return view('admin.partners.index', compact('partners', 'categories'));
    }

    public function create()
    {
        return view('admin.partners.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        Partner::create($validated);

        return redirect()->route('admin.partners.index')->with('success', 'Partner created.');
    }

    public function edit(Partner $partner)
    {
        return view('admin.partners.edit', compact('partner'));
    }

    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        $partner->update($validated);

        return redirect()->route('admin.partners.index')->with('success', 'Partner updated.');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();
        return redirect()->route('admin.partners.index')->with('success', 'Partner deleted.');
    }
}
