<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('laporan', function (Blueprint $table) {
            if (!Schema::hasColumn('laporan', 'status')) {
                $table->string('status')->default('baru');
            }
            if (!Schema::hasColumn('laporan', 'catatan_konselor')) {
                $table->text('catatan_konselor')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laporan', function (Blueprint $table) {
            if (Schema::hasColumn('laporan', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('laporan', 'catatan_konselor')) {
                $table->dropColumn('catatan_konselor');
            }
        });
    }
};
