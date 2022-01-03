<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>初心者向け曲ランキング</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        </div>
        <div class="songs">
            <h2>初心者向け曲ランキング</h2>
            @php
                if (empty($selected_instrument)) { $selected_instrument = $instruments->first()->id; }
            @endphp
            <div>
                <form method="GET">
                    楽器<select onChange="location.href=value;">
                            @foreach ($instruments as $instrument)
                                @if ($instrument->id == $selected_instrument->id)
                                    <option value="/ranking/beginners/{{ $instrument->id }}" selected>{{ $instrument->name }}</option>
                                @else
                                    <option value="/ranking/beginners/{{ $instrument->id }}">{{ $instrument->name }}</option>
                                @endif
                            @endforeach
                        </select>
                </form>
            </div>
            @foreach ($songs as $index => $song)
                <div class="song">
                    <h4>{{ $index+1 }}. <a href="/artists/{{ $song->artist->id }}/songs/{{ $song->id }}/posts/{{ $selected_instrument->id }}">{{ $song->name }}</a> / 
                    <a href="/artists/{{ $song->artist->id }}">{{$song->artist->name}}</a></h4>
                    <p>難易度 {{ $song->culcDifficultyByTargetInstrument($selected_instrument->id) }}</p>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
