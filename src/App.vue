<template>
<div>
  <button @click="signIn" v-if="!isSignIn" :disabled="!isInit">sign in</button>
  <button @click="signOut" v-if="isSignIn" :disabled="!isInit">sign out</button>
  <button @click="helloWorld" v-if="isSignIn" :disabled="!isInit">Hello world</button>
  <button @click="addFakeUsers" v-if="isSignIn" :disabled="!isInit">addFakeUsers</button>
	<div>
		firstName: {{ firstName }}
	</div>
	<div>
		lastName: {{ lastName }}
	</div>
	<div>
		email: {{ email }}
	</div>
	<div>
		id_token: {{ id_token }}
	</div>
<br> authCode {{access_token}}
</div>
</template>

<script>
const baseURL = 'http://localhost:3000'
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
			access_token: ''
    }
  },
  methods: {
		async helloWorld() {
			window.fetch(baseURL, { headers: { authorization: this.id_token }, credentials: 'include'})
		},
		async addFakeUsers() {
			window.fetch(baseURL + '/add-fake-users', { headers: { authorization: this.id_token }, credentials: 'include'})
		},
    async getAuth(){
			this.access_token = await this.$gAuth.getAuthCode() 
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
				this.loadAuth(user.getAuthResponse(true))
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
		},
		loadAuth(authResponse) {
		console.log(authResponse)
			this.id_token = authResponse.id_token
			this.access_token = authResponse.access_token
		}
  },
	created() {
    const checkGauthLoad = setInterval(() => {
      this.isInit = this.$gAuth.isInit
      this.isSignIn = this.$gAuth.isAuthorized
      if(this.isInit) {
				clearInterval(checkGauthLoad)
			}
    }, 500);
	},
	watch: {
		isInit: {
			async handler(val) {
				if (val && this.isSignIn) {
					this.loadUserInfo(this.$gAuth.GoogleAuth.currentUser.get().getBasicProfile())
					this.loadAuth(this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse(true))
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
