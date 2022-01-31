<template>
  <div>
    <v-container>
      <p class="text-h5 font-weight-bold">{{ artist.name }}</p>
      <v-data-table class="elevation-1 artist-show" :items="songs" :headers="headers" @click:row="clickRow" :search="search" sort-by="name">
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-music-note
              </v-icon>
              曲一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" :label="`${artist.name} の曲名を検索`">
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
                  <span class="text-h5">{{artist.name}} の新規曲追加</span>
                </v-card-title>
                <v-form ref="form">
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
  export default {
    name: 'ArtistShow',
    data() {
      return {
        artist: [],
        songs: [],
        headers: [
          { text: "曲名", value: "name", align: "start", width: '80%' },
          { text: 'レビュー数', value: 'posts_count', align: 'start', width: '20%' },
        ],
        dialog: false,
        search: '',
        newSong: {
          name: ''
        },
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => value.length <= 100 || '100文字以内で入力してください',
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
    mounted() {
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
