<template>
  <div>
    <v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <v-data-table class="elevation-1 artist-index" :items="artists" :headers="headers" @click:row="clickRow" :search="search" sort-by="name">
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-account-music
              </v-icon>
              アーティスト一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="アーティスト名を検索">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" @click:outside="close" @keydown.esc="close">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" outlined v-bind="attrs" v-on="on">
                  新規アーティスト
                  <v-icon right>
                    mdi-pencil-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">新規アーティスト追加</span>
                </v-card-title>
                <v-form ref="form" @submit.prevent>
                  <v-card-text>
                    <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="newArtist.name"
                          label="アーティスト名"
                          :rules="[rules.required, rules.counter, rules.exists]"
                          autofocus
                        ></v-text-field>
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
        <template v-slot:item.name="{ item }">
          <a class="font-weight-bold artist-link" @click.stop="artistShowLink(item)">{{ item.name }}</a>
        </template>
      </v-data-table>
    </v-container>

    <v-spacer class="my-12" />
    <SongIndex />
    <v-spacer class="my-12" />
  </div>
</template>

<script>
  import SongIndex from '../songs/SongIndex'
  export default {
    name: 'ArtistIndex',
    components: {
      SongIndex
    },
    data() {
      return {
        artists: [],
        headers: [
          { text: 'アーティスト名', value: 'name', align: 'start', width: '60%' },
          { text: '曲数', value: 'songs_count', align: 'start', width: '20%', filterable: false },
          { text: 'レビュー数', value: 'posts_count', align: 'start', width: '20%', filterable: false },
        ],
        dialog: false,
        snackbar: false,
        timeout: 4000,
        search: '',
        newArtist: {
          name: ''
        },
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 50 || '50文字以内で入力してください',
          exists: value => !this.artists.some(object => {
            if(object.name===value){
              return true
            }
          }) || '既に登録済みです',
        },
      }
    },
    methods: {
      getArtists() {
        axios.get('/artists')
          .then((response) => {
            this.artists = response.data
          })
      },
      close() {
        this.$refs.form.reset()
        this.dialog = false
      },
      save() {
        if (this.$refs.form.validate()){
          axios.post('/artists', this.newArtist)
            .then((response) => {
              if (response.status == 200) {
                this.close()
                this.getArtists()
              }
            })
            .catch((error) => {
              this.snackbar = true
            })
        }
      },
      clickRow(e) {
        this.$router.push({
          path: `/vue/artists/${e.id}`
        })
      },
      artistShowLink(item) {
        this.$router.push({
          path: `/vue/artists/${item.id}`
        })
      },
      login() {
        
      }
    },
    created() {
      this.getArtists()
    }
  }
</script>

<style>
  .artist-index tr:hover td {
    background: #f0f8ff;
  }

  .artist-index th {
    background: #f5f5f5;
  }

  .artist-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
