<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $table = 'laporans';
    protected $fillable = [
        'user_id',
        'nama',
        'nim',
        'email',
        'jenis',
        'level',
        'cerita',
        'status',
        'catatan_konselor',
    ];

    protected $appends = ['jenis_masalah', 'tingkat_keparahan', 'deskripsi'];

    public function getJenisMasalahAttribute()
    {
        return $this->attributes['jenis'] ?? null;
    }

    public function getTingkatKeparahanAttribute()
    {
        return $this->attributes['level'] ?? null;
    }

    public function getDeskripsiAttribute()
    {
        return $this->attributes['cerita'] ?? null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}