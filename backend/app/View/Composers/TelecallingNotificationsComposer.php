<?php

namespace App\View\Composers;

use App\Models\Enquiry;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

/**
 * Feeds the telecalling topbar bell with live notifications built from real
 * customer enquiries. "Unread" means the enquiry arrived after the telecaller
 * last opened/cleared notifications — so the badge only reappears when a real
 * customer actually does something, not on every page refresh.
 */
class TelecallingNotificationsComposer
{
    /** Map an enquiry type to a readable label and an icon key. */
    private const TYPES = [
        'goat_farm'     => ['Farm setup enquiry', 'lead'],
        'dealership'    => ['Dealership enquiry', 'order'],
        'bulk_order'    => ['Bulk order enquiry', 'order'],
        'goat_services' => ['Services enquiry', 'call'],
        'training'      => ['Training enquiry', 'lead'],
        'franchise'     => ['Franchise enquiry', 'lead'],
        'partnership'   => ['Partnership enquiry', 'lead'],
        'others'        => ['General enquiry', 'alert'],
    ];

    public function compose(View $view): void
    {
        $user = Auth::user();
        $readAt = $user?->notifications_read_at;

        $recent = Enquiry::latest()->take(8)->get();

        $notifs = $recent->map(function (Enquiry $e) use ($readAt) {
            [$label, $icon] = self::TYPES[$e->type] ?? ['New enquiry', 'alert'];

            return [
                'icon' => $icon,
                'title' => $label,
                'text' => trim($e->name . ' — ' . \Illuminate\Support\Str::limit((string) $e->message, 48)),
                'time' => optional($e->created_at)->diffForHumans() ?? '',
                'unread' => $readAt === null || ($e->created_at && $e->created_at->gt($readAt)),
            ];
        })->all();

        $unread = $readAt === null
            ? $recent->count()
            : Enquiry::where('created_at', '>', $readAt)->count();

        $view->with('tcNotifs', $notifs)->with('tcUnread', $unread);
    }
}
