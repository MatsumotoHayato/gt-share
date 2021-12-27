<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>新規アーティスト追加画面</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <h2>新規アーティスト追加</h2>
        <form action="/artists" method="POST">
            @csrf
            <div class="artist_name">
                <h2>アーティスト名</h2>
                <input type="text" name="artist[name]" placeholder="新規アーティスト名"/>
            </div>
            <input type="submit" value="追加"/>
        </form>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
    </body>
</html>
