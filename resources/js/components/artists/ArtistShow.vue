<template>
    <div>
        <v-container>
            <p class="text-h5 font-weight-bold">{{ artist.name }}</p>
            <v-data-table
                class="elevation-1"
                :items="songs"
                :headers="headers"
                :search="search"
                sort-by="name"
                hide-default-header
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
                                mdi-music-note
                            </v-icon>
                            曲一覧
                        </v-toolbar-title>
                        <v-divider
                            class="ml-4 mr-16"
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
                            :label="`${artist.name} の曲名を検索`"
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
                                    {{artist.name}} の新規曲追加
                                </v-card-title>
                                
                                <v-card-text>
                                    <v-container>
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
        name: 'ArtistShow',
        data() {
            return {
                artist: [],
                songs: [],
                headers: [
                    { text: "名前", value: "name", align: "start"},
                  ],
                dialog: false,
                search: '',
                newSong: {
                    name: ''
                }
            }
        },
        computed: {
            artistId(){
                return this.$route.params.artistId
            }
        },
        methods: {
            getSongs() {
                axios.get(`/artists/${this.artistId}`)
                    .then((response)=>{
                        this.artist=response.data.artist
                        this.songs=response.data.songs
                        // console.log(response.data)
                    })
            },
            close () {
                this.dialog = false
            },
            save () {
                this.songs.push(this.newSong)
                this.close()
            },
        },
        mounted() {
            this.getSongs()
        }
    }
</script>