<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>新規レビュー投稿画面</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <h2>{{ $song->name }} / {{ $artist->name }} の新規レビュー投稿</h2>
        <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts" method="POST">
            @csrf
            <div>
                楽器<select name="post[instrument_id]">
                  <option value="未選択">選択してください</option>
                    @foreach ($instruments as $instrument)
                        <option value='{{ $instrument->id }}'>{{ $instrument->name }}</option>
                    @endforeach
                </select>
                
                <p>楽器経験<input type="text" name="post[experience]" value="{{ old("post.experience") }}"/>年 （1年未満の場合は0と記入してください）</p>
                
                <p>難易度<select name="post[difficulty]">
                  <option value="未選択">選択してください</option>
                    @for ($i = 1; $i <= 5; $i++)
                        <option value='{{ $i }}'>{{ $i }}</option>
                    @endfor
                </select></p>
                感想<textarea type="text" name="post[body]" placeholder="演奏した感想を記入してください。" value="{{ old("post.body") }}"></textarea>
                <p>URL<input type="url" name="post[url]" placeholder="演奏動画のURLがあれば" value="{{ old("post.url") }}"/></p>
            </div>
            <input type="submit" value="投稿"/>
        </form>
        <div class="footer">
            <p><a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}">{{ $song->name }}のレビュー一覧へ</a></p>
            <p><a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
