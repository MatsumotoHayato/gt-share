<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use App\Instrument;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    // レビュー一覧表示
    public function index(Song $song)
    {
        return [
            'user' => Auth::user(),
            'artist' => $song->artist,
            'song' => $song,
            'posts' => Post::with(['user', 'instrument'])->withCount('users')->where('song_id', $song->id)->orderBy('updated_at', 'DESC')->get(),
            'instruments' => Instrument::get()
        ];
    }
    
    // レビュー投稿
    public function store(Request $request, Song $song, Post $post)
    {
        $request->validate([
            'instrument_id' => 'required|integer',
            'experience' => 'nullable|integer|between:0,100',
            'score_easy' => 'required|integer|between:1,5',
            'score_copy' => 'required|integer|between:1,5',
            'score_memorize' => 'required|integer|between:1,5',
            'score_cost' => 'required|integer|between:1,5',
            'score_enjoyment' => 'required|integer|between:1,5',
            'body' => 'required|string|max:4000',
            'url' => 'nullable|url'
        ]);
        $input = [
            'instrument_id' => $request['instrument_id'],
            'experience' => $request['experience'],
            'score_easy' => $request['score_easy'],
            'score_copy' => $request['score_copy'],
            'score_memorize' => $request['score_memorize'],
            'score_cost' => $request['score_cost'],
            'score_enjoyment' => $request['score_enjoyment'],
            'body' => $request['body'],
            'url' => $request['url'],
        ];
        $input += [
            'user_id' => Auth::id(),
            'song_id' => $song->id,
        ];
        $post->fill($input)->save();
    }

    // レビュー編集の変更内容更新
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'instrument_id' => 'required|integer',
            'experience' => 'nullable|integer|between:0,100',
            'score_easy' => 'required|integer|between:1,5',
            'score_copy' => 'required|integer|between:1,5',
            'score_memorize' => 'required|integer|between:1,5',
            'score_cost' => 'required|integer|between:1,5',
            'score_enjoyment' => 'required|integer|between:1,5',
            'body' => 'required|string|max:4000',
            'url' => 'nullable|url'
        ]);
        $input = [
            'id' => $request['id'],
            'instrument_id' => $request['instrument_id'],
            'experience' => $request['experience'],
            'score_easy' => $request['score_easy'],
            'score_copy' => $request['score_copy'],
            'score_memorize' => $request['score_memorize'],
            'score_cost' => $request['score_cost'],
            'score_enjoyment' => $request['score_enjoyment'],
            'body' => $request['body'],
            'url' => $request['url'],
        ];
        $post->fill($input)->save();
    }
    
    // レビュー削除
    public function delete(Post $post)
    {
        $post->delete();
    }
    
    // いいね機能
    public function favorite(Post $post)
    {
        $post->users()->attach(Auth::id());
    }
    
    // いいね取り消し機能
    public function unfavorite(Post $post)
    {
        $post->users()->detach(Auth::id());
    }
    
    // いいねマイリスト
    public function myfavorite(Post $post)
    {
        return [
            'posts' => $post->getMyFavoritePosts(),
            'user'=> Auth::user()
        ];
    }
    
    // 自分の投稿
    public function myposts(Post $post)
    {
        return [
            'posts' => $post->getMyPosts(),
            'user'=> Auth::user()
        ];
    }
}