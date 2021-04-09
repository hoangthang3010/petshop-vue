import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import cart from './modules/cart'

Vue.use(Vuex)

const storeData = {
	modules: {
		cart
	}
}

const store = new Vuex.Store(storeData)

export default store
