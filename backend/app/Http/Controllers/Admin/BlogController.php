<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = BlogPost::with('category')
            ->when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $s === 'published' ? $q->where('is_published', true) : $q->where('is_published', false))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.blog.index', compact('posts'));
    }

    public function create()
    {
        $categories = Category::where('type', 'blog')->active()->get();
        return view('admin.blog.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_published'] = $request->boolean('is_published');
        $validated['published_at'] = $request->boolean('is_published') ? now() : null;

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $post)
    {
        $categories = Category::where('type', 'blog')->active()->get();
        return view('admin.blog.edit', compact('post', 'categories'));
    }

    public function update(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $post->id,
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);
        $validated['is_featured'] = $request->boolean('is_featured');

        $wasPublished = $post->is_published;
        $validated['is_published'] = $request->boolean('is_published');
        if (!$wasPublished && $validated['is_published']) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $post)
    {
        $post->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted.');
    }
}
