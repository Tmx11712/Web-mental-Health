<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\AuthController;

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Admin routes
Route::post('/admin/login', [\App\Http\Controllers\AdminAuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/me', [\App\Http\Controllers\AdminAuthController::class, 'me']);
    Route::post('/admin/logout', [\App\Http\Controllers\AdminAuthController::class, 'logout']);
    Route::get('/admin/mahasiswa', [\App\Http\Controllers\MahasiswaController::class, 'index']);
    Route::patch('/laporan/{id}/status', [\App\Http\Controllers\LaporanController::class, 'updateStatus']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/user/laporan', [LaporanController::class, 'myReports']);
});

// Laporan routes (public)
Route::get('/laporan', [LaporanController::class, 'index']);
Route::post('/laporan', [LaporanController::class, 'store']);
Route::get('/laporan/{laporan}', [LaporanController::class, 'show']);
Route::put('/laporan/{laporan}', [LaporanController::class, 'update']);
Route::delete('/laporan/{laporan}', [LaporanController::class, 'destroy']);

// Polling routes (mock)
Route::get('/polling', function () {
    return response()->json([
        'data' => [
            'pertanyaan' => 'Seberapa penting kesehatan mental bagi mahasiswa?',
            'total_votes' => 150,
            'opsi' => [
                ['id' => 1, 'teks_opsi' => 'Sangat Penting', 'jumlah_vote' => 120],
                ['id' => 2, 'teks_opsi' => 'Penting', 'jumlah_vote' => 25],
                ['id' => 3, 'teks_opsi' => 'Biasa Saja', 'jumlah_vote' => 5],
            ]
        ]
    ]);
});