<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use App\Post;

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
    public function getSongsForBeginners(int $limit_count = 100)
    {
        // 曲IDと楽器IDでグループ化して平均難易度を計算し、簡単度降順に曲を並び替える
        return $this::with('artist')->Join('posts', 'songs.id', '=', 'posts.song_id')
        ->select('songs.id', 'songs.name', 'songs.artist_id', 'posts.instrument_id', DB::raw('round(AVG(posts.score_easy), 2) as average_score_easy'))
        ->groupBy('songs.id', 'songs.name', 'songs.artist_id', 'posts.instrument_id')
        ->orderBy('average_score_easy', 'DESC')->limit($limit_count)->get();
    }
    
    // 曲を指定し、各スコアの平均値を取得
    public function culcAverageScores($song_id)
    {
        return $this::Join('posts', 'songs.id', '=', 'posts.song_id')
        ->where('songs.id', $song_id)
        ->whereNull('posts.deleted_at')
        ->select('songs.id', 'posts.instrument_id',
            DB::raw('round(AVG(posts.score_easy), 2) as average_score_easy'),
            DB::raw('round(AVG(posts.score_copy), 2) as average_score_copy'),
            DB::raw('round(AVG(posts.score_memorize), 2) as average_score_memorize'),
            DB::raw('round(AVG(posts.score_cost), 2) as average_score_cost'),
            DB::raw('round(AVG(posts.score_enjoyment), 2) as average_score_enjoyment'))
        ->groupBy('songs.id', 'posts.instrument_id')
        ->get();
    }
}