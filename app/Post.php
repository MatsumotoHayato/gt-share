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
    public function Instrument()
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
        $post_id = DB::table('post_user')->where('user_id', Auth::id())->pluck('post_id');
        return $this->whereIn('id', $post_id)->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}