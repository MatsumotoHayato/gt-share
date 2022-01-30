<template>
    <v-dialog v-model="editDialog" max-width="600px" @click:outside="close" @keydown.esc="close">
        <v-card>
            <v-card-title>
                <span class="text-h5">レビュー編集</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                    v-model="editedPost.instrument_id"
                                    :items="instruments"
                                    item-text="name"
                                    item-value="id"
                                    label="楽器*"
                                    single-line
                                    disabled
                                ></v-select>
                            </v-col>
                            <v-spacer/>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="editedPost.experience"
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
                                    v-model="editedPost.difficulty"
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
                                    v-model="editedPost.body"
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
                                    v-model="editedPost.url"
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
                    編集
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'EditForm',
        props: [
            'editDialog',
            'post',
            'instruments',
        ],
        data() {
            return {
                editedPost: [],
                rules: {
                    required: value => !!value || '入力は必須です',
                    counter: value => value.length <= 4000 || '4000文字以内で入力してください',
                },
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            save() {
                this.$emit('save', this.editedPost)
            }
        },
        watch: {
            post(value) {
                this.editedPost = value
            }
        }
    }
</script>