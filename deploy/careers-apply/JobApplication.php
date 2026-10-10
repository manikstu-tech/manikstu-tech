<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Upload to: app/Models/JobApplication.php
// ponytail: no Career relation — table/model name for jobs varies; controllers join by table name instead
class JobApplication extends Model
{
    protected $fillable = [
        'career_id',
        'name',
        'email',
        'phone',
        'cover_note',
        'resume_path',
        'resume_name',
        'status',
    ];
}
