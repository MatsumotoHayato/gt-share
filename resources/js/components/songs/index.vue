<template>
    <div>
        <body>
            <div class="siteTtl-outer">
                <div class="siteTtl-logo">GTshare</div>
            </div>
            <!--<form class="search-form" method="GET">-->
                <!--<input class="search-form__input" name="song_keyword" type="text" placeholder="{{ $artist->name}}の曲名を検索"/>-->
                <!--<button class="search-form__button" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>-->
            <!--</form>-->
            <div class="container">
                <!--<b class="top__artist-name">{{ artist.name }}</b>-->
                <!--<div class="list__title">-->
                <!--    <b>曲一覧</b>-->
                    <!--<form action="/artists/{{ $artist->id }}/songs/create" method="GET">-->
                    <!--    <button class="create__button" type="submit">新規曲追加</button>-->
                    <!--</form>-->
                <!--</div>-->
                <!--<div v-for='song in songs' :key='song.id'>-->
                <!--    {{ song.name}}-->
                    <!--<div class="song">-->
                    <!--    <b class="song__name">-->
                    <!--        <a :href="'/artists/'+song.artist.id+'/songs/'+song,id+'/posts/instruments/1'">{{ song.name }}</a>-->
                    <!--    </b>-->
                        <!--<small class="song__post-count">レビュー {{ song.getPostCountBySong() }}件</small>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="breadcrumbs">-->
                <!--    <p><a href="/">トップ</a> > -->
                <!--    {{ $artist->name }}</p>-->
                <!--</div>-->
            </div>
        </body>
    </div>
</template>
<script>
    export default {
        name: 'songIndex',
        data() {
            return {
                songs: []
            }
        },
        methods: {
            getSongs() {
                axios.get('/artists/1')
                    .then((response)=>{
                        this.songs=response.data
                    })
            }
        },
        mounted() {
            this.getSongs()
        }
    }
</script>