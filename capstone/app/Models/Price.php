<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hotel;

class Price extends Model
{
    use HasFactory;

    public function hotel() {
        return $this->hasMany(Hotel::class);
    }

    protected $table = 'price';

    protected $guarded = [];
}
