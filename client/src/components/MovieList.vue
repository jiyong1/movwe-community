<template>
  <div class="movie-list">
    <h2 v-text="headerText"></h2>
    <div class="card-list-container">
      <div class="card-list">
        <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie"/>
      </div>
      <button @click.capture="moveLeft" v-show="currentMove > 0"><i class="fas fa-chevron-left"></i></button>
      <button @click.capture="moveRight" v-show="currentMove < listLength-1"><i class="fas fa-chevron-right"></i></button>
      <div class="circle-container" v-if="listLength && myMoviesLength > listCount" @click="circleClick">
        <div class="circle" v-for="idx in listLength" :key="idx" :data-page="idx" :class="{ long: idx == currentMove+1 }"></div>
      </div>
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
    genre: String,
  },
  data: function () {
    return {
      currentMove: 0,
      listCount: 0,
      headerText: this.genre ? this.genre + ' 영화' : 'TOP 20 영화'
    }
  },
  computed: {
    myMoviesLength: function () {
      return this.movies.length
    },
    listLength: function () {
      let carou = this.movies.length / this.listCount
      carou += this.movies.length % this.listCount? 1 : 0;
      return parseInt(carou)
    }
  },
  methods: {
    moveRight: function (e) {
      e.stopPropagation();
      if (this.currentMove >= this.listLength-1) return;
      this.currentMove++;
      this.move(e.target);
    },
    moveLeft: function (e) {
      e.stopPropagation();
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
  .movie-list {
    margin: 4rem 0;
  }
  h2 {
    font-weight: bold;
    font-size: 1.7rem;
    margin: 2vw;
  }
  .card-list-container {
    /* overflow: hidden; */
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
    padding: 0;
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
  button > i {
    pointer-events: none;
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
</style>
