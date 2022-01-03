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

    // 対象曲のレビュー一覧を取得
    public function getPostsBySongAndInstrument(int $instrument_id = 1, int $limit_count = 10)
    {
        // 曲IDと楽器IDを指定し、投稿時間順に並べたあと、ペジネーション
        return $this::with('posts')->find($this->id)->posts()->where('instrument_id', $instrument_id)->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
    
    // 対象曲のレビュー一覧を役に立った数順で並び替え
    public function sortPostsByFavoriteCount(int $instrument_id = 1, int $limit_count = 10)
    {
        // withCountでリレーション先の件数を取得
        // 曲IDと楽器IDを指定し、役に立った数順に並べたあと、ペジネーション
        return Post::withCount('users')->where('song_id', $this->id)->where('instrument_id', $instrument_id)
        ->orderBy('users_count', 'DESC')->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }

    // 対象曲のレビュー件数取得
    public function getPostCountBySong()
    {
        return Post::where('song_id', $this->id)->count();
    }

    // 楽器ごとの曲の難易度を計算
    public function culcDifficultyByInstrument(int $instrument_id = 1)
    {
        $difficulty = Post::where('song_id', $this->id)->where('instrument_id', $instrument_id)->avg('difficulty');
        return round($difficulty, 2);  // 小数点第2位まで表示
    }
    
    // 難易度の低い順から曲を取得
    public function getSongsForBeginnersByInstrument(int $instrument_id = 1, int $limit_count = 100)
    {
        // 曲IDでグループ化して平均難易度を計算し、難易度昇順に曲を並び替える
        // 'songs.artist_id'をSelect句で選択しないとアーティスト名取得できない
        return $this::Join('posts', 'songs.id', '=', 'posts.song_id')->where('posts.instrument_id', $instrument_id)->groupBy('songs.id', 'songs.name', 'songs.artist_id')
        ->orderByRaw('avg(posts.difficulty)')->select('songs.id', 'songs.name', 'songs.artist_id')->limit($limit_count)->get();
    }

    // キーワードから曲名検索、$artist_idが渡されればアーティストでも絞り込み
    public function searchSongsByKeyword($keyword, $artist_id = NULL, int $limit_count = 40)
    {
        if (empty($artist_id)) {
        return $this::where('name','like','%'.$keyword.'%')->orderBy('name')->paginate($limit_count);
        } else {
        return $this::where('artist_id', $artist_id)->where('name','like','%'.$keyword.'%')->orderBy('name')->paginate($limit_count);
        }
    }
}