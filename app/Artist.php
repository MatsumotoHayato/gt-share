<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Artist extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
    ];
    
    // Songに対するリレーション
    public function songs()
    {
        return $this->hasMany('App\Song');
    }
    
    // Song経由のPostに対するリレーション
    public function posts()
    {
        return $this->hasManyThrough('App\Post', 'App\Song');
    }
}
