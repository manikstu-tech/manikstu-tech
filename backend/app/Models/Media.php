<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['name', 'type', 'category', 'is_public', 'file_name', 'mime_type', 'size', 'path', 'disk', 'alt_text', 'width', 'height'];

    protected function casts(): array
    {
        return ['size' => 'integer', 'width' => 'integer', 'height' => 'integer', 'is_public' => 'boolean'];
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
