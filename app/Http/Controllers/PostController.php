<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Artist $artist, Song $song, Post $post)
    {
        return view('posts/index')->with([
            'artist' => $artist,
            'song' => $song,
            'posts'=> $post->get(),
        ]);
    }

    public function create(Artist $artist, Song $song)
    {
        return view('posts/create')->with(['song' => $song]);
    }

    // public function store(Request $request, Song $song, Artist $artist)
    // {
    //     $input = $request['song'];
    //     $input += ['artist_id' => $artist->id];  // 要素artist_idの追加
    //     $song->fill($input)->save();
    //     return redirect('/artists/'. $artist->id);
    // }
}