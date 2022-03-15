<template>
  <div>
    <v-container>
      <p class="font-weight-bold" :class="{'text-h5': $vuetify.breakpoint.mdAndUp, 'text-subtitle-1': $vuetify.breakpoint.smAndDown}">
        簡単な曲ランキング
      </p>
      <v-row>
        <v-col cols="8" sm="6" md="4" lg="3" xl="3">
          <v-select v-model="selectedInstrumentId" v-bind="dense" :items="instruments" item-value="id" item-text="name" return-object prepend-icon="mdi-guitar-acoustic" label="楽器を選択" outlined></v-select>
        </v-col>
      </v-row>
      <v-data-table
        class="elevation-1 song-ranking"
        :items="selectedSongs"
        :headers="headers"
        @click:row="clickRow"
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
                mdi-crown
              </v-icon>
              曲一覧
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.rank="{ item }">
          <span class="font-weight-bold pink--text">{{ selectedSongs.findIndex((song) => song.id == item.id) + 1 }}</span>
        </template>
        <template v-slot:item.name="{ item }">
          <a class="font-weight-bold song-link" @click.stop="postIndexLink(item)">{{ item.name }}</a>
        </template>
        <template v-slot:item.artist="{ item }">
          <a class="artist-link" @click.stop="artistShowLink(item)">{{ item.artist.name }}</a>
        </template>
      </v-data-table>
      <v-pagination
        class="text-center pt-2"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Ranking',
    data() {
      return {
        songs: [],
        selectedSongs: [],
        instruments: [],
        instrumentIndex: 0,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
      }
    },
    computed: {
      selectedInstrumentId: {
        get(){
          if(this.instruments.length){
            return this.instruments[this.instrumentIndex].id
          }
        },
        set(value) {
          this.instrumentIndex = this.instruments.indexOf(value)
        }
      },
      headers() {
        // 画面サイズによって表示項目を変更
        if (this.$vuetify.breakpoint.mdAndUp) {
          return [
            { text: '', value: 'rank', align: 'start', width: '5%', sortable: false },
            { text: '曲名', value: 'name', align: 'start', width: '30%', sortable: false },
            { text: 'アーティスト名', value: 'artist', align: 'start', width: '45%', sortable: false },
            { text: '簡単度', value: 'average_score_easy', align: 'start', width: '20%', sortable: true },
          ]
        } else {
          return [
            { text: '', value: 'rank', align: 'start', width: '5%', sortable: false },
            { text: '曲名', value: 'name', align: 'start', width: '50%' },
            { text: 'アーティスト名', value: 'artist.name', align: 'end', width: '45%', filterable: false },
          ]
        }
      },
      dense() {  // 画面幅960px以下なら'dense'を返す
        return this.$vuetify.breakpoint.smAndDown ? { 'dense': true } : {}
      }
    },
    methods: {
      getSongs() {
        axios.get('/ranking')
          .then((response) => {
            this.songs = response.data.songs
            this.instruments = response.data.instruments
            this.fetchSongs()
          })
      },
      clickRow(e) {
        this.$router.push({
          path: `/vue/songs/${e.id}`
        })
      },
      fetchSongs() {
        if (this.songs.length > 0) {
          this.selectedSongs = this.songs.filter((song) => song.instrument_id === this.selectedInstrumentId)
          }
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
    },
    watch: {
      selectedInstrumentId() {
        this.fetchSongs()
      }
    }
  }
</script>

<style>
  .song-ranking tr:hover td {
    background: #f0f8ff;
  }

  .song-ranking th {
    background: #f5f5f5;
  }

  .song-link,
  .artist-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
