<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="$route.fullPath == '/'" flat @click="drawer = !drawer" round dense icon="menu" />
        <q-btn v-if="$route.fullPath.includes('/chat')" v-go-back.single icon="arrow_back" flat dense />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn v-if="userData.staffid" @click="sendLogoutRequest" icon="exit_to_app" class="absolute-right q-pr-sm" flat
          no-caps dense />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" v-if="userData.staffid" :width="200" :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              <div class="text-weight-bold">{{userData.firstname}} {{userData.lastname}}</div>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section style="margin-left: -4%;">
              <div style="font-size: 12px">{{userData.email}}</div>
            </q-item-section>
          </q-item>


        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="bg-transparent" style="margin-bottom: 180px">

          <q-avatar size="102px" class="imgcenter">
            <img :src="getImage(userData.staffid, userData.profile_image)" round class="items-center">
          </q-avatar>



        </div>
      </q-img>
    </q-drawer>

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
    data() {
      return {
        drawer: false
      }
    },
    methods: {
      ...mapActions("store", ["sendLogoutRequest"]),

      getImage(id, url) {
        return "https://panel.sloth-lab.com/uploads/staff_profile_images/" + id + "/small_" + url;
      },

    },
    computed: {
      ...mapState("store", ['userData']),
    },
    asyncComputed: {
      title() {
        const currentPath = this.$route.fullPath
        if (currentPath == '/') {
          return 'Staff'
        } else if (currentPath.includes('/chat')) {
          if (this.$route.params.id) {
            return new Promise((resolve, reject) => {
              resolve(axiosInstance.get("/staff/" + this.$route.params.id).then(response => {
                return response.data.staff[0].firstname;
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


<style>
  .imgcenter {
    margin-top: 10% !important;
    margin-left: 35% !important;
  }

</style>
