import {axiosInstance} from 'boot/api';
import { LocalStorage } from 'quasar';

const state = {
  userData: {},
  users: {},
}

const mutations = {
  setUserData(state, user) {
    state.userData = user;
  },
  addUsers(state, users) {
    state.users = users;
  }
}

const actions = {
  sendLoginRequest({}, data) {
    return axiosInstance.post("/signin", data).then(response => {
      const token = response.data.access_token;
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      LocalStorage.set('token', token);
    })
    .catch(e => {
      console.log("Action sendLoginRequest : ", e.message);
      alert("E-mail and/or Password Incorrect!");
    });
  },
  getUserData({ commit }) {
    let token  = LocalStorage.getItem('token');
    if(token){
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      return axiosInstance.get("/me").then(response => {
        commit("setUserData", response.data.auth);
      })
      .catch(e => {
        console.log("Action getUserData : ", e.message)
      })
    }

  },
  sendLogoutRequest({}) {
    axiosInstance.post("/logout").then(() => {
        LocalStorage.remove('token');
        window.location.reload();
    });
  },
  handleAuthStateChanged({ commit, dispatch }) {
		axiosInstance.get("/me").then(user => {
		  if (user.data.auth) {
        commit('setUserData', user.data.auth);
        dispatch('getUsers');
		  }
		  else {
        commit('setUserData', {});
        LocalStorage.remove('token');
		  }
		})
  },
  getUsers({ commit }) {
		axiosInstance.get("/staffOnline").then(response => {
			commit('addUsers', response.data.staff);
    })
    .catch(e => {
      console.log("Action getUsers : ", e.message)
    });
	},
}

const getters = {
	users: state => state.users
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
