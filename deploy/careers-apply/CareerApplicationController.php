<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Upload to: app/Http/Controllers/Api/CareerApplicationController.php
// Public route — NO auth middleware. Field names must match
// frontend/src/components/careers/ApplyModal.tsx (name, email, phone, cover_note, resume).
class CareerApplicationController extends Controller
{
    public function store(Request $request, $id)
    {
        // Job must exist and be active.
        $career = DB::table('job_openings')->where('id', $id)->where('is_active', true)->first();
        if (! $career) {
            return response()->json(['message' => 'Job not found.'], 404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'cover_note' => 'nullable|string|max:2000',
            // ponytail: 5MB matches MAX_MB in ApplyModal.tsx; mime check doubles the frontend extension check
            'resume' => 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $file = $request->file('resume');
        $path = $file->store('resumes', 'public');

        $appId = DB::table('job_applications')->insertGetId([
            'career_id' => $career->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'cover_note' => $data['cover_note'] ?? null,
            'resume_path' => $path,
            'resume_name' => $file->getClientOriginalName(),
            'status' => 'new',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Application received.',
            'data' => ['id' => $appId],
        ], 201);
    }
}
