<template>
  <div>
    <v-container>
      <p class="text-h5 font-weight-bold">{{ song.name }} / {{ artist.name }}</p>
      <p class="text-h5 font-weight-bold">{{ instruments }}</p>
    </v-container>
  </div>
</template>

<script>
  import CreateForm from './CreateForm'
  import EditForm from './EditForm'
  import DeleteForm from './DeleteForm'
  import DrawChart from '../charts/DrawChart'
  export default {
    name: 'PostIndex',
    components: {
      CreateForm,
      EditForm,
      DeleteForm,
      DrawChart
    },
    data() {
      return {
        currentUser: {
          id: -1,
          name: 'ゲスト'
        },
        artist: [],
        song: [],
        posts: [],
        averages: [],
        postToEditForm: [],
        deleteConfirmedPost: [],
        selectedPosts: [],
        selectedAverage: [],
        instrumentIndex: 0,
        instruments: [],
        headers: [
          { text: "投稿日時", value: "updated_at", align: "start" },
        ],
        sortBy: 'users_count',
        sortList: [
          { text: 'いいねが多い順', value: 'users_count' },
          { text: '新しい順', value: 'updated_at' },
        ],
        createDialog: false,
        editDialog: false,
        deleteDialog: false,
        snackbar: false,
        timeout: 4000,
        breadCrumbs: [{
          text: 'ホーム',
          disabled: false,
          to: '/',
        }],
      }
    },
    computed: {
      songId() {
        return this.$route.params.songId
      },
      selectedInstrumentId: {
        get(){
          if(this.instruments.length){
            return this.instruments[this.instrumentIndex].id
          }
        },
        set(value) {
          this.instrumentIndex = this.instruments.indexOf(value)
        }
      }
    },
    methods: {
      getPosts() {
        axios.get(`/songs/${this.songId}`)
          .then((response) => {
            // if (response.data.user) {
            //   this.currentUser = response.data.user
            // }
            // this.artist = response.data.artist
            // this.song = response.data.song
            // this.posts = response.data.posts
            this.instruments = response.data.instruments
            // this.averages = response.data.averages
            // this.fetchPosts()
          })
      },
      setBreadCrumbs() {
        axios.get(`/songs/${this.songId}`)
          .then((response) => {
            this.breadCrumbs.push({
              text: response.data.artist.name,
              disabled: false,
              to: `/vue/artists/${response.data.artist.id}`
            }, {
              text: response.data.song.name,
              disabled: true,
            })
          })
      },
      fetchPosts() {
        if (this.posts.length > 0) {
          this.selectedPosts = this.posts.filter((post) => post.instrument_id === this.selectedInstrumentId)
          this.selectedAverage = this.averages.filter((average) => average.instrument_id === this.selectedInstrumentId)
          }
      },
      closeCreate() {
        this.createDialog = false
      },
      closeEdit() {
        this.editDialog = false
      },
      closeDelete() {
        this.deleteDialog = false
      },
      createPost(post) {
        axios.post(`/songs/${this.songId}/posts`, post)
          .then((response) => {
            if (response.status == 200) {
              this.closeCreate()
              this.getPosts()
            }
          })
          .catch((error) => {
            this.snackbar = true
          })
      },
      editPost(post) {
        axios.put(`/posts/${post.id}`, post)
          .then((response) => {
            if (response.status == 200) {
              this.closeEdit()
              this.getPosts()
            }
          })
      },
      deletePost() {
        axios.delete(`/posts/${this.deleteConfirmedPost.id}`, this.deleteConfirmedPost)
          .then((response) => {
            if (response.status == 200) {
              this.closeDelete()
              this.getPosts()
            }
          })
      },
      openEditForm(post) {
        this.postToEditForm = post
        this.editDialog = true
      },
      openDeleteForm(post) {
        this.deleteConfirmedPost = post
        this.deleteDialog = true
      },
      favorite(post) {
        axios.post(`/posts/${post.id}/favorite`, post)
          .then((response) => {
            if (response.status == 200) {
              this.getPosts()
            }
          })
          .catch((error) => {
            this.snackbar = true
          })
      },
      unfavorite(post) {
        axios.post(`/posts/${post.id}/unfavorite`, post)
          .then((response) => {
            if (response.status == 200) {
              this.getPosts()
            }
          })
      },
    },
    watch: {
      selectedInstrumentId() {
        this.fetchPosts()
      }
    },
    created() {
      this.getPosts()
      this.setBreadCrumbs()
    },
  }
</script>

<style>
  .post-index tr:hover td {
    background: #FFFFFF;
  }
</style>
