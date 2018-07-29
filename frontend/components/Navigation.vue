<template>
<div class="nav-wrapper">
  <nuxt-link class="link" to="/">Home</nuxt-link>
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
        name: '',
      }
    }
  }
</script>

<style scoped>
.nav-wrapper {
  position: fixed;
  width: 100%;
  padding: 1em;
  margin-top: 0;
  color: white;
  background-color: royalblue;
}

  .link {
    pointer: cursor;
    color: white;
    padding: 0.5em;
    background-color: #4b75ff;
    margin-right: 3px;
    border-radius: 1em;
    text-decoration: none;
  }
</style>
