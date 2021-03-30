import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import user from './user'
import SSO from './sso'
import COS_SDK from './cos'

export interface RootState {}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: { user, SSO, COS_SDK }
})

export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
