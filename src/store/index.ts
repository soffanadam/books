import { InjectionKey } from 'vue'
import {
  createStore,
  createLogger,
  useStore as baseUseStore,
  Store,
} from 'vuex'
import book from './modules/book'

export interface RootState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const debug = process.env.NODE_ENV !== 'production'
const state: RootState = {}

export const key: InjectionKey<Store<RootState>> = Symbol()
export const store = createStore({
  state,
  modules: {
    book,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
