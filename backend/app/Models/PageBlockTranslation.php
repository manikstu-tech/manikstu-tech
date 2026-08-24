<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageBlockTranslation extends Model
{
    protected $fillable = ['block_id', 'locale', 'title', 'content'];

    public function block()
    {
        return $this->belongsTo(PageBlock::class, 'block_id');
    }
}
