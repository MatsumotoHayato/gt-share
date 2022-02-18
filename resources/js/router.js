import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: () => import('./components/artists/ArtistIndex'), name: 'ArtistIndex' },
    { path: '/vue/artists/:artistId', component: () => import('./components/artists/ArtistShow'), name: 'ArtistShow' },
    { path: '/vue/songs/:songId', component: () => import('./components/posts/PostIndex'), name: 'PostIndex' },
    { path: '/vue/profile', component: () => import('./components/users/ProfileForm'), name: 'ProfileForm' },
    { path: '/vue/password', component: () => import('./components/users/PasswordForm'), name: 'PasswordForm' },
    { path: '/vue/myfavorite', component: () => import('./components/posts/MyFavorite'), name: 'MyFavorite' },
    { path: '/vue/myposts', component: () => import('./components/posts/MyPosts'), name: 'MyPosts' },
    { path: '/vue/ranking', component: () => import('./components/songs/Ranking'), name: 'Ranking' },
    { path: '/vue/forums', component: () => import('./components/forums/ForumIndex'), name: 'ForumIndex' },
    { path: '*', redirect: '/' }
  ],
  mode: 'history',
})
