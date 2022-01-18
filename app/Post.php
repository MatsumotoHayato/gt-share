<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
    public function instrument()
    {
        return $this->belongsTo('App\Instrument');
    }

    // Userに対するリレーション
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    // 役に立った機能のためのUserに対するリレーション
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
    
    // 自分が役に立ったを押したレビュー一覧を取得
    public function getMyFavoritePosts(int $limit_count = 10)
    {
        // 役に立ったを押した最新順に並べるために内部結合
        // select句がないと、post_userテーブルのcreated_at,updated_atが表示されてしまう
        
        return $this::Join('post_user', 'posts.id', '=', 'post_user.post_id')->where('post_user.user_id', Auth::id())
        ->orderBy('post_user.updated_at', 'DESC')->select('posts.*')->paginate($limit_count);
        
        // return $this::Join('post_user', 'posts.id', '=', 'post_user.post_id')->where('post_user.user_id', Auth::id())
        // ->orderBy('post_user.updated_at', 'DESC')->select('posts.*')->get();
    }
}