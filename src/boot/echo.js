import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {
  LocalStorage
} from 'quasar';

window.Pusher = require('pusher-js');
/*const EchoInstance = new Echo({
  broadcaster: 'pusher',
  key: "2f2cda0d346bf1eff587",
  cluster: "eu",
  encrypted: false,
  authEndpoint: 'https://apichat.sloth-lab.com/api/auth_pusher',
  //authTransport: 'jsonp',
  auth: {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + LocalStorage.getItem('token')
    }
  }
});*/

const PusherInstance = new Pusher("2f2cda0d346bf1eff587", {
  authEndpoint: "https://apichat.sloth-lab.com/api/broadcasting/auth",
  auth: {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + LocalStorage.getItem('token')
    }
  },
  //authTransport: 'jsonp',
  'cluster': 'eu',
  disableStats: true,
  encrypted: false,
});

export {
  PusherInstance
}
