
<template>
    <div>
        <v-container>
            <v-data-table
                class="elevation-1"
                :items="songs"
                :headers="headers"
                @click:row="clickRow"
                :search="search"
                sort-by="name"
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
                                mdi-music
                            </v-icon>
                            曲一覧
                        </v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-text-field
                            v-model="search"
                            clearable
                            flat
                            solo-inverted
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            label="曲名を検索"
                        >
                        </v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog
                            v-model="dialog"
                            max-width="500px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="ma-2"
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    新規曲
                                    <v-icon right>
                                        mdi-pencil-plus
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    新規曲追加
                                </v-card-title>
                                
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                cols="10"
                                            >
                                            <v-autocomplete
                                                v-model="newSong.artist_id"
                                                :items="artists"
                                                item-text="name"
                                                item-value="id"
                                                label="アーティスト名"
                                            ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col
                                                cols="10"
                                            >
                                            <v-text-field
                                                label="曲名"
                                                v-model="newSong.name"
                                            ></v-text-field>
                                            </v-col>
                                        </v-row>
                                  </v-container>
                                </v-card-text>
                            
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                  >
                                    キャンセル
                                  </v-btn>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save"
                                  >
                                    追加
                                  </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
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
                    { text: '曲名', value: 'name', align: 'start', width: '30%'},
                    { text: 'アーティスト名', value: 'artist.name', align: 'start', width: '40%', filterable: false, sortable: false},
                    { text: 'レビュー数', value: '', align: 'start', width: '30%', filterable: false},
                  ],
                dialog: false,
                search: '',
                newSong: {
                    name: '',
                    artist_id: ''
                }
            }
        },
        methods: {
            getSongs() {
                axios.get('/songs')
                    .then((response)=>{
                        this.artists=response.data.artists
                        this.songs=response.data.songs
                    })
            },
            close () {
                this.dialog = false
            },
            save () {
                axios.post(`/artists/${this.newSong.artist_id}/songs`, this.newSong)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.close()
                            this.getSongs()
                        }
                    })
            },
            clickRow(e) {
                this.$router.push({
                    path: `/vue/songs/${e.id}`
                })
            }
        },
        mounted() {
            this.getSongs()
        }
    }
</script>