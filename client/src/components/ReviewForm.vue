<template>
  <div>
    <div :style="{ backgroundImage: 'url(' + movie.poster_path + ')' }" class="form-container"></div>
    <div v-if="review">
      <h1>{{ movie.title }} 리뷰 수정 </h1>
      <form @submit.prevent="submitReview">
        <input type="text" name="title" :value="review.title" placeholder="리뷰 제목을 작성하세요. 100자 이내">
        <textarea name="content" placeholder="리뷰 내용을 작성하세요." v-model="content"></textarea>
        <button type="submit">수정 완료</button>
      </form>
    </div>
    <div v-else>
      <h1>{{ movie.title }} 리뷰 생성</h1>
      <form @submit.prevent="submitReview">
        <input type="text" name="title" placeholder="리뷰 제목을 작성하세요. 100자 이내">
        <textarea name="content" placeholder="리뷰 내용을 작성하세요." v-model="content"></textarea>
        <button type="submit">작성 완료</button>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ReviewForm',
  props: {
    movie: Object,
    review: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      content: ''
    }
  },
  created: function () {
    if(this.review) this.content = this.review.content;
  }
}
</script>

<style scoped>
.from-container {
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.3;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>