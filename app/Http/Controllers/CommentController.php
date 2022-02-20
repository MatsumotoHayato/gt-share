<?php

namespace App\Http\Controllers;

use App\Forum;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // 新規コメント追加時の保存処理
    public function store(Request $request, Forum $forum, Comment $comment)
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
    
    // コメント削除
    public function delete(Comment $comment)
    {
        $comment->delete();
    }
}