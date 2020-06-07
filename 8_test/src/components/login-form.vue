<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "loginform",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;

      this.AUTH_REQUEST({ username, password })
        .then(() => {
          this.$router.push("/")        
        })
        .catch(err => console.log(err));
    },
    ...mapActions(["AUTH_REQUEST"])
  },
  computed: {
    ...mapGetters(["USER_TOKEN"])
  }
};
</script>

<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
