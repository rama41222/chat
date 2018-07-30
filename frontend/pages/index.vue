<template>
  <div class="display-wrap-main">
    <div class="chat-list-wrap" style="margin-top: 4.0em;">

      <div class="chat-elem-wrap" @click="selectPublic" style="cursor: pointer!important;">
        <div style="display: inline-block">
          <img src="/profile.png" class="img img-fluid prof-pic">
        </div>
        <div class="user">Public</div>
        <div align="center"><i class="fas fa-chevron-right next"></i></div>
      </div>

      <div class="chat-elem-wrap" v-if="usr.id !== user.id" v-for="(usr, index) of users" :key="index"
           @click="selectRoom(usr)">
        <div style="display: inline-block">
          <img src="/profile.png" class="img img-fluid prof-pic">
        </div>
        <div class="user">{{usr.name}}</div>
        <div align="center"><i class="fas fa-chevron-right next"></i></div>
      </div>
    </div>
    <div>
      <chat v-if="isPublic" :id="selectedRoomId" :to="selectedTo" :isPublic="isPublic" :chatList="publicChatHistory"
            :refetch="refetch"
      ></chat>
      <chat v-else :id="selectedRoomId" :to="selectedTo" :isPublic="isPublic" :chatList="privateChatHistory"
            :refetch="refetch"></chat>
    </div>
    <b-modal id="modalPrevent"
             ref="regModal"
             title="Register"
             @ok="handleOk"
             @shown="clearName" no-close-on-esc no-close-on-backdrop hide-header-close hide-footer-close
             cancel-disabled>
      <form @submit.stop.prevent="handleOk">
        <b-form-input type="text"
                      placeholder="Enter your name"
                      v-model="name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import Chat from './../components/Chat'

  export default {
    created() {
    },
    mounted() {
      if (!this.user) {
        this.showModal()
      } else {
        this.fetchUsers()
      }

    },
    data() {
      return {
        message: '',
        name: '',
        isTyping: false,
        newChats: [],
        selectedRoomId: 'public',
        selectedTo: '',
        isPublic: true,
        refetch: false
      }
    },
    components: {
      Chat
    },
    computed: {
      ...mapGetters({
        hasRegistered: 'getRegistrationStatus',
        users: 'getUsers',
        privateChatHistory: 'getPrivateChatHistory',
        publicChatHistory: 'getPublicChatHistory',
        user: 'getUser'
      })
    },
    sockets: {
      connect: function () {
        console.log('this.$socket connected')
      },
      user: function (data) {
        this.$store.commit('setRegistrationStatus', data.hasRegistered)
        this.$store.commit('setUser', data.user)
      },
      newprivatemessage: function (data) {
        this.$store.commit('setPrivateChatHistory', data)
      },
      newpublicmessage: function (data) {
        this.$store.commit('setPublicChatHistory', data)
      },
      userlist: function (data) {
        this.$store.commit('setUsers', data.users)
        this.selectPublic()
      },
      privatechatready: function (data) {
        this.selectPrivate(data)
      },
      errors: function (data) {
        this.$toast.error(data, {icon: 'error'})
      },
      login: function (data) {
        this.$router.push("/")
      }
    },
    methods: {
      fetchUsers() {
        this.$socket.emit('register', {name: this.user.name})
        this.$socket.emit('user-request')
      },
      subscribeToPrivateChat() {
        this.$socket.emit('join-room', {roomid: this.selectedRoomId});
      },
      selectRoom(user) {
        this.$socket.emit('create-private-room', {self: this.user, user: user})
      },
      selectPublic() {
        this.selectedRoomId = 'public'
        this.selectedTo = ''
        this.isPublic = true
        this.refetch = true
        this.refetch = false
      },
      selectPrivate(data) {
        this.chatList = []
        this.$socket.emit('private-chat-history', data.roomid)
        this.chatList = this.privateChatHistory
        this.selectedRoomId = data.roomid
        this.selectedTo = data.to
        this.isPublic = false
        this.refetch = true
        this.refetch = false
      },
      sendMessage() {
        this.$socket.emit('message', {})
      },
      sendName() {
        this.$socket.emit('register', {name: this.name})
        this.clearName()
        this.hideModal()
      },
      showModal() {
        this.$refs.regModal.show()
      },
      hideModal() {
        this.$refs.regModal.hide()
      },
      clearName() {
        this.name = ''
      },
      handleOk(evt) {
        evt.preventDefault()
        if (!this.name) {
          this.$toast.error('Please enter your name', {icon: 'error'})
        } else {
          this.sendName()
        }
      },
    }
  }
</script>

<style>

  .modal {
    background: rgba(0, 0, 0, 0.9);
  }

  .modal-dialog {
    margin-top: 22%;
  }

  .view-wrap {
  }

  .display-wrap-main {
    display: grid;
    grid-template-rows: min-content;
  }

  .chat-list-wrap {
    display: grid;
    grid-auto-rows: min-content;
    overflow: scroll;
    border: 2px solid #cecece;
  }

  .chat-list-wrap > div {
    background-color: #ffffff;
    padding: 1em;
    border-bottom: 2px solid #dbe1ec;
    cursor: pointer;
  }

  .user {
    -ms-word-break: break-all;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    font-weight: bolder;
    font-size: 1.5em;
  }

  .chat-elem-wrap {
    display: grid;
    grid-template-columns: 1fr 8fr 2fr;
    grid-column-gap: 1em;
    justify-content: center;
    align-items: center;
  }

  .chat-elem-wrap-new {
    display: inline-block;
    justify-content: center;
    align-items: center;

  }

  .chat-elem-wrap-new > div {

  }

  .next {
    font-size: 2.2em;
    color: #dbe1ec;
  }

  .req-prof-pic {
    display: inline-block;
    width: 2em;
    height: 2em;
  }

  .req-user {
    display: inline-block;
  }

  .req-bubble {
    background-color: #efefef;
    padding: 1em;
    border-radius: 2em;
    color: #000000;
    font-weight: bold;
    margin: 0.8em;
  }

  @media (min-width: 700px) {

    .display-wrap-main {
      display: grid;
      grid-template-columns: 4fr 10fr;
    }
  }
</style>


