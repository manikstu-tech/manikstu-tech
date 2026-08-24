<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'type', 'message', 'status', 'admin_notes', 'replied_at'];

    protected function casts(): array
    {
        return ['replied_at' => 'datetime'];
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }
}
