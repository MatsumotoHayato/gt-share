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
                        @change="fetchPosts"
                        item-value="id"
                        item-text="name"
                        prepend-icon="mdi-guitar-acoustic"
                        label="楽器を選択"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
            <v-data-iterator class="elevation-1" :items="selectedPosts" sort-by="updated_at" hide-default-footer>
                <template v-slot:header>
                    <v-toolbar flat dark color="blue darken-3" class="mb-1">
                        <v-toolbar-title>
                            <v-icon>
                                mdi-comment-text
                            </v-icon>
                            レビュー一覧
                        </v-toolbar-title>
                        <v-divider class="ml-4 mr-12" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="ma-2" outlined v-bind="attrs" v-on="on">
                                    新規レビュー
                                    <v-icon right>
                                        mdi-pencil-plus
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    {{ song.name }} / {{artist.name}} の新規レビュー投稿
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="10">
                                                <v-text-field label="曲名"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        キャンセル
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                        追加
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="post in selectedPosts" :key="post.id" cols="12">
                            <v-card>
                                <v-row>
                                    <v-col cols="4">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>User: {{ post.user.name }}</v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-col cols="6">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>難易度:</v-list-item-content>
                                                <v-list-item-content class="align-end">
                                                    {{ post.difficulty }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>楽器:</v-list-item-content>
                                                <v-list-item-content class="align-end">
                                                    {{ post.instrument.name }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content class="align-end">
                                                    {{ post.updated_at }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>内容:</v-list-item-content>
                                                <v-list-item-content class="align-end">
                                                    {{ post.body }}
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'PostIndex',
        data() {
            return {
                artist: [],
                song: [],
                posts: [],
                selectedPosts: [],
                selectedInstrumentId: 1,
                instruments: [],
                headers: [
                    { text: "名前", value: "body", align: "start" },
                ],
                dialog: false,
                search: '',
                newPost: {
                    name: ''
                }
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
                        this.artist = response.data.artist
                        this.song = response.data.song
                        this.posts = response.data.posts
                        this.instruments = response.data.instruments
                    })
            },
            fetchPosts(e) {
                this.selectedPosts = this.posts.filter((post) => post.instrument_id === e)
            },
            close() {
                this.dialog = false
            },
            save() {
                this.posts.push(this.newPost)
                this.close()
            },
        },
        mounted() {
            this.getPosts()
        }
    }
</script>
