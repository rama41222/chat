<template>
  <div>

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


  export default {
    created() {
    },
    mounted() {
      this.showModal()
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
    sockets: {
      connect: function () {
        console.log('this.$socket connected')
        this.printer = 'socket connected'
      }
    },
    methods: {
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

</style>

