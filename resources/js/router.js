import Vue from 'vue'
import Router from 'vue-router'
// import ArtistIndex from './components/artists/ArtistIndex'
import SongIndex from './components/songs/SongIndex'

Vue.use(Router)

export default new Router({
	routes: [
        //   { path: '/', component: ArtistIndex, name: 'ArtistIndex' },
          { path: '/', component: ()=>import('./components/artists/ArtistIndex'), name: 'ArtistIndex' },
          { path: '/vue/artists/:artistId', component: SongIndex, name: 'SongIndex' },
          { path: '/vue/songs/:songId', component: ()=>import('./components/posts/PostIndex'), name: 'PostIndex' },
          // { path: '*', redirect: '/'}
  ],
	mode: 'history',
})
