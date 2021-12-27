<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset='utf-8'>
        <title>新規アーティスト追加画面</title>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap' rel='stylesheet'>
    </head>
    <body>
        <h1>GTshare</h1>
        <h2>新規アーティスト追加</h2>
        <form action='/artists' method='POST'>
            @csrf
            <div class='artist_name'>
                <h2>アーティスト名</h2>
                <input type='text' name='artist[name]' placeholder='新規アーティスト名'/>
            </div>
            <input type='submit' value='追加'/>
        </form>
        <div class='footer'>
            <a href='/'>アーティスト一覧へ</a>
        </div>
    </body>
</html>
