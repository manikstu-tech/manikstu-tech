<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\Page;
use App\Models\BlogPost;
use App\Models\PressRelease;
use App\Models\Product;
use App\Models\Category;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\JobOpening;
use App\Models\TrainingProgram;
use App\Models\AwarenessInitiative;
use App\Models\ImpactStat;
use App\Models\GalleryImage;
use App\Models\Partner;
use App\Models\NavigationMenu;
use App\Models\FooterLink;
use App\Models\Enquiry;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    private function json($data, $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }

    private function paginated($query, $perPage = 15): JsonResponse
    {
        $perPage = min(max((int) $perPage, 1), 100);
        $result = $query->paginate($perPage);
        return $this->json([
            'data' => $result->items(),
            'meta' => [
                'current_page' => $result->currentPage(),
                'last_page' => $result->lastPage(),
                'per_page' => $result->perPage(),
                'total' => $result->total(),
            ],
        ]);
    }

    private function getLocale(Request $request): string
    {
        $allowed = ['en','hi','bn','ta','te','mr','gu','kn','ml','or','ja','de','fr','es'];
        $locale = $request->query('locale', 'en');
        return in_array($locale, $allowed) ? $locale : 'en';
    }

    private function getTranslatedTitle($model, string $locale): string
    {
        if ($locale === 'en') return $model->title;

        $translation = $model->translations()->where('locale', $locale)->first();
        return $translation?->title ?? $model->title;
    }

    private function getTranslatedField($model, string $locale, string $field)
    {
        if ($locale === 'en') return $model->{$field};

        $translation = $model->translations()->where('locale', $locale)->first();
        return $translation?->{$field} ?? $model->{$field};
    }

    public function getSettings(): JsonResponse
    {
        return $this->json(['data' => Setting::allKeyValue()]);
    }

    public function getNavigation(Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $nav = NavigationMenu::active()
            ->where('locale', $locale)
            ->orderBy('order')
            ->get();

        if ($nav->isEmpty()) {
            $nav = NavigationMenu::active()
                ->where('locale', 'en')
                ->orderBy('order')
                ->get();
        }

        return $this->json(['data' => $nav]);
    }

    public function getFooter(Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $links = FooterLink::active()
            ->where('locale', $locale)
            ->orderBy('order')
            ->get()
            ->groupBy('group');

        if ($links->isEmpty()) {
            $links = FooterLink::active()
                ->where('locale', 'en')
                ->orderBy('order')
                ->get()
                ->groupBy('group');
        }

        return $this->json(['data' => $links]);
    }

    public function getPage(string $slug, Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $page = Page::where('slug', $slug)->where('is_published', true)
            ->with(['blocks' => fn($q) => $q->active()->orderBy('order')])
            ->firstOrFail();

        $data = $page->toArray();

        if ($locale !== 'en') {
            $translation = $page->translations()->where('locale', $locale)->first();
            if ($translation) {
                $data['title'] = $translation->title;
                $data['meta_description'] = $translation->meta_description;
            }

            foreach ($data['blocks'] as &$block) {
                $blockModel = \App\Models\PageBlock::find($block['id']);
                if ($blockModel) {
                    $blockTranslation = $blockModel->translations()->where('locale', $locale)->first();
                    if ($blockTranslation) {
                        $block['title'] = $blockTranslation->title;
                        $block['content'] = $blockTranslation->content;
                    }
                }
            }
        }

        return $this->json(['data' => $data]);
    }

    public function getBlogPosts(Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $query = BlogPost::published()->with('category')
            ->when($request->category, fn($q, $c) => $q->where('category_id', $c));

        if ($request->featured) {
            $query->featured();
        }

        $posts = $query->latest('published_at')->paginate(min(max((int) ($request->per_page ?? 15), 1), 100));

        if ($locale !== 'en') {
            $items = $posts->getCollection()->map(function ($post) use ($locale) {
                $translation = $post->translations()->where('locale', $locale)->first();
                $data = $post->toArray();
                if ($translation) {
                    $data['title'] = $translation->title;
                    $data['content'] = $translation->content;
                    $data['excerpt'] = $translation->excerpt;
                }
                return $data;
            });
            $posts->setCollection($items);
        }

        return $this->json([
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    public function getBlogPost(string $slug, Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $post = BlogPost::published()->with('category')->where('slug', $slug)->firstOrFail();

        $data = $post->toArray();

        if ($locale !== 'en') {
            $translation = $post->translations()->where('locale', $locale)->first();
            if ($translation) {
                $data['title'] = $translation->title;
                $data['content'] = $translation->content;
                $data['excerpt'] = $translation->excerpt;
            }
        }

        return $this->json(['data' => $data]);
    }

    public function getBlogCategories(): JsonResponse
    {
        $categories = Category::where('type', 'blog')->active()->orderBy('order')->get();
        return $this->json(['data' => $categories]);
    }

    public function getPressReleases(Request $request): JsonResponse
    {
        $query = PressRelease::published()->with('category');
        return $this->paginated($query->latest('published_at'), $request->per_page ?? 15);
    }

    public function getPressRelease(string $slug): JsonResponse
    {
        $release = PressRelease::published()->with('category')->where('slug', $slug)->firstOrFail();
        return $this->json(['data' => $release]);
    }

    public function getProducts(Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $query = Product::active()->with('category')
            ->when($request->category, fn($q, $c) => $q->where('category_id', $c))
            ->when($request->featured, fn($q) => $q->featured())
            ->orderBy('order')->latest('id');

        $perPage = min(max((int) ($request->per_page ?? $request->limit ?? 50), 1), 100);
        $products = $query->paginate($perPage);

        return $this->json([
            'data' => collect($products->items())->map(fn($p) => $this->productPayload($p, $locale))->all(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function getProduct(string $slug, Request $request): JsonResponse
    {
        $locale = $this->getLocale($request);
        $product = Product::active()->with('category')->where('slug', $slug)->firstOrFail();

        return $this->json(['data' => $this->productPayload($product, $locale)]);
    }

    /** Serialize a Product into the camelCase shape the website consumes. */
    private function productPayload(Product $p, string $locale = 'en'): array
    {
        $name = $p->name;
        $description = $p->description;

        if ($locale !== 'en') {
            $translation = $p->translations()->where('locale', $locale)->first();
            if ($translation) {
                $name = $translation->name ?: $name;
                $description = $translation->description ?: $description;
            }
        }

        return [
            'id' => $p->id,
            'name' => $name,
            'slug' => $p->slug,
            'sku' => $p->sku,
            'description' => $description,
            'longDescription' => $p->long_description,
            'price' => $p->price !== null ? (float) $p->price : null,
            'size' => $p->size,
            'image' => $this->imageUrl($p->image),
            'gallery' => collect((array) $p->images)->map(fn($x) => $this->imageUrl($x))->values()->all(),
            'category' => $p->category ? ['name' => $p->category->name] : null,
            'highlights' => (array) ($p->highlights ?? []),
            'specifications' => (array) ($p->specifications ?? []),
            'recommendedFor' => (array) ($p->recommended_for ?? []),
            'usage' => $p->usage_instructions,
            'storage' => $p->storage_instructions,
            'ingredients' => $p->ingredients,
            'rating' => $p->rating !== null ? (float) $p->rating : null,
            'ratingCount' => (int) ($p->rating_count ?? 0),
            'stock' => (int) ($p->stock_quantity ?? 0),
            'inStock' => (int) ($p->stock_quantity ?? 0) > 0,
        ];
    }

    /** Resolve a stored image path to a URL the frontend can use directly. */
    private function imageUrl(?string $path): string
    {
        if (! $path) {
            return '';
        }
        if (\Illuminate\Support\Str::startsWith($path, ['http://', 'https://', '/'])) {
            return $path; // absolute URL, or a frontend-relative asset like "/1.png"
        }
        return asset('storage/' . $path);
    }

    public function getCategories(Request $request): JsonResponse
    {
        $query = Category::active();
        if ($request->type) {
            $query->where('type', $request->type);
        }
        return $this->json(['data' => $query->orderBy('order')->get()]);
    }

    public function getTestimonials(): JsonResponse
    {
        return $this->json(['data' => Testimonial::active()->orderBy('order')->get()]);
    }

    public function getTeamMembers(): JsonResponse
    {
        return $this->json(['data' => TeamMember::active()->orderBy('order')->get()]);
    }

    public function getJobOpenings(): JsonResponse
    {
        return $this->json(['data' => JobOpening::active()->latest()->get()]);
    }

    public function getTrainingPrograms(): JsonResponse
    {
        return $this->json(['data' => TrainingProgram::active()->orderBy('order')->get()]);
    }

    public function getAwareness(): JsonResponse
    {
        return $this->json(['data' => AwarenessInitiative::active()->orderBy('order')->get()]);
    }

    public function getStats(): JsonResponse
    {
        return $this->json(['data' => ImpactStat::active()->orderBy('order')->get()]);
    }

    public function getGallery(Request $request): JsonResponse
    {
        $query = GalleryImage::active();
        return $this->paginated($query->orderBy('order'), $request->per_page ?? 15);
    }

    public function getPartners(): JsonResponse
    {
        return $this->json(['data' => Partner::active()->orderBy('order')->get()]);
    }

    public function storeEnquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'type' => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        $enquiry = Enquiry::create($validated + ['status' => 'new', 'customer_id' => $request->user('sanctum')?->id]);

        return $this->json(['data' => $enquiry, 'message' => 'Enquiry submitted successfully'], 201);
    }

    public function storeOrder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.productId' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['productId']);
            $total += ($product->price ?? 0) * $item['quantity'];
        }

        $order = Order::create([
            'order_number' => 'ORD-' . strtoupper(bin2hex(random_bytes(8))),
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'customer_id' => $request->user('sanctum')?->id,
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['productId']);
            $order->items()->create([
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return $this->json(['data' => $order, 'message' => 'Order created successfully'], 201);
    }
}
