<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Top Page</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="search">
            <input class="search-query" type="text" placeholder="曲名やアーティスト名で検索"/>
            <button class="search-btn" type="submit">検索</button>
        </div>
        <div class="artists">
            <h2>アーティスト一覧</h2>
            [<a href="/artists/create">新規アーティスト追加</a>]
            @foreach ($artists as $artist)
                <div class="artist">
                    <h3 class="artist-name"><a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a></h3>
                    <small class='posts-count'>レビュー件数</small>
                </div>
            @endforeach
            <div class="paginate">
                {{ $artists->links() }}
            </div>
        </div>
    </body>
</html>
