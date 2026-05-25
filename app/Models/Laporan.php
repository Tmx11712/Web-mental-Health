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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}