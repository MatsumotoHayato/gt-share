<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    public function index(Artist $artist, Song $song, Instrument $instrument)  // 引数の順番に注意（web.phpと揃える）
    {
        return view('posts/index')->with([
            'artist' => $artist,
            'song' => $song,
            'posts'=> $song->getPostsByTargetSongAndInstrument($instrument->id),
            'selected_instrument' => $instrument,
            'instruments' => $instrument->get(),
        ]);
    }

    public function create(Artist $artist, Song $song, Instrument $instrument)
    {
        return view('posts/create')->with([
            'artist' => $artist,
            'song' => $song,
            'selected_instrument' => $instrument,
            'instruments' => $instrument->get(),
            ]);
    }

    public function store(PostRequest $request, Artist $artist, Song $song, Post $post)
    {
        $input = $request['post'];
        $input += [
            // 'user_id' => auth()->user()->id,
            'user_id' => Auth::id(),
            'song_id' => $song->id,
        ];
        $post->fill($input)->save();
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id);
    }
    
    // 役に立った機能
    public function favorite(Artist $artist, Song $song, Post $post)
    {
        $post->users()->attach(Auth::id());
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/'. $post->instrument->id);
    }
    
    // 役に立った取り消し機能
    public function unfavorite(Artist $artist, Song $song, Post $post)
    {
        $post->users()->detach(Auth::id());
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/'. $post->instrument->id);
    }
    
    // 役に立ったマイリスト
    public function mylist(Post $post)
    {
        return view('posts/mylist')->with([
            'posts' => $post->getMyFavoritePosts()
        ]);
    }
    
    // マイリストの役に立った取り消し機能
    public function unfavorite_mylist(Post $post)
    {
        $post->users()->detach(Auth::id());
        return redirect('/mylist');
    }
}