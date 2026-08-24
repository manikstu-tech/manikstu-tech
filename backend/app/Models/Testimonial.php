<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'location', 'quote', 'image', 'rating', 'is_active', 'order'];

    protected function casts(): array
    {
        return ['rating' => 'integer', 'is_active' => 'boolean'];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
