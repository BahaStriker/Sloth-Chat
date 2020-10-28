<template>
  <q-page class="flex flex-top q-pa-md">

    <q-form @submit="onSubmit" class="full-width center">
      <img src="~assets/logo.png" width="40%" class="q-mb-lg q-mt-lg" />
      <q-input filled v-model="login.email" label="E-mail" hint="example@sloth-lab.com" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" class="q-mb-lg" />

      <q-input filled type="password" v-model="login.password" label="Password" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" class="q-mb-lg" />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import {
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        login: {
          email: null,
          password: null
        }
      }
    },

    methods: {
      ...mapActions("store", ["sendLoginRequest"]),

      onSubmit() {
        this.sendLoginRequest(this.login).then(() => {
          this.$router.push("/");
        });
      }
    }
  }

</script>
<style>
  .center {
    text-align: center;
  }

</style>
