<template>
  <div class="nav-wrapper">
    <div>
      <nuxt-link class="link" to="/">Home</nuxt-link>
    </div>
    <div align="right">
      <nuxt-link class="uname" to="/">Hello! {{user.name}}</nuxt-link>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    data() {
      return {
        name: '',
      }
    }
  }
</script>

<style scoped>
  .nav-wrapper {
    position: fixed;
    width: 100%;
    padding: 1.2em;
    margin-top: 0;
    color: white;
    display: grid;
    grid-template-columns: 5fr 5fr;
    background-color: royalblue;
    align-items: center;
    justify-content: center;
    align-self: center;

  }

  .link {
    pointer: cursor;
    color: white;
    padding: 0.5em;
    align-items: center;
    background-color: #4b75ff;
    border-radius: 1em;
    text-decoration: none;
  }

  .uname {
    font-weight: lighter;
    font-size: 1.1em;
    text-decoration: none;
    color: white;

    align-content: center;
  }
</style>
