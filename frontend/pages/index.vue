<template>
  <div class="view-wrap">
    <div class="chat-list-wrap">
      <div class="chat-elem-wrap" v-for="(user, index) of users" :key="index" @click="selectRoom">
        <div style="display: inline-block">
          <img src="/profile.png" class="img img-fluid prof-pic">
        </div>
        <div class="user">{{user.name}}</div>
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
      }
    },
    components: {
    },
    computed: {
      ...mapGetters({
        hasRegistered: 'getRegistrationStatus',
        users: 'getUsers'
      })
    },
    sockets: {
      connect: function () {
        console.log('this.$socket connected')
        this.printer = 'socket connected'
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
      }
    },
    methods: {
      selectRoom() {
        console.log('select room')
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


