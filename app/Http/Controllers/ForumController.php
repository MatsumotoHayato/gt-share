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
        return $forum::withCount('comments')->orderBy('updated_at', 'DESC')->get();
    }

    // 新規スレッド追加時の保存処理
    public function store(Request $request, Forum $forum)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'category' => 'required|string',
            'body' => 'required|string|max:4000',
        ]);
        $input = [
            'title' => $request['title'],
            'category' => $request['category'],
            'body' => $request['body'],
        ];
        $input += ['user_id' => Auth::id(),];
        
        $forum->fill($input)->save();
    }
    
    // スレッド詳細を表示するためのデータ処理
    public function show(Forum $forum)
    {
        return [
            'user' => Auth::user(),
            'forum' => $forum,
            'owner' => $forum->user,
            'comments' => Comment::with('user')->where('forum_id', $forum->id)->get()
        ];
    }
    
    // スレッド削除
    public function delete(Forum $forum)
    {
        $forum->delete();
    }
}