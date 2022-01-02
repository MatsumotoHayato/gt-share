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
        @php
            if (empty($selected_instrument_id)) { $selected_instrument_id = $instruments->first()->id; }
            dd($songs);
        @endphp
        <div>
            <form action="/ranking/beginners/selected" method="GET">
                楽器<select name="instrument_id" onChange="submit(this.form)">
                        @foreach ($instruments as $instrument)
                            @if ($instrument->id == $selected_instrument_id)
                                <option value='{{ $instrument->id }}' selected>{{ $instrument->name }}</option>
                            @else
                                <option value='{{ $instrument->id }}'>{{ $instrument->name }}</option>
                            @endif
                        @endforeach
                    </select>
            </form>
        </div>
        <div class="songs">
            <h2>曲一覧</h2>
            @foreach ($songs as $song)
                <div class="song">
                    <h4>{{ $song->name }}</h4>
                    <h4><a href="/artists/{{ $song->artist->id }}/songs/{{ $song->id }}">{{ $song->name }}</a> / {{$song->artist->name}}</h4>
                    <small>難易度 {{ $song->culcDifficultyByTargetInstrument($selected_instrument_id) }}</small>
                </div>
            @endforeach
        </div>
        <div class="footer">
            <p><a href="/">アーティスト一覧へ</a></p>
        </div>
        @endsection
    </body>
</html>
