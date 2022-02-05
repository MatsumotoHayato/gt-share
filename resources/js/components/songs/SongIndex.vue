<template>
  <div>
    <v-container>
      <v-data-table class="elevation-1 song-index" :items="songs" :headers="headers" @click:row="clickRow" :search="search" sort-by="name">
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-music
              </v-icon>
              曲一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="曲名を検索">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" @click:outside="close" @keydown.esc="close">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" outlined v-bind="attrs" v-on="on">
                  新規曲
                  <v-icon right>
                    mdi-pencil-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">新規曲追加</span>
                </v-card-title>
                <v-form ref="form">
                  <v-card-text>
                    <v-row>
                      <v-col cols="10">
                        <v-autocomplete
                          v-model="newSong.artist_id"
                          :items="artists"
                          item-text="name"
                          item-value="id"
                          label="アーティスト名"
                          :rules="[rules.select]"
                          autofocus
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="newSong.name"
                          label="曲名"
                          :rules="[rules.required, rules.counter, rules.exists]"
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
          <a class="font-weight-bold song-link" @click.stop="postIndexLink(item)">{{ item.name }}</a>
        </template>
        <template v-slot:item.artist="{ item }">
          <a class="artist-link" @click.stop="artistShowLink(item)">{{ item.artist.name }}</a>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'SongIndex',
    data() {
      return {
        artists: [],
        songs: [],
        headers: [
          { text: '曲名', value: 'name', align: 'start', width: '30%' },
          { text: 'アーティスト名', value: 'artist', align: 'start', width: '50%', filterable: false, sortable: false },
          { text: 'レビュー数', value: 'posts_count', align: 'start', width: '20%', filterable: false },
        ],
        dialog: false,
        search: '',
        newSong: {
          name: '',
          artist_id: ''
        },
        rules: {
          required: value => !!value || '入力は必須です',
          select: value => !!value || '選択は必須です',
          counter: value => value.length <= 100 || '100文字以内で入力してください',
          exists: value => !this.songs.some(object => {
            if(object.name===value && object.artist_id===this.newSong.artist_id){
              return true
            }
          }) || '既に登録済みです',
        },
      }
    },
    methods: {
      getSongs() {
        axios.get('/songs')
          .then((response) => {
            this.artists = response.data.artists
            this.songs = response.data.songs
          })
      },
      close() {
        this.$refs.form.reset()
        this.dialog = false
      },
      save() {
        if (this.$refs.form.validate()){
          axios.post(`/artists/${this.newSong.artist_id}/songs`, this.newSong)
            .then((response) => {
              if (response.status == 200) {
                this.close()
                this.getSongs()
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
      artistShowLink(item) {
        this.$router.push({
          path: `/vue/artists/${item.artist_id}`
        })
      }
    },
    created() {
      this.getSongs()
    }
  }
</script>

<style>
  .song-index tr:hover td {
    background: #f0f8ff;
  }

  .song-index th {
    background: #f5f5f5;
  }

  .song-link,
  .artist-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
