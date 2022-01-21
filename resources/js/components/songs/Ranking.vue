<template>
    <div>
        <v-container>
            <v-row>
                <p class="text-h5 font-weight-bold">簡単な曲ランキング</p>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-select
                        v-model="selectedInstrumentId"
                        :items="instruments"
                        item-value="id"
                        item-text="name"
                        prepend-icon="mdi-guitar-acoustic"
                        label="楽器を選択"
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
            <v-data-table
                class="elevation-1"
                :items="selectedSongs"
                :headers="headers"
                @click:row="clickRow"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                        dark
                        color="blue darken-3"
                        class="mb-1"
                    >
                        <v-toolbar-title>
                            <v-icon>
                                mdi-crown
                            </v-icon>
                            曲一覧
                        </v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
                <template v-slot:item.rank="{ index }">
                    {{ index + 1}}
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
                selectedInstrumentId: 1,
                instruments: [],
                headers: [
                    { text: '', value: 'rank', align: 'start', width: '5%', sortable: false},
                    { text: '曲名', value: 'name', align: 'start', width: '30%', sortable: false},
                    { text: 'アーティスト名', value: 'artist.name', align: 'start', width: '45%', sortable: false},
                    { text: '難易度', value: 'average_difficulty', align: 'start', width: '20%', sortable: false},
                  ],
            }
        },
        methods: {
            getSongs() {
                axios.get('/ranking')
                    .then((response)=>{
                        this.songs=response.data.songs
                        this.instruments=response.data.instruments
                        this.initFetchSongs()
                    })
            },
            clickRow(e) {
                this.$router.push({
                    path: `/vue/songs/${e.id}`
                })
            },
            fetchSongs(e) {
                this.selectedSongs = this.songs.filter((song) => song.instrument_id === e)
            },
            initFetchSongs() {
                if(this.songs.length > 0) {
                    this.selectedSongs = this.songs.filter((song) => song.instrument_id === 1)
                }
            },
        },
        mounted() {
            this.getSongs()
        },
        watch: {
            selectedInstrumentId(newValue) {
                this.fetchSongs(newValue)
            }
        }
    }
</script>