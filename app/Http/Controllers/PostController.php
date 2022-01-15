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
    // // レビュー一覧表示
    // public function index(Artist $artist, Song $song, Instrument $instrument)
    // {
    //     return view('posts/index')->with([
    //         'artist' => $artist,
    //         'song' => $song,
    //         'posts'=> $song->getPostsBySongAndInstrument($instrument->id),
    //         'selected_instrument' => $instrument,
    //         'instruments' => $instrument->get(),
    //     ]);
    // }
    
    // レビュー一覧表示
    public function index(Song $song)
    {
        return [
            'artist' => $song->artist,
            'song' => $song,
            'posts' => Post::with(['user', 'instrument'])->where('song_id', $song->id)->get(),
            'instruments' => Instrument::get()
        ];
    }
    
    // レビュー一覧表示（役に立った順）
    public function indexSortFavorite(Artist $artist, Song $song, Instrument $instrument)
    {
        return view('posts/index')->with([
            'artist' => $artist,
            'song' => $song,
            'posts'=> $song->sortPostsByFavoriteCount($instrument->id),
            'selected_instrument' => $instrument,
            'instruments' => $instrument->get(),
            'sorted_flag' => 1,
        ]);
    }

    // レビュー投稿画面
    public function create(Artist $artist, Song $song, Instrument $instrument)
    {
        return view('posts/create')->with([
            'artist' => $artist,
            'song' => $song,
            'selected_instrument' => $instrument,
            'instruments' => $instrument->get(),
            ]);
    }

    // レビュー投稿
    public function store(PostRequest $request, Artist $artist, Song $song, Post $post)
    {
        $input = $request['post'];
        $input += [
            'user_id' => Auth::id(),
            'song_id' => $song->id,
        ];
        $post->fill($input)->save();
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/instruments/'. $post->instrument->id);
    }
    
    // レビュー編集画面
    public function edit(Artist $artist, Song $song, Post $post, Instrument $instrument)
    {
        return view('posts/edit')->with([
            'artist' => $artist,
            'song' => $song,
            'post' => $post,
            'instruments' => $instrument->get(),
            ]);
    }
    
    // レビュー編集の変更内容更新
    public function update(PostRequest $request, Artist $artist, Song $song, Post $post)
    {
        $input = $request['post'];
        $post->fill($input)->save();
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/instruments/'. $post->instrument->id);
    }
    
    // レビュー削除
    public function delete(Artist $artist, Song $song, Post $post)
    {
        $post->delete();
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/instruments/'. $post->instrument->id);
    }
    
    // 役に立った機能
    public function favorite(Artist $artist, Song $song, Post $post)
    {
        $post->users()->attach(Auth::id());
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/instruments/'. $post->instrument->id);
    }
    
    // 役に立った取り消し機能
    public function unfavorite(Artist $artist, Song $song, Post $post)
    {
        $post->users()->detach(Auth::id());
        return redirect('/artists/'. $artist->id. '/songs/'. $song->id. '/posts/instruments/'. $post->instrument->id);
    }
    
    // 役に立ったマイリスト
    public function mylist(Post $post)
    {
        return [
            'posts' => $post->getMyFavoritePosts(),
            'user'=> Auth::user()
        ];
    }
    
    // マイリストの役に立った取り消し機能
    public function unfavoriteMylist(Post $post)
    {
        $post->users()->detach(Auth::id());
        return redirect('/mylist');
    }
}