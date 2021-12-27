<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index(Artist $artist)
    {
        return view('songs/index')->with([
            'artist' => $artist, 
            'songs' => $artist->getSongsByTargetArtist($artist->id)
        ]);
    }

    public function create(Artist $artist)
    {
        return view('songs/create')->with(['artist' => $artist]);
    }

    public function store(Request $request, Song $song, Artist $artist)
    {
        $input = $request['song'];
        $input['artist_id'] = $artist->id;  // 要素artist_idの追加
        $song->fill($input)->save();
        return redirect('/artists/'. $artist->id);
    }
}