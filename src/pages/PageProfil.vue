<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="getImage(user.staffid, user.profile_image)" class="items-center" >
          </q-avatar>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label> Name: {{ user.firstname }} {{ user.lastname }}</q-item-label>
           <q-item-label> Email:{{ user.email }}</q-item-label>
        </q-item-section>

      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import {axiosInstance} from 'boot/api'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getImage(id, url) {
      return "https://panel.sloth-lab.com/uploads/staff_profile_images/" + id + "/small_" + url;
    },
    async fetchStaff() {
      await axiosInstance.get("/me").then(response => {
        this.user = response.data.auth;
      })
      .catch(e => {
        console.log(e.message)
      })
    }
  },
  mounted() {
    this.fetchStaff();
  }
}
</script>
<style>

</style>
