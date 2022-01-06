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
                        @if ($instrument->id == $selected_instrument->id)
                            <option value='{{ $instrument->id }}' selected>{{ $instrument->name }}</option>
                        @elseif ($instrument->id == old("post.instrument_id"))
                            <option value='{{ $instrument->id }}' selected>{{ $instrument->name }}</option>
                        @else
                            <option value='{{ $instrument->id }}'>{{ $instrument->name }}</option>
                        @endif
                    @endforeach
                </select>
                <p style="color:red">{{ $errors->first("post.instrument_id") }}</p>
                
                <p>楽器経験<input type="text" name="post[experience]" value="{{ old("post.experience") }}"/>年 （1年未満の場合は0と入力してください）</p>
                <p style="color:red">{{ $errors->first("post.experience") }}</p>
                
                <p>難易度<select name="post[difficulty]">
                  <option value="未選択">選択してください</option>
                    @for ($i = 1; $i <= 5; $i++)
                        @if ($i == old("post.difficulty"))
                            <option value='{{ $i }}' selected>{{ $i }}</option>
                        @else
                            <option value='{{ $i }}'>{{ $i }}</option>
                        @endif
                    @endfor
                </select></p>
                <p style="color:red">{{ $errors->first("post.difficulty") }}</p>
                
                <p>感想（練習時間、演奏のコツ、使用機材、楽しかった箇所など…）</p>
                <textarea type="text" name="post[body]" placeholder="演奏した感想を記入してください">{{ old("post.body") }}</textarea>
                <p style="color:red">{{ $errors->first("post.body") }}</p>
                
                <p>URL（任意）<input type="text" name="post[url]" placeholder="演奏動画のURL" value="{{ old("post.url") }}"/></p>
                <p style="color:red">{{ $errors->first("post.url") }}</p>
            </div>
            <input type="submit" value="投稿"/>
        </form>
        <div class="breadcrumbs">
            <p><a href="/">トップ</a> > 
            <a href="/artists/{{ $artist->id }}">{{ $artist->name }}</a> > 
            <a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id}}">{{ $song->name }}</a> > 
            新規レビュー投稿</p>
        </div>
        @endsection
    </body>
</html>
