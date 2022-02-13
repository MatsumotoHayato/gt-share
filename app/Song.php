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

    // 簡単な順に曲を取得
    public function getSongsForBeginners(int $limit_count = 5000)
    {
        // 曲IDと楽器IDでグループ化して平均難易度を計算し、簡単度降順に曲を並び替える
        return $this::with('artist')->Join('posts', 'songs.id', '=', 'posts.song_id')
        ->select('songs.id', 'songs.name', 'songs.artist_id', 'posts.instrument_id', DB::raw('round(AVG(posts.score_easy), 2) as average_score_easy'))
        ->groupBy('songs.id', 'songs.name', 'songs.artist_id', 'posts.instrument_id')
        ->orderBy('average_score_easy', 'DESC')->limit($limit_count)->get();
    }
}