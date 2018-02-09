import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import leftmenu from './leftmenu'
import bread from './bread'
import tagsView from './tagsView'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		router,
		leftmenu,
		bread,
		tagsView
	}
})
