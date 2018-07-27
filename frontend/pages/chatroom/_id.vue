<template>
    <div class="display-wrap">
      <div class="wrapper">
        <div class="chat-messages">
          <div align="center" v-if="isTyping"><p class="saving"><span>.</span><span>.</span><span>.</span></p></div>

          <div class="receiver"><p>
            dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds</p>
          </div>
          <div class="sender" align="right"><p>
            sdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcx</p>
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
    export default {
      created() {
      },
      mounted() {
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

<style scoped>
  .wrapper {
    display: grid;
    grid-template-rows: 88vh 10vh;
    grid-row-gap: 1em;
  }

  .display-wrap {
    height: 100%;
    margin: 0;
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
</style>
