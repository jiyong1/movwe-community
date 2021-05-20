<template>
  <div class="login-div">
    <div class="back-img"></div>
    <form @submit.prevent="signup">
      <div class="header">회원가입</div>
      <input type="text" name="username" placeholder="ID">
      <input type="password" name="password" placeholder="password">
      <input type="password" name="password" placeholder="password confirmation">
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',
}
</script>

<style scoped>
.login-div {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-img {
  background-image: url('../assets/ticket.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.3;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
}
form {
  width: 300px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

form > .header {
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

form > input {
  height: 2.5rem;
  font-size: 1rem;
  border: 0px;
  padding: .2rem .5rem
}
form > input:focus {
  outline: none;
}

form > input:nth-of-type(1) {
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  border-bottom: .3px solid #555;
}

form > input:nth-of-type(3) {
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  border-top: .3px solid #555;
  margin-bottom: 1rem;
}

form > button {
  border: none;
  background-color: #48445C;
  color: white;
  font-size: 1rem;
  padding: .5rem;
  border-radius: 100px;
  transition: .5s;
}

form > button:hover {
  background-color: #151129;
}
</style>