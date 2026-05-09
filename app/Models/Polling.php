<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Polling extends Model
{
    protected $fillable = ['pertanyaan', 'is_active'];

    public function options()
    {
        return $this->hasMany(PollingOption::class);
    }
}