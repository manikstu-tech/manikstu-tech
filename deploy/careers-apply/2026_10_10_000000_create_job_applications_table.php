<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Upload to: database/migrations/2026_10_10_000000_create_job_applications_table.php
// Then run: php artisan migrate --force
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            // ponytail: plain integer, no FK constraint — careers table name may vary; app checks existence in controller
            $table->unsignedBigInteger('career_id')->index();
            $table->string('name');
            $table->string('email')->index();
            $table->string('phone', 30)->nullable();
            $table->text('cover_note')->nullable();
            $table->string('resume_path');
            $table->string('resume_name');
            $table->string('status', 20)->default('new')->index();
            $table->timestamps();

            $table->index(['career_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
