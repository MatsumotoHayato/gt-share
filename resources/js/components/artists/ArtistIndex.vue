<template>
    <div>
        <body>
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
                    <!--<form action="/artists/create" method="GET">-->
                    <!--    <button class="create__button" type="submit">新規アーティスト追加</button>-->
                    <!--</form>-->
                    <router-link to="/artists/create" tag="button">新規アーティスト追加</router-link>
                </div>
                <div v-for='artist in artists' :key='artist.id'>
                    <div class="artist">
                        <b class="artist__name">
                            <router-link :to="{path:`/vue/artists/${artist.id}`}">{{ artist.name }}</router-link>
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
        </body>
    </div>
</template>
<script>
    export default {
        name: 'ArtistIndex',
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

<style scoped>
    .siteTtl-outer {
        display: table;
        background-color: #a5c2ee;
        color: #fff;
        height: 80px;
        width: 200px;
    }
    
    .siteTtl-logo {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        font-size: 45px;
        font-family: fantasy;
    }
    
    .search-form {
        display: flex;
        height: 80px;
        margin-top: 20px;
        position: relative;
        left: 250px;
    }
    
    .search-form__input {
        text-align: center;
        font-size: 16px;
        height: 38px;
        width: 320px;
        margin: 5px 0px;
    }
    
    .search-form__button {
        border-radius: 4px;
        color: #fff;
        border: 0px;
        background-color: #007bff;
        border-color: #007bff;
        font-size: 16px;
        height: 38px;
        padding: 0px 8px;
        margin: 5px 0px 0px 15px;
    }
    
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
    
    .create__button {
        margin-top: 5px;
        margin-right: 10px;
    }
    
    .top__title, .top__artist-name, .top__song-name {
        font-size: 25px;
    }
    
    .artist, .song {
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
    }
    
    .artist__name, .song__name {
        font-size: 20px;
    }
    
    .artist__post-count, .song__post-count {
        font-size: 12px;
        margin-right: 100px;
        margin-top: 12px;
    }
    
    .song__difficulty {
        font-size: 16px;
        margin-right: 400px;
    }
    
    .artists, .songs, .posts {
        width: 400px;
    }
    
    .artist, .song, .post {
        border-bottom: 2px solid #e0e0e0;
    }
</style>