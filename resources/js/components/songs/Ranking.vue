<template>
  <div>
    <v-container>
      <p class="text-h5 font-weight-bold">簡単な曲ランキング</p>
      <v-row>
        <v-col cols="3">
          <v-select v-model="selectedInstrumentId" :items="instruments" item-value="id" item-text="name" return-object prepend-icon="mdi-guitar-acoustic" label="楽器を選択" outlined></v-select>
        </v-col>
      </v-row>
      <v-data-table class="elevation-1 song-ranking" :items="selectedSongs" :headers="headers" @click:row="clickRow">
        <template v-slot:top>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
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
        headers: [
          { text: '', value: 'rank', align: 'start', width: '5%', sortable: false },
          { text: '曲名', value: 'name', align: 'start', width: '30%', sortable: false },
          { text: 'アーティスト名', value: 'artist', align: 'start', width: '45%', sortable: false },
          { text: '簡単度', value: 'average_score_easy', align: 'start', width: '20%', sortable: true },
        ],
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
