<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanController;

Route::get('/laporan', [LaporanController::class, 'index']);
Route::post('/laporan', [LaporanController::class, 'store']);
Route::get('/laporan/{laporan}', [LaporanController::class, 'show']);
Route::put('/laporan/{laporan}', [LaporanController::class, 'update']);
Route::delete('/laporan/{laporan}', [LaporanController::class, 'destroy']);