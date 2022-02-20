<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Forum extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'title', 'category', 'body'
    ];
    
    // Userに対するリレーション
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    // Commentに対するリレーション
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
