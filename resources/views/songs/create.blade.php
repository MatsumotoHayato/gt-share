<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset='utf-8'>
        <title>新規曲追加画面</title>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap' rel='stylesheet'>
    </head>
    <body>
        <h1>GTshare</h1>
        <h2>{{ $artist->name }}の新規曲追加</h2>
        <form action='/artists/{{ $artist->id }}/songs' method='POST'>
            @csrf
            <div class='song_name'>
                <h2>曲名</h2>
                <input type='text' name='song[name]' placeholder='新規曲名'/>
            </div>
            <input type='submit' value='追加'/>
        </form>
        <div class="footer">
            <a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a>
            <a href="/">アーティスト一覧へ</a>
        </div>
    </body>
</html>
