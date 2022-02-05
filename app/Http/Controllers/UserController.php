<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // 現在のユーザー情報取得
    public function get()
    {
        return [
            'user'=> Auth::user()
        ];
    }

    // ユーザー情報更新
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => ['required','string','email','max:255', Rule::unique('users','email')->ignore(Auth::id())],
            'age' => 'nullable|integer|between:0,150',
            'occupation' => 'nullable|string|max:100',
        ]);
        $input = [
            'name' => $request['name'],
            'email' => $request['email'],
            'age' => $request['age'],
            'occupation' => $request['occupation'],
        ];
        Auth::user()->fill($input)->save();
    }
    
    // パスワード変更
    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string|min:8',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = Auth::user();
        if(password_verify($request->old_password, $user->password))
        {
            $user->password = bcrypt($request->new_password);
            $user->save();
        }
    }
}