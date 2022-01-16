<template>
    <header>
        <v-app-bar app dark color="indigo darken-4">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h5 font-weight-bold">GT-share</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary>
            <v-list-item>
                <v-btn icon @click="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-list-item-title class="text-h5 font-weight-bold">
                    GT-share
                </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list nav>
                <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
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
                    { title: '自分の投稿', icon: 'mdi-text-box', path: '/' },
                    { title: 'ランキング', icon: 'mdi-crown', path: '/' },
                ]
            }
        }
    }
</script>