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
        $request->validate([
            // ponytail: svg dropped — it's XML and executes scripts when rendered (stored XSS)
            'file' => 'required|file|max:10240|mimes:jpg,jpeg,png,gif,webp,pdf',
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads', 'public');
        $originalName = strip_tags(basename($file->getClientOriginalName()));

        $media = Media::create([
            'name' => pathinfo($originalName, PATHINFO_FILENAME),
            'file_name' => $originalName,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
            'disk' => 'public',
        ]);

        if ($request->expectsJson()) {
            return response()->json(['id' => $media->id, 'url' => asset('storage/' . $path)]);
        }

        return redirect()->route('admin.media.index')->with('success', 'File uploaded.');
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
