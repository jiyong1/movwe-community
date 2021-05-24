<template>
  <div class="card-root">
    <div class="card-container" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <img :src="movie.poster_path" alt="포스터 이미지">
      <div class="detail">
        <div class="video-container">
          <iframe :data-src="videoSrc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="detail-description">
          <h3>{{ movie.title }}</h3>
          <div class="button-container">
            <button><i class="fas fa-plus"></i></button>
            <button><i class="fas fa-info"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  data: function () {
    return {
      videoSrc: 'https://www.youtube.com/embed/' + this.movie.trailer + '?autoplay=1&mute=1'
    }
  },
  computed: {

  },
  methods: {
    mouseEnter: function (e) {
      this.$store.dispatch('mouseEnter', e.target);
    },
    mouseLeave: function () {
      this.$store.dispatch('mouseLeave')
    }
  }
}
</script>

<style scoped>
  img {
    /* 5개 */
    width: 16vw;
    height: 24vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    object-fit: cover;
 }
 .card-root {
   margin: 0 2vw;
   position: relative;
 }

 .detail {
   position: absolute;
   display: none;
   top: 0;
   left: 0;
   width: 100%;
   background: black;
   border-radius: 12px;
   transition: .5s;
   z-index: 1000;
 }
 .detail h3 {
   font-size: 1.3rem;
 }

  .detail > .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
  }

  .video-container > iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }

 .scaleUp > .detail {
   display: flex;
   flex-direction: column;
 }
 
 @media (max-width: 1200px) {
    img {
      /* 4개 */
      width: 21vw;
      height: 31.5vw;
    }
 }

 @media (max-width: 1000px) {
   img {
     /* 3개 */
     width: calc(88vw/3);
     height: calc((88vw/3)/2*3);
   }

 }

 @media (max-width: 800px) {
   img {
     /* 2 */
     width: 46vw;
     height: 69vw;
   }
   
 }



</style>