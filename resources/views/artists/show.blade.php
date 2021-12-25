<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Top Page</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
    </head>
    <body>
        <h1>GTshare</h1>
        <div class='search'>
            <h4>キーワード</h4>
            <p>検索</p>
        </div>
        <div class='name'>
            <h2>{{ $artist->name }}</h2>
        </div>
        <div class="footer">
            <a href="/">アーティスト一覧へ</a>
        </div>
    </body>
</html>
