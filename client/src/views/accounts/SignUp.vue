<template>
  <div>
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'

export default {
  name: 'SignUp',
  components: {
    SignUpForm
  },
  methods: {
    signup: function () {
      this.$store.dispatch('signup')
    }
  }
}
</script>


<style scoped>
</style>