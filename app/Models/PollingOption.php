<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PollingOption extends Model
{
    protected $fillable = ['polling_id', 'teks_opsi', 'jumlah_vote'];

    public function polling()
    {
        return $this->belongsTo(Polling::class);
    }
}
