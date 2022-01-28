<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <!--<link href="{{ asset('css/app.css') }}" rel="stylesheet">-->
</head>
<body>
    <div id="app">
        <main>
            <v-app>
                @auth
                    <menu-bar
                    :user="{{ Auth::user() }}"
                    ></menu-bar>
                @else
                    <menu-bar
                    ></menu-bar>
                @endauth
                <v-main>
                    <v-spacer class="my-12"/>
                    <router-view/>
                </v-main>
            </v-app>
        </main>
    </div>
</body>
</html>