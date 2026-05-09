<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Polling;

class PollingSeeder extends Seeder
{
    public function run()
    {
        $p = Polling::create([
            'pertanyaan' => 'Apa masalah terbesar yang kamu hadapi sebagai mahasiswa?',
            'is_active' => true
        ]);
        
        $p->options()->createMany([
            ['teks_opsi' => 'Stres akademik dan tekanan tugas', 'jumlah_vote' => 38],
            ['teks_opsi' => 'Masalah keuangan dan biaya hidup', 'jumlah_vote' => 27],
            ['teks_opsi' => 'Kesepian dan kurangnya dukungan sosial', 'jumlah_vote' => 21],
            ['teks_opsi' => 'Ketidakpastian masa depan dan karir', 'jumlah_vote' => 14],
        ]);
    }
}
