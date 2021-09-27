import { MutationTree, ActionTree, ActionContext } from 'vuex'
import books from '@/api/books'
import { Rest } from '@/api'
import { mutation, action } from '@/store/utils/vuex'
import { RootState } from '@/store'
import { Book } from '@/models/book'

export interface State {
  busy: boolean
  book: Book | null
  form: PlainObject
  errors: PlainObject
}

export interface Mutation extends MutationTree<State> {
  LOADING(state: State): void
  SET_BOOK(state: State, value: Book): void
  SET_ERRORS(state: State, value: PlainObject): void
}

export interface Action extends ActionTree<State, RootState> {
  show(context: ActionContext<State, RootState>, value: number): void
}

const defaultAttrs: PlainObject = {
  title: '',
  year: '',
  description: '',
}

const state: State = {
  busy: false,
  book: null,
  form: { ...defaultAttrs },
  errors: {},
}

const mutations = mutation<State, Mutation>(state, {
  LOADING(state) {
    state.busy = true
  },
  LOADED(state) {
    state.busy = false
  },
  NEW(state) {
    state.form = { ...defaultAttrs }
  },
  SET_BOOK(state, value) {
    state.book = value
  },
  UPDATE_FIELD: (state, { key, value }: { key: string; value: string }) => {
    if (state.form[key] !== value) {
      state.form[key] = value
      delete state.errors[key]
    }
  },
  SET_ERRORS(state, value) {
    state.errors = value
  },
})

const actions = action<State, Action>(state, {
  async show({ commit }, id) {
    commit('LOADING')
    const book = await books.show(id)
    commit('SET_BOOK', book)
    commit('LOADED')
  },
  store({ state, commit }) {
    commit('SET_ERRORS', [])
    commit('LOADING')

    return new Promise((resolve, reject) => {
      books
        .post(state.form)
        .then((book) => {
          resolve(book)
        })
        .catch((error: Rest.Error) => {
          reject(error)

          if (error.errors) {
            commit('SET_ERRORS', error.errors)
          }

          commit('LOADED')
        })
    })
  },
})

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
