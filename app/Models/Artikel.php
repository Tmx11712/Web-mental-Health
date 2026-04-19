<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $table = 'artikel';

    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'emoji',
        'ringkasan',
        'konten',
        'waktu_baca',
        'penulis',
        'published',
    ];
}
