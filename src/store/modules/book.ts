import { MutationTree, ActionTree, ActionContext } from 'vuex'
import books from '@/api/books'
import { mutation, action } from '@/store/utils/vuex'
import { RootState } from '@/store'
import { Paginator } from '@/store/utils'
import { Book } from '@/models/book'

export interface State {
  paginator: Paginator<Book> | null
}

export interface Mutation extends MutationTree<State> {
  SET_PAGINATOR(state: State, value: Paginator<Book>): void
}

export interface Action extends ActionTree<State, RootState> {
  paginate(context: ActionContext<State, RootState>, value: PlainObject): void
}

const state: State = {
  paginator: null,
}

const mutations = mutation<State, Mutation>(state, {
  SET_PAGINATOR(state, value) {
    state.paginator = value
  },
})

const actions = action<State, Action>(state, {
  async paginate({ commit }, params?) {
    const paginator = await books.index(params)
    commit('SET_PAGINATOR', paginator)
  },
})

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
