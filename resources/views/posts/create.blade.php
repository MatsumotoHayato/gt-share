<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset='utf-8'>
        <title>新規レビュー投稿画面</title>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap' rel='stylesheet'>
    </head>
    <body>
        <h1>GTshare</h1>
        <h2>{{ $song->name }} / {{ $song->artist->name }}の新規レビュー投稿</h2>
        <form action='/artists/{{ $song->artist->id }}/songs/{{ $song->id }}/posts' method='POST'>
            @csrf
            <div>
                <p>楽器</p>
                <p>楽器経験<input type='number' name='post[experience]' placeholder='経験年数' value='{{ old('post.experience') }}'/></p>
                <p>難易度<input type='number' name='post[difficulty]' placeholder='難易度' value='{{ old('post.difficulty') }}'/></p>
                <p>感想<input type='text' name='post[body]' placeholder='演奏した感想を記入してください。' value='{{ old('post.body') }}'/></p>
                <p>URL<input type='url' name='post[url]' placeholder='演奏動画のURL' value='{{ old('post.url') }}'/></p>
            </div>
            <input type='submit' value='追加'/>
        </form>
        <div class='footer'>
            <a href='/artists/{{ $song->artist->id }}/songs/{{ $song->id }}'>{{ $song->name }}のレビュー一覧へ</a>
            <a href='/artists/{{ $song->artist->id }}'>{{ $song->artist->name }}の曲一覧へ</a>
            <a href='/'>アーティスト一覧へ</a>
        </div>
    </body>
</html>
