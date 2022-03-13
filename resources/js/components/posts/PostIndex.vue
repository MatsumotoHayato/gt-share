<template>
  <div>
    <v-container>
      <CreateForm :createDialog=createDialog :instruments=instruments :selectedInstrumentId=selectedInstrumentId @save="createPost" @close="closeCreate" />
      <EditForm :editDialog=editDialog :post=postToEditForm @save="editPost" @close="closeEdit" />
      <DeleteForm :deleteDialog=deleteDialog @delete="deletePost" @close="closeDelete" />
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="font-weight-bold" :class="{'text-h5': $vuetify.breakpoint.mdAndUp, 'text-subtitle-1': $vuetify.breakpoint.smAndDown}">{{ song.name }} / {{ artist.name }}</p>
      <v-row>
        <v-col cols="8" sm="6" md="4" lg="3" xl="3">
          <v-select v-model="selectedInstrumentId" :items="instruments" v-bind="dense" item-value="id" item-text="name" return-object prepend-icon="mdi-guitar-acoustic" label="楽器を選択" outlined></v-select>
        </v-col>
      </v-row>
      <v-data-table
        class="elevation-1 post-index"
        :items="selectedPosts"
        :sort-by="sortBy"
        sort-desc
        :headers="headers"
        hide-default-header
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        mobile-breakpoint=0
      >
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title :class="{'text-subtitle-1': $vuetify.breakpoint.smAndDown}">
              <v-icon>
                mdi-text-box-multiple
              </v-icon>
              レビュー一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select v-model="sortBy" :class="{'small-select': $vuetify.breakpoint.xs}" v-bind="dense" :items="sortList" item-value="value" item-text="text" flat solo-inverted hide-details></v-select>
            <v-spacer></v-spacer>
            <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="ma-2" outlined @click="createDialog = true">
              新規レビュー
              <v-icon right>
                mdi-pencil-plus
              </v-icon>
            </v-btn>
            <v-btn v-else icon @click="createDialog = true">
              <v-icon>
                mdi-pencil-plus
              </v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <v-row>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="mt-4 d-flex justify-space-between">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div class="mt-2">
                        <div
                          v-if="item.experience !== null"
                          v-bind="attrs"
                          v-on="on"
                        >
                          ユーザー: <span style="color: #1976D2;">{{ item.user.name }}（経験年数{{ item.experience }}年）</span>
                        </div>
                        <div
                          v-else
                          v-bind="attrs"
                          v-on="on"
                        >
                          ユーザー: <span style="color: #1976D2;">{{ item.user.name }}</span>
                        </div>
                      </div>
                    </template>
                    <div>
                      <div v-if="item.user.age !== null">年齢: {{ item.user.age }}代</div>
                      <div v-else>年齢: 非公開</div>
                      <div v-if="item.user.occupation !== null">職業: {{ item.user.occupation }}</div>
                      <div v-else>職業: 非公開</div>
                    </div>
                  </v-tooltip>
                  <div v-if="item.user.id === currentUser.id" class="mt-2">
                    <v-btn outlined @click="openEditForm(item)">
                      編集
                      <v-icon right>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn class="ml-2 mr-8" outlined color="red" @click="openDeleteForm(item)">
                      削除
                      <v-icon right>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-col cols="11" sm="11" md="4" lg="4" xl="4">
              <DrawChart
                :class="{'mb-12': $vuetify.breakpoint.mdAndUp}"
                class="mx-auto"
                :post="item"
              ></DrawChart>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8" xl="8">
              <v-list dense>
                <v-list-item class="mb-4">
                  <v-card :min-height="responsiveMinHeight" :min-width="responsiveMinWidth" :max-width="responsiveMaxWidth" outlined>
                    <v-card-text :class="{'text-subtitle-1': $vuetify.breakpoint.mdAndUp}">
                      {{ item.body }}
                    </v-card-text>
                  </v-card>
                </v-list-item>
                <v-list-item v-show="item.url !== null">
                  <v-list-item-content>
                    <div>演奏動画: <a :href="item.url">{{ item.url }}</a></div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ item.updated_at }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="justify-end mb-4" :class="{'pr-16': $vuetify.breakpoint.mdAndUp}">
                  <v-btn v-if="item.favorite_check" color="primary" @click="unfavorite(item)">
                    いいね
                    <v-icon right class="ml-3 mr-1">
                      mdi-thumb-up
                    </v-icon>
                    <span>{{ item.users_count }}</span>
                  </v-btn>
                  <v-btn v-else outlined color="grey" @click="favorite(item)">
                    いいね
                    <v-icon right class="ml-3 mr-1">
                      mdi-thumb-up
                    </v-icon>
                    <span>{{ item.users_count }}</span>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
      <v-pagination
        class="text-center pt-2"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
      ></v-pagination>
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
  import EditForm from './EditForm'
  import DeleteForm from './DeleteForm'
  import DrawChart from '../charts/DrawChart'
  export default {
    name: 'PostIndex',
    components: {
      CreateForm,
      EditForm,
      DeleteForm,
      DrawChart
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
        postToEditForm: [],  // EditFormコンポーネントに渡すpost
        deleteConfirmedPost: [],
        selectedPosts: [],
        instrumentIndex: 0,
        instruments: [],
        headers: [
          { text: "投稿日時", value: "updated_at", align: "start" },
        ],
        sortBy: 'users_count',
        sortList: [
          { text: 'いいねが多い順', value: 'users_count' },
          { text: '新しい順', value: 'updated_at' },
        ],
        createDialog: false,
        editDialog: false,
        deleteDialog: false,
        snackbar: false,
        timeout: 4000,
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        breadCrumbs: [{
          text: 'ホーム',
          disabled: false,
          to: '/',
        }],
      }
    },
    computed: {
      songId() {
        return this.$route.params.songId
      },
      selectedInstrumentId: {
        // Heroku環境でのエラー回避のため、インデックスで管理
        get(){
          if(this.instruments.length){
            return this.instruments[this.instrumentIndex].id
          }
        },
        set(value) {
          this.instrumentIndex = this.instruments.indexOf(value)
        }
      },
      dense() {  // 画面幅960px以下なら'dense'を返す
        return this.$vuetify.breakpoint.smAndDown ? { 'dense': true } : {}
      },
      responsiveMinWidth() {
        return {xs:275, sm:510, md:522, lg:712, xl:950}[this.$vuetify.breakpoint.name]
      },
      responsiveMaxWidth() {
        return {xs:510, sm:868, md:712, lg:712, xl:950}[this.$vuetify.breakpoint.name]
      },
      responsiveMinHeight() {
        return this.$vuetify.breakpoint.mdAndUp ? 300 : 10
      },
    },
    methods: {
      getPosts() {
        axios.get(`/songs/${this.songId}`)
          .then((response) => {
            if (response.data.user) {
              this.currentUser = response.data.user
            }
            this.artist = response.data.artist
            this.song = response.data.song
            this.posts = response.data.posts
            this.instruments = response.data.instruments
            this.fetchPosts()
          })
      },
      setBreadCrumbs() {
        axios.get(`/songs/${this.songId}`)
          .then((response) => {
            this.breadCrumbs.push({
              text: response.data.artist.name,
              disabled: false,
              to: `/vue/artists/${response.data.artist.id}`
            }, {
              text: response.data.song.name,
              disabled: true,
            })
          })
      },
      // 全楽器からのpostsから、選択した楽器だけのレビューを取り出す
      fetchPosts() {
        if (this.posts.length > 0) {
          this.selectedPosts = this.posts.filter((post) => post.instrument_id === this.selectedInstrumentId)
          this.page = 1
          }
      },
      closeCreate() {
        this.createDialog = false
      },
      closeEdit() {
        this.editDialog = false
      },
      closeDelete() {
        this.deleteDialog = false
      },
      createPost(post) {
        axios.post(`/songs/${this.songId}/posts`, post)
          .then((response) => {
            if (response.status == 200) {
              this.closeCreate()
              this.getPosts()
            }
          })
          .catch((error) => {
            if (error.response.status == 401){
              this.snackbar = true
            }
          })
      },
      editPost(post) {
        axios.put(`/posts/${post.id}`, post)
          .then((response) => {
            if (response.status == 200) {
              this.closeEdit()
              this.getPosts()
            }
          })
      },
      deletePost() {
        axios.delete(`/posts/${this.deleteConfirmedPost.id}`, this.deleteConfirmedPost)
          .then((response) => {
            if (response.status == 200) {
              this.closeDelete()
              this.getPosts()
            }
          })
      },
      openEditForm(post) {
        this.postToEditForm = post
        this.editDialog = true
      },
      openDeleteForm(post) {
        this.deleteConfirmedPost = post
        this.deleteDialog = true
      },
      favorite(post) {
        axios.post(`/posts/${post.id}/favorite`, post)
          .then((response) => {
            if (response.status == 200) {
              this.getPosts()
            }
          })
          .catch((error) => {
            if (error.response.status == 401){
              this.snackbar = true
            }
          })
      },
      unfavorite(post) {
        axios.post(`/posts/${post.id}/unfavorite`, post)
          .then((response) => {
            if (response.status == 200) {
              this.getPosts()
            }
          })
      },
    },
    watch: {
      selectedInstrumentId() {
        this.fetchPosts()
      }
    },
    created() {
      this.getPosts()
      this.setBreadCrumbs()
    },
  }
</script>

<style>
  .post-index tr:hover td {
    background: #FFFFFF;
  }
  .small-select {
    max-width: 90px;
  }
</style>
