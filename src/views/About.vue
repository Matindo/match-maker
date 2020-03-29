// About.vue

<template>
  <div clasa="about">
    <h1>About Us</h1>
    <p> {{ msg }} </p>
  </div>
</template>

<script>

export default {
  name: 'About',
  data: function () {
    return {
      msg: 'This is the page that decribes what we do'
    }
  }
}
</script>

<style scoped>
</style>
