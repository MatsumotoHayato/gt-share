<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SongController extends Controller
{
    public function index()
    {
        return [
            'artists'=> Artist::orderBy('name')->get(), 
            'songs' => Song::with('artist')->withCount('posts')->orderBy('name')->get()
        ];
    }

    public function store(Request $request, Artist $artist, Song $song)
    {
        $request->validate([
            'name' => [
                'required', 'string', 'max:100',
                Rule::unique('songs', 'name')->where('artist_id', $artist->id)  // 同じアーティストで同じ曲名ならエラー
            ],
        ]);
        $input = ['name' => $request['name']];
        $input += ['artist_id' => $artist->id];  // 要素artist_idの追加
        $song->fill($input)->save();
    }
    
    // 初心者向けの曲ランキング
    public function ranking(Song $song)
    {
        return [
            'songs' => $song->getSongsForBeginners(),
            'instruments' => Instrument::get(),
        ];
    }
}