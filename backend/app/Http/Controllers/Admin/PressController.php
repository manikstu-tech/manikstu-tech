<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PressRelease;
use App\Models\Category;
use App\Support\Sanitizer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PressController extends Controller
{
    public function index(Request $request)
    {
        $releases = PressRelease::with('category')
            ->when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $s === 'published' ? $q->where('is_published', true) : $q->where('is_published', false))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.press.index', compact('releases'));
    }

    public function create()
    {
        $categories = Category::where('type', 'blog')->active()->get();
        return view('admin.press.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:press_releases,slug',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $validated['content'] = Sanitizer::richText($validated['content']);
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);
        $validated['is_published'] = $request->boolean('is_published');
        $validated['published_at'] = $request->boolean('is_published') ? now() : null;

        PressRelease::create($validated);

        return redirect()->route('admin.press.index')->with('success', 'Press release created.');
    }

    public function edit(PressRelease $release)
    {
        $categories = Category::where('type', 'blog')->active()->get();
        return view('admin.press.edit', compact('release', 'categories'));
    }

    public function update(Request $request, PressRelease $release)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:press_releases,slug,' . $release->id,
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $validated['content'] = Sanitizer::richText($validated['content']);
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);
        $wasPublished = $release->is_published;
        $validated['is_published'] = $request->boolean('is_published');
        if (!$wasPublished && $validated['is_published']) {
            $validated['published_at'] = now();
        }

        $release->update($validated);

        return redirect()->route('admin.press.index')->with('success', 'Press release updated.');
    }

    public function destroy(PressRelease $release)
    {
        $release->delete();
        return redirect()->route('admin.press.index')->with('success', 'Press release deleted.');
    }
}
