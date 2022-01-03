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
            <div class="search">
                <form method="GET">
                    <input class="search-keyword" name="keyword" type="text" placeholder="アーティスト名や曲名を検索"/>
                    <button class="search-btn" type="submit" formaction="/search/artists">アーティスト名検索</button>
                    <button class="search-btn" type="submit" formaction="/search/songs">曲名検索</button>
                    <p class="name__error" style="color:red">{{ $errors->first("keyword") }}</p>
                </form>
            </div>
            <h1>曲名"{{ $keyword }}"の検索結果</h1>
        @else
            <div class="search">
                <form method="GET">
                    <input class="search-keyword" name="song_keyword" type="text" placeholder="{{ $artist->name}}の曲名を検索"/>
                    <button class="search-btn" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>
                    <p class="name__error" style="color:red">{{ $errors->first("song_keyword") }}</p>
                </form>
            </div>
            <h1>{{ $artist->name}}の曲名"{{ $keyword }}"の検索結果</h1>
        @endempty
        <div class="songs">
            <h2>曲一覧</h2>
            @isset($artist)
                [<a href="/artists/{{ $artist->id }}/songs/create">新規曲追加</a>]
            @endisset
            @foreach ($songs as $song)
                <div class="song">
                    <h4><a href="/artists/{{ $song->artist_id }}/songs/{{ $song->id }}">{{ $song->name }}</a></h4>
                    @empty($artist)
                        <small><a href="/artists/{{ $song->artist_id }}">- {{ $song->artist->name }}</a></small>
                    @endempty
                    <small>レビュー{{ $song->getPostCountByTargetSong() }}件</small>
                </div>
            @endforeach
        </div>
        <div class="paginate">
                {{ $songs->links() }}
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧</a> > 
            @isset($artist)
                <a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a> > 
            @endisset
            曲検索結果</p>
        </div>
        @endsection
    </body>
</html>
