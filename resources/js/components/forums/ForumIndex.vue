<template>
  <div>
    <v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="text-h5 font-weight-bold">掲示板</p>
      <v-row>
        <v-col cols="5">
          <v-select
            v-model="selectedGenres"
            :items="genres"
            item-text="text"
            item-value="value"
            label="表示するジャンル"
            chips
            deletable-chips
            outlined
            multiple
          ></v-select>
        </v-col>
      </v-row>
      <v-data-table class="elevation-1 forum-index" :items="selectedForums" :headers="headers" @click:row="clickRow" :search="search" sort-by="updated_at" sort-desc>
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-forum
              </v-icon>
              スレッド一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="タイトルを検索">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" outlined v-bind="attrs" v-on="on">
                  新規スレッド
                  <v-icon right>
                    mdi-pencil-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">新規スレッド追加</span>
                </v-card-title>
                <v-form ref="form" @submit.prevent>
                  <v-card-text>
                    <v-row>
                      <v-col cols="8">
                        <v-text-field v-model="newForum.title" label="タイトル" :rules="[rules.required, rules.counter]" autofocus></v-text-field>
                      </v-col>
                      <v-spacer />
                      <v-col cols="3">
                        <v-select
                          v-model="newForum.genre"
                          :items="genres"
                          item-text="text"
                          item-value="value"
                          label="ジャンル"
                        ></v-select>
                      </v-col>
                      <v-spacer />
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="newForum.body"
                          label="内容"
                          :rules="[rules.required, rules.body_counter]"
                          auto-grow
                          counter="4000"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
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
        <template v-slot:item.title="{ item }">
          <a class="font-weight-bold forum-link" @click.stop="forumShowLink(item)">{{ item.title }}</a>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'ForumIndex',
    data() {
      return {
        forums: [],
        selectedForums: [],
        headers: [
          { text: 'タイトル', value: 'title', align: 'start', width: '50%', sortable: false },
          { text: 'ジャンル', value: 'genre', align: 'start', width: '15%', filterable: false, sortable: false },
          { text: 'コメント数', value: 'comments_count', align: 'start', width: '15%', filterable: false },
          { text: '投稿日時', value: 'updated_at', align: 'start', width: '20%', filterable: false },
        ],
        genres: [
          { text: '質問', value: '質問'},
          { text: 'リクエスト', value: 'リクエスト'},
          { text: 'サイトへの要望', value: 'サイトへの要望'},
        ],
        selectedGenres: [
          '質問', 'リクエスト', 'サイトへの要望'
        ],
        dialog: false,
        snackbar: false,
        timeout: 4000,
        search: '',
        newForum: {
          title: '',
          genre: '質問',
          body: '',
        },
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 50 || '50文字以内で入力してください',
          body_counter: value => (value || '').length <= 4000 || '4000文字以内で入力してください',
        },
      }
    },
    methods: {
      getForums() {
        axios.get('/forums')
          .then((response) => {
            this.forums = response.data
            this.selectedForums = response.data
          })
      },
      fetchForums() {
        this.selectedForums = this.forums.filter((forum) => this.selectedGenres.includes(forum.genre))
      },
      close() {
        this.$refs.form.resetValidation()
        this.newForum = {
          title: '',
          genre: '質問',
          body: '',
        }
        this.dialog = false
      },
      save() {
        if (this.$refs.form.validate()) {
          axios.post('/forums', this.newForum)
            .then((response) => {
              if (response.status == 200) {
                this.close()
                this.getForums()
              }
            })
            .catch((error) => {
              if (error.response.status == 401){
                this.snackbar = true
              }
            })
        }
      },
      clickRow(e) {
        this.$router.push({
          path: `/vue/forums/${e.id}`
        })
      },
      forumShowLink(item) {
        this.$router.push({
          path: `/vue/forums/${item.id}`
        })
      },
    },
    watch: {
      selectedGenres() {
        this.fetchForums()
      }
    },
    created() {
      this.getForums()
    }
  }
</script>

<style>
  .forum-index tr:hover td {
    background: #f0f8ff;
  }

  .forum-index th {
    background: #f5f5f5;
  }

  .forum-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
