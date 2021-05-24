<template>
  <div id="app" :class="{ modal: modalOpened}">
    <div id="nav" :class="{unlogined : !login}">
      <h1>movwe</h1>
      <div v-if="login">
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <div @click="logOut">로그아웃</div>
      </div>
      <div v-else>
        <div class="sign-btn" @click="goSignUp" v-if="this.$router.currentRoute.name === 'Login'">
          회원가입
        </div>
        <div v-else class="sign-btn" @click="goLogin">
          로그인
        </div>
      </div>
    </div>
    <router-view style="padding-top: 100px;"/>
    <footer v-if="login">
      © 2021, movwe
    </footer>
  </div>
  
</template>

<script>

export default {
  computed: {
    login: function () {
      return this.$store.state.isLogin;
    },
    modalOpened: function () {
      if (this.$store.state.modalMovieId) {
        document.body.classList.add('modal-open')
        return true;
      } else {
        document.body.classList.remove('modal-open')
        return false;
      }
    }
  },
  created: function () {
    this.$store.dispatch('getToken');
    if (!this.$store.state.isLogin) {
      if (this.$router.currentRoute.name !== 'Login'){
        this.$router.push({name: 'Login'})
      }
    } else {
      if (this.$router.currentRoute.name !== 'Home'){
        this.$router.push({name: 'Home'})
      }
    }
  },
  methods: {
    goSignUp: function () {
      this.$router.push({ name: 'SignUp' })
    },
    goLogin: function () {
      this.$router.push({ name: 'Login' })
    },
    logOut: function () {
      this.$store.dispatch('logOut')
      this.$router.push({ name: 'Login' })
    }
  }
}

</script>


<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: #222;
  color: #e0dfdf;
  font-family: 'Noto Sans KR', sans-serif;
}
body.modal-open {
  overflow: hidden;
  position: relative;
}
body.modal-open > #app {

}
#app {
  /* text-align: center; */
  /* position: relative; */
}

#nav {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  background-color: #222;
}

#nav.unlogined {
  background-color: rgba(0, 0, 0, 0);
}

#nav > h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #BD9ACC
}

.sign-btn {
  padding: .7em;
  background: white;
  border-radius: 2rem;
  color: black;
  cursor: pointer;
  transition: .5s;
  /* z-index: 10; */
}

.sign-btn:hover {
  color: white;
  background-color: black;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {

}

footer {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 0;
}
</style>
