<template>
  <header>
    <v-app-bar app class="elevation-0" color="indigo darken-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <router-link to="/" class="home-link">GT-share</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user" class="mr-16">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/vue/profile">
              <v-list-item-title>プロフィール設定</v-list-item-title>
            </v-list-item>
            <v-list-item to="/vue/password">
              <v-list-item-title>パスワード変更</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>ログアウト</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="mr-4" outlined @click="loginDialog = true">
          ログイン
        </v-btn>
        <LoginForm :loginDialog="loginDialog" @login="login" @registerLink="registerFromLogin" @close="loginDialog = false" />
        <v-btn class="font-weight-bold indigo--text text--darken-4 mr-8" light @click="registerDialog = true">
          新規登録
        </v-btn>
        <RegisterForm :registerDialog="registerDialog" @register="register" @loginLink="loginFromRegister" @close="registerDialog = false" />
      </div>
      <v-snackbar v-model="loginSnackbar" :timeout="timeout" color="success" min-width=0 width=154>
        ログインしました
      </v-snackbar>
      <v-snackbar v-model="logoutSnackbar" :timeout="timeout" color="success" min-width=0 width=169>
        ログアウトしました
      </v-snackbar>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-toolbar class="elevation-0">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-h5 font-weight-bold">GT-share</v-toolbar-title>
      </v-toolbar>
      <v-list nav>
        <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.path">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
  import LoginForm from './users/LoginForm'
  import RegisterForm from './users/RegisterForm'
  export default {
    name: 'MenuBar',
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        user: null,
        drawer: false,
        menus: [
          { title: 'ホーム', icon: 'mdi-home', path: '/' },
          { title: 'ランキング', icon: 'mdi-crown', path: '/vue/ranking' },
          { title: 'いいねマイリスト', icon: 'mdi-thumb-up', path: '/vue/myfavorite' },
          { title: 'あなたの投稿', icon: 'mdi-text-box', path: '/vue/myposts' },
        ],
        loginDialog: false,
        registerDialog: false,
        loginSnackbar: false,
        logoutSnackbar: false,
        timeout: 3000,
      }
    },
    methods: {
      getUser() {
        axios.get('/users/get')
          .then((response) => {
            this.user = response.data.user
          })
      },
      login(userInfo) {
        axios.post('/login', userInfo)
          .then((response) => {
            if (response.status == 200) {
              this.loginDialog = false
              this.loginSnackbar = true
              this.getUser()
              this.$router.push('/')
            }
          })
      },
      logout() {
        axios.post('/logout')
          .then((response) => {
            if (response.status == 200) {
              this.logoutSnackbar = true
              this.getUser()
              this.$router.push('/')
            }
          })
      },
      register(userInfo) {
        axios.post('/register', userInfo)
          .then((response) => {
            if (response.status == 200) {
              this.registerDialog = false
              this.loginSnackbar = true
              this.getUser()
              this.$router.push('/')
            }
          })
      },
      registerFromLogin() {
        this.loginDialog = false
        this.registerDialog = true
      },
      loginFromRegister() {
        this.registerDialog = false
        this.loginDialog = true
      },
    },
    created() {
      this.getUser()
    }
  }
</script>

<style scoped>
  .home-link {
    text-decoration: none;
    color: inherit !important;
  }
</style>
