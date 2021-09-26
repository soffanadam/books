import {
  Getter,
  GetterTree,
  Mutation,
  MutationTree,
  Action,
  ActionTree,
} from 'vuex'
import { RootState } from '@/store'

export function getter<S, T extends GetterTree<S, RootState>>(
  state: S,
  getters: T
): { [K in keyof T]: Getter<S, RootState> } {
  return getters
}

export function mutation<S, T extends MutationTree<S>>(
  state: S,
  mutations: T
): { [K in keyof T]: Mutation<S> } {
  return mutations
}

export function action<S, T extends ActionTree<S, RootState>>(
  state: S,
  actions: T
): { [K in keyof T]: Action<S, RootState> } {
  return actions
}
