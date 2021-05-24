<template>
  <div class="background" @click="modalClicked">
      <div class="article">
          
      </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data: function() {
    return {
      movie: {}
    }
  },
  methods: {
    modalClicked: function (e) {
        console.log(e.target);
    }
  },
  created: function () {
    for(let i = 0; i < this.$store.state.movieList.length; i++) {
        const movie = this.$store.state.movieList
        if(movie.id === this.$store.state.modalCard) {
            this.movie = movie;
            break;
        }
    }
  }
}
</script>

<style>
    .background {
        position: absolute;
        overflow-y: scroll;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        padding: 1rem 3rem;
    }
    .article {
        max-width: 1200px;
        height: 5000px;
        background-color: black;
        border-radius: 10px;
        margin: 0 auto;
    }
</style>