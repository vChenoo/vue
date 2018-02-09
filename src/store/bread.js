const state = {
	bread_name: ''
}

const mutations = {
	SET_BREAD_NAME (state, name) {
		state.bread_name = name
	}
}
const actions = {
	set_bread_name: ({
    commit
  }, name) => {
    commit('SET_BREAD_NAME', name)
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
