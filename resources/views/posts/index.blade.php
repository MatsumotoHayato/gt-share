<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset='utf-8'>
        <title>{{ $song->name }}のレビュー一覧</title>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap' rel='stylesheet'>
    </head>
    <body>
        <h1>GTshare</h1>
        <div class='name'>
            <h2>{{ $song->name }}</h2>
        </div>
        <div class='posts'>
            <h2>レビュー一覧</h2>
            [<a href='/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/create'>新規レビュー投稿</a>]
            @foreach ($posts as $post)
                <div class='post'>
                    <small>{{ $post->user_id }}</small>
                    <p class='updated_at'>{{ $post->updated_at }}</p>
                    <h4>{{ $post->difficulty }}</h4>
                    <p class='body'>{{ $post->body }}</p>
                </div>
            @endforeach
        </div>
        <div class='footer'>
            <a href='/artists/{{ $artist->id }}'>{{ $artist->name }}の曲一覧へ</a>
            <a href='/'>アーティスト一覧へ</a>
        </div>
    </body>
</html>
