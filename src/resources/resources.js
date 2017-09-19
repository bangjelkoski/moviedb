import Vue from 'vue';
import VueResource from 'vue-resource';
import {config} from '../config/config';

Vue.use(VueResource);
Vue.http.options.root = 'https://api.themoviedb.org/3/';

// Get Latest Movies
export const HomeHttp = {

	// Get Popular TV Shows
	getUpcomingMovies: () => {
    	return Vue.http.get('movie/upcoming?api_key='+config.API_KEY);
	},

	// Get Popular Movies
	getPopularMovies: () => {
		return Vue.http.get('movie/popular?api_key='+config.API_KEY);
	},
}

export const HeaderHttp = {

	// Get Movie by Id
	getMovies: (keyword) => {
		return Vue.http.get('search/movie?query='+ keyword + '&api_key='+config.API_KEY);
	},
}


export const MovieHttp = {

	// Get Movie by Id
	getMovie: (id) => {
		return Vue.http.get('movie/'+ id + '?api_key='+config.API_KEY);
	},
}
