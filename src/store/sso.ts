import Cookie from 'js-cookie'
import { Module, ActionContext } from 'vuex'
import { RootState } from './index'

interface State {
  token: String
  userInfo: object
  authData: Array<any>
  userLogin: object
}
const state: State = {
  token: '',
  userInfo: {},
  authData: [],
  userLogin: {}
}

const getters = {
  USER(state: State) {
    return state.userInfo
  },
  AUTH: (state: State) => () => {
    return state.authData
  },
  TOKEN: (state: State) => () => {
    return state.token
  },
  HUOHUA: (state: State) => () => {
    return state.userLogin
  }
}

const mutations = {
  setUserInfo(state: State, data: object) {
    state.userInfo = data
  },
  setToken(state: State, data: string) {
    state.token = data
  },
  authLogin(state: State, data: object) {
    state.userLogin = data
  },
  setAuth(state: State, data: object[]) {
    state.authData = data
  },
  removeToken(state: State) {
    state.token = ''
  }
}
const actions = {
  async getToken(context: ActionContext<State, RootState>) {
    const config = {
      clientId: 'programming-cms',
      env: import.meta.env.VITE_DEPLOY_ENV, // qa,sim,online
      dev: import.meta.env.DEV // 是否为本地开发环境
    }
    try {
      // @ts-ignore
      const userLogin = await new Huohua_authentication_login(config)
      if (!userLogin) return
      context.commit('authLogin', userLogin)
      context.commit('setToken', userLogin.getToken())
      return userLogin
    } catch (error) {
      console.log(error)
    }
  },
  getPermissions(context: ActionContext<State, RootState>) {
    // 获取用户权限
    try {
      context.getters
        .HUOHUA()
        .getUserPermissions()
        .then((res: object[]) => {
          context.commit('setAuth', res)
        })
    } catch (error) {
      console.log(error)
    }
  },
  getUserInfo(context: ActionContext<State, RootState>) {
    // 获取用户信息
    try {
      context.getters
        .HUOHUA()
        .getUserInfo()
        .then((res: object[]) => {
          context.commit('setUserInfo', res)
        })
    } catch (error) {
      console.log(error)
    }
  },
  logout(context: ActionContext<State, RootState>) {
    try {
      context.getters.HUOHUA().logout()
    } catch (error) {
      console.log(error)
    }
  }
}

const SSO: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default SSO
