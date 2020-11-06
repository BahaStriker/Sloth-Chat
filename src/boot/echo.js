import Echo from 'laravel-echo';
import { LocalStorage } from 'quasar';

window.Pusher = require('pusher-js');
const EchoInstance = new Echo({
  broadcaster: 'pusher',
  key: "2f2cda0d346bf1eff587",
  cluster: "eu",
  encrypted: false,
  authEndpoint: 'https://apichat.sloth-lab.com/broadcasting/auth',
  auth: {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + LocalStorage.getItem('token')
    }
  }
});

export {EchoInstance}
