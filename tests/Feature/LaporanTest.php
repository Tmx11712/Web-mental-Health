<?php

namespace Tests\Feature;

use App\Models\Laporan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LaporanTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test a user can create a report and it maps correctly.
     */
    public function test_can_create_laporan_and_maps_fields(): void
    {
        // 1. Submit report with frontend user fields (jenis, level, cerita)
        $response = $this->postJson('/api/laporan', [
            'nama' => 'John Doe',
            'nim' => '123456',
            'email' => 'john@example.com',
            'jenis' => 'Stres Akademik',
            'level' => 'Sedang',
            'cerita' => 'Saya merasa lelah dan sulit fokus menghadapi ujian.',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'nama',
                    'nim',
                    'email',
                    'jenis',
                    'level',
                    'cerita',
                    'jenis_masalah',
                    'tingkat_keparahan',
                    'deskripsi',
                ],
            ]);

        // 2. Fetch all reports and check the fields mapped to what admin frontend expects
        $fetchResponse = $this->getJson('/api/laporan');
        $fetchResponse->assertStatus(200)
            ->assertJsonFragment([
                'nama' => 'John Doe',
                'nim' => '123456',
                'email' => 'john@example.com',
                'jenis' => 'Stres Akademik',
                'level' => 'Sedang',
                'cerita' => 'Saya merasa lelah dan sulit fokus menghadapi ujian.',
                'jenis_masalah' => 'Stres Akademik',
                'tingkat_keparahan' => 'Sedang',
                'deskripsi' => 'Saya merasa lelah dan sulit fokus menghadapi ujian.',
            ]);
    }
}
