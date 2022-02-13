<template>
  <div>
    <v-container>
      <CreateForm :createDialog=createDialog :instruments=instruments :selectedInstrumentId=selectedInstrumentId @save="createPost" @close="closeCreate" />
      <EditForm :editDialog=editDialog :post=postToEditForm @save="editPost" @close="closeEdit" />
      <DeleteForm :deleteDialog=deleteDialog @delete="deletePost" @close="closeDelete" />
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="text-h5 font-weight-bold">{{ song.name }} / {{ artist.name }}</p>
      <v-row>
        <v-col cols="3">
          <v-select v-model="selectedInstrumentId" :items="instruments" item-value="id" item-text="name" return-object prepend-icon="mdi-guitar-acoustic" label="楽器を選択" outlined></v-select>
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
            <v-select v-model="sortBy" :items="sortList" item-value="value" item-text="text" flat solo-inverted hide-details></v-select>
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
            <v-col cols="4">
              <DrawChart
                class="mb-12"
                :post="item"
                :average="selectedAverage[0]"
              ></DrawChart>
              簡単度: {{item.score_easy}}
              耳コピしやすさ: {{item.score_copy}}
              覚えやすさ: {{item.score_memorize}}
              必要機材の少なさ: {{item.score_cost}}
              演奏時の楽しさ: {{item.score_enjoyment}}
            </v-col>
            <v-col cols="8">
              <v-list dense>
                <v-list-item class="mb-4">
                  <v-card max-width="700" min-width="700" min-height="300" outlined>
                    <v-card-text class="text-subtitle-1">
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
                <v-list-item class="justify-end mb-4 pr-16">
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
        averages: [],
        selectedAverage: [],
        postToEditForm: [],
        deleteConfirmedPost: [],
        selectedPosts: [],
        selectedAverage: [],
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
        get(){
          if(this.instruments.length){
            return this.instruments[this.instrumentIndex].id
          }
        },
        set(value) {
          this.instrumentIndex = this.instruments.indexOf(value)
        }
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
            this.averages = response.data.averages
            this.fetchPosts()
            // this.culcAverages()
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
      fetchPosts() {
        if (this.posts.length > 0) {
          this.selectedPosts = this.posts.filter((post) => post.instrument_id === this.selectedInstrumentId)
          this.selectedAverage = this.averages.filter((average) => average.instrument_id === this.selectedInstrumentId)
          }
      },
      culcAverages() {
        this.averages = []
        this.instruments.forEach((instrument, index)=>{
          let average = {
            score_easy: 0,
            score_copy: 0,
            score_memorize: 0,
            score_cost: 0,
            score_enjoyment: 0,
          }
          this.posts.forEach(post=>{
            if(post.instrument_id === index+1){
              average.score_easy += post.score_easy
              average.score_copy += post.score_copy
              average.score_memorize += post.score_memorize
              average.score_cost += post.score_cost
              average.score_enjoyment += post.score_enjoyment
            }
          })
          let averageLength = this.posts.filter(post => post.instrument_id === index+1).length
          if(averageLength > 0) {
            average.score_easy /= averageLength
            average.score_copy /= averageLength
            average.score_memorize /= averageLength
            average.score_cost /= averageLength
            average.score_enjoyment /= averageLength
          }
          this.averages.push(average)
        })
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
            this.snackbar = true
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
            this.snackbar = true
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
</style>
