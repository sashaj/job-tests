<template>
  <div class="home-page">
      <h1>my contacts</h1>
      <p>
        <router-link :to="{name: 'contactsPage'}">to contacts</router-link>
      </p>
  </div>
</template>

<script>
export default {
      name: "homePage",
}
</script>
