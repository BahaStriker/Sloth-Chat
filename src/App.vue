<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('store', ['handleAuthStateChanged']),

    onDeviceReady() {
      console.log('cordova', window.cordova);
      console.log('device', window.device);
    }

  },
  mounted() {
    this.handleAuthStateChanged();
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  updated() {
    this.handleAuthStateChanged()
  }
}
</script>
