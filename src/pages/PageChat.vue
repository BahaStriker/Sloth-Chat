<template>
  <q-page class="flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message v-for="message in messages" :key="message.id" :name="message.sender_id == auth.staffid ? auth.firstname+' '+auth.lastname : receiver.firstname+''+receiver.lastname" :text="[createTextLinks(message.message)]"
        :sent="message.sender_id == auth.staffid ? true : false" :bg-color="message.sender_id == auth.staffid ? '' : 'amber-4'"
        :stamp="message.time_sent" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit.prevent="sendMessage" class="full-width">
          <q-input bg-color="white" v-model="newMessage.message" outlined rounded label="Message" dense>

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
import {axiosInstance} from 'boot/api'
import {EchoInstance} from 'boot/echo'

  export default {

    data() {
      return {
        newMessage: {
          message: '',
          reciever_id: ''
        },
        messages: [],
        receiver: {},
        auth: {},
      }
    },
    methods: {
      createTextLinks(text) {
        var regex = (/\.(gif|jpg|jpeg|tiff|png|swf)$/i);
        return (text || "").replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, function (match, string, url) {
            var hyperlink = url;
            if (!hyperlink.match('^https?:\/\/')) {
                hyperlink = '//' + hyperlink;
            }
            if (hyperlink.match('^http?:\/\/')) {
                hyperlink = hyperlink.replace('http://', '//');
            }
            if (hyperlink.match(regex)) {
                return string + '<a href="' + hyperlink + '" target="blank" data-lity><img style="width:100%;height:100%;padding-top:2px;" rel="nofollow" src="' + hyperlink + '"/></a>';
            } else {
                return string + '<a data-lity target="blank" rel="nofollow" href="' + hyperlink + '">' + url + '</a>';
            }
        });
      },
      getMessages() {
        axiosInstance.get("/messages/" + this.$route.params.id).then(response => {
          this.auth = response.data.auth;
          this.receiver = response.data.receiver;
          this.messages = JSON.parse(response.data.message);
          this.newMessage.reciever_id = response.data.receiver.staffid;
        })
        .catch(e => {
          console.log(e.message)
        })
      },
      sendMessage() {
        axiosInstance.post("/newmsg", this.newMessage).then(response =>{
          this.getMessages();
          this.newMessage.message = '';
        }).catch(e => {
          alert(e.message);
        })
      },
    },
    mounted() {
      this.getMessages();
       EchoInstance.join('mychanel') //Should be Channel Name
        //.joining(this.pusher)
        .listen('send-event', (e) => {
          console.log(e);
        });
    },
    created() {
      this.getMessages();
    }
  }

</script>
<style>

</style>
