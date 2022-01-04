<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>マイページ</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <h2>マイページ</h2>
        <form action="/users/mypage" method="POST">
            @csrf
            @method('PUT')
            <div>
                <p>ユーザー名<input type="text" name="user[name]" value="{{ $user->name }}"/></p>
                <p style="color:red">{{ $errors->first("user.name") }}</p>
                
                <p>メールアドレス<input type="text" name="user[email]" value="{{ $user->email }}"/></p>
                <p style="color:red">{{ $errors->first("user.email") }}</p>
                
                <p>年齢（任意）<input type="text" name="user[age]" value="{{ $user->age }}"/></p>
                <p style="color:red">{{ $errors->first("user.age") }}</p>
                
                <p>職業（任意）<input type="text" name="user[occupation]" value="{{ $user->occupation }}"/></p>
                <p style="color:red">{{ $errors->first("user.occupation") }}</p>
            </div>
            <input type="submit" value="更新"/>
        </form>
        <div class="footer">
            <p><a href="/">アーティスト一覧</a> > 
            マイページ</p>
        </div>
        @endsection
    </body>
</html>
