<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOpening extends Model
{
    protected $fillable = ['title', 'department', 'location', 'type', 'description', 'requirements', 'benefits', 'is_active', 'deadline'];

    protected function casts(): array
    {
        return ['requirements' => 'array', 'benefits' => 'array', 'is_active' => 'boolean', 'deadline' => 'datetime'];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
