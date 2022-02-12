<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Post;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'song_id', 'instrument_id',
        'experience', 'score_easy', 'score_copy',
        'score_memorize', 'score_cost', 'score_enjoyment',
        'body', 'url'
    ];
    
    protected $appends = [
        'favorite_check',
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
    
    // その投稿にいいねを押したかチェック
    public function getFavoriteCheckAttribute()
    {
        return $this->users()->get()->contains(auth()->user());
    }
    
    // // 曲を指定し、各スコアの平均値を取得
    // public function getAverageScoresAttribute()
    // {
    //     // dd(App\Post::where([['song_id', 78],['instrument_id', 1]])
    //     // ->select(DB::raw('round(AVG(score_easy), 2')));
    //     return Post::where([['song_id', 78],['instrument_id', 1]])
    //     ->select(DB::raw('round(AVG(score_easy), 2'));
    //     ->select(
    //         DB::raw('round(AVG(score_easy), 2) as average_score_easy'),
    //         DB::raw('round(AVG(score_copy), 2) as average_score_copy'),
    //         DB::raw('round(AVG(score_memorize), 2) as average_score_memorize'),
    //         DB::raw('round(AVG(score_cost), 2) as average_score_cost'),
    //         DB::raw('round(AVG(score_enjoyment), 2) as average_score_enjoyment'))
    // }
    
    // 自分がいいねを押したレビュー一覧を取得
    public function getMyFavoritePosts()
    {
        // いいねを押した最新順に並べるために内部結合
        return $this::with(['song', 'song.artist', 'user', 'instrument'])->withCount('users')
        ->Join('post_user', 'posts.id', '=', 'post_user.post_id')
        ->where('post_user.user_id', Auth::id())
        ->orderBy('post_user.updated_at', 'DESC')->get();
    }
    
    public function getMyPosts()
    {
        return $this::with(['song', 'song.artist', 'user', 'instrument'])->withCount('users')
        ->where('user_id', Auth::id())->orderBy('updated_at', 'DESC')->get();
    }
}