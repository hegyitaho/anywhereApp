<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import * as Realm from "realm-web";
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    const app = new Realm.App("anywhere-backend-qcsqt");
    const redirectUri = "http://localhost/login";
    const credentials = Realm.Credentials.google(redirectUri)
    app.logIn(credentials).then(user => {
      // The logIn() promise will not resolve until you call `handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      console.log(`Logged in with id: ${user.id}`);
      Realm.handleAuthRedirect();
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
