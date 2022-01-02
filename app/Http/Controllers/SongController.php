<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use Illuminate\Http\Request;
use App\Http\Requests\SongRequest;

class SongController extends Controller
{
    public function index(Artist $artist)
    {
        return view('songs/index')->with([
            'artist'=> $artist, 
            'songs' => $artist->getSongsByTargetArtist()
        ]);
    }

    public function create(Artist $artist)
    {
        return view('songs/create')->with(['artist' => $artist]);
    }

    public function store(SongRequest $request, Artist $artist, Song $song)
    {
        $input = $request['song'];
        $input += ['artist_id' => $artist->id];  // 要素artist_idの追加
        $song->fill($input)->save();
        return redirect('/artists/'. $artist->id);
    }

    // 全曲からキーワード検索
    public function search(Request $request, Song $song)
    {
        // バリデーション
        $request = $request->validate([
            'keyword' => 'required|string|max:100'
        ]);
        return view('songs/search')->with([
            'songs' => $song->searchSongsByKeyword($request['keyword']),
            'keyword' => $request['keyword'],
        ]);
    }

    // 特定アーティストの曲からキーワード検索
    public function search_by_artist(Request $request, Artist $artist, Song $song)
    {
        // バリデーション
        $request = $request->validate([
            'song_keyword' => 'required|string|max:100'  // バリデーションメッセージを'song_keyword'=>'曲名'としているため
        ]);
        return view('songs/search')->with([
            'songs' => $song->searchSongsByKeyword($request['song_keyword'], $artist->id),
            'keyword' => $request['song_keyword'],
            'artist' => $artist,
        ]);
    }
    
    // 初心者向けの曲ランキング
    public function ranking(Song $song, Instrument $instrument)
    {
        return view('songs/ranking')->with([
            'songs' => $song->getSongsForBeginnersByInstrument(),
            'instruments' => $instrument->get(),
        ]);
    }
    // 初心者向けの曲ランキング
    public function ranking_selected_instrument(Request $request, Song $song, Instrument $instrument)
    {
        return view('songs/ranking')->with([
            'songs' => $song->getSongsForBeginnersByInstrument($request['instrument_id']),
            'selected_instrument_id' => $request['instrument_id'],
            'instruments' => $instrument->get(),
        ]);
    }
}