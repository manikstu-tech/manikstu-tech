<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AwarenessInitiative;
use Illuminate\Http\Request;

class AwarenessController extends Controller
{
    public function index(Request $request)
    {
        $initiatives = AwarenessInitiative::when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->orderBy('order')
            ->paginate(15)
            ->withQueryString();

        return view('admin.awareness.index', compact('initiatives'));
    }

    public function create()
    {
        return view('admin.awareness.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        AwarenessInitiative::create($validated);

        return redirect()->route('admin.awareness.index')->with('success', 'Awareness initiative created.');
    }

    public function edit(AwarenessInitiative $initiative)
    {
        return view('admin.awareness.edit', compact('initiative'));
    }

    public function update(Request $request, AwarenessInitiative $initiative)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        $initiative->update($validated);

        return redirect()->route('admin.awareness.index')->with('success', 'Awareness initiative updated.');
    }

    public function destroy(AwarenessInitiative $initiative)
    {
        $initiative->delete();
        return redirect()->route('admin.awareness.index')->with('success', 'Awareness initiative deleted.');
    }
}
