<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>{{ $artist->name }}の曲一覧</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="search">
            <input class="search-query" type="text" placeholder="曲名やアーティスト名で検索"/>
            <button class="search-btn" type="submit">検索</button>
        </div>
        <div class="name">
            <h2>{{ $artist->name }}</h2>
            <!--$songs->find(1)->artist->name-->
        </div>
        <div class="songs">
            <h2>曲一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/create">新規曲追加</a>]
            @foreach ($songs as $song)
                <div class="song">
                    <h4><a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}">{{ $song->name }}</a></h4>
                    <small>レビュー件数</small>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
