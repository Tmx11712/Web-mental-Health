<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('laporans', function (Blueprint $table) {
        $table->id();
        $table->string('nama')->nullable();
        $table->string('nim')->nullable();
        $table->string('jenis');
        $table->string('level');
        $table->text('cerita');
        $table->string('email')->nullable();
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};
