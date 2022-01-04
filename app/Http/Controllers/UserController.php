<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // ユーザー情報表示画面
    public function index(User $user)
    {
        return view('users/index')->with(['user' => $user]);  
    }
    
    // ユーザー情報編集画面
    public function edit()
    {
        return view('users/edit')->with(['user' => Auth::user()]);
    }
    
    // ユーザー情報更新
    public function update(Request $request)
    {
        $request->validate([
            'user.name' => 'required|string|max:100',
            'user.email' => ['required','string','email','max:255', Rule::unique('users','email')->ignore(Auth::id())],
            'user.age' => 'nullable|integer|between:0,150',
            'user.occupation' => 'nullable|string|max:100',
        ]);
        $input = $request['user'];
        Auth::user()->fill($input)->save();
        return redirect('/users/mypage/edit');
    }
}