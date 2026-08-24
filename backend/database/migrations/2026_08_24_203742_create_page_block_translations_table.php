<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_block_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('block_id')->constrained('page_blocks')->cascadeOnDelete();
            $table->string('locale', 10)->index();
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
            $table->timestamps();
            $table->unique(['block_id', 'locale']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_block_translations');
    }
};
