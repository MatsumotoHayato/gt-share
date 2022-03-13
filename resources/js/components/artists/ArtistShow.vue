<template>
  <div>
    <v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="font-weight-bold" :class="{'text-h5': $vuetify.breakpoint.mdAndUp, 'text-subtitle-1': $vuetify.breakpoint.smAndDown}">{{ artist.name }}</p>
      <v-data-table
        class="elevation-1 artist-show"
        :items="songs"
        :headers="headers"
        @click:row="clickRow"
        :search="search"
        sort-by="name"
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
                mdi-music-note
              </v-icon>
              曲一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-if="$vuetify.breakpoint.smAndUp"
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              :label="`${artist.name} の曲名を検索`"
            ></v-text-field>
            <v-menu v-else offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
              <v-text-field
                v-model="search"
                solo
                clearable
                hide-details
                autofocus
              ></v-text-field>
            </v-menu>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" @click:outside="close" @keydown.esc="close">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="$vuetify.breakpoint.mdAndUp" class="ma-2" outlined v-bind="attrs" v-on="on">
                  新規曲
                  <v-icon right>
                    mdi-pencil-plus
                  </v-icon>
                </v-btn>
                <v-btn v-else icon v-bind="attrs" v-on="on">
                  <v-icon>
                    mdi-pencil-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{artist.name}} の新規曲追加</span>
                </v-card-title>
                <v-form ref="form" @submit.prevent>
                  <v-card-text>
                    <v-row>
                      <v-col cols="10">
                        <v-text-field
                        label="曲名"
                        v-model="newSong.name"
                        :rules="[rules.required, rules.counter, rules.exists]"
                        autofocus
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="close">
                    キャンセル
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="save">
                    追加
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <a class="font-weight-bold song-link" @click.stop="postIndexLink(item)">{{ item.name }}</a>
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
  export default {
    name: 'ArtistShow',
    data() {
      return {
        artist: [],
        songs: [],
        dialog: false,
        snackbar: false,
        timeout: 4000,
        search: '',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        newSong: {
          name: ''
        },
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 100 || '100文字以内で入力してください',
          exists: value => !this.songs.some(object => {
            if(object.name===value){
              return true
            }
          }) || '既に登録済みです',
        },
        breadCrumbs: [{
          text: 'ホーム',
          disabled: false,
          to: '/',
        }]
      }
    },
    computed: {
      artistId() {
        return this.$route.params.artistId
      },
      headers() {
        // 画面サイズによって表示項目を変更
        if (this.$vuetify.breakpoint.mdAndUp) {
          return [
            { text: "曲名", value: "name", align: "start", width: '80%' },
            { text: 'レビュー数', value: 'posts_count', align: 'start', width: '20%', filterable: false },
          ]
        } else {
          return [
            { text: "曲名", value: "name", align: "start", width: '60%' },
            { text: 'レビュー数', value: 'posts_count', align: 'end', width: '40%', filterable: false },
          ]
        }
      }
    },
    methods: {
      getSongs() {
        axios.get(`/artists/${this.artistId}`)
          .then((response) => {
            this.artist = response.data.artist
            this.songs = response.data.songs
          })
      },
      setBreadCrumbs() {
        axios.get(`/artists/${this.artistId}`)
          .then((response) => {
            this.breadCrumbs.push({
              text: response.data.artist.name,
              disabled: true,
            })
          })
      },
      close() {
        this.$refs.form.reset()
        this.dialog = false
      },
      save() {
        if (this.$refs.form.validate()){
          axios.post(`/artists/${this.artistId}/songs`, this.newSong)
            .then((response) => {
              if (response.status == 200) {
                this.close()
                this.getSongs()
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
          path: `/vue/songs/${e.id}`
        })
      },
      postIndexLink(item) {
        this.$router.push({
          path: `/vue/songs/${item.id}`
        })
      },
    },
    created() {
      this.getSongs()
      this.setBreadCrumbs()
    }
  }
</script>

<style>
  .artist-show tr:hover td {
    background: #f0f8ff;
  }

  .artist-show th {
    background: #f5f5f5;
  }

  .song-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
