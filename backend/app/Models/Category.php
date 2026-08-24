<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'type', 'order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }

    public function pressReleases(): HasMany
    {
        return $this->hasMany(PressRelease::class);
    }
}
