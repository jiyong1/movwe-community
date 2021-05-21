<template>
  <div>
    <div class="card-list-container" data-idx="0" :data-length="movieList.length">
      <div class="card-list">
        <MovieCard v-for="(movie, idx) in movieList" :key="idx" :movie="movie"/>
      </div>
      <button @click="moveLeft"><i class="fas fa-chevron-left"></i></button>
      <button @click="moveRight"><i class="fas fa-chevron-right"></i></button>
      <div class="circle-container">
        <div class="circle" v-for="idx in listLength[0]" :key="idx"></div>
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
  data: function () {
    return {
      cardListIndex: 0,
      currentMove: [0],
      listLength: [0],
    }
  },
  computed: {
    movieList: function () {
      return this.$store.getters.popularMovieList
    },
  },
  methods: {
    moveRight: function (e) {
      const cardList = e.target.parentNode.firstChild;
      const idx = e.target.parentNode.dataset.idx;
      if (this.currentMove[idx] >= this.listLength[idx]-1) return;
      this.currentMove[idx]++;
      cardList.style.marginLeft = `-${this.currentMove[idx]*100}vw`;
    },
    moveLeft: function (e) {
      const cardList = e.target.parentNode.firstChild;
      const idx = e.target.parentNode.dataset.idx;
      if (this.currentMove[idx] < 1) return;
      this.currentMove[idx]--;
      cardList.style.marginLeft = `-${this.currentMove[idx]*100}vw`;
    },
    move: function (e) {
      const cardList = e.target.parentNode.firstChild;
      const idx = e.target.parentNode.dataset.idx;
      cardList.style.marginLeft = `-${this.currentMove[idx]*100}vw`;
    },
    resizeHandler: function () {
      console.log('get!')
      this.getListLength()
      document.querySelectorAll('.card-list').forEach((item, idx) => {
        this.currentMove[idx] = 0;
        item.style.marginLeft = `-${0}vw`;
      })
    },
    getListLength: function () {
      let count;
      if (window.innerWidth <= 800) {
        count = 2;
      } else if (window.innerWidth <= 1000) {
        count = 3;
      } else if (window.innerWidth <= 1200) {
        count = 4;
      } else {
        count = 5;
      }
      document.querySelectorAll('.card-list-container').forEach((item, idx) => {
        let carou = item.dataset.length / count
        carou += item.dataset.length % count? 1 : 0;
        this.listLength[idx] = carou
      })
    }
  },
  created: function () {
    this.$store.dispatch('getMovieList')
    .then(() => {
      this.getListLength()
    })
    .catch(err => {
      if(err.message === '401') {
        alert('로그인 세션이 만료되었습니다.')
        this.$store.dispatch('logOut')
        this.$router.push({ name: 'Login' })
      }
    })
  },
  mounted: function () {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed: function () {
    window.removeEventListener('resize', this.getListLength)
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
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #666;
    margin: 1rem;
  }
  /* .modal-open .home {
    overflow-y: scroll;
  } */
</style>
