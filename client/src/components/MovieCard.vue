<template>
  <div class="card-root" @click.capture="modalOff">
    <div class="card-container" >
      <div class="image-container">
        <img :src="movie.poster_path" alt="포스터 이미지">
      </div>
      <div class="semi-detail">
        <button @click="modalOn">상세 정보</button>
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
  .card-root {
    width: 100%;
  }
  .card-container {
    width: 100%;
  }

  .card-container > .image-container {
    width: 100%;
    height: 250px;
  }

  .image-container > img {
    object-fit: cover;
  }

</style>