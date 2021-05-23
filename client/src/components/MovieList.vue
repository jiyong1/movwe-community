<template>
  <div class="card-list-container">
    <div class="card-list">
      <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie"/>
    </div>
    <button @click="moveLeft"><i class="fas fa-chevron-left"></i></button>
    <button @click="moveRight"><i class="fas fa-chevron-right"></i></button>
    <div class="circle-container" v-if="listLength" @click="circleClick">
      <div class="circle" v-for="idx in listLength" :key="idx" :data-page="idx" :class="{ long: idx == currentMove+1 }"></div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  props: {
    movies: Array,

  },
  data: function () {
    return {
      currentMove: 0,
      listCount: 0,
    }
  },
  computed: {
    myMoviesLength: function () {
      return this.movies.length
    },
    listLength: function () {
      let carou = this.movies.length / this.listCount
      this.movies.length % this.listCount? 1 : 0;
      return parseInt(carou)
    }
  },
  methods: {
    moveRight: function (e) {
      if (this.currentMove >= this.listLength-1) return;
      this.currentMove++;
      this.move(e.target);
    },
    moveLeft: function (e) {
      if (this.currentMove <= 0) return;
      this.currentMove--;
      this.move(e.target);
    },
    move: function (target) {
      const cardList = target.parentNode.firstChild;
      cardList.style.marginLeft = `-${this.currentMove*100}vw`;
    },
    getListCount: function () {
      if (window.innerWidth <= 800) {
        this.listCount = 2;
      } else if (window.innerWidth <= 1000) {
        this.listCount = 3;
      } else if (window.innerWidth <= 1200) {
        this.listCount = 4;
      } else {
        this.listCount = 5;
      }
    },
    resizeHandler: function () {
      this.currentMove = 0;
      this.getListCount();
    },
    circleClick: function (e) {
      if (e.target.matches('.circle')){
        const page = e.target.dataset.page;
        this.currentMove = page-1;
        this.move(e.target.parentNode)
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.resizeHandler)
    this.getListCount();
  },
  destroyed: function () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style scoped>
  .card-list-container {
    overflow: hidden;
    position: relative;
  }
  .card-list {
    display: flex;
    transition: .5s;
  }

  .card-list-container > button {
    position: absolute;
    top: 0;
    width: 4rem;
    height: 24vw;
    background-color: rgba(0, 0, 0, 0.4);
    border: none;
    color: white;
    font-size: 2rem;
    opacity: 0;
  }
  .card-list-container:hover > button {
    opacity: 1;
  }

  .card-list-container > button:nth-of-type(1) {
    left: 0;
  }
  .card-list-container > button:nth-of-type(2) {
    right: 0;
  }

  @media (max-width: 1200px) {
    .card-list-container > button {
      height: 31.5vw;
    }
 }

 @media (max-width: 1000px) {
    .card-list-container > button {
      height: calc((88vw/3)/2*3);
    }

 }

 @media (max-width: 800px) {
    .card-list-container > button {
      height: 69vw;
    }
   
 }

  .circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle {
    cursor: pointer;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: #666;
    margin: 1rem .5rem;
    transition: .5s;
  }

  .circle.long {
    width: 50px;
    background-color: #ddd;
  }
  /* .modal-open .home {
    overflow-y: scroll;
  } */
</style>
