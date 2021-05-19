<template>
  <div class="card-root" @click.capture="modalOff">
    <div class="card-container" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <img src="../image/sample2.jpg" alt="포스터 이미지" width="300">
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
    // imgpath: String
  },
  methods: {
    mouseEnter: function (e) {
      const target = this.getContainer(e.target)
      if(target.classList.contains('modal')) return;
      this.$emit('mouse-enter', target);
    },
    mouseLeave: function (e) {
      const target = this.getContainer(e.target)
      if(target.classList.contains('modal')) return;
      this.$emit('mouse-leave')
    },
    modalOn: function (e) {
      const target = this.getContainer(e.target)
      this.$emit('modal-on', target);
    },
    getContainer: function (target) {
      while (!target.classList.contains('card-container')) target = target.parentNode
      return target;
    },
    modalOff: function (e) {
      if (e.target.classList.contains('modal')) {
        e.stopPropagation();
        this.$emit('modal-off');
      }
    },
  }
}
</script>

<style scoped>
  .card-root {
    width: 300px;
    height: 150px;
  }
  .card-container.pointer-card {
    /* transform: scale(1.5); */
    /* z-index: 2; */
  }
  .pointer-card .semi-detail {
    display: block;
  }
  .pointer-card {
    transform: scale(1.2);
  }
  .card-container {
    transition: .5s;
  }
  .card-container > img {
    display: block;
    width: 100%;
    height: auto;
    background-color: #ccc;
    /* transition: .5s; */
  }
  .semi-detail {
    display: none;
    width: 100%;
    height: 100px;
    /* margin-top: 3rem; */
    background-color: lightpink;
    /* transform: scale(calc(1/1.5)); */
  }
  .semi-detail *{
    transform: scale(calc(1/1.2));
  }
  .semi-detail > button {
    z-index: 100;
  }
  
  .card-root.modal {
    padding: 0;
    /* transform: scale(1); */
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    overflow-y: scroll;
  }

  .modal .semi-detail {
    height: 3000px;
    margin-bottom: 12px;
  }
  .modal .semi-detail * {
    transform: scale(1);
  }

  @keyframes modal-open {
    from {

    }
    to {

    }
  }

</style>