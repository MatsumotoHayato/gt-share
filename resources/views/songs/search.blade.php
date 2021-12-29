<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>曲名検索結果</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="search">
            <form method="GET">
                <input class="search-query" name="keyword" type="text" placeholder="アーティスト名や曲名を検索"/>
                <button class="search-btn" type="submit" formaction="/search/artists">アーティスト名検索</button>
                <button class="search-btn" type="submit" formaction="/search/songs">曲名検索</button>
            </form>
        </div>
        <h1>曲名"{{ $keyword }}"の検索結果</h1>
        <div class="songs">
            <h2>曲一覧</h2>
            @foreach ($songs as $song)
                <div class="song">
                    <h4><a href="/artists/{{ $song->artist_id }}/songs/{{ $song->id }}">{{ $song->name }}</a></h4>
                    <small>レビュー{{ $song->getPostCountByTargetSong() }}件</small>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
