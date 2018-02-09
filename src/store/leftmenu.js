const state = { // 状态
  width: '200px',		// 左侧菜单宽度
  menu_flag: true
}
const mutations = {   // 改变（类似于事件注册）
	SET_MENU_OPEN (state) {
    state.width = '200px'
    state.menu_flag = true
  },
  SET_MENU_CLOSE (state) {
    state.width = '63px'
    state.menu_flag = false
  }
}
const actions = {   // 动作（类似于事件触发）
	set_menu_open: ({
                    commit
                  }) => {
    commit('SET_MENU_OPEN')
  },
  set_menu_close: ({
                     commit
                   }) => {
    commit('SET_MENU_CLOSE')
  }
}
const getters = {   // 计算

}
export default {
	state,
	mutations,
	actions,
	getters
}
