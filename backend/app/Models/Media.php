<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['name', 'file_name', 'mime_type', 'size', 'path', 'disk', 'alt_text', 'width', 'height'];

    protected function casts(): array
    {
        return ['size' => 'integer', 'width' => 'integer', 'height' => 'integer'];
    }

    public function url(): string
    {
        return asset('storage/' . $this->path);
    }
}
