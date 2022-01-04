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
                楽器<select onChange="location.href=value">
                        @foreach ($instruments as $instrument)
                            @if ($instrument->id == $selected_instrument->id)
                                <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $instrument->id }}" selected>{{ $instrument->name }}</option>
                            @else
                                <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $instrument->id }}">{{ $instrument->name }}</option>
                            @endif
                        @endforeach
                    </select>
            </form>
        </div>
        <div>
            @if ($song->culcDifficultyByInstrument($selected_instrument->id) != 0)
                <h4>難易度: {{ $song->culcDifficultyByInstrument($selected_instrument->id)}}</h4>
            @else
                <h4>難易度: なし</h4>
            @endif
        </div>
        <div class="posts">
            <h2>レビュー一覧</h2>
            [<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/create">新規レビュー投稿</a>]
            <div>
                @if($posts->isNotEmpty())
                <form method="GET">
                    <select onChange="location.href=value">
                        @empty ($sorted_flag)
                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}" selected>新しい順</option>
                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/favorite">役に立った順</option>
                        @else
                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}">新しい順</option>
                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/favorite" selected>役に立った順</option>
                        @endempty
                    </select>
                </form>
                @endif
            </div>
            @foreach ($posts as $post)
                <div class="post">
                    <h4><a href="/users/{{ $post->user->id }}">{{ $post->user->name }}</a>: 
                    @if ($post->experience < 1)
                        楽器経験1年未満
                    @else
                        楽器経験{{ $post->experience }}年
                    @endif
                    </h4>
                    <p class="updated_at">{{ $post->updated_at }}</p>
                    <h4>難易度: {{ $post->difficulty }}</h4>
                    @isset ($post->url) <p>URL: {{ $post->url }}</p> @endisset
                    <p class="body">感想: {{ $post->body }}</p>
                    <div class="favorite_count">
                        @if ($post->users()->where('user_id', Auth::id())->exists())
                            <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/unfavorite" method="POST">
                              @csrf
                              <button type="submit">役に立った {{ $post->users()->count() }}人  解除</button>
                            </form>
                        @else
                            <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/favorite" method="POST">
                              @csrf
                              <button type="submit">役に立った {{ $post->users()->count() }}人</button>
                            </form>
                        @endif
                    </div>
                    <div>
                        @if ($post->user->id == Auth::id())
                            <p class="edit">[<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/edit">編集</a>]</p>
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
        <div class="paginate">
                {{ $posts->links() }}
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧</a> > 
            <a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a> > 
            {{ $song->name }}</p>
        </div>
        @endsection
    </body>
</html>
