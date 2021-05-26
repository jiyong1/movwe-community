<template>
  <div id="app" :class="{ modal: modalOpened}">
    <nav id="nav" :class="{unlogined : !login }">
      <img src="@/assets/logo.png" alt="" @click="goHome">
      <div v-if="login" class="nav-container">
        <div class="nav-right">
          <div @click="logOut">로그아웃</div>
        </div>
      </div>
      <div v-else>
        <div class="nav-right">
          <div class="sign-btn" @click="goSignUp" v-if="this.$router.currentRoute.name === 'Login'">
            회원가입
          </div>
          <div v-else class="sign-btn" @click="goLogin">
            로그인
          </div>
        </div>
      </div>
    </nav>
    <router-view style="padding: 100px 0;"/>
    <footer v-if="login">
      © 2021, movwe
    </footer>
  </div>
  
</template>

<script>

export default {
  image: {
    logo: './src/assets/logo.png'
  },
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
    }
  },
  mounted: function () {
    this.setLayout();

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
    },
    goHome: function () {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    },
    setLayout: function () {
      const size = window.innerWidth;
      console.log(size);
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
  position: relative;
  min-height: 100vh;
}
body.modal-open {
  overflow: hidden;
  
}

#app {
  /* text-align: center; */
}

#app a {
  text-decoration: none;
}

#nav {
  width: 100%;
  height: 100px;
  padding: 1rem;
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: fixed;
  z-index: 10;
  background-color: #222;
}
#nav img {
  height: 100%;
  cursor: pointer;
}

#nav.unlogined {
  background-color: rgba(0, 0, 0, 0);
}

#nav > h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #BD9ACC
}
#nav > .nav-container {
  width: auto;
  display: flex;
  align-items: center;
}
.nav-right {
  position: absolute;
  right: 10px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
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

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading > .circle {
  width: 20px;
  height: 20px;
  background: white;
  margin: .8rem;
  border-radius: 50%;
  animation: circleMove infinite alternate .6s;
}
.loading > .circle:nth-child(2) {
  animation-delay: .2s;
}
.loading > .circle:nth-child(3) {
  animation-delay: .4s;
}
@keyframes circleMove {
  from {
      transform: translate3d(0, 0, 0);
  }
  to {
      transform: translate3d(0, -80%, 0);
  }
}
.btn {
  border: none;
  background-color: white;
  color: #222;
  font-size: 1rem;
  padding: .3rem;
  border-radius: 100px;
  transition: .5s;
  font-weight: 700;
}
.btn:hover {
  background-color: black;
  color: white;
}
button > i {
  pointer-events: none;
}
textarea {
  resize: none;
}

footer {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 0;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
