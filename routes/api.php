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
    
    // Artikel admin routes
    Route::post('/artikel', [\App\Http\Controllers\ArtikelController::class, 'store']);
    Route::put('/artikel/{id}', [\App\Http\Controllers\ArtikelController::class, 'update']);
    Route::delete('/artikel/{id}', [\App\Http\Controllers\ArtikelController::class, 'destroy']);
    
    // Polling admin routes
    Route::post('/polling', [\App\Http\Controllers\PollingController::class, 'store']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/user/laporan', [LaporanController::class, 'myReports']);
    Route::put('/laporan/{laporan}', [LaporanController::class, 'update']);
    Route::delete('/laporan/{laporan}', [LaporanController::class, 'destroy']);
});

// Laporan routes (public)
Route::get('/laporan', [LaporanController::class, 'index']);
Route::post('/laporan', [LaporanController::class, 'store']);
Route::get('/laporan/{laporan}', [LaporanController::class, 'show']);

// Artikel routes (public)
Route::get('/artikel', [\App\Http\Controllers\ArtikelController::class, 'index']);
Route::get('/artikel/{slug}', [\App\Http\Controllers\ArtikelController::class, 'show']);

// Polling routes
Route::get('/polling', [\App\Http\Controllers\PollingController::class, 'getActivePolling']);
Route::post('/polling/{id}/vote', [\App\Http\Controllers\PollingController::class, 'vote']);