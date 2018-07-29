<template>
  <div>
    <div class="chat-list-wrap" style="margin-top: 3.5em; position: absolute; z-index: -1">
      <div class="chat-elem-wrap" v-for="(item, index) of newChats" :key="index" @click="goChat(item)">
        <div style="display: inline-block">
          <img src="/profile.png" class="img img-fluid prof-pic">
        </div>
        <div class="user">{{item.user.name}}</div>
        <div align="center"><i class="fas fa-chevron-right next"></i></div>
      </div>

      <div class="chat-elem-wrap" @click="selectPublic">
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

    <b-modal id="modalPrevent"
             ref="regModal"
             title="Register"
             @ok="handleOk"
             @shown="clearName"  no-close-on-esc  no-close-on-backdrop hide-header-close  hide-footer-close cancel-disabled >
      <form @submit.stop.prevent="handleOk">
        <b-form-input type="text"
                      placeholder="Enter your name"
                      v-model="name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>

  import { mapGetters, mapMutations } from 'vuex'
  export default {
    created() {
    },
    mounted() {
      if(!this.hasRegistered) {
      this.showModal()
      }
    },
    data() {
      return {
        chatList: [],
        printer: '',
        message: '',
        name: '',
        isTyping: false,
        newChats: []
      }
    },
    components: {
    },
    computed: {
      ...mapGetters({
        hasRegistered: 'getRegistrationStatus',
        users: 'getUsers',
        user: 'getUser'
      })
    },
    sockets: {
      connect: function () {
        console.log('this.$socket connected')
      },
      user: function (data) {
        console.log(data)
        this.$store.commit('setRegistrationStatus', data.hasRegistered)
        this.$store.commit('setUser', data.user)
      },
      userlist: function (data) {
        console.log(data)
        console.log(data.users)
        this.$store.commit('setUsers', data.users)
      },
      joinroom: function (data) {
        this.$socket.emit('subscribe', { roomid: data.roomid, user: data.user, me: this.user})
        this.$router.push(`/chatroom/${data.roomid}#${data.user.id}`)
      },
      errors: function (data) {
        this.$toast.error(data, { icon: 'error' })
      },
      request: function (data) {
        console.log(data.me)
        this.newChats.push({url:`/chatroom/${data.roomid}#${data.user.id}#1`, user: data.me })
        this.$toast.success('New Chat Request', { icon: 'done'})
      },
    },
    methods: {
      goChat(item){
        console.log(item)
        this.$router.push(item.url)

      },
      selectRoom(user) {
        this.$socket.emit('create-private-room', {self: this.user, user: user, })
      },
      selectPublic(){
        this.$router.push(`/chatroom/public`)
      },
      sendMessage() {
        this.$socket.emit('message', {})
      },
      sendName() {
        this.$socket.emit('register', { name: this.name })
        this.clearName()
        this.hideModal()
      },
      showModal() {
        this.$refs.regModal.show()
      },
      hideModal() {
        this.$refs.regModal.hide()
      },
      clearName () {
        this.name = ''
      },
      handleOk (evt) {
        evt.preventDefault()
        if (!this.name) {
          this.$toast.error('Please enter your name', { icon: 'error'})
        } else {
          this.sendName()
        }
      },
    }
  }
</script>

<style>

  .modal {
    background: rgba(0,0,0,0.9);
  }

  .modal-dialog {
    margin-top: 22%;
  }
.view-wrap {
}

  .chat-list-wrap {
    display: grid;
    grid-auto-rows: min-content;
    overflow: scroll;
  }

  .chat-list-wrap > div{
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
    grid-template-columns: 1fr 8fr 2fr ;
    grid-column-gap: 1em;
    justify-content: center;
    align-items: center;
  }

  .next {
    font-size: 2.2em;
    color: #dbe1ec;
  }

  .prof-pic {
  }

</style>


