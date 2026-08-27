<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'long_description', 'sku', 'size',
        'price', 'stock_quantity', 'category_id', 'image', 'images',
        'highlights', 'specifications', 'usage_instructions', 'storage_instructions',
        'ingredients', 'recommended_for', 'rating', 'rating_count',
        'is_featured', 'is_active', 'order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'images' => 'array',
            'highlights' => 'array',
            'specifications' => 'array',
            'recommended_for' => 'array',
            'rating' => 'decimal:1',
            'rating_count' => 'integer',
            'stock_quantity' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ProductTranslation::class);
    }
}
