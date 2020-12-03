<template>
  <q-page ref="pageChat" class="flex column">
    <div class="page-chat q-pa-md column col justify-end">
      <q-chat-message v-for="message in messages" :key="message.id"
        :name="message.sender_id == auth.staffid ? auth.firstname+' '+auth.lastname : receiver.firstname+''+receiver.lastname"
        :text="[createTextLinks(message.message)]" :sent="message.sender_id == auth.staffid ? true : false"
        :bg-color="message.sender_id == auth.staffid ? 'amber-1' : 'amber-2'" :stamp="message.time_sent" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input @blur="scrollToBottom" ref="newMessage" bg-color="white" v-model="newMessage.message" outlined
            rounded label="Message" dense>

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
  import {
    axiosInstance
  } from 'boot/api'
  import {
    PusherInstance
  } from 'boot/echo'

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
        pusher: PusherInstance.subscribe('presence-mychanel'),
      }
    },
    methods: {
      getDateNow() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
      },
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
            return string + '<a href="' + hyperlink +
              '" target="blank" data-lity><img style="width:100%;height:100%;padding-top:2px;" rel="nofollow" src="' +
              hyperlink + '"/></a>';
          } else {
            return string + '<a data-lity target="blank" rel="nofollow" href="' + hyperlink + '">' + url + '</a>';
          }
        });
      },
      async getMessages() {
        await axiosInstance.get("/messages/" + this.$route.params.id).then(response => {
            this.auth = response.data.auth;
            this.receiver = response.data.receiver;
            var messages = JSON.stringify(response.data.message)
            this.messages = JSON.parse(messages);
            this.newMessage.reciever_id = response.data.receiver.staffid;
            this.scrollToBottom();
          })
          .catch(e => {
            console.log(e)
          })
      },
      sendMessage() {
        axiosInstance.post("/newmsg", this.newMessage).then(response => {
          this.newMessage.message = '';
          this.scrollToBottom();
          this.$refs.newMessage();
        }).catch(e => {
          console.log(e);
        })
      },
      scrollToBottom() {
        let pageChat = this.$refs.pageChat.$el;
        setTimeout(() => {
          window.scrollTo(0, pageChat.scrollHeight)
        }, 20);
      }
    },
    async created() {
      setTimeout(() => {
        this.scrollToBottom();
      }, 1000);
      await this.getMessages();
      this.pusher.bind('send-event',
        (data) => {
          if((data.to == this.auth.staffid || data.from == this.auth.staffid) && (data.to == this.receiver.staffid || data.from == this.receiver.staffid)){
            this.messages.push({
              'id' : data.last_insert_id,
              'is_deleted' : 0,
              'message' : data.message,
              'reciever_id' : parseInt(data.to),
              'sender_id' : parseInt(data.from),
              'time_sent' : this.getDateNow(),
              'viewed': 0
            });
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
        }
      );

     /*this.pusher.members.each(function(member) {
      console.log('user id',member.id ) 
       console.log('user info',member.info ) 
      
});*/
    }
    
  }

</script>
<style lang="stylus">
.page-chat
		background #e2dfd5
		&:after
			content ''
			display block
			position fixed
			left 0
			right 0
			top 0
			bottom 0
			z-index 0
			opacity 0.1
			background-image radial-gradient(circle at 100% 150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0    150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50%  100%, white 10%, silver 11%, silver 23%, white 24%, white 30%, silver 31%, silver 43%, white 44%, white 50%, silver 51%, silver 63%, white 64%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent), radial-gradient(circle at 0    50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent)
			background-size 100px 50px
	.q-banner
		top 50px
		z-index 2
		opacity 0.8
	.q-message
		z-index 1
</style>
