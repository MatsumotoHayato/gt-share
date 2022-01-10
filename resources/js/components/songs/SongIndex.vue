<template>
    <div>
        <body>
            <div class="siteTtl-outer">
                <div class="siteTtl-logo">GTshare</div>
            </div>
            <!--<form class="search-form" method="GET">-->
                <!--<input class="search-form__input" name="song_keyword" type="text" placeholder="{{ $artist->name }}の曲名を検索"/>-->
                <!--<button class="search-form__button" type="submit" formaction="/artists/{{ $artist->id }}/search/songs">曲名検索</button>-->
            <!--</form>-->
            <div class="container">
                <b class="top__artist-name">{{ artist.name }}</b>
                <div class="list__title">
                    <b>曲一覧</b>
                    <!--<form action="/artists/{{ $artist->id }}/songs/create" method="GET">-->
                        <button class="create__button" type="submit">新規曲追加</button>
                    <!--</form>-->
                </div>
                <div v-for='song in songs' :key='song.id'>
                    <div class="song">
                        <b v-if='song' class="song__name">
                            <router-link :to="{path:`/vue/songs/${song.id}`}">{{ song.name }}</router-link>
                        </b>
                        <!--<small class="song__post-count">レビュー {{ song.getPostCountBySong() }}件</small>-->
                    </div>
                </div>
                <div class="breadcrumbs">
                    <p><router-link to="/">トップ</router-link> > 
                    {{ artist.name }}</p>
                </div>
            </div>
        </body>
    </div>
</template>
<script>
    export default {
        name: 'SongIndex',
        data() {
            return {
                artist: [],
                songs: []
            }
        },
        computed: {
            artistId(){
                return this.$route.params.artistId
            }
        },
        methods: {
            getSongs() {
                axios.get(`/artists/${this.artistId}`)
                    .then((response)=>{
                        this.artist=response.data.artist
                        this.songs=response.data.songs
                        // console.log(response.data)
                    })
            }
        },
        mounted() {
            this.getSongs()
        }
    }
</script>