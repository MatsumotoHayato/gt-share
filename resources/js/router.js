import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import artistIndex from './components/artists/index'
import songIndex from './components/songs/index'

export default new Router({
	routes: [
          { path: '/', component: artistIndex, name: 'artistIndex' },
          { path: '/vue/artists/:artistId', component: songIndex, name: 'songIndex' },
  ],
	mode: 'history',
})
