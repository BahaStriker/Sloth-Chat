<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn v-if="$route.fullPath.includes('/chat')" v-go-back.single icon="arrow_back" flat dense />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn to="/login" icon="account_circle" class="absolute-right q-pr-sm" flat no-caps dense label="Login" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  computed: {
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath == '/') return 'Sloth-Lab Chat'
      else if (currentPath == '/chat') return 'Chat'
      else if (currentPath == '/login') return 'Login'
    }
  }
}
</script>
