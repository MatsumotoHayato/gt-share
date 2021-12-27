<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset='utf-8'>
        <title>{{ $artist->name }}の曲一覧</title>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap' rel='stylesheet'>
    </head>
    <body>
        <h1>GTshare</h1>
        <div class='search'>
            <h4>キーワード</h4>
            <p>検索</p>
        </div>
        <div class='name'>
            <h2>{{ $artist->name }}</h2>
            <!--$songs->find(1)->artist->name-->
        </div>
        <div class='songs'>
            <h2>曲一覧</h2>
            [<a href='/artists/{{ $artist->id }}/songs/create'>新規曲追加</a>]
            @foreach ($songs as $song)
                <div class='song'>
                    <h4><a href='/artists/{{ $artist->id }}/songs/{{ $song->id }}'>{{ $song->name }}</a></h4>
                </div>
            @endforeach
        </div>
        <div class='footer'>
            <a href='/'>アーティスト一覧へ</a>
        </div>
    </body>
</html>
