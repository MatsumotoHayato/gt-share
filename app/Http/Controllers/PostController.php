<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Artist $artist, Song $song)  // 引数の順番に注意（web.phpと揃える）
    {
        return view('posts/index')->with([
            'artist' => $artist,
            'song' => $song,
            'posts'=> $song->getPostsByTargetSong(),
        ]);
    }

    public function create(Artist $artist, Song $song, Instrument $instrument)
    {
        return view('posts/create')->with([
            'artist' => $artist,
            'song' => $song,
            'instruments' => $instrument->get(),
            ]);
    }

    public function store(Request $request, Artist $artist, Song $song, Post $post)
    {
        $input = $request['post'];
        $input += [
            'user_id' => auth()->user()->id,
            'song_id' => $song->id,
        ];
        $post->fill($input)->save();
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id);
    }
}