<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>{{ $user->name }} さんのユーザー情報</title>
        <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/stylesheet.css') }}">
    </head>
    <body>
        @extends('layouts.app')
        @section('content')
        <div class="siteTtl-outer">
            <div class="siteTtl-logo">GTshare</div>
        </div>
        <div class="name">
            <h2>{{ $user->name }} さんのユーザー情報</h2>
        </div>
        <div>
            <p>年齢: 
            @isset ($user->age)
                {{ $user->age }}歳
            @else
                非公開
            @endisset
            </p>
            
            <p>職業: 
            @isset ($user->occupation)
                {{ $user->occupation }}
            @else
                非公開
            @endisset
            </p>
        </div>
        @endsection
    </body>
</html>
