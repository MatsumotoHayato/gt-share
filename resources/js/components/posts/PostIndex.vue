<template>
  <div>
    <v-container>
      <CreateForm :createDialog=createDialog :instruments=instruments @save="createPost" @close="closeCreate" />
      <EditForm :editDialog=editDialog :post=postToEditForm :instruments=instruments @save="editPost" @close="closeEdit" />
      <DeleteForm :deleteDialog=deleteDialog @delete="deletePost" @close="closeDelete" />
      <v-row>
        <p class="text-h5 font-weight-bold">{{ song.name}} / {{ artist.name }}</p>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-select v-model="selectedInstrumentId" :items="instruments" item-value="id" item-text="name" prepend-icon="mdi-guitar-acoustic" label="楽器を選択" outlined></v-select>
        </v-col>
      </v-row>
      <v-data-table class="elevation-1 post-index" :items="selectedPosts" :sort-by="sortBy" sort-desc :headers="headers" hide-default-header>
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-text-box-multiple
              </v-icon>
              レビュー一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select class="sort-select" v-model="sortBy" :items="sortList" item-value="value" item-text="text" flat solo-inverted hide-details></v-select>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" outlined @click="createDialog = true">
              新規レビュー
              <v-icon right>
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
                  <span>ユーザー名: {{ item.user.name }}</span>
                  <div v-if="item.user.id === currentUser.id">
                    <v-btn outlined @click="openEditForm(item)">
                      編集
                      <v-icon right>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn outlined color="red" @click="openDeleteForm(item)">
                      削除
                      <v-icon right>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-col cols="3">
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    簡単さ: {{ item.score_easy }}点
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    耳コピしやすさ: {{ item.score_copy }}点
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    覚えやすさ: {{ item.score_memorize }}点
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    必要機材の揃えやすさ: {{ item.score_cost }}点
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    演奏時の楽しさ: {{ item.score_enjoyment }}点
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="9">
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
                <v-list-item>
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
  export default {
    name: 'PostIndex',
    components: {
      CreateForm,
      EditForm,
      DeleteForm
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
        postToEditForm: [],
        deleteConfirmedPost: [],
        selectedPosts: [],
        selectedInstrumentId: 1,
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
        breadCrumbs: [{
          text: 'ホーム',
          disabled: false,
          to: '/',
        }]
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
            if (response.data.user) {
              this.currentUser = response.data.user
            }
            this.artist = response.data.artist
            this.song = response.data.song
            this.posts = response.data.posts
            this.instruments = response.data.instruments
            this.initFetchPosts()
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
      fetchPosts(e) {
        this.selectedPosts = this.posts.filter((post) => post.instrument_id === e)
      },
      initFetchPosts() {
        if (this.posts.length > 0) {
          this.selectedPosts = this.posts.filter((post) => post.instrument_id === 1)
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
    mounted() {
      this.getPosts()
      this.setBreadCrumbs()
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
