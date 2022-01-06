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
        <div class="container">
            <b class="top__title">役に立ったマイリスト</b>
            <div class="list__title">
                <b>レビュー一覧</b>
            </div>
            @foreach ($posts as $post)
                <div class="post">
                    <h3><a href="/artists/{{ $post->song->artist->id }}/songs/{{ $post->song->id }}/posts/instruments/{{ $post->instrument->id }}">{{ $post->song->name}}</a> / 
                    <a href="/artists/{{ $post->song->artist->id }}">{{$post->song->artist->name}}</a></h3>
                    
                    <p>{{ $post->user->name }}: 
                    @if ($post->experience < 1)
                        楽器経験1年未満
                    @else
                        楽器経験{{ $post->experience }}年
                    @endif
                    </p>
                    <p class="updated_at">{{ $post->updated_at }}</p>
                    <p>楽器: {{ $post->instrument->name }}</p>
                    <p>難易度: {{ $post->difficulty }}</p>
                    @isset ($post->url) <p>URL: {{ $post->url }}</p> @endisset
                    <p class="body">感想: {{ $post->body }}</p>
                    <div class="favorite_count">
                        <form action="/mylist/{{ $post->id }}/unfavorite" method="POST">
                          @csrf
                          <button type="submit">役に立った {{ $post->users()->count() }}人  解除</button>
                        </form>
                    </div>
                </div>
            @endforeach
            <div class="paginate">
                    {{ $posts->links() }}
            </div>
            <div class="breadcrumbs">
                <p><a href="/">トップ</a> > 
                役に立ったマイリスト</p>
            </div>
        </div>
        @endsection
    </body>
</html>
