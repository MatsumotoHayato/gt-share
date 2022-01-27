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
            <v-data-iterator class="elevation-1" :items="selectedPosts" sort-by="updated_at">
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
                        <v-dialog v-model="createDialog" persistent max-width="600px">
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
                                    <span class="text-h5">{{ song.name }} / {{artist.name}} の新規レビュー投稿</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-select
                                                        v-model="newPost.instrument_id"
                                                        :items="instruments"
                                                        item-text="name"
                                                        item-value="id"
                                                        label="楽器*"
                                                        :rules="[rules.required]"
                                                        single-line
                                                        required
                                                    ></v-select>
                                                </v-col>
                                                <v-spacer/>
                                                <v-col cols="4">
                                                    <v-text-field
                                                        v-model="newPost.experience"
                                                        type="number"
                                                        max="100"
                                                        min="0"
                                                        label="楽器経験"
                                                        suffix="年"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-spacer/>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="newPost.difficulty"
                                                        type="number"
                                                        max="5"
                                                        min="1"
                                                        label="難易度*"
                                                        :rules="[rules.required]"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-textarea
                                                        v-model="newPost.body"
                                                        label="感想*"
                                                        placeholder="練習時間、演奏のコツ、使用機材、楽しかった箇所など…"
                                                        :rules="[rules.required, rules.counter]"
                                                        counter
                                                        required
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="newPost.url"
                                                        label="演奏動画へのURL"
                                                        ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <small>*必須項目</small>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeCreate">
                                        キャンセル
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="createPost">
                                        追加
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>

                <template v-slot:default>
                    <v-row>
                        <v-col v-for="post in selectedPosts" :key="post.id" cols="12">
                            <v-card>
                                <v-row>
                                    <v-col cols="4">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>ユーザー名: {{ post.user.name }}</v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-col cols="6">
                                        <v-list dense>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    難易度: {{ post.difficulty }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    {{ post.updated_at }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    内容: {{ post.body }}
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item v-show="post.user.id === currentUser.id">
                                                <v-list-item-content>
                                                    <v-dialog v-model="editDialog" max-width="600px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn class="ma-2" outlined v-bind="attrs" v-on="on">
                                                                編集
                                                                <v-icon right>
                                                                    mdi-pencil-plus
                                                                </v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title>
                                                                <span class="text-h5">{{ song.name }} / {{artist.name}} のレビュー編集</span>
                                                            </v-card-title>
                                                            <v-card-text>
                                                                <v-form>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col cols="6">
                                                                                <v-select
                                                                                    v-model="post.instrument_id"
                                                                                    :items="instruments"
                                                                                    item-text="name"
                                                                                    item-value="id"
                                                                                    label="楽器*"
                                                                                    :rules="[rules.required]"
                                                                                    single-line
                                                                                    required
                                                                                ></v-select>
                                                                            </v-col>
                                                                            <v-spacer/>
                                                                            <v-col cols="4">
                                                                                <v-text-field
                                                                                    v-model="post.experience"
                                                                                    type="number"
                                                                                    max="100"
                                                                                    min="0"
                                                                                    label="楽器経験"
                                                                                    suffix="年"
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-spacer/>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-col cols="6">
                                                                                <v-text-field
                                                                                    v-model="post.difficulty"
                                                                                    type="number"
                                                                                    max="5"
                                                                                    min="1"
                                                                                    label="難易度*"
                                                                                    :rules="[rules.required]"
                                                                                    required
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-col cols="12">
                                                                                <v-textarea
                                                                                    v-model="post.body"
                                                                                    label="感想*"
                                                                                    placeholder="練習時間、演奏のコツ、使用機材、楽しかった箇所など…"
                                                                                    :rules="[rules.required, rules.counter]"
                                                                                    counter
                                                                                    required
                                                                                ></v-textarea>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-col cols="12">
                                                                                <v-text-field
                                                                                    v-model="post.url"
                                                                                    label="演奏動画へのURL"
                                                                                    ></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-container>
                                                                    <small>*必須項目</small>
                                                                </v-form>
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="closeEdit">
                                                                    キャンセル
                                                                </v-btn>
                                                                <v-btn color="blue darken-1" text @click="editPost(post)">
                                                                    編集
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
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
            <v-breadcrumbs :items="breadCrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'PostIndex',
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
                search: '',
                newPost: {
                    instrument_id: '',
                    experience: '',
                    difficulty: '',
                    body: '',
                    url: '',
                },
                rules: {
                    required: value => !!value || '入力は必須です',
                    counter: value => value.length <= 4000 || '4000文字以内で入力してください',
                },
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
            createPost() {
                axios.post(`/songs/${this.songId}/posts`, this.newPost)
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
