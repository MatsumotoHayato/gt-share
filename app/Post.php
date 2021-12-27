<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    // Songに対するリレーション
    public function song()
    {
        return $this->belongsTo('App\Song');
    }
}