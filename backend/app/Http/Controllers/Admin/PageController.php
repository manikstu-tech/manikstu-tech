<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageBlock;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function edit(Page $page)
    {
        $page->load('blocks');
        $existingPages = Page::all();
        return view('admin.pages.edit', compact('page', 'existingPages'));
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'is_published' => 'boolean',
        ]);

        $validated['is_published'] = $request->boolean('is_published');

        $page->update($validated);

        return redirect()->route('admin.pages.edit', $page)->with('success', 'Page updated.');
    }

    public function storeBlock(Request $request, Page $page)
    {
        $validated = $request->validate([
            'type' => 'required|in:hero,text,stats,cta,image,testimonials,partners',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'settings' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $validated['order'] = $validated['order'] ?? $page->blocks()->max('order') + 1;

        if (!empty($validated['settings'])) {
            $validated['settings'] = json_decode($validated['settings'], true);
        }

        $page->blocks()->create($validated);

        return redirect()->route('admin.pages.edit', $page)->with('success', 'Block added.');
    }

    public function destroyBlock(PageBlock $block)
    {
        $page = $block->page;
        $block->delete();
        return redirect()->route('admin.pages.edit', $page)->with('success', 'Block removed.');
    }

    public function reorderBlocks(Request $request)
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $index => $blockId) {
            PageBlock::where('id', $blockId)->update(['order' => $index]);
        }

        return response()->json(['success' => true]);
    }
}
