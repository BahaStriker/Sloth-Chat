<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn v-if="$route.fullPath.includes('/chat')" v-go-back.single icon="arrow_back" flat dense />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn v-if="userData" @click="sendLogoutRequest" icon="account_circle" class="absolute-right q-pr-sm" flat
          no-caps dense label="Logout" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import {
    LocalStorage
  } from 'quasar';
  import {
    mapActions,
    mapState
  } from "vuex";
  import {
    axiosInstance
  } from 'boot/api';
  import 'boot/async';
  export default {
    methods: {
      ...mapActions("store", ["sendLogoutRequest"])
    },
    computed: {
      ...mapState("store", ['userData']),
    },
    asyncComputed: {
      title() {
        const currentPath = this.$route.fullPath
        if (currentPath == '/') {
          return 'Sloth-Lab Chat'
        } else if (currentPath.includes('/chat')) {
          if(this.$route.params.id) {
            return new Promise((resolve, reject) => {
              resolve(axiosInstance.get("/staff/" + this.$route.params.id).then(response => {
                return response.data.staff[0].firstname + ' ' + response.data.staff[0].lastname;
              }))
            })
          }
        } else if (currentPath == '/login') {
          return 'Login'
        }
      },
    }
  }

</script>
