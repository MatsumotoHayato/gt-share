<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Song extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'artist_id',
    ];

    // Artistに対するリレーション
    public function artist()
    {
        return $this->belongsTo('App\Artist');
    }
}