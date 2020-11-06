<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item >
        <q-item-section avatar>
          <q-avatar>
            <img :src="getImage(users.staffid, users.profile_image)">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ users.firstname }} {{ users.lastname }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn dense round flat icon="email">
          </q-btn>
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
      users: {}
    }
  },
  methods: {
    getImage(id, url) {
      return "https://panel.sloth-lab.com/uploads/staff_profile_images/" + id + "/small_" + url;
    },
   
    async goProfile() {
       await axiosInstance.get("/me").then(response => {
        this.users = response.data.staff;
      })
      .catch(e => {
        console.log(e.message)
      })
    },
  },
  mounted() {
     this.goProfile()
  }
}
</script>
<style>

</style>
