<template>
 <div class="display-wrap">
   <div class="wrapper">
     <div class="chat-messages">
       <div class="receiver"><p>dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds</p></div>
       <div class="sender" align="right"><p>sdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcxsdsdsdxcx</p></div>

     </div>
     <div class="col-wrapper">
       <div>
         <input class="form-control" v-model="message" type="text"/>
       </div>
       <div >
         <b-button class="btn-block" variant="primary" @click="sendMessage">Send</b-button>
       </div>
     </div>
   </div>
 </div>
</template>

<script>

export default {
  created(){},
  mounted(){},
  data(){
    return {
      chatList: [],
      printer: '',
      message:''
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
    sendMessage(){

    }
  }
}
</script>

<style>

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


  .chat-messages  > .sender {
    align-items: right;
  }

  .chat-messages > .receiver {
    align-items: left;

  }


  .receiver p {
    text-align: left;
    background-color: rgba(23, 214, 255, 0.14);
    padding: 1em;
    border-radius:  1em 0 1em 0;
    justify-items: left;



  }

  p{
    min-width: 100px;
    max-width:90%;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-wrap: break-word;

  }

  .sender p {
    text-align: right;
    background-color: #e8ece4;
    border-radius: 0 1em 0 1em;
    padding: 1em;
    justify-items: right;

  }
</style>

