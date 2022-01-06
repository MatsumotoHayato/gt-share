<template>
    <div>
        <body>
            <!--@extends('layouts.app')-->
            <!--@section('content')-->
            <div class="siteTtl-outer">
                <div class="siteTtl-logo">GTshare</div>
            </div>
            <form class="search-form" method="GET">
                <input class="search-form__input" name="keyword" type="text" placeholder="アーティスト名や曲名を検索"/>
                <button class="search-form__button" type="submit" formaction="/search/artists">アーティスト名検索</button>
                <button class="search-form__button" type="submit" formaction="/search/songs">曲名検索</button>
                <!--<p class="search-form__error" style="color:red">{{ $errors->first("keyword") }}</p>-->
            </form>
            <div class="container">
                <div class="list__title">
                    <b>アーティスト一覧</b>
                    <form action="/artists/create" method="GET">
                        <button class="create__button" type="submit">新規アーティスト追加</button>
                    </form>
                </div>
                <div v-for='artist in artists' :key='artist.id'>
                    <div class="artist">
                        <b class="artist__name">
                            <a :href="'/artists/'+artist.id">{{ artist.name }}</a>
                        </b>
                        <!--<small class="artist__post-count">レビュー {{ artist.getPostCountByArtist() }}件</small>-->
                    </div>
                </div>
                <div class="paginate">
                    <!--{{ $artists->links() }}-->
                </div>
                <p><a href="/ranking/beginners/instruments/1">初心者向け曲ランキング</a></p>
                <p><a href="/mylist">役に立ったマイリスト</a></p>
                <p><a href="/users/mypage/edit">マイページ</a></p>
            </div>
            <!--@endsection-->
        </body>
    </div>
</template>
<script>
    export default {
        name: 'artistIndex',
        data() {
            return {
                artists: [],
            }
        },
        methods: {
            getArtists() {
                axios.get('/artists')
                    .then((response)=>{
                        this.artists=response.data
                    })
            }
        },
        mounted() {
            this.getArtists()
        }
    }
</script>