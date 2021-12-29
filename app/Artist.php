<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Artist extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
    ];
    
    public function getArtistsPaginateByLimit(int $limit_count = 20)
    {
        // 名前順に並べたあと、limitで件数制限をかける
        return $this->orderBy('name')->paginate($limit_count);
    }

    // Songに対するリレーション
    public function songs()
    {
        return $this->hasMany('App\Song');
    }

    // 対象アーティストの曲一覧取得
    public function getSongsByTargetArtist(int $limit_count = 20)
    {
        // アーティストIDを指定し、名前順に並べたあと、ペジネーションをかける
        return $this::with('songs')->find($this->id)->songs()->orderBy('name')->paginate($limit_count);
    }

    // 対象アーティストの合計レビュー件数取得
    public function getPostCountByTargetArtist()
    {
        // postsテーブルとsongsテーブルを内部結合、artist_idで絞り込み、レコード数をカウント
        return DB::table('posts')->join('songs', 'posts.song_id', '=', 'songs.id')->where('artist_id', $this->id)->count();
    }

    // キーワードからアーティスト名検索
    public function searchArtistsByKeyword($keyword, int $limit_count = 20)
    {
        return $this::where('name','like','%'.$keyword.'%')->orderBy('name')->paginate($limit_count);
    }
}
