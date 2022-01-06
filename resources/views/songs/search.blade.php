<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        @empty($artist)  <!--$artistが空なら全曲から検索-->
            <title>曲名検索結果</title>
        @else
            <title>{{ $artist->name }}の曲名検索結果</title>
        @endempty
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        @empty($artist)
            <form class="search-form" method="GET">
                <input class="search-form__input" name="keyword" type="text" placeholder="アーティスト名や曲名を検索"/>
                <button class="search-form__button" type="submit" formaction="/search/artists">アーティスト名検索</button>
                <button class="search-form__button" type="submit" formaction="/search/songs">曲名検索</button>
                <!--<p class="search-form__error" style="color:red">{{ $errors->first("keyword") }}</p>-->
            </form>
            <b class="top__song-name">曲名"{{ $keyword }}"の検索結果</b>
        @else
            <form class="search-form" method="GET">
                <input class="search-form__input" name="song_keyword" type="text" placeholder="{{ $artist->name}}の曲名を検索"/>
                <button class="search-form__button" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>
                <p class="search-form__error" style="color:red">{{ $errors->first("song_keyword") }}</p>
            </form>
            <b class="top__song-name">{{ $artist->name}}の曲名"{{ $keyword }}"の検索結果</b>
        @endempty
        <div class="container">
            <div class="list__title">
                <b>曲一覧</b>
                @isset($artist)
                <form action="/artists/{{ $artist->id }}/songs/create" method="GET">
                    <button class="create__button" type="submit">新規曲追加</button>
                </form>
                @endisset
            </div>
            @foreach ($songs as $song)
                <div class="song">
                    <b class="song__name"><a href="/artists/{{ $song->artist_id }}/songs/{{ $song->id }}/posts/instruments/1">{{ $song->name }}</a></b>
                    @empty($artist)
                        <small> / <a href="/artists/{{ $song->artist_id }}">{{ $song->artist->name }}</a></small>
                    @endempty
                    <small class="song__post-count">レビュー{{ $song->getPostCountBySong() }}件</small>
                </div>
            @endforeach
            <div class="paginate">
                    {{ $songs->links() }}
            </div>
            <div class="breadcrumbs">
                <p><a href="/">トップ</a> > 
                @isset($artist)
                    <a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a> > 
                @endisset
                曲名検索結果</p>
            </div>
        </div>
        @endsection
    </body>
</html>
