<template>
    <div>
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
                <input class="search-form__input" name="keyword" type="text" :placeholder="`${artist.name} の曲名を検索`"/>
                <!--<form action="/artists/{{ $artist->id }}/songs/create" method="GET">-->
                    <!--<button class="create__button" type="submit">新規曲追加</button>-->
                    <router-link to="/songs/create" tag="button">新規曲追加</router-link>
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
    </div>
</template>
<script>
    export default {
        name: 'ArtistShow',
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

<style scoped>
    .list__title {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px;
        background-color: #e0e0e0;
        border-color: #e0e0e0;
    }
    
    .list__title b {
        font-size: 25px;
    }
    
    .list__title-select {
        display: flex;
    }
    
    .list__title-select form {
        margin-top: 8px;
        margin-left: 30px;
        font-size: 16px;
    }
    
    .search-form__input {
        text-align: center;
        font-size: 16px;
        height: 38px;
        width: 320px;
        margin: 5px 0px;
    }
    
    .create__button {
        margin-top: 5px;
        margin-right: 10px;
    }
    
    .top__title, .top__artist-name, .top__song-name {
        font-size: 25px;
    }
    
    .song {
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
    }
    
    .song__name {
        font-size: 20px;
    }
    
    .song__post-count {
        font-size: 12px;
        margin-right: 100px;
        margin-top: 12px;
    }
    
    .songs {
        width: 400px;
    }
    
    .song {
        border-bottom: 2px solid #e0e0e0;
    }
</style>