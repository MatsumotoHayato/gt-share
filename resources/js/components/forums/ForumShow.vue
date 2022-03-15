<template>
  <div>
    <v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <DeleteForm :deleteDialog=deleteDialog @delete="deletePost" @close="closeDelete" />
      <v-row class="align-center">
        <p class="font-weight-bold" :class="{'text-h5': $vuetify.breakpoint.mdAndUp, 'text-subtitle-1': $vuetify.breakpoint.smAndDown}">
          <v-chip class="ma-2" v-bind="largeChip">
            {{ forum.category }}
          </v-chip>
          {{ forum.title }}
        </p>
        <v-spacer />
        <v-btn v-if="owner.id === currentUser.id && $vuetify.breakpoint.mdAndUp" class="mr-3" outlined color="red" @click="openDeleteForum()">
          削除
          <v-icon right>
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn v-if="owner.id === currentUser.id && $vuetify.breakpoint.smAndDown" class="mr-3" icon color="red" @click="openDeleteForum()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
      <div class="mr-auto" style="border: 1px solid #E0E0E0; padding:32px 48px">
        <v-card
          class="mr-auto"
          color="green accent-1"
          :max-width="responsiveMaxWidth"
        >
          <v-card-title>
            <v-icon left large>
              mdi-account-circle
            </v-icon>
            <span class="font-weight-bold">{{ owner.name }}</span>
          </v-card-title>
          <v-card-text class="text-subtitle-1 black--text">
            {{ forum.body }}
          </v-card-text>
        </v-card>
        
        <v-card
          v-for="comment in comments"
          :key="comment.id"
          :class="[comment.user_id === owner.id ? 'questioner' : 'answerer', {'mt-8': $vuetify.breakpoint.mdAndUp, 'mt-4': $vuetify.breakpoint.smAndDown}]"
          color="green accent-1"
          :max-width="responsiveMaxWidth"
        >
          <v-card-title>
            <v-icon left large>
              mdi-account-circle
            </v-icon>
            <span class="font-weight-bold">{{ comment.user.name }}</span>
            <v-spacer></v-spacer>
            <v-btn v-if="comment.user_id === currentUser.id" icon @click="openDeleteComment(comment)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-subtitle-1 black--text">
            {{ comment.body }}
          </v-card-text>
        </v-card>
        
        <v-form ref="form" @submit.prevent>
          <v-textarea
            class="ml-auto"
            :class="['textarea-' + $vuetify.breakpoint.name, {'mt-16': $vuetify.breakpoint.mdAndUp, 'mt-8': $vuetify.breakpoint.smAndDown}]"
            background-color="grey lighten-5"
            v-model="newComment.body"
            label="新しくコメントを入力"
            :rules="[rules.counter]"
            auto-grow
            solo
          ></v-textarea>
          <v-row>
            <v-spacer />
            <v-btn class="mr-4" color="primary" rounded @click="save">
              送信
              <v-icon class="ml-3" right>
                mdi-send
              </v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </div>
      
      <v-breadcrumbs :items="breadCrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>
  </div>
</template>

<script>
  import DeleteForm from '../posts/DeleteForm'
  export default {
    name: 'ForumShow',
    components: {
      DeleteForm,
    },
    data() {
      return {
        currentUser: {
          id: -1,
          name: 'ゲスト'
        },
        forum: [],
        owner: [],
        comments: [],
        snackbar: false,
        timeout: 4000,
        deleteDialog: false,
        search: '',
        newComment: {
          body: ''
        },
        deleteConfirmedComment: null,
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 4000 || '4000文字以内で入力してください',
        },
        breadCrumbs: [
          { text: 'ホーム', disabled: false, to: '/', exact: true },
          { text: '掲示板', disabled: false, to: '/vue/forums', exact: true },
        ]
      }
    },
    computed: {
      forumId() {
        return this.$route.params.forumId
      },
      largeChip() {  // 画面幅960px以下なら'dense'を返す
        return this.$vuetify.breakpoint.mdAndUp ? { 'large': true } : {}
      },
      responsiveMaxWidth() {
        return {xs:250, sm:480, md:720, lg:900, xl:1000}[this.$vuetify.breakpoint.name]
      },
    },
    methods: {
      getForum() {
        axios.get(`/forums/${this.forumId}`)
          .then((response) => {
            if (response.data.user) {
              this.currentUser = response.data.user
            }
            this.forum = response.data.forum
            this.owner = response.data.owner
            this.comments = response.data.comments
          })
      },
      setBreadCrumbs() {
        axios.get(`/forums/${this.forumId}`)
          .then((response) => {
            this.breadCrumbs.push({
              text: response.data.forum.title,
              disabled: true,
            })
          })
      },
      save() {
        if (this.$refs.form.validate()){
          axios.post(`/forums/${this.forumId}`, this.newComment)
            .then((response) => {
              if (response.status == 200) {
                this.$refs.form.reset()
                this.getForum()
              }
            })
            .catch((error) => {
              if (error.response.status == 401){
                this.snackbar = true
              }
            })
        }
      },
      closeDelete() {
        this.deleteDialog = false
        this.deleteConfirmedComment = null
      },
      openDeleteForum() {
        this.deleteDialog = true
      },
      openDeleteComment(comment) {
        this.deleteDialog = true
        this.deleteConfirmedComment = comment
      },
      deletePost() {
        // スレッドの削除
        if (this.deleteConfirmedComment === null) {
          axios.delete(`/forums/${this.forumId}`, this.forum)
            .then((response) => {
              if (response.status == 200) {
                this.$router.push({
                  path: '/vue/forums'
                })
              }
            })
        } else {  // コメントの削除
          axios.delete(`/comments/${this.deleteConfirmedComment.id}`, this.deleteConfirmedComment)
            .then((response) => {
              if (response.status == 200) {
                this.closeDelete()
                this.getForum()
              }
            })
        }
      },
    },
    created() {
      this.getForum()
      this.setBreadCrumbs()
    }
  }
</script>

<style scoped>
  .questioner {
    margin-right: auto; 
  }
  .answerer {
    margin-left: auto;
  }
  .textarea-xs {
    max-width: 250px;
  }
  .textarea-sm {
    max-width: 480px;
  }
  .textarea-md {
    max-width: 720px;
  }
  .textarea-lg {
    max-width: 900px;
  }
  .textarea-xl {
    max-width: 1000px;
  }
</style>