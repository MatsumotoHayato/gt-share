<?php

namespace App\Http\Controllers;

use App\Forum;
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
}