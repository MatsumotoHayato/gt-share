<template>
  <header>
    <v-app-bar app class="elevation-0" color="indigo darken-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <router-link to="/" class="home-link">GT-share</router-link>
      </v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-8" small v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
        </template>
        <v-card>
          <v-card-title class="font-weight-bold">
            本サイトについて
          </v-card-title>
          <v-card-text class="text-subtitle-1 black--text">
            <div>楽器演奏者のための楽曲レビューサイトです。</div>
            <div>あなたが弾いたことのある曲についてレビューできます。</div>
            <div>ログインすると様々な機能が使えます。</div>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
      <div v-if="user !== null" class="pa-2 mr-16">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              v-on="on"
              class="pa-5 text-subtitle-1"
              color="white"
              outlined
              label
            >
              <v-row style="min-width: 160px;" justify="space-between">
                <div>
                  <v-icon class="mt-n1">mdi-account</v-icon>
                  <span>{{ user.name }}</span>
                </div>
                <v-icon>mdi-menu-down</v-icon>
              </v-row>
            </v-chip>
          </template>
          <v-list>
            <v-list-item-group>
            <v-list-item to="/vue/profile">
              <v-list-item-content>
                <v-list-item-title class="py-1">プロフィール設定</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/vue/password">
              <v-list-item-content>
                <v-list-item-title class="py-1">パスワード変更</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-content>
                <v-list-item-title class="py-1">ログアウト</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="mr-4" outlined @click="loginDialog = true">
          ログイン
        </v-btn>
        <LoginForm :loginDialog="loginDialog" @login="logined" @registerLink="registerFromLogin" @close="loginDialog = false" />
        <v-btn class="font-weight-bold indigo--text text--darken-4 mr-8" light @click="registerDialog = true">
          新規登録
        </v-btn>
        <RegisterForm :registerDialog="registerDialog" @register="registered" @loginLink="loginFromRegister" @close="registerDialog = false" />
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
      logined() {
        this.loginDialog = false
        this.loginSnackbar = true
        this.getUser()
        this.$router.push('/').catch(error => {})
      },
      registered() {
        this.registerDialog = false
        this.loginSnackbar = true
        this.getUser()
        this.$router.push('/').catch(error => {})
      },
      logout() {
        axios.post('/logout')
          .then((response) => {
            if (response.status == 200) {
              this.logoutSnackbar = true
              this.getUser()
              this.$router.push('/').catch(error => {})
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
