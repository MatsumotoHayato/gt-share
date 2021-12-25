<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Top Page</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
    </head>
    <body>
        <h1>GTshare（仮サイト名）</h1>
        <div class='search'>
            <h4>キーワード</h4>
            <p>検索</p>
        </div>
        <div class='artists'>
            <h2>アーティスト一覧</h2>
            [<a href='/artists/create'>新規アーティスト追加</a>]
            @foreach ($artists as $artist)
                <div class="artist">
                    <h3 class='artist_name'><a href='/artists/{{ $artist->id }}'>{{ $artist->name }}</a></h4>
                    <p>レビュー件数</p>
                </div>
            @endforeach
            <div class='paginate'>
                {{ $artists->links() }}
            </div>
        </div>
    </body>
</html>
