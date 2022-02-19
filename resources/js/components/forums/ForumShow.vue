<template>
  <div>
    <v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="deep-purple accent-4" centered min-width=0 width=169>
        ログインが必要です
      </v-snackbar>
      <p class="text-h5 font-weight-bold">
        <v-chip class="ma-2" large>
          {{ forum.genre }}
        </v-chip>
        {{ forum.title }}
      </p>
      <div class="mr-auto" style="border: 1px solid #E0E0E0; padding:32px 48px">
        <v-card
          class="mr-auto"
          color="green accent-1"
          max-width="900"
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
          class="mt-8"
          :class="[comment.user_id === owner.id ? 'questioner' : 'answerer']"
          color="green accent-1"
          max-width="900"
        >
          <v-card-title>
            <v-icon left large>
              mdi-account-circle
            </v-icon>
            <span class="font-weight-bold">{{ comment.user.name }}</span>
          </v-card-title>
          <v-card-text class="text-subtitle-1 black--text">
            {{ comment.body }}
          </v-card-text>
        </v-card>
        <v-form ref="form" @submit.prevent>
          <v-textarea
            class="mt-16 ml-auto"
            style="max-width: 900px;"
            background-color="grey lighten-5"
            v-model="newComment.body"
            label="新しくコメントを入力"
            :rules="[rules.counter]"
            auto-grow
            solo
          ></v-textarea>
          <v-row>
            <v-spacer />
            <v-btn class="mt-2" color="primary" @click="save">
              送信
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
  export default {
    name: 'ForumShow',
    data() {
      return {
        forum: [],
        owner: [],
        comments: [],
        snackbar: false,
        timeout: 4000,
        search: '',
        newComment: {
          body: ''
        },
        rules: {
          required: value => !!value || '入力は必須です',
          counter: value => (value || '').length <= 4000 || '4000文字以内で入力してください',
        },
        breadCrumbs: [
          { text: 'ホーム', disabled: false, to: '/' },
          { text: '掲示板', disabled: false, to: '/vue/forums' },
        ]
      }
    },
    computed: {
      forumId() {
        return this.$route.params.forumId
      }
    },
    methods: {
      getForum() {
        axios.get(`/forums/${this.forumId}`)
          .then((response) => {
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
</style>