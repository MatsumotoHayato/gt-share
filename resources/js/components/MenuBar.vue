<template>
    <header>
        <v-app-bar app dark color="indigo darken-4">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h5 font-weight-bold">GT-share</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
            icon
            class="ma-2"
            to="/vue/login"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>
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
        data() {
            return {
                drawer: false,
                menus: [
                    { title: 'ホーム', icon: 'mdi-home', path: '/' },
                    { title: 'マイリスト', icon: 'mdi-thumb-up', path: '/vue/mylist' },
                    { title: '自分の投稿', icon: 'mdi-text-box', path: '/vue/myposts' },
                    { title: 'ランキング', icon: 'mdi-crown', path: '/vue/ranking' },
                ],
            }
        }
    }
</script>