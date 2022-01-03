<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>役に立ったマイリスト</title>
        
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="name">
            <h2>役に立ったマイリスト</h2>
        </div>
        <div class="posts">
            @foreach ($posts as $post)
                <div class="post">
                    <h3><a href="/artists/{{ $post->song->artist->id }}/songs/{{ $post->song->id }}/posts/{{ $post->instrument->id }}">{{ $post->song->name}}</a> / 
                    <a href="/artists/{{ $post->song->artist->id }}">{{$post->song->artist->name}}</a></h3>
                    
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
                        <form action="/mylist/{{ $post->id }}/unfavorite" method="POST">
                          @csrf
                          <button type="submit">役に立った {{ $post->users()->count() }}人  取り消す</button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="paginate">
                {{ $posts->links() }}
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
