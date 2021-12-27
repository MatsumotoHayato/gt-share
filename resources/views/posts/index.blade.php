<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>{{ $song->name }}のレビュー一覧</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="name">
            <h2>{{ $song->name }} / {{ $artist->name }}</h2>
        </div>
        <div class="posts">
            <h2>レビュー一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/create">新規レビュー投稿</a>]
            @foreach ($posts as $post)
                <div class="post">
                    <h4>ユーザー: {{ $post->user_id }}</h4>
                    <p class="experience">楽器経験: {{ $post->experience }}年</p>
                    <p class="created_at">投稿日時: {{ $post->created_at }}</p>
                    <h4>難易度: {{ $post->difficulty }}</h4>
                    <p class="body">感想: {{ $post->body }}</p>
                    <div class="voted_count">
                        <small>役に立った 〇〇人</small>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
    </body>
</html>
