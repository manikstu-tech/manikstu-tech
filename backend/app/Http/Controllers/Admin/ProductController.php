<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('sku', 'like', "%{$s}%"))
            ->when($request->category, fn($q, $c) => $q->where('category_id', $c))
            ->when($request->status === 'published', fn($q) => $q->where('is_active', true))
            ->when($request->status === 'draft', fn($q) => $q->where('is_active', false))
            ->when($request->status === 'featured', fn($q) => $q->where('is_featured', true))
            ->orderBy('order')
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::where('type', 'product')->orderBy('name')->get();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function show(Product $product)
    {
        $product->load('category', 'translations');
        return view('admin.products.show', compact('product'));
    }

    public function create()
    {
        $categories = Category::where('type', 'product')->active()->orderBy('name')->get();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $this->validateAndBuild($request);
        $product = Product::create($data);
        $this->saveTranslations($request, $product);

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }

    public function edit(Product $product)
    {
        $categories = Category::where('type', 'product')->active()->orderBy('name')->get();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validateAndBuild($request, $product);
        $product->update($data);
        $this->saveTranslations($request, $product);

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        // Clean up uploaded gallery files that live inside our storage.
        foreach ((array) $product->images as $path) {
            $this->deleteStoredImage($path);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    /** Quick publish / unpublish toggle from the list page. */
    public function togglePublish(Product $product)
    {
        $product->update(['is_active' => ! $product->is_active]);

        return redirect()->route('admin.products.index')
            ->with('success', $product->is_active ? 'Product published.' : 'Product moved to draft.');
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    private function validateAndBuild(Request $request, ?Product $product = null): array
    {
        $slugRule = 'nullable|string|max:255|unique:products,slug' . ($product ? ',' . $product->id : '');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => $slugRule,
            'sku' => 'nullable|string|max:100',
            'size' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'usage_instructions' => 'nullable|string',
            'storage_instructions' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'rating_count' => 'nullable|integer|min:0',
            'order' => 'nullable|integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|max:5120',
        ]);

        $data = [
            'name' => $validated['name'],
            'slug' => ($validated['slug'] ?? null) ?: Str::slug($validated['name']),
            'sku' => $validated['sku'] ?? null,
            'size' => $validated['size'] ?? null,
            'description' => $validated['description'] ?? null,
            'long_description' => $validated['long_description'] ?? null,
            'price' => $validated['price'] ?? null,
            'stock_quantity' => $validated['stock_quantity'] ?? 0,
            'category_id' => $validated['category_id'] ?? null,
            'usage_instructions' => $validated['usage_instructions'] ?? null,
            'storage_instructions' => $validated['storage_instructions'] ?? null,
            'ingredients' => $validated['ingredients'] ?? null,
            'rating' => $validated['rating'] ?? null,
            'rating_count' => $validated['rating_count'] ?? 0,
            'order' => $validated['order'] ?? 0,
            'is_featured' => $request->boolean('is_featured'),
            'is_active' => $request->boolean('is_active', true),
            'highlights' => $this->lines($request->input('highlights')),
            'recommended_for' => $this->lines($request->input('recommended_for')),
            'specifications' => $this->specLines($request->input('specifications')),
        ];

        $gallery = $this->buildGallery($request, $product);
        $data['images'] = $gallery;
        $data['image'] = $gallery[0] ?? ($product->image ?? null);

        return $data;
    }

    /** Split a textarea into a clean array of non-empty trimmed lines. */
    private function lines(?string $text): array
    {
        if (! $text) {
            return [];
        }
        return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $text))));
    }

    /** Parse "Label | Value" lines into [{label, value}] pairs. */
    private function specLines(?string $text): array
    {
        $out = [];
        foreach ($this->lines($text) as $line) {
            $parts = explode('|', $line, 2);
            $label = trim($parts[0]);
            $value = isset($parts[1]) ? trim($parts[1]) : '';
            if ($label !== '') {
                $out[] = ['label' => $label, 'value' => $value];
            }
        }
        return $out;
    }

    /**
     * Build the gallery from the fixed 4 image slots (1 main + 3 angle views).
     * For each slot, a newly-uploaded file wins; otherwise the kept existing path
     * is used. Order is always: main, angle1, angle2, angle3. image = main.
     */
    private function buildGallery(Request $request, ?Product $product): array
    {
        $slots = ['main', 'angle1', 'angle2', 'angle3'];
        $files = $request->file('images', []);
        $existingInputs = (array) $request->input('existing_images', []);
        $oldImages = (array) ($product->images ?? []);
        $final = [];

        foreach ($slots as $slot) {
            if (isset($files[$slot]) && $files[$slot]) {
                $final[] = $files[$slot]->store('uploads/products', 'public');
            } elseif (! empty($existingInputs[$slot])) {
                $final[] = $existingInputs[$slot];
            }
        }

        // Delete stored files that are no longer referenced.
        foreach ($oldImages as $old) {
            if (! in_array($old, $final, true)) {
                $this->deleteStoredImage($old);
            }
        }

        return array_values(array_unique($final));
    }

    private function deleteStoredImage(?string $path): void
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return; // external / frontend-relative paths are not ours to delete
        }
        $full = storage_path('app/public/' . $path);
        if (is_file($full)) {
            @unlink($full);
        }
    }

    private function saveTranslations(Request $request, Product $product): void
    {
        $locales = ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'or', 'ja', 'de', 'fr', 'es'];
        foreach ($locales as $locale) {
            $name = $request->input("name_{$locale}");
            $desc = $request->input("description_{$locale}");
            if ($name || $desc) {
                $product->translations()->updateOrCreate(
                    ['locale' => $locale],
                    ['name' => $name, 'description' => $desc]
                );
            }
        }
    }
}
