import { defineStore } from 'pinia';

import api from '@/api';
import store from '@/store';
import { setLiuliToken, removeLiuliToken, getLiuliToken } from '@/utils/auth';

export const useUserStore = defineStore('user', {
  state: () => {
    return { token: '', username: '' };
  },
  getters: {
    getToken: (state) => {
      return state.token || getLiuliToken().token ;
    },
    getUsername: (state) => {
      return state.username || getLiuliToken().username;
    }
  },
  actions: {
    setToken(token, username, remember) {
      this.token = token;
      this.username = username;
      if (remember) {
        setLiuliToken({
          token: token,
          username: username,
          timeStamp: Date.now()
        });
      }
    },
    resetState() {
      this.token = '';
      this.username = '';
    },

    async login(data) {
      // 登录获取 Token
      const res = await api.login(data);
      if (res.status == 200) {
        // console.log('正在持久化 Token!');
        this.setToken(res.data.token, res.data.username, data.remember);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    },

    async logout() {
      this.resetState();
      removeLiuliToken();
    }
  }
});

export function callUserStore() {
  return useUserStore(store);
}
