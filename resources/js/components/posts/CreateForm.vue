<template>
    <v-dialog v-model="createDialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ song.name }} / {{ artist.name }} の新規レビュー投稿</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                    v-model="newPost.instrument_id"
                                    :items="instruments"
                                    item-text="name"
                                    item-value="id"
                                    label="楽器*"
                                    :rules="[rules.required]"
                                    single-line
                                    required
                                ></v-select>
                            </v-col>
                            <v-spacer/>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="newPost.experience"
                                    type="number"
                                    max="100"
                                    min="0"
                                    label="楽器経験"
                                    suffix="年"
                                ></v-text-field>
                            </v-col>
                            <v-spacer/>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="newPost.difficulty"
                                    type="number"
                                    max="5"
                                    min="1"
                                    label="難易度*"
                                    :rules="[rules.required]"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="newPost.body"
                                    label="感想*"
                                    placeholder="練習時間、演奏のコツ、使用機材、楽しかった箇所など…"
                                    :rules="[rules.required, rules.counter]"
                                    counter
                                    required
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="newPost.url"
                                    label="演奏動画へのURL"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*必須項目</small>
                </v-form>
            </v-card-text>

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
</template>

<script>
    export default {
        name: 'CreateForm',
        data() {
            return {
                newPost: {
                    instrument_id: '',
                    experience: '',
                    difficulty: '',
                    body: '',
                    url: '',
                },
                rules: {
                    required: value => !!value || '入力は必須です',
                    counter: value => value.length <= 4000 || '4000文字以内で入力してください',
                },
            }
        },
        props: {
            createDialog: false,
            artist: [],
            song: [],
            instruments: [],
        },
        methods: {
            close() {
                this.$emit('close')
            },
            save() {
                this.$emit('save', this.newPost)
            }
        }
    }
</script>

<style>
    .post-index tr:hover td {
        background: #FFFFFF;
    }
</style>