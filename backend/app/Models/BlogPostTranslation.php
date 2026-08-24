<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPostTranslation extends Model
{
    protected $fillable = ['post_id', 'locale', 'title', 'content', 'excerpt'];

    public function post()
    {
        return $this->belongsTo(BlogPost::class, 'post_id');
    }
}
