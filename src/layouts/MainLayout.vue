<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn v-if="$route.fullPath.includes('/chat')" v-go-back.single icon="arrow_back" flat dense />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn v-if="isLoggedin"  @click="logout" icon="account_circle" class="absolute-right q-pr-sm" flat no-caps dense label="Logout" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("store", ["sendLogoutRequest"]),

    async logout() {
      await this.sendLogoutRequest().then(() => {
          this.$router.push("/login");
      });
    }
  },
  computed: {
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath == '/') return 'Sloth-Lab Chat'
      else if (currentPath == '/chat') return 'Chat'
      else if (currentPath == '/login') return 'Login'
    },
    isLoggedin() {
      const currentPath = this.$route.fullPath
      if(currentPath == '/login') {
        return false
      }
      else {
        return true;
      }
    }

  }
}
</script>
