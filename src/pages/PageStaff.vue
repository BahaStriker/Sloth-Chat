<template>
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
            <q-badge v-for="member in members" v-if="member.id == user.staffid" color="green" style="height: 12px;border-radius: 10px;"  />
            {{ user.firstname }} {{ user.lastname }}
          </q-item-label>
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
import { mapGetters,mapState } from 'vuex'
 import {
    PusherMain
  } from 'boot/echo'
export default {
  data(){
    return{
       pusher: PusherMain.subscribe('presence-mychanel'),
       members:[]
    }
  },
  methods: {
    getImage(id, url) {
      return "https://panel.sloth-lab.com/uploads/staff_profile_images/" + id + "/small_" + url;
    }
  },

  computed: {
    ...mapGetters('store', ['users']),
     ...mapState("store", ['userData']),
  },
   async mounted() {
   await this.pusher.members.each((member) => {
     this.members.push({
              'id' : member.id,
              
            });
      
      });
    }

  
}
</script>
<style>

</style>
