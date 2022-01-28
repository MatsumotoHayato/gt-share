<template>
    <header>
        <v-app-bar app class="elevation-0" color="indigo darken-4" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h5 font-weight-bold">
                <router-link to="/" class="home-link">GT-share</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="user">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item to="/vue/mypage">
                            <v-list-item-title>マイページ</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-list-item-title>ログアウト</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div v-else>
                <v-btn to="/vue/login" outlined class="mr-4">
                    ログイン
                </v-btn>
                <v-btn to="/vue/register" light class="font-weight-bold indigo--text text--darken-4 mr-8">
                    新規登録
                </v-btn>
            </div>
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
    export default {
        name: 'MenuBar',
        props: ['user'],
        data() {
            return {
                drawer: false,
                menus: [
                    { title: 'ホーム', icon: 'mdi-home', path: '/' },
                    { title: 'ランキング', icon: 'mdi-crown', path: '/vue/ranking' },
                    { title: 'いいねマイリスト', icon: 'mdi-thumb-up', path: '/vue/mylist' },
                    { title: 'あなたの投稿', icon: 'mdi-text-box', path: '/vue/myposts' },
                ],
            }
        },
        methods: {
            logout() {
                axios.post('/logout')
                    .then((response)=>{
                        this.$router.push('/')
                    })
            }
        }
    }
</script>

<style scoped>
    .home-link {
        text-decoration: none;
        color: inherit!important;
    }
</style>