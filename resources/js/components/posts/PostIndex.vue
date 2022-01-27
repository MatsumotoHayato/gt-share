<template>
    <div>
        <v-container>
            <v-row>
                <p class="text-h5 font-weight-bold">{{ song.name}} / {{ artist.name }}</p>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-select
                        v-model="selectedInstrumentId"
                        :items="instruments"
                        item-value="id"
                        item-text="name"
                        prepend-icon="mdi-guitar-acoustic"
                        label="楽器を選択"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
            <v-data-table class="elevation-1 post-index" :items="selectedPosts" sort-by="updated_at" :headers="headers">
                <template v-slot:header>
                    <v-toolbar flat dark color="blue darken-3" class="mb-1">
                        <v-toolbar-title>
                            <v-icon>
                                mdi-text-box-multiple
                            </v-icon>
                            レビュー一覧
                        </v-toolbar-title>
                        <v-divider class="ml-4 mr-12" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" outlined @click="createDialog = true">
                            新規レビュー
                            <v-icon right>
                                mdi-pencil-plus
                            </v-icon>
                        </v-btn>
                        <create-form
                            :artist=artist
                            :song=song
                            :instruments=instruments
                            :createDialog=createDialog
                            @save="createPost"
                            @close="closeCreate"
                        ></create-form>
                    </v-toolbar>
                </template>
                <template v-slot:item.updated_at="{ item }">
                    <v-row>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="mt-4">
                                    ユーザー名: {{ item.user.name }}    
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-col cols="2">
                            <v-list dense>
                                <v-list-item>
                                    <v-list-item-content>
                                        難易度: {{ item.difficulty }}
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        難易度: {{ item.difficulty }}
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        難易度: {{ item.difficulty }}
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        難易度: {{ item.difficulty }}
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        難易度: {{ item.difficulty }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="10">
                            <v-list dense>
                                <v-list-item>
                                    <v-card max-width="700" min-width="700" elevation="1">
                                        <v-card-text class="text-subtitle-1">
                                            {{ item.body }}
                                        </v-card-text>
                                    </v-card>
                                </v-list-item>
                                <v-list-item v-show="item.url">
                                    <v-list-item-content>
                                        演奏動画: {{ item.url }}
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        {{ item.updated_at }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </template>
            </v-data-table>
            <v-breadcrumbs :items="breadCrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-container>
    </div>
</template>

<script>
    import CreateForm from './CreateForm'
    export default {
        name: 'PostIndex',
        components: {
            CreateForm
        },
        data() {
            return {
                currentUser: {
                    id: -1,
                    name: 'ゲスト'
                },
                artist: [],
                song: [],
                posts: [],
                selectedPosts: [],
                selectedInstrumentId: 1,
                instruments: [],
                headers: [
                    { text: "投稿日時", value: "updated_at", align: "start" },
                ],
                createDialog: false,
                editDialog: false,
                breadCrumbs: [
                    {
                        text: 'ホーム',
                        disabled: false,
                        to: '/',
                    }
                ]
            }
        },
        computed: {
            songId() {
                return this.$route.params.songId
            }
        },
        methods: {
            getPosts() {
                axios.get(`/songs/${this.songId}`)
                    .then((response) => {
                        if(response.data.user){
                            this.currentUser = response.data.user
                        }
                        this.artist = response.data.artist
                        this.song = response.data.song
                        this.posts = response.data.posts
                        this.instruments = response.data.instruments
                        this.initFetchPosts()
                        this.setBreadCrumbs(response)
                    })
            },
            setBreadCrumbs(response) {
                this.breadCrumbs.push(
                    {
                        text: response.data.artist.name,
                        disabled: false,
                        to: `/vue/artists/${response.data.artist.id}`
                    },
                    {
                        text: response.data.song.name,
                        disabled: true,
                    },
                )
            },
            fetchPosts(e) {
                this.selectedPosts = this.posts.filter((post) => post.instrument_id === e)
            },
            initFetchPosts() {
                if(this.posts.length > 0) {
                    this.selectedPosts = this.posts.filter((post) => post.instrument_id === 1)
                }
            },
            closeCreate() {
                this.createDialog = false
            },
            closeEdit() {
                this.editDialog = false
            },
            createPost(obj) {
                axios.post(`/songs/${this.songId}/posts`, obj)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.closeCreate()
                            this.getPosts()
                        }
                    })
            },
            editPost(post) {
                axios.put(`/posts/${post.id}`, post)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.closeEdit()
                            this.getPosts()
                        }
                    })
            },
        },
        mounted() {
            this.getPosts()
        },
        watch: {
            selectedInstrumentId(newValue) {
                this.fetchPosts(newValue)
            }
        }
    }
</script>

<style>
    .post-index tr:hover td {
        background: #FFFFFF;
    }
</style>