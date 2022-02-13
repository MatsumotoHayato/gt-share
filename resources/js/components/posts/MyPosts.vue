<template>
  <div>
    <v-container>
      <EditForm :editDialog=editDialog :post=postToEditForm @save="editPost" @close="closeEdit" />
      <DeleteForm :deleteDialog=deleteDialog @delete="deletePost" @close="closeDelete" />
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="text-h5 font-weight-bold">あなたの投稿</p>
      <v-data-table class="elevation-1 post-index" :items="posts" :sort-by="sortBy" sort-desc :headers="headers" hide-default-header>
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-text-box
              </v-icon>
              レビュー一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select v-model="sortBy" :items="sortList" item-value="value" item-text="text" flat solo-inverted hide-details></v-select>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <v-row>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="mt-4 d-flex justify-space-between">
                  <div class="mt-2">
                    <div class="font-weight-bold mb-4">
                      <router-link :to="`/vue/songs/${item.song_id}`">{{ item.song.name }} / {{ item.song.artist.name }}</router-link>
                    </div>
                    <div v-if="item.experience !== null">{{ item.instrument.name }}（経験年数{{ item.experience }}年）</div>
                    <div v-else>{{ item.instrument.name }}</div>
                  </div>
                  <div class="mt-2">
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
              ></DrawChart>
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
    </v-container>
  </div>
</template>

<script>
  import EditForm from './EditForm'
  import DeleteForm from './DeleteForm'
  import DrawChart from '../charts/DrawChart'
  export default {
    name: 'MyList',
    components: {
      EditForm,
      DeleteForm,
      DrawChart
    },
    data() {
      return {
        posts: [],
        user: [],
        postToEditForm: [],
        deleteConfirmedPost: [],
        headers: [
          { text: "投稿日時", value: "updated_at", align: "start" },
        ],
        sortBy: 'updated_at',
        sortList: [
          { text: '新しい順', value: 'updated_at' },
          { text: 'いいねが多い順', value: 'users_count' },
        ],
        editDialog: false,
        deleteDialog: false,
        snackbar: false,
        timeout: 4000,
      }
    },
    methods: {
      getPosts() {
        axios.get('/myposts')
          .then((response) => {
            this.posts = response.data.posts,
            this.user = response.data.user
          })
          .catch((error) => {
            this.snackbar = true
          })
      },
      closeEdit() {
        this.editDialog = false
      },
      closeDelete() {
        this.deleteDialog = false
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
    created() {
      this.getPosts()
    }
  }
</script>

<style>
  .post-index tr:hover td {
    background: #FFFFFF;
  }
</style>
