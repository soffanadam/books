import { MutationTree, ActionTree, ActionContext } from 'vuex'
import books from '@/api/books'
import { mutation, action } from '@/store/utils/vuex'
import { RootState } from '@/store'
import { Paginator } from '@/store/utils'
import { Book } from '@/models/book'

export interface State {
  busy: boolean
  paginator: Paginator<Book> | null
  book: Book | null
}

export interface Mutation extends MutationTree<State> {
  LOADING(state: State): void
  SET_PAGINATOR(state: State, value: Paginator<Book>): void
  SET_BOOK(state: State, value: Book): void
}

export interface Action extends ActionTree<State, RootState> {
  paginate(context: ActionContext<State, RootState>, value: PlainObject): void
  show(context: ActionContext<State, RootState>, value: number): void
}

const state: State = {
  busy: false,
  paginator: null,
  book: null,
}

const mutations = mutation<State, Mutation>(state, {
  LOADING(state) {
    state.busy = true
  },
  LOADED(state) {
    state.busy = false
  },
  SET_PAGINATOR(state, value) {
    state.paginator = value
  },
  SET_BOOK(state, value) {
    state.book = value
  },
})

const actions = action<State, Action>(state, {
  async paginate({ commit }, params) {
    commit('LOADING')
    const paginator = await books.index(params)
    commit('SET_PAGINATOR', paginator)
    commit('LOADED')
  },
  async show({ commit }, id) {
    commit('LOADING')
    const book = await books.show(id)
    commit('SET_BOOK', book)
    commit('LOADED')
  },
})

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
