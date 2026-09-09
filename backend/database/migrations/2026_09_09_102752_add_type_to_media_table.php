<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            // 'photo' or 'video' — decides how the item shows on the public media page.
            $table->string('type')->default('photo')->after('name');
            // Whether this item appears in the public website media section.
            $table->boolean('is_public')->default(true)->after('type');
        });
    }

    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn(['type', 'is_public']);
        });
    }
};
