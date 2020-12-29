<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('store', ['handleAuthStateChanged'])
  },
  mounted() {
    this.handleAuthStateChanged();
    document.addEventListener('deviceready', () => {
      // it's only now that we are sure
      // the event has triggered
    }, false);
  },
  updated() {
    this.handleAuthStateChanged()
  }
}
</script>
