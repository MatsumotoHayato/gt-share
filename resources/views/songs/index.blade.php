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
            <form method="GET">
                <input class="search-keyword" name="song_keyword" type="text" placeholder="{{ $artist->name}}の曲名を検索"/>
                <button class="search-btn" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>
                <p class="name__error" style="color:red">{{ $errors->first("song_keyword") }}</p>
            </form>
        </div>
        <div class="name">
            <h2>{{ $artist->name }}</h2>
        </div>
        <div class="songs">
            <h2>曲一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/create">新規曲追加</a>]
            <div>
                @if($songs->isNotEmpty())
                <form action="/" method="GET">
                    <select onChange="submit(this.form)">
                        <option>名前順</option>
                        <option>レビュー数順</option>
                    </select>
                </form>
                @endif
            </div>
            @foreach ($songs as $song)
                <div class="song">
                    <h4><a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/1">{{ $song->name }}</a></h4>
                    <small>レビュー{{ $song->getPostCountByTargetSong() }}件</small>
                </div>
            @endforeach
            <div class="paginate">
                {{ $songs->links() }}
            </div>
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
