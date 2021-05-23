<template>
  <div class="card-root">
    <div class="card-container">
      <img :src="movie.poster_path" alt="포스터 이미지">
      <!-- <div class="detail">
        <img :src="movie.poster_path" alt="포스터 이미지">
        <h3>{{ movie.title }}</h3>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  computed: {

  },
  methods: {
    mouseEnter: function (e) {
      console.log(e.target.childNodes[1])
    },
    mouseLeave: function (e) {
      e.target.style = ""
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
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   opacity: 0;
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