import { createStore } from 'vuex'
import ModulUser from './user'
import ModulPk from './pk'
import ModuleRecord from './record';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModulUser,
    pk: ModulPk,
    record: ModuleRecord
  }
})
