<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artist extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
    ];
    
    public function getPaginateByLimit(int $limit_count = 5)
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
    public function getSongsByTargetArtist(int $artist_id, int $limit_count = 20)
    {
        // アーティストIDを指定し、名前順に並べたあと、ペジネーションをかける
        return $this::with('songs')->find($artist_id)->songs()->orderBy('name')->paginate($limit_count);
    }
}
