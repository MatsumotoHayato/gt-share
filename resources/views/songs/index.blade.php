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
        <form class="search-form" method="GET">
            <input class="search-form__input" name="song_keyword" type="text" placeholder="{{ $artist->name}}の曲名を検索"/>
            <button class="search-form__button" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>
            <!--<p class="search-form__error" style="color:red">{{ $errors->first("song_keyword") }}</p>-->
        </form>
        <div class="container">
            <b class="top__artist-name">{{ $artist->name }}</b>
            <div class="list__title">
                <b>曲一覧</b>
                <form action="/artists/{{ $artist->id }}/songs/create" method="GET">
                    <button class="create__button" type="submit">新規曲追加</button>
                </form>
            </div>
            @foreach ($songs as $song)
                <div class="song">
                    <b class="song__name">
                        <a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/1">{{ $song->name }}</a>
                    </b>
                    <small class="song__post-count">レビュー {{ $song->getPostCountBySong() }}件</small>
                </div>
            @endforeach
            <div class="paginate">
                {{ $songs->links() }}
            </div>
            <div class="breadcrumbs">
                <p><a href="/">トップ</a> > 
                {{ $artist->name }}</p>
            </div>
        </div>
        @endsection
    </body>
</html>
