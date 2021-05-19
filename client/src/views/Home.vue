<template>
  <div class="home">
    <MovieCard @mouse-enter="mouseEnter" @mouse-leave="mouseLeave" @modal-on="modalOn" @modal-off="modalOff"/>
    <MovieCard @mouse-enter="mouseEnter" @mouse-leave="mouseLeave" @modal-on="modalOn" @modal-off="modalOff"/>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  data: function () {
    return {
      currentPointerCard: null,
      timeoutFunc: null,
      currentModal: null,
    }
  },
  methods: {
    mouseEnter: function (target) {
      if(this.timeoutFunc) {
        clearTimeout(this.timeoutFunc);
      }
      if (this.currentPointerCard) {
        this.currentPointerCard.classList.remove('pointer-card');
      }
      this.timeoutFunc = setTimeout(() => {
        this.currentPointerCard = target;
        target.classList.add('pointer-card');
      }, 700)
    },
    mouseLeave: function () {
      if(this.timeoutFunc) clearTimeout(this.timeoutFunc);
      if(this.currentPointerCard) {
        this.currentPointerCard.classList.remove('pointer-card');
        this.currentPointerCard = null;
      }
    },
    modalOn: function (target) {
      this.currentModal = target;
      target.classList.add('modal');
      document.body.classList.add('modal-open')
    },
    modalOff: function () {
      console.log('off!')
      this.currentModal.classList.remove('modal');
      this.currentModal = null;
      document.body.classList.remove('modal-open')
    },
    // otherClick: function (e) {
    //   if (!this.currentModal) return;
    //   let target = e.target;
    //   while (!target.nodeName === 'BODY') {
    //     if(target == this.currentModal){
    //       console.log('hi');
    //       return;
    //     }
    //     target = target.parentNode;
    //   }
    //   this.modalOff();
    // },
  },
  // created: function () {
  //   document.addEventListener('click', this.otherClick, true);
  // },
  // destroyed: function () {
  //   document.removeEventListener('click', this.otherClick, true);
  // }
}
</script>

<style scoped>
  .home {
    /* height: 4000px; */
  }
</style>
