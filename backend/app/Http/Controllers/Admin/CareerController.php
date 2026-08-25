<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobOpening;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index(Request $request)
    {
        $sortable = ['title' => 'title', 'department' => 'department', 'status' => 'is_active'];
        $sort = $request->sort;
        $dir = $request->dir === 'desc' ? 'desc' : 'asc';

        $jobs = JobOpening::when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->department, fn($q, $d) => $q->where('department', $d))
            ->when(
                isset($sortable[$sort]),
                fn($q) => $q->orderBy($sortable[$sort], $dir),
                fn($q) => $q->oldest(),
            )
            ->paginate(5)
            ->withQueryString();

        return view('admin.careers.index', compact('jobs'));
    }

    public function create()
    {
        return view('admin.careers.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full_time,part_time,contract,internship',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_active' => 'boolean',
            'deadline' => 'nullable|date',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['requirements'] = $validated['requirements'] ? array_map('trim', explode("\n", $validated['requirements'])) : null;
        $validated['benefits'] = $validated['benefits'] ? array_map('trim', explode("\n", $validated['benefits'])) : null;

        JobOpening::create($validated);

        return redirect()->route('admin.careers.index')->with('success', 'Job opening created.');
    }

    public function edit(JobOpening $job)
    {
        return view('admin.careers.edit', compact('job'));
    }

    public function update(Request $request, JobOpening $job)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:full_time,part_time,contract,internship',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_active' => 'boolean',
            'deadline' => 'nullable|date',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['requirements'] = $validated['requirements'] ? array_map('trim', explode("\n", $validated['requirements'])) : null;
        $validated['benefits'] = $validated['benefits'] ? array_map('trim', explode("\n", $validated['benefits'])) : null;

        $job->update($validated);

        return redirect()->route('admin.careers.index')->with('success', 'Job opening updated.');
    }

    public function destroy(JobOpening $job)
    {
        $job->delete();
        return redirect()->route('admin.careers.index')->with('success', 'Job opening deleted.');
    }
}
