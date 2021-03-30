import { getQcloudTmpkeys } from '@/api'
import COS from 'cos-js-sdk-v5'
import { Module, ActionContext } from 'vuex'
import { RootState } from './index'

interface State {
  cosKeys: object
  cos: object
  expires: number | string
}
const state: State = {
  cosKeys: {},
  cos: {},
  expires: ''
}
const getters = {
  COS_KEYS(state: State) {
    return state.cosKeys
  },
  COS(state: State) {
    return state.cos
  }
}
const mutations = {
  setCosKeys(state: State, data: any) {
    const options = {
      Bucket: data.bucket,
      Region: data.region
    }
    state.cosKeys = options
    sessionStorage.setItem('cosKeys', JSON.stringify(options))
  },
  createCOS(state: State, data: any) {
    const cosInstance = new COS({
      getAuthorization(options, callback) {
        callback({
          TmpSecretId: data.tmpSecretId,
          TmpSecretKey: data.tmpSecretKey,
          XCosSecurityToken: data.sessionToken,
          ExpiredTime: data.expiredTime,
          StartTime: data.StartTime
        })
      }
    })
    state.cos = cosInstance
    sessionStorage.setItem('cos', JSON.stringify(cosInstance))
  },
  setExpires(state: State, data: any) {
    const timeDiff = data.expiredTime - data.startTime - 600
    const date = (new Date().getTime() / 1000) as any
    const dateNow = parseInt(date)
    const expires = dateNow + timeDiff
    state.expires = expires
  }
}

const actions = {
  async getTmpkeys(context: ActionContext<State, RootState>) {
    const date = (new Date().getTime() / 1000) as any
    const dateNow = parseInt(date) // 当前时间戳
    if (dateNow > context.state.expires) {
      // 初次和失效后调取
      const res = await getQcloudTmpkeys()
      if (!res || res.code !== 0) return
      const data = res.data
      context.commit('setExpires', data)
      context.commit('setCosKeys', data)
      context.commit('createCOS', data)
    }
  }
}

const COS_SDK: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default COS_SDK
