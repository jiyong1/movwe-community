<template>
  <div>
    <MovieList :movies="popularMovies" />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'Home',
  components: {
    MovieList,
  },
  data: function () {
    return {
      listCount: 0,
    }
  },
  computed: {
    popularMovies: function () {
      return this.$store.getters.popularMovieList
    },
  },
  methods: {
    resizeHandler: function () {
      document.querySelectorAll('.card-list').forEach((item) => {
        item.style.marginLeft = `-${0}vw`;
      })
    },
  },
  created: function () {
    this.$store.dispatch('getMovieList')
    .catch(err => {
      if(err.message === '401') {
        alert('로그인 세션이 만료되었습니다.')
        this.$store.dispatch('logOut')
        this.$router.push({ name: 'Login' })
      }
    })
  },
  mounted: function () {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed: function () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style scoped>

</style>
