//Contact.vue

<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <p> {{ msg }} </p>
  </div>
</template>

<script>

export default {
  name: 'Contact',
  data: function () {
    return {
      msg: 'This section shows our contact information'
    }
  }
}
</script>

<style scoped>
</style>
