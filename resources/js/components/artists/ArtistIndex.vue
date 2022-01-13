<template>
    <div>
        <v-container>
            <v-data-table
                class="elevation-1"
                :items="artists"
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
                                    mdi-account-music
                            </v-icon>
                            アーティスト一覧
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
                            label="アーティスト名を検索"
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
                                    新規アーティスト
                                    <v-icon right>
                                        mdi-pencil-plus
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    新規アーティスト追加
                                </v-card-title>
                                
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                cols="10"
                                            >
                                            <v-text-field
                                                label="アーティスト名"
                                                v-model="newArtist.name"
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
        
        <v-spacer class="my-12"/>
        
        <SongIndex></SongIndex>
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
                    { text: "名前", value: "name", align: "start"},
                  ],
                dialog: false,
                search: '',
                newArtist: {
                    // id: ,
                    name: ''
                }
            }
        },
        methods: {
            getArtists() {
                axios.get('/artists')
                    .then((response)=>{
                        this.artists=response.data
                    })
            },
            close () {
                this.dialog = false
            },
            save () {
                this.artists.push(this.newArtist)
                this.close()
            },
        },
        mounted() {
            this.getArtists()
        }
    }
</script>

<style scoped>
</style>