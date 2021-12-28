<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    // Postに対するリレーション
    public function posts()
    {
        return $this->hasMany('App\Post');
    }
}
