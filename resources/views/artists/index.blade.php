<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Top Page</title>
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
                <input class="search-keyword" name="keyword" type="text" placeholder="アーティスト名や曲名を検索"/>
                <button class="search-btn" type="submit" formaction="/search/artists">アーティスト名検索</button>
                <button class="search-btn" type="submit" formaction="/search/songs">曲名検索</button>
                <p class="name__error" style="color:red">{{ $errors->first("keyword") }}</p>
            </form>
        </div>
        <div class="artists">
            <h2>アーティスト一覧</h2>
            [<a href="/artists/create">新規アーティスト追加</a>]
            <div>
                <form action="/" method="GET">
                    <select onChange="submit(this.form)">
                        <option>名前順</option>
                        <option>レビュー数順</option>
                        <option>曲数順</option>
                    </select>
                </form>
            </div>
            @foreach ($artists as $artist)
                <div class="artist">
                    <h3 class="artist-name"><a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a></h3>
                    <small class='posts-count'>レビュー{{ $artist->getPostCountByTargetArtist() }}件</small>
                </div>
            @endforeach
            <div class="paginate">
                {{ $artists->links() }}
            </div>
        </div>
        <p><a href="/ranking/beginners/instruments/1">初心者向け曲ランキング</a></p>
        <p><a href="/mylist">役に立ったマイリスト</a></p>
        @endsection
    </body>
</html>
