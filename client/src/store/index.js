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
    }
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
