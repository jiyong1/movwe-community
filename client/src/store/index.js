import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    jwtToken: '',
    API_ENDPOINT: 'http://127.0.0.1:8000/',
    movieList: [],
    genreList: [],
    pendingTimeOut: null,
    scaleCard: null,
    modalCard: null,
  },
  mutations: {
    TOKEN: function (state, jwtToken) {
      if (jwtToken) {
        state.jwtToken = jwtToken;
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    LOGIN: function (state, data) {
      state.jwtToken = data.token;
      localStorage.setItem('jwt-token', data.token);
      state.isLogin = true;
    },
    LOGOUT: function (state) {
      state.isLogin = false;
      state.jwtToken = '';
    },
    SET_MOVIE_LIST (state, data) {
      state.movieList = data;
    },
    SET_GENRE_LIST (state, data) {
      state.genreList = data;
    },
    REMOVE_TIME_OUT (state) {
      clearTimeout(state.pendingTimeOut);
      state.pendingTimeOut = null;
    },
    SET_SCALE_CARD (state, target) {
      state.scaleCard = target;
    },
    REMOVE_SCALE_CARD (state) {
      const { width, height } = state.scaleCard.getBoundingClientRect();
      state.scaleCard.childNodes[1].style.top = `0px`;
      state.scaleCard.childNodes[1].style.left = `0px`;
      state.scaleCard.childNodes[1].style.width = `${width}px`;
      state.scaleCard.childNodes[1].style.height = `${height}px`;
      state.scaleCard.childNodes[1].style.opacity = '0';
      state.scaleCard.childNodes[1].firstChild.firstChild.src = '';
      setTimeout(() => {
        if (!state.scaleCard) return;
        state.scaleCard.classList.remove('scaleUp');
        state.scaleCard.childNodes[1].style = '';
        state.scaleCard = null; 
      }, 500)
    },
    PICK_CHANGE (state, movieID) {
      for (let i=0; i < state.movieList.length; i++) {
        const movie = state.movieList[i]
        if (movie.id === movieID) {
          movie.user_picked = !movie.user_picked
          return;
        }
      }
    },
    MODAL_OPEN (state, data) {
      state.modalCard = data;
    },
    MODAL_OFF (state) {
      state.modalCard = null;
    }
  },
  actions: {
    getToken: function (context) {
      const token = localStorage.getItem('jwt-token');
      context.commit('TOKEN', token);
    },
    login: async function (context, formData) {
      const url = context.state.API_ENDPOINT + 'accounts/api-token-auth/';
      const data = {
        username: formData.username.value,
        password: formData.password.value,
      }
      try {
        const res = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        // console.log(res.status)
        if (res.status === 200) {
          const resdata = await res.json();
          context.commit('LOGIN', resdata);
        } else {
          throw new Error('아이디 혹은 비밀번호가 올바르지 않습니다.')
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    signup: async function (context, formData) {
      const url = context.state.API_ENDPOINT + 'accounts/signup/'
      const data = {
        username: formData.username.value,
        password: formData.password.value,
        passwordConfirmation: formData.passwordConfirmation.value
      }
      try {
        const res = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return res
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    logOut: function (context) {
      localStorage.removeItem('jwt-token')
      context.commit('LOGOUT')
    },
    getMovieList: async function (context) {
      if (context.state.movieList.length > 0) {
        return
      } else {
        const url = context.state.API_ENDPOINT + 'api/v1/movies/'
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'JWT ' + context.state.jwtToken
          }
        })
        if (res.status === 200) {
          const resdata = await res.json()
          context.commit('SET_MOVIE_LIST', resdata)
        } else {
          throw new Error(res.status)
        }
      }
    },
    getGenreList: async function (context) {
      if (context.state.movieList.length > 0) {
        return
      } else {
        const url = context.state.API_ENDPOINT + 'api/v1/genres/'
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'JWT ' + context.state.jwtToken
          }
        })
        if (res.status === 200) {
          const resdata = await res.json()
          context.commit('SET_GENRE_LIST', resdata)
        } else {
          throw new Error(res.status)
        }
      }
    },
    pickClick: async function(context, movieID) {
      const url = context.state.API_ENDPOINT + `api/v1/movie/${movieID}/pick/`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'JWT ' + context.state.jwtToken
        }
      })
      if (res.status === 200) {
        context.commit('PICK_CHANGE', movieID);
      } else {
        throw new Error(res.status)
      }
    },
    mouseEnter: function (context, target) {
      if (context.state.pendingTimeOut) {
        context.commit('REMOVE_TIME_OUT')
      }
      context.state.pendingTimeOut = setTimeout(() => {
        target.classList.add('scaleUp')
        context.commit('SET_SCALE_CARD', target)
        const detail = target.childNodes[1];
        const {left, width, height } = target.getBoundingClientRect()
        const moveTop = - (height*1.5 - height) / 2
        let moveLeft = - (width*1.5 - width) / 2
        if (moveLeft + left < 0) moveLeft = 0
        else if (left + moveLeft + width*1.5 > window.innerWidth) moveLeft = -(width*1.5 - width)
        detail.style.width = `${width*1.5}px`;
        detail.style.height = `${height*1.5}px`;
        detail.style.top = `${moveTop}px`;
        detail.style.left = `${moveLeft}px`;
        detail.firstChild.firstChild.src = detail.firstChild.firstChild.dataset.src;
      }, 700);
    },
    mouseLeave: function (context) {
      if (context.state.pendingTimeOut) {
        context.commit('REMOVE_TIME_OUT')
      }
      if (context.state.scaleCard) {
        context.commit('REMOVE_SCALE_CARD')
      }
    },
    modalOpen: function (context) {
      if (context.state.scaleCard) {
        const movieID = context.state.scaleCard.dataset.movie
        context.commit('MODAL_OPEN', movieID)
      }
    },
    modalOff: function (context) {
      context.commit('MODAL_OFF')
    },
    // starRate: async function (context)
  },
  getters: {
    popularMovieList: function (state) {
      return state.movieList
    },
    genreMoviesArray: function (state) {
      const returnArray = []
      state.genreList.forEach(genre => {
        const genreMovies = {
          name: genre.name,
          data: [],
        }
        state.movieList.forEach(movie => {
          for (let i = 0; i < movie.genres.length; i++) {
            if (movie.genres[i].id === genre.id) {
              genreMovies.data.push(movie);
              break;
            }
          }
        })
        if(genreMovies.data.length > 0) returnArray.push(genreMovies);
      })
      return returnArray;
    }
  },
  modules: {
  }
})
