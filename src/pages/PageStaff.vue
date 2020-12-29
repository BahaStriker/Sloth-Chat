<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-page class="flex q-pa-md">
      <q-list class="full-width" separator>
        <q-item v-for="user in users" :key="user.staffid" :to="{ path:'/chat/' + user.staffid }" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img :src="getImage(user.staffid, user.profile_image)">

            </q-avatar>
          </q-item-section>

          <q-item-section>

            <q-item-label>
              {{ user.firstname }} {{ user.lastname }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge color="green" v-if="online(user.staffid)">
              <q-icon name="swap_vertical_circle" color="white" />
            </q-badge>
            <q-badge color="grey" v-else>
              <q-icon name="swap_vertical_circle" color="white" />
            </q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
document.addEventListener('deviceready', () => {
  // it's only now that we are sure
  // the event has triggered
}, false);
  import {
    axiosInstance
  } from 'boot/api'
  import {
    mapGetters,
    mapState
  } from 'vuex'
  import {
    PusherMain
  } from 'boot/echo'
  export default {
    data() {
      return {
        pusher: PusherMain.subscribe('presence-mychanel'),
        members: []
      }
    },
    methods: {
      refresh(done) {
        setTimeout(() => {
          window.location.reload();
          done();
        }, 1000)
      },
      getImage(id, url) {
        return "https://panel.sloth-lab.com/uploads/staff_profile_images/" + id + "/small_" + url;
      },
      online(id) {
        return this.pusher.members.get(id) !== null;
      },
      alertDismissed() {
        return;
      },
      notification() {
        this.pusher.bind('notify-event', data => {
          if (data.to == this.userData.staffid) {
              navigator.vibrate([3000]);
              navigator.notification.alert(
                data.message,
                'New Message',
                data.from_name
              );
              navigator.notification.beep(2);
              new Notification('New Message', { body: data.message });

          }
        });
      }
    },
    computed: {
      ...mapGetters('store', ['users']),
      ...mapState("store", ['userData']),
    },
    mounted() {
      this.notification()
    }
  }

</script>
<style>

</style>
