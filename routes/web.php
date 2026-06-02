<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup-production-XK92', function () {
    try {
        // Run migrations
        Artisan::call('migrate', ['--force' => true]);
        $migrationOutput = Artisan::output();

        // Run AdminSeeder
        Artisan::call('db:seed', [
            '--class' => 'Database\\Seeders\\AdminSeeder',
            '--force' => true
        ]);
        $seederOutput = Artisan::output();

        return response()->json([
            'status' => 'success',
            'migration' => $migrationOutput,
            'seeder' => $seederOutput,
            'message' => 'Database setup and seeding completed successfully.'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

