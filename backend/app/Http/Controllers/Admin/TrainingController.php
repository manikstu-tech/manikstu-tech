<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TrainingProgram;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        $sortable = ['title' => 'title', 'order' => 'order', 'status' => 'is_active'];
        $sort = $request->sort;
        $dir = $request->dir === 'desc' ? 'desc' : 'asc';

        $programs = TrainingProgram::when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when(
                isset($sortable[$sort]),
                fn($q) => $q->orderBy($sortable[$sort], $dir),
                fn($q) => $q->orderBy('order'),
            )
            ->paginate(5)
            ->withQueryString();

        return view('admin.training.index', compact('programs'));
    }

    public function create()
    {
        return view('admin.training.create');
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

        TrainingProgram::create($validated);

        return redirect()->route('admin.training.index')->with('success', 'Training program created.');
    }

    public function edit(TrainingProgram $program)
    {
        return view('admin.training.edit', compact('program'));
    }

    public function update(Request $request, TrainingProgram $program)
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

        $program->update($validated);

        return redirect()->route('admin.training.index')->with('success', 'Training program updated.');
    }

    public function destroy(TrainingProgram $program)
    {
        $program->delete();
        return redirect()->route('admin.training.index')->with('success', 'Training program deleted.');
    }
}
