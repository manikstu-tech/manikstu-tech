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

    public function getSettings(): JsonResponse
    {
        return $this->json(['data' => Setting::allKeyValue()]);
    }

    public function getNavigation(): JsonResponse
    {
        $nav = NavigationMenu::active()->orderBy('order')->get();
        return $this->json(['data' => $nav]);
    }

    public function getFooter(): JsonResponse
    {
        $links = FooterLink::active()->orderBy('order')->get()->groupBy('group');
        return $this->json(['data' => $links]);
    }

    public function getPage(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)->where('is_published', true)
            ->with(['blocks' => fn($q) => $q->active()->orderBy('order')])
            ->firstOrFail();

        return $this->json(['data' => $page]);
    }

    public function getBlogPosts(Request $request): JsonResponse
    {
        $query = BlogPost::published()->with('category')
            ->when($request->category, fn($q, $c) => $q->where('category_id', $c));

        if ($request->featured) {
            $query->featured();
        }

        return $this->paginated($query->latest('published_at'), $request->per_page ?? 15);
    }

    public function getBlogPost(string $slug): JsonResponse
    {
        $post = BlogPost::published()->with('category')->where('slug', $slug)->firstOrFail();
        return $this->json(['data' => $post]);
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
        $query = Product::active()->with('category')
            ->when($request->category, fn($q, $c) => $q->where('category_id', $c))
            ->when($request->featured, fn($q) => $q->featured());

        return $this->paginated($query->orderBy('order'), $request->per_page ?? 15);
    }

    public function getProduct(string $slug): JsonResponse
    {
        $product = Product::active()->with('category')->where('slug', $slug)->firstOrFail();
        return $this->json(['data' => $product]);
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
        if ($request->category) {
            $query->where('category_id', $request->category);
        }
        return $this->paginated($query->orderBy('order'), $request->per_page ?? 20);
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
            'type' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $validated['status'] = 'new';
        $enquiry = Enquiry::create($validated);

        return $this->json(['data' => $enquiry, 'message' => 'Enquiry submitted successfully.'], 201);
    }

    public function storeOrder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $total = 0;
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total += $product->price * $item['quantity'];
        }

        $order = Order::create([
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $order->items()->create([
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return $this->json(['data' => $order, 'message' => 'Order placed successfully.'], 201);
    }
}
