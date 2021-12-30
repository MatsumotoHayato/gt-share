<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>{{ $song->name }} / {{ $artist->name }}のレビュー一覧</title>
        
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="name">
            <h2>{{ $song->name }} / {{ $artist->name }}</h2>
        </div>
        @php
            if (empty($selected_instrument_id)) { $selected_instrument_id = $instruments->first()->id; }
        @endphp
        <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/selected" method="GET">
            <div>
                楽器<select name="instrument_id" onChange="submit(this.form)">
                        @foreach ($instruments as $instrument)
                            @if ($instrument->id == $selected_instrument_id)
                                <option value='{{ $instrument->id }}' selected>{{ $instrument->name }}</option>
                            @else
                                <option value='{{ $instrument->id }}'>{{ $instrument->name }}</option>
                            @endif
                        @endforeach
                    </select>
            </div>
            <div>
                @if ($song->culcDifficultyByTargetInstrument($selected_instrument_id) != 0)
                    <h2>難易度: {{ $song->culcDifficultyByTargetInstrument($selected_instrument_id)}}</h2>
                @else
                    <h2>難易度: なし</h2>
                @endif
            </div>
        </form>
        <div class="posts">
            <h2>レビュー一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/create">新規レビュー投稿</a>]
            @foreach ($posts as $post)
                <div class="post">
                    <h4>{{ $post->user->name }}: 
                    @if ($post->experience < 1)
                        楽器経験1年未満
                    @else
                        楽器経験{{ $post->experience }}年
                    @endif
                    </h4>
                    <p class="created_at">投稿日時: {{ $post->created_at }}</p>
                    <h4>楽器: {{ $post->instrument->name }}</h4>
                    <h4>難易度: {{ $post->difficulty }}</h4>
                    <p>URL: {{ $post->url }}</p>
                    <p class="body">感想: {{ $post->body }}</p>
                    <div class="voted_count">
                        <button type="submit">役に立った 〇〇人</button>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
