<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->text('long_description')->nullable()->after('description');
            $table->string('sku')->nullable()->after('long_description');
            $table->string('size')->nullable()->after('sku');            // e.g. "25 kg"
            $table->integer('stock_quantity')->default(0)->after('size');
            $table->json('highlights')->nullable()->after('images');      // string[]
            $table->json('specifications')->nullable()->after('highlights'); // [{label,value}]
            $table->text('usage_instructions')->nullable()->after('specifications');
            $table->text('storage_instructions')->nullable()->after('usage_instructions');
            $table->text('ingredients')->nullable()->after('storage_instructions');
            $table->json('recommended_for')->nullable()->after('ingredients'); // string[]
            $table->decimal('rating', 2, 1)->nullable()->after('recommended_for');
            $table->integer('rating_count')->default(0)->after('rating');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'long_description', 'sku', 'size', 'stock_quantity',
                'highlights', 'specifications', 'usage_instructions',
                'storage_instructions', 'ingredients', 'recommended_for',
                'rating', 'rating_count',
            ]);
        });
    }
};
