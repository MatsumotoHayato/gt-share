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
            if (empty($selected_instrument)) { $selected_instrument = $instruments->first(); }
        @endphp
        <div>
            <form method="GET">
                楽器<select onChange="location.href=value;">
                        @foreach ($instruments as $instrument)
                            @if ($instrument->id == $selected_instrument->id)
                                <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $instrument->id }}" selected>{{ $instrument->name }}</option>
                            @else
                                <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $instrument->id }}">{{ $instrument->name }}</option>
                            @endif
                        @endforeach
                    </select>
            </form>
        </div>
        <div>
            @if ($song->culcDifficultyByTargetInstrument($selected_instrument->id) != 0)
                <h4>難易度: {{ $song->culcDifficultyByTargetInstrument($selected_instrument->id)}}</h4>
            @else
                <h4>難易度: なし</h4>
            @endif
        </div>
        <div class="posts">
            <h2>レビュー一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $selected_instrument->id }}/create">新規レビュー投稿</a>]
            <div>
                @if($posts->isNotEmpty())
                <form action="/" method="GET">
                    <select onChange="submit(this.form)">
                        <option>新しい順</option>
                        <option>役に立った順</option>
                    </select>
                </form>
                @endif
            </div>
            @foreach ($posts as $post)
                <div class="post">
                    <h4>{{ $post->user->name }}: 
                    @if ($post->experience < 1)
                        楽器経験1年未満
                    @else
                        楽器経験{{ $post->experience }}年
                    @endif
                    </h4>
                    <p class="created_at">{{ $post->created_at }}</p>
                    <h4>楽器: {{ $post->instrument->name }}</h4>
                    <h4>難易度: {{ $post->difficulty }}</h4>
                    @isset ($post->url) <p>URL: {{ $post->url }}</p> @endisset
                    <p class="body">感想: {{ $post->body }}</p>
                    <div class="favorite_count">
                        @if($post->users()->where('user_id', Auth::id())->exists())
                            <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/unfavorite" method="POST">
                              @csrf
                              <button type="submit">役に立った {{ $post->users()->count() }}人  取り消す</button>
                            </form>
                        @else
                            <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/favorite" method="POST">
                              @csrf
                              <button type="submit">役に立った {{ $post->users()->count() }}人</button>
                            </form>
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
        <div class="paginate">
                {{ $posts->links() }}
        </div>
        <div class="footer">
            <p><a href="/artists/{{ $artist->id }}">{{ $artist->name }}の曲一覧へ</a></p>
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
