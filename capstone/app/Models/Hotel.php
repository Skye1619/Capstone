<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Price;
use App\Models\User;

class Hotel extends Model
{
    use HasFactory;

    public function price() {
        return $this->belongsTo(Price::class);
    }
    public function user() {
        return $this->belongsTo(User::class, 'owner_id');
    }
    protected $table = 'hotel';

    protected $guarded = [];
}
