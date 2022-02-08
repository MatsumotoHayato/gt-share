<template>
  <v-dialog v-model="editDialog" max-width="600px" @click:outside="close" @keydown.esc="close">
    <v-card>
      <v-card-title>
        <span class="text-h5">レビュー編集</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="editedPost.instrument_id"
                :items="[editedPost.instrument]"
                item-text="name"
                item-value="id"
                label="楽器*"
                single-line
                disabled
              ></v-select>
            </v-col>
            <v-spacer />
            <v-col cols="4">
              <v-text-field
                v-model="editedPost.experience"
                type="number"
                max="100"
                min="0"
                label="楽器経験"
                placeholder="0~100を入力"
                suffix="年"
              ></v-text-field>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-slider
                v-model="editedPost.score_easy"
                label="簡単度*　　　　　"
                :tick-labels="[1, 2, 3, 4, 5]"
                max="5"
                min="1"
                dense
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-slider
                v-model="editedPost.score_copy"
                label="耳コピしやすさ*　"
                :tick-labels="[1, 2, 3, 4, 5]"
                max="5"
                min="1"
                dense
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-slider
                v-model="editedPost.score_memorize"
                label="覚えやすさ*　　　"
                :tick-labels="[1, 2, 3, 4, 5]"
                max="5"
                min="1"
                dense
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-slider
                v-model="editedPost.score_cost"
                label="必要機材の少なさ*"
                :tick-labels="[1, 2, 3, 4, 5]"
                max="5"
                min="1"
                dense
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-slider
                v-model="editedPost.score_enjoyment"
                label="演奏時の楽しさ*　"
                :tick-labels="[1, 2, 3, 4, 5]"
                max="5"
                min="1"
                dense
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editedPost.body"
                label="感想"
                placeholder="練習時間、演奏のコツ、使用機材、楽しかった箇所など…"
                :rules="[rules.counter]"
                auto-grow
                counter="4000"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedPost.url"
                label="演奏動画へのURL"
                placeholder="https://www.youtube.com/..."
              ></v-text-field>
            </v-col>
          </v-row>
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
    ],
    data() {
      return {
        editedPost: [],
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 4000 || '4000文字以内で入力してください',
        },
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      save() {
        if (this.$refs.form.validate()){
          this.$emit('save', this.editedPost)
        }
      }
    },
    watch: {
      post(value) {
        this.editedPost = value
      }
    }
  }
</script>
