<template>
  <div class="display-wrap" :class="refresh">
    <div class="wrapper" :class="refetch">
      <div class="chat-messages">
        <div v-for="(msg, index) in chatList" :key="index">
          <div align="center" v-if="isTyping"><p class="saving"><span>.</span><span>.</span><span>.</span></p></div>

          <div class="receiver" v-if="msg.from.id !== user.id">
            <span class="user-bubble"><b>{{ msg.from.name}} </b></span>
            <p>
              {{msg.message}}
            </p>
          </div>
          <div class="sender" align="right" v-else>
            <span class="user-bubble"><b> {{ user.name}} </b></span>
            <p>
              {{msg.message}}
            </p>

          </div>
        </div>
      </div>
      <div class="col-wrapper">
        <div>
          <input class="form-control" placeholder="Type something..." v-model="message" type="text"/>
        </div>
        <div>
          <b-button class="btn-block" variant="primary" @click="sendMessage"
          ><i class="fas fa-paper-plane"></i></b-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['id', 'to', 'isPublic', 'chatList', 'refetch'],
    created() {
    },
    mounted() {
      this.subscribeToChatRoom()
    },
    data() {
      return {
        printer: '',
        message: '',
        name: '',
        isTyping: false,
        shouldJoin: false,
        refresh: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    components: {},
    sockets: {
      privatemessage: function (data) {
        this.$store.commit('setPrivateChatHistorySingle', {
          to: data.to, roomid: data.roomid, message: data.message,
          received:
          data.from.id !==
          this.user.id, from: data.from
        })

        this.refresh = false
        this.refresh = true
      },
      publicmessage: function (data) {
        this.$store.commit('setPublicChatHistorySingle', {
          message: data.message, received: data.from.id !==
          this.user.id,
          from: data.from
        })
        this.refresh = false
        this.refresh = true
      },
    },
    methods: {
      subscribeToChatRoom() {
        this.$socket.emit('join-room', {roomid: this.id});
      },
      sendMessage() {
        if (this.isPublic) {
          this.$socket.emit('public-chat', {roomid: this.id, message: this.message, from: this.user})
          this.message = ''
        } else {
          this.$socket.emit('private-chat', {roomid: this.id, message: this.message, to: this.to, from: this.user})
          this.message = ''
        }
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-rows: 87vh 10vh;
    grid-row-gap: 1em;
  }

  .display-wrap {
    height: 100%;
    margin: 0;
    border: 3px solid #cecece;
    border-top: 0px solid #cecece;
  }

  .col-wrapper {
    display: grid;
    grid-template-columns: 10fr 1fr;
    grid-column-gap: 1em;
    padding: 1em;
  }

  .chat-messages {
    margin-top: 2em;
    grid-auto-rows: min-content;
    overflow: scroll;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    display: flex;
    flex-direction: column-reverse;

  }

  .chat-messages > div {
    padding: 1em;
    margin: 1em;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .chat-messages > .sender {
    align-items: right;
  }

  .chat-messages > .receiver {
    align-items: left;

  }

  .receiver p {
    text-align: left;
    background-color: rgb(230, 230, 230);
    padding: 1em;
    border-radius: 1em 0 1em 0;
    justify-items: left;
  }

  p {
    min-width: 100px;
    max-width: 90%;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .saving {
    font-size: 3em;
    margin: 0 !important;
    font-weight: bolder;
  }

  .sender p {
    text-align: right;
    background-color: #0695ff;
    border-radius: 0 1em 0 1em;
    padding: 1em;
    justify-items: right;
    color: #ffff;
  }

  @keyframes blink {
    0% {
      opacity: .2;
    }

    20% {
      opacity: 1;
    }
    100% {
      opacity: .2;
    }
  }

  .saving span {
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .saving span:nth-child(2) {
    animation-delay: .2s;
  }

  .saving span:nth-child(3) {
    animation-delay: .4s;
  }

  .user-bubble {
    border-radius: 1em;
    padding: 0.6em;
    font-style: italic;
  }
</style>
