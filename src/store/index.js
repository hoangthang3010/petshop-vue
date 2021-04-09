import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import card from './modules/card'

Vue.use(Vuex)

const storeData = {
	modules: {
		card
	}
}

const store = new Vuex.Store(storeData)

export default store
