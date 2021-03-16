<template>
<div>
	<button @click="getAuth" :disabled="!isInit">get auth code</button>
  <button @click="signIn" v-if="!isSignIn" :disabled="!isInit">sign in</button>
  <button @click="signOut" v-if="isSignIn" :disabled="!isInit">sign out</button>
	{{ firstName }} {{ lastName }} {{ email }} {{ id_token }} {{authCode}}
</div>
</template>

<script>
export default {
  name: 'App',
	data () {
    return {
      isInit: false,
      isSignIn: false,
			firstName: '',
			lastName: '',
			email: '',
			id_token: '',
			authCode: ''
    }
  },
  methods: {
    async getAuth(){
			this.authCode = await this.$gAuth.getAuthCode() 
      //this.$gAuth.getAuthCode()
      //.then(authCode => {
      //  console.log(authCode)
      //  return this.$http.post('http://your-backend-server.com/auth/google', { code: authCode, redirect_uri: 'postmessage' })
      //})
      //.then(response => {
      //  console.log(response)
      //})
      //.catch(error => {
      //  console.error(error)
      //})
    },
    signIn(){
      this.$gAuth.signIn()
      .then(user => {
        console.log('user', user)
				this.id_token = user.getAuthResponse().id_token
				this.loadUserInfo(user.getBasicProfile())
        this.isSignIn = this.$gAuth.isAuthorized
      })
      .catch(error  => {
        console.error(error)
      })
    },
    signOut(){
      this.$gAuth.signOut()
      .then(() => {
        // On success do something
        this.isSignIn = this.$gAuth.isAuthorized
      })
      .catch(error  => {
        console.error(error)
      })
    },
		loadUserInfo(profile) {
			this.email = profile.getEmail()
			this.firstName = profile.getGivenName()
			this.lastName = profile.getFamilyName()
		}
  },
	created() {
    const checkGauthLoad = setInterval(() => {
      this.isInit = this.$gAuth.isInit
      this.isSignIn = this.$gAuth.isAuthorized
      if(this.isInit) {
				clearInterval(checkGauthLoad)
			}
    }, 1000);
	},
	watch: {
		isInit: {
			async handler(val) {
				if (val && this.isSignIn) {
					this.loadUserInfo(this.$gAuth.GoogleAuth.currentUser.get().getBasicProfile())
				}
			},
			immediate: true
		}
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
