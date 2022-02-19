<?php

namespace App\Http\Controllers;

use App\Forum;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    // スレッド一覧を表示するためのデータ処理
    public function index(Forum $forum)
    {
        return $forum::withCount('comments')->orderBy('updated_at')->get();
    }

    // 新規スレッド追加時の保存処理
    public function store(Request $request, Forum $forum)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'genre' => 'required|string',
            'body' => 'required|string|max:4000',
        ]);
        $input = [
            'title' => $request['title'],
            'genre' => $request['genre'],
            'body' => $request['body'],
        ];
        $input += ['user_id' => Auth::id(),];
        
        $forum->fill($input)->save();
    }
    
    public function show(Forum $forum)
    {
        return [
            'forum' => $forum,
            'owner' => $forum->user,
            'comments' => Comment::with('user')->where('forum_id', $forum->id)->get()
        ];
    }
    
    // 新規スレッド追加時の保存処理
    public function comment(Request $request, Forum $forum, Comment $comment)
    {
        $request->validate([
            'body' => 'required|string|max:4000',
        ]);
        $input = [
            'body' => $request['body'],
        ];
        $input += [
            'user_id' => Auth::id(),
            'forum_id' => $forum->id
        ];
        
        $comment->fill($input)->save();
    }
}