<template>
  <v-dialog v-model="deleteDialog" max-width="600px" @click:outside="close" @keydown.esc="close">
    <v-card>
      <v-card-title>
        <span class="text-h5">削除確認</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-checkbox
                v-model="deleteCheck"
                label="本当にこの投稿を削除しますか？"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue darken-1" text @click="close">
          キャンセル
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="deleteCheck"
          color="red"
          text
          @click="deletePost"
        >
          削除する
        </v-btn>
        <v-btn
          v-else
          disabled
          text
          @click="deletePost"
        >
          削除する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteForm',
    props: [
      'deleteDialog',
      'post',
    ],
    data() {
      return {
        deleteCheck: false,
      }
    },
    methods: {
      close() {
        this.deleteCheck = false
        this.$emit('close')
      },
      deletePost() {
        this.deleteCheck = false
        this.$emit('delete')
      }
    }
  }
</script>
