<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AwarenessInitiative extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'image', 'order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
