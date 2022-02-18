<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'forum_id', 'body'
    ];
    
    // Userに対するリレーション
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    // Forumに対するリレーション
    public function forum()
    {
        return $this->belongsTo('App\Forum');
    }
}
