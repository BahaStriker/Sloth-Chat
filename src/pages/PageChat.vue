<template>
  <q-page class="flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message v-for="message in messages" :key="message.text" :name="message.from" :text="[message.text]"
        :sent="message.from == 'me' ? true : false" :bg-color="message.from == 'me' ? '' : 'amber-4'"
        :stamp="message.time" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit.prevent="sendMessage" class="full-width">
          <q-input bg-color="white" v-model="newMessage" outlined rounded label="Message" dense>

            <template v-slot:after>
              <q-btn round dense flat color="white" icon="send" @click.prevent="sendMessage" />
            </template>
          </q-input>
        </q-form>

      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
  export default {

    data() {
      return {
        newMessage: '',
        messages: [{
            text: 'Hey, how are you?',
            from: 'me',
            time: '12 minutes ago'
          },
          {
            text: 'Fine, Thanks u?',
            from: 'them',
            time: '9 minutes ago'
          },
          {
            text: 'Good',
            from: 'me',
            time: '7 minutes ago'
          }
        ]
      }
    },
    methods: {
      sendMessage () {
          var today = new Date();
          var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          this.messages.push({
            text: this.newMessage,
            from: 'me',
            time: dateTime
          });
          this.newMessage = '';
      },
    },
  }

</script>
<style>

</style>
