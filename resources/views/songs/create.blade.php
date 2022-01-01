<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>新規曲追加画面</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <h2>{{ $artist->name }}の新規曲追加</h2>
        <form action="/artists/{{ $artist->id }}/songs" method="POST">
            @csrf
            <div class="song_name">
                <h2>曲名</h2>
                <input type="text" name="song[name]" placeholder="新規曲名" value="{{ old("song.name") }}"/>
                <p class="name__error" style="color:red">{{ $errors->first("song.name") }}</p>
            </div>
            <input type="submit" value="追加"/>
        </form>
        <div class="footer">
            <p><a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
