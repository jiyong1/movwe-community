<template>
  <div>
    <div v-if="movies_movies.length || genres_movies.length">
        <h2>"{{ query }}" 영화 검색 결과</h2>
        <div v-if="movies_movies.length">
            <div class="moviecard-container">
                <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie" :index="idx" @pick="pick"/>
            </div>
        </div>
        <div v-else>"{{ query }}"로 검색된 영화 타이틀이 존재하지 않습니다.</div>
        <h2>"{{ query }}" 장르 검색 결과</h2>
        <div v-if="genres_movies.length">
            <div class="moviecard-container">
                <MovieCard v-for="(movie, idx) in movies" :key="idx" :movie="movie" :index="idx" @pick="pick"/>
            </div>
        </div>
        <div v-else>"{{ query }}"로 검색된 장르가 존재하지 않습니다.</div>
        <Modal v-if="modalMovieId" />
    </div>
    <div v-else class="loading">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import Modal from '@/components/Modal.vue'

export default {
    name: 'MoviePick',
    components: {
        MovieCard,
        Modal,
    },
    data: function () {
        return {
            movies_movies: [],
            genres_movies: [],
            load: false,
            query: this.$route.query.q
        }
    },
    methods: {
        pick: function (index, pick) {
            this.movies[index].user_picked = pick
            this.movies.splice(index, 1)
        }
    },
    computed: {
        modalMovieId: function () {
            return this.$store.state.modalMovieId
        },
    },
    created: function () {
        this.$store.dispatch('modalOff')
    }
}
</script>

<style>
h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: .5em;
}
.moviecard-container {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  gap: 4vw 0;
}
</style>