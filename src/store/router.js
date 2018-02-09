const state = {
	// 头部当前路由，匹配高亮
  headerCurRouter: '',

  // 左侧当前路由，匹配高亮
  leftCurRouter: ''
}
const mutations = {
	SET_CUR_ROUTE (state, paths) {
    state.headerCurRouter = paths.rootPath
    state.leftCurRouter = paths.fullPath
  }
}
const actions = {
	set_cur_route: ({
    commit
  }, paths) => {
    commit('SET_CUR_ROUTE', paths)
  }
}
const getters = {

}
export default {
	state,
	mutations,
	actions,
	getters
}
