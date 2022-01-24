import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
        { path: '/', component: ()=>import('./components/artists/ArtistIndex'), name: 'ArtistIndex' },
        { path: '/vue/login', component: ()=>import('./components/users/Login'), name: 'Login' },
        { path: '/vue/register', component: ()=>import('./components/users/Register'), name: 'Register' },
        { path: '/vue/artists/:artistId', component: ()=>import('./components/artists/ArtistShow'), name: 'ArtistShow' },
        { path: '/vue/songs/:songId', component: ()=>import('./components/posts/PostIndex'), name: 'PostIndex' },
        { path: '/vue/mylist', component: ()=>import('./components/posts/MyList'), name: 'MyList' },
        { path: '/vue/myposts', component: ()=>import('./components/posts/MyPosts'), name: 'MyPosts' },
        { path: '/vue/ranking', component: ()=>import('./components/songs/Ranking'), name: 'Ranking' },
        { path: '*', redirect: '/'}
  ],
	mode: 'history',
})
