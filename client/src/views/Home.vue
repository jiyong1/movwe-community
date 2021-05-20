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
      sample1: '../image/sample.png',
      sample2: '../image/sample2.jpg',
    }
  },
  methods: {
    mouseEnter: function (target) {
      if(this.timeoutFunc) {
        clearTimeout(this.timeoutFunc);
      }
      if (this.currentPointerCard) {
        if(this.currentPointerCard.parentNode.classList.contains('modal')) return;
        this.currentPointerCard.classList.remove('pointer-card');
      }
      this.currentPointerCard = target;
      this.timeoutFunc = setTimeout(() => {
        target.classList.add('pointer-card');
        // const { top, left, width, height } = target.getBoundingClientRect();
        // target.children[0].width = `${450}`;
      }, 700)
    },
    mouseLeave: function () {
      if(!this.currentPointerCard) return;
      else{
        // console.log('leave')
        if(this.currentPointerCard.parentNode.classList.contains('modal')) return;
        if(this.timeoutFunc) clearTimeout(this.timeoutFunc);
        this.currentPointerCard.classList.remove('pointer-card');
        this.currentPointerCard = null;
        
      }
    },
    modalOn: function (target) {
      this.currentModal = target;
      const { top, left, width, height } = target.getBoundingClientRect();
      console.log(top, left, width, height, top+(width-(width/1.5))/2);
      target.style.transition = '0s';
      target.style.position = 'absolute';
      target.style.transform = 'scale(1)';
      target.style.top = `${top}px`;
      target.style.left = `${left}px`;
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      target.parentNode.classList.add('modal')
      document.body.classList.add('modal-open');
      setTimeout(() => {
        const innerWidth = window.innerWidth;
        target.style.transition = '.5s';
        // target.children[0].style.transform = 'scale(1)';
        target.style.top = '1.5rem';
        if (innerWidth >= 820) {
          target.style.left = `${innerWidth/2-400}px`;
          target.style.width = '800px';
        } else {
          target.style.left = '12px';
          target.style.width = `${innerWidth-24}px`;
        }

        
      }, 100);
    },
    modalOff: function () {
      console.log('off!')
      this.currentModal.parentNode.scrollTo(0, 0);
      this.currentModal.parentNode.classList.remove('modal');
      document.body.classList.remove('modal-open')
      this.currentModal.style = "";
      this.currentModal.classList.remove('pointer-card')
      // console.log(this.currentModal.children[0]);
      this.currentModal.children[0].style.transform = '';
      this.currentModal = null;
      this.currentPointerCard = null;
    },
  },
}
</script>

<style>
  .home {
    display: flex;
    /* flex-direction: column; */

    /* height: 2000px; */
  }
  /* .modal-open .home {
    overflow-y: scroll;
  } */
</style>
