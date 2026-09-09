<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? addcslashes($request->search, '%_') : null;
        $media = Media::when($search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when(
                $request->sort === 'oldest',
                fn($q) => $q->oldest(),
                fn($q) => $q->latest(),
            )
            ->paginate(10)
            ->withQueryString();

        return view('admin.media.index', compact('media'));
    }

    public function upload(Request $request)
    {
        // Photo or video decides which rules apply and where the item shows on the website.
        $type = $request->input('type') === 'video' ? 'video' : 'photo';

        $request->validate([
            'type' => 'nullable|in:photo,video',
            'file' => $type === 'video'
                // Videos: common web formats, larger cap (50 MB).
                ? 'required|file|max:51200|mimes:mp4,webm,ogg,mov,m4v'
                // ponytail: svg dropped — it's XML and executes scripts when rendered (stored XSS)
                : 'required|file|max:10240|mimes:jpg,jpeg,png,gif,webp,pdf',
        ], [
            'file.mimes' => $type === 'video'
                ? 'Please upload a video file (MP4, WebM, OGG, MOV).'
                : 'Please upload an image (JPG, PNG, GIF, WebP) or PDF.',
            'file.max' => $type === 'video'
                ? 'The video may not be larger than 50 MB.'
                : 'The file may not be larger than 10 MB.',
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads', 'public');
        $originalName = strip_tags(basename($file->getClientOriginalName()));

        $media = Media::create([
            'name' => pathinfo($originalName, PATHINFO_FILENAME),
            'type' => $type,
            'is_public' => true,
            'file_name' => $originalName,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
            'disk' => 'public',
        ]);

        if ($request->expectsJson()) {
            return response()->json(['id' => $media->id, 'url' => asset('storage/' . $path)]);
        }

        return redirect()->route('admin.media.index')->with('success', ucfirst($type) . ' uploaded.');
    }

    public function destroy(Media $media)
    {
        $fullPath = storage_path('app/public/' . $media->path);
        $realPath = realpath($fullPath);
        $allowedDir = realpath(storage_path('app/public'));

        if ($realPath && $allowedDir && str_starts_with($realPath, $allowedDir . DIRECTORY_SEPARATOR)) {
            if (file_exists($realPath)) {
                unlink($realPath);
            }
        }

        $media->delete();

        return redirect()->route('admin.media.index')->with('success', 'File deleted.');
    }
}
