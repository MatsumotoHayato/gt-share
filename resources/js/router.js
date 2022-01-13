import Vue from 'vue'
import Router from 'vue-router'
// import ArtistIndex from './components/artists/ArtistIndex'

Vue.use(Router)

export default new Router({
	routes: [
          // { path: '/', component: ArtistIndex, name: 'ArtistIndex' },
          { path: '/', component: ()=>import('./components/artists/ArtistIndex'), name: 'ArtistIndex' },
          // { path: '/vue/songs', component: ()=>import('./components/songs/SongIndex'), name: 'SongIndex' },
          { path: '/vue/artists/:artistId', component: ()=>import('./components/artists/ArtistShow'), name: 'ArtistShow' },
          { path: '/vue/songs/:songId', component: ()=>import('./components/posts/PostIndex'), name: 'PostIndex' },
          // { path: '*', redirect: '/'}
  ],
	mode: 'history',
})
