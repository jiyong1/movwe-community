<template>
  <div class="card-root">
    <div class="card-container" >
      <img :src="movie.poster_path" alt="포스터 이미지">

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
    // mouseEnter: function (e) {
    //   const target = this.getContainer(e.target)
    //   if(target.classList.contains('modal')) return;
    //   this.$emit('mouse-enter', target);
    // },
    // mouseLeave: function (e) {
    //   const target = this.getContainer(e.target)
    //   if(target.classList.contains('modal')) return;
    //   this.$emit('mouse-leave')
    // },
    // modalOn: function (e) {
    //   const target = this.getContainer(e.target)
    //   this.$emit('modal-on', target);
    // },
    // getContainer: function (target) {
    //   while (!target.classList.contains('card-container')) target = target.parentNode
    //   return target;
    // },
    // modalOff: function (e) {
    //   if (e.target.classList.contains('modal')) {
    //     e.stopPropagation();
    //     this.$emit('modal-off');
    //   }
    // }
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