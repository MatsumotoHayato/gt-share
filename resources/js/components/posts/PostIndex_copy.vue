<template>
    <div class="container">
        <div class="top__song-name">
            <h2>{{ song.name }} / {{ artist.name }}</h2>
        </div>
        <!--<div>-->
        <!--    <form method="GET">-->
        <!--        楽器<select onChange="location.href=value">-->
        <!--                @foreach ($instruments as $instrument)-->
        <!--                    @if ($instrument->id == $selected_instrument->id)-->
        <!--                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $instrument->id }}" selected>{{ $instrument->name }}</option>-->
        <!--                    @else-->
        <!--                        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $instrument->id }}">{{ $instrument->name }}</option>-->
        <!--                    @endif-->
        <!--                @endforeach-->
        <!--            </select>-->
        <!--    </form>-->
        <!--</div>-->
        <!--<div>-->
        <!--    @if ($song->culcDifficultyByInstrument($selected_instrument->id) != 0)-->
        <!--        <p>難易度: {{ $song->culcDifficultyByInstrument($selected_instrument->id)}}</p>-->
        <!--    @else-->
        <!--        <p>難易度: なし</p>-->
        <!--    @endif-->
        <!--</div>-->
        <div class="list__title">
            <div class="list__title-select">
                <b>レビュー一覧</b>
                <!--<form method="GET">-->
                <!--    <select onChange="location.href=value">-->
                <!--        @empty ($sorted_flag)-->
                <!--        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}" selected>新しい順</option>-->
                <!--        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/favorite">役に立った順</option>-->
                <!--        @else-->
                <!--        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}">新しい順</option>-->
                <!--        <option value="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/favorite" selected>役に立った順</option>-->
                <!--        @endempty-->
                <!--    </select>-->
                <!--</form>-->
            </div>
            <!--<form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/instruments/{{ $selected_instrument->id }}/create" method="GET">-->
            <!--    <button class="create__button" type="submit">新規レビュー投稿</button>-->
                <router-link to="/songs/create" tag="button">新規レビュー投稿</router-link>  
            <!--</form>-->
        </div>
        
        <div v-for="post in posts" :key="post.id">        
            <div class="post">
                <p>{{ post.user.name }}: 
                <!--@if ($post->experience < 1)-->
                <!--    楽器経験1年未満-->
                <!--@else-->
                <!--    楽器経験{{ $post->experience }}年-->
                <!--@endif-->
                </p>
                <p class="updated_at">{{ post.updated_at }}</p>
                <p>難易度: {{ post.difficulty }}</p>
                <p>URL: {{ post.url }}</p>
                <p class="body">感想: {{ post.body }}</p>
                <!--<div class="favorite_count">-->
                <!--    @if ($post->users()->where('user_id', Auth::id())->exists())-->
                <!--        <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/unfavorite" method="POST">-->
                <!--          @csrf-->
                <!--          <button type="submit">役に立った {{ $post->users()->count() }}人  解除</button>-->
                <!--        </form>-->
                <!--    @else-->
                <!--        <form action="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/favorite" method="POST">-->
                <!--          @csrf-->
                <!--          <button type="submit">役に立った {{ $post->users()->count() }}人</button>-->
                <!--        </form>-->
                <!--    @endif-->
                <!--</div>-->
                <!--<div>-->
                <!--    @if ($post->user->id == Auth::id())-->
                <!--        <p class="edit">[<a href="/artists/{{ $artist->id }}/songs/{{ $song->id }}/posts/{{ $post->id }}/edit">編集</a>]</p>-->
                <!--    @endif-->
                <!--</div>-->
            </div>
        <!--<div class="paginate">-->
        <!--        {{ $posts->links() }}-->
        <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PostIndex',
        data() {
            return {
                artist:[],
                song: [],
                posts: []
            }
        },
        computed: {
            songId(){
                return this.$route.params.songId
            }
        },
        methods: {
            getPosts() {
                axios.get(`/songs/${this.songId}`)
                    .then((response)=>{
                        this.artist=response.data.artist
                        this.song=response.data.song
                        this.posts=response.data.posts
                    })
            }
        },
        mounted() {
            this.getPosts()
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
    
    .create__button {
        margin-top: 5px;
        margin-right: 10px;
    }
    
    .top__song-name {
        font-size: 25px;
    }
    
    .posts {
        width: 400px;
    }
    
    .post {
        border-bottom: 2px solid #e0e0e0;
    }
</style>