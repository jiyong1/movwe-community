<template>
  <div class="background" @click="modalClicked">
    <div class="article">
      <div class="article-content" v-if="movie && reviewLoad">
        <div class="video-container">
          <iframe :src="videoSrc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
        <h4>리뷰 목록</h4>
        <div v-if="reviews.length">
            <div v-for="(review, idx) in reviews" :key="idx">{{ review.title }}</div>
        </div>
        <h4 v-else>아직 작성된 리뷰가 없습니다.</h4>
      </div>
      <div class="loading" v-else>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data: function() {
    return {
      movie: null,
      reviews: null,
      reviewLoad: false
    }
  },
  computed: {
      videoSrc: function () {
        return 'https://www.youtube.com/embed/' + this.movie.trailer + '?autoplay=1&mute=1'
      }
  },
  methods: {
    modalClicked: function (e) {
        if (e.target.matches('.background')){
            this.$store.dispatch('modalOff');
        }
    }
  },
  created: function () {
    for(let i = 0; i < this.$store.state.movieList.length; i++) {
        const movie = this.$store.state.movieList[i]
        if(movie.id == this.$store.state.modalMovieId) {
            this.movie = movie;
            break;
        }
    }
    this.$store.dispatch('getReviewList', this.movie.id)
    .then(res => {
        this.reviews = res;
        this.reviewLoad = true;
    })
    .catch(err => {
        if(err.message === '401') {
            alert('로그인 세션이 만료되었습니다.')
            this.$store.dispatch('logOut')
            this.$router.push({ name: 'Login' })
        } else {
            alert('알 수 없는 오류입니다.')
        }
    })
  },
  mounted: function () {
    const article = document.querySelector('.article')
    const { top, left, width, height } = this.$store.state.scaleCard.getBoundingClientRect()
    article.style.position = 'absolute';
    article.style.top = `${top}px`
    article.style.left = `${left}px`
    article.style.width = `${width}px`
    article.style.height = `${height}px`
    setTimeout(() => {
        article.style.transition = '.5s';
        let bwidth;
        let bleft;
        if (window.innerWidth - 6*16 > 1200) {
            bwidth = 1200;
            bleft = (window.innerWidth - 1200) / 2
        } else {
            bwidth = window.innerWidth - 6*16
            bleft = '3rem';
        }
        article.style.top = `1rem`;
        article.style.left = `${bleft}px`;
        article.style.width = `${bwidth}px`;
        article.style.height = '100%';
        setTimeout(() => {
            article.style = '';
        }, 500);
    }, 0)
  }
}
</script>

<style scoped>
    .background {
        position: fixed;
        overflow-y: scroll;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        padding: 1rem 3rem;
    }
    .article {
        width: 100%;
        max-width: 1200px;
        background-color: black;
        border-radius: 10px;
        margin: 0 auto;
        color: white;
    }
    .loading {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading > .circle {
        width: 20px;
        height: 20px;
        background: white;
        margin: .8rem;
        border-radius: 50%;
        animation: circleMove infinite alternate .6s;
    }
    .loading > .circle:nth-child(2) {
        animation-delay: .2s;
    }
    .loading > .circle:nth-child(3) {
        animation-delay: .4s;
    }
    .article-content {
        width: 100%;
        padding: .5rem;
    }
    .video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
    }
    .video-container > iframe {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .article-content > h3{
        font-size: 2rem;
        text-align: center;
        margin: 1em 0;
        font-weight: bold;
    }
    .article-content > p{
        font-size: 1.2rem;
    }
    .article-content > h4{
        font-size: 1.6rem;
        text-align: center;
        margin: 1em 0;
        font-weight: bold;
    }


    @keyframes circleMove {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(0, -80%, 0);
        }
    }
</style>