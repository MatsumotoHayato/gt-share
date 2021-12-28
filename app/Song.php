<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

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

    // Postに対するリレーション
    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    // 対象曲のレビュー一覧を取得
    public function getPostsByTargetSong(int $limit_count = 20)
    {
        // 曲IDを指定し、名前順に並べたあと、ペジネーションをかける
        return $this::with('posts')->find($this->id)->posts()->orderBy('updated_at', 'DESC')->paginate($limit_count);
        // return $this::with('posts')->where('song_id', $this->id)->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }

    // 対象曲のレビュー件数取得
    public function getPostCountByTargetSong()
    {
        // return $this::with('posts')->find($song_id)->posts()->count();
        return DB::table('posts')->where('song_id', $this->id)->count();
    }
}