<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $table = 'laporan';
    protected $fillable = [
        'user_id',
        'nama',
        'nim',
        'email',
        'jenis_masalah',
        'tingkat_keparahan',
        'deskripsi',
        'status',
        'catatan_konselor',
    ];

    /**
     * Get the user that owns the laporan.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}