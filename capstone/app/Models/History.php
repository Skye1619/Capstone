<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hotel;
use App\Models\User;
use App\Models\Price;

class History extends Model
{
    use HasFactory;

    public function hotel() {
        return $this->belongsTo(Hotel::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function price() {
        return $this->belongsTo(Price::class);
    }

    protected $table = 'history';

    protected $guarded = [];
}
