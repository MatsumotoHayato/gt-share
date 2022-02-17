<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SongController extends Controller
{
    // 全曲一覧を表示するためのデータ処理
    public function index()
    {
        return [
            'artists'=> Artist::orderBy('name')->get(), 
            'songs' => Song::with('artist')->withCount('posts')->orderBy('name')->get()
        ];
    }

    // 新規曲追加時の保存処理
    public function store(Request $request, Artist $artist, Song $song)
    {
        $request->validate([
            'name' => [
                'required', 'string', 'max:100',
                Rule::unique('songs', 'name')->where('artist_id', $artist->id)  // 同じアーティストで同じ曲名ならエラー
            ],
        ]);
        $input = ['name' => $request['name']];
        $input += ['artist_id' => $artist->id];
        $song->fill($input)->save();
    }
    
    // 簡単な曲ランキングを表示するためのデータ処理
    public function ranking(Song $song)
    {
        return [
            'songs' => $song->getSongsForBeginners(),
            'instruments' => Instrument::get(),
        ];
    }
}