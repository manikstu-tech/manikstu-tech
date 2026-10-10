<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

// Upload to: app/Http/Controllers/Admin/ApplicationController.php
// Serves the Next.js admin UI:
//   GET  /api/admin/applications?status=  (frontend/src/app/admin/(panel)/applications/page.tsx)
//   POST /api/admin/applications/{id} {status}  (applications/actions.ts)
//   GET  /api/admin/applications/{id}/resume   (admin/api/applications/[id]/resume/route.ts)
class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('job_applications')
            ->leftJoin('job_openings', 'job_openings.id', '=', 'job_applications.career_id')
            ->select(
                'job_applications.id',
                'job_applications.name',
                'job_applications.email',
                'job_applications.phone',
                'job_applications.status',
                'job_applications.resume_name',
                'job_applications.created_at',
                'job_openings.title as job_title'
            )
            ->orderByDesc('job_applications.id');

        if ($request->filled('status')) {
            $query->where('job_applications.status', $request->string('status'));
        }

        $total = (clone $query)->count();
        $rows = $query->limit(200)->get();

        return response()->json(['data' => $rows, 'meta' => ['total' => $total]]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:new,shortlisted,interview,hired,rejected',
        ]);

        $updated = DB::table('job_applications')->where('id', $id)->update([
            'status' => $data['status'],
            'updated_at' => now(),
        ]);

        if (! $updated && ! DB::table('job_applications')->where('id', $id)->exists()) {
            return response()->json(['message' => 'Application not found.'], 404);
        }

        return response()->json(['message' => 'Status updated.']);
    }

    public function resume($id)
    {
        $app = DB::table('job_applications')->where('id', $id)->first();
        if (! $app || ! Storage::disk('public')->exists($app->resume_path)) {
            return response()->json(['message' => 'CV not found.'], 404);
        }

        return Storage::disk('public')->download($app->resume_path, $app->resume_name);
    }
}
