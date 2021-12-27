<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>新規レビュー投稿画面</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <h2>{{ $song->name }} / {{ $song->artist->name }} の新規レビュー投稿</h2>
        <form action="/artists/{{ $song->artist->id }}/songs/{{ $song->id }}/posts" method="POST">
            @csrf
            <div>
                <p>楽器</p>
                <p>楽器経験<input type="text" name="post[experience]" value="{{ old("post.experience") }}"/>年</p>
                
                <p>難易度<select name="post[difficulty]">
                  <option value="未選択">選択してください</option>
                    @for ($i = 1; $i <= 5; $i++)
                    <option value='{{ $i }}'>{{ $i }}</option>
                    @endfor
                </select></p>
                
                <p>感想<input type="text" name="post[body]" placeholder="演奏した感想を記入してください。" value="{{ old("post.body") }}"/></p>
                <p>URL<input type="url" name="post[url]" placeholder="演奏動画のURL" value="{{ old("post.url") }}"/></p>
            </div>
            <input type="submit" value="追加"/>
        </form>
        <div class="footer">
            <p><a href="/artists/{{ $song->artist->id }}/songs/{{ $song->id }}">{{ $song->name }}のレビュー一覧へ</a></p>
            <p><a href="/artists/{{ $song->artist->id }}">{{ $song->artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
    </body>
</html>
