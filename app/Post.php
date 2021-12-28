<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'song_id', 'instrument_id',
        'experience', 'difficulty', 'body', 'url'
    ];

    // Songに対するリレーション
    public function song()
    {
        return $this->belongsTo('App\Song');
    }

    // Instrumentに対するリレーション
    public function Instrument()
    {
        return $this->belongsTo('App\Instrument');
    }

    // Userに対するリレーション
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}