<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function getPostsByTargetSong(int $song_id, int $limit_count = 20)
    {
        // 曲IDを指定し、名前順に並べたあと、ペジネーションをかける
        return $this::with('posts')->find($song_id)->posts()->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}