<template>
  <div class="card-root" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @click.capture="modalOff">
    <div class="card-container" >
      <img src="#" alt="">
      <div class="semi-detail">
        <button @click="modalOn">상세 정보</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
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
      while (!target.classList.contains('card-root')) target = target.parentNode
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
    transition: .5s;
  }
  .card-root.pointer-card {
    transform: scale(1.5);
  }
  .pointer-card .semi-detail {
    display: block;
  }
  .card-container {
    
  }
  .card-container > img {
    display: block;
    width: 100%;
    height: 100px;
    background-color: #ccc;
  }
  .semi-detail {
    display: none;
    width: 100%;
    height: 100px;
    transform: scale(calc(1/1.5));
  }
  
  .card-root.modal {
    padding: 0;
    transform: scale(1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    overflow: scroll;
  }
  .card-root.modal > .card-container {
    position: static;
    display: block;
    margin: 3rem;
    width: 50vw;
    height: 3000px;
    background-color: lightgoldenrodyellow;
    /* overflow-y: scroll; */
  }

</style>