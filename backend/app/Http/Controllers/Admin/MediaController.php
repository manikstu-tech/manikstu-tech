<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(24)
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

        $media = Media::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'file_name' => $file->getClientOriginalName(),
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
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }

        $media->delete();

        return redirect()->route('admin.media.index')->with('success', 'File deleted.');
    }
}
