<template>
    <div>
      <LoginForm />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  methods: {
    login: function (e) {

      console.log(this.$store.dispatch('login', e.target));
    }
  }
}
</script>

<style scoped> 

</style>