import {axiosInstance} from 'boot/api';
import { LocalStorage } from 'quasar';

const state = {
  userData: null
}

const mutations = {
  setUserData(state, user) {
    state.userData = user;
  }
}

const actions = {
  sendLoginRequest({}, data) {
    return axiosInstance.post("/signin", data).then(response => {
      const token = response.data.access_token;
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      LocalStorage.set('token', token);
      this.$router.push("/");
    })
    .catch(e => {
      console.log(e.message);
      alert("E-mail and/or Password Incorrect!");
    });
  },
  getUserData({ commit }) {
    let token  = LocalStorage.getItem('token');
    if(token){
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      return axiosInstance.get("/me").then(response => {
        commit("setUserData", response.data);
      })
      .catch(e => {
        console.log(e.message)
      })
    }

  },
  sendLogoutRequest({ commit }) {
    axiosInstance.post("/logout").then(() => {
        commit("setUserData", null);
        LocalStorage.remove('token');
    });
  }
}

const getters = {
  user: state => state.userData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
