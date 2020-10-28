import axios from 'axios';
import { LocalStorage } from 'quasar';


const axiosInstance = axios.create({
  baseURL: 'https://apichat.sloth-lab.com/api'
});

axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axiosInstance.interceptors.request.use(config => {
  config.headers.common = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + LocalStorage.getItem('token')
  };

  return config;
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
  Vue.axios = Vue.prototype.$axios
}

export {axiosInstance}
