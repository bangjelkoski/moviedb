<template>
  	<div class="content">
		 <div class="page-title">
		  	<h2>Popular Movies</h2>
		 </div>
		 <flickity v-if="sliderInit" ref="flickity-popular"  :options="sliderOptions">
		 	<div class="item" v-for="movie in popularMoviesFiltered">
		 		<img :src="posterPath + movie.poster_path" class="item-image" :alt="movie.title"/>
		 		<div class="item-title">
		 			<div class="center-align">
		 				<div class="center-align-inner">
		 					<p>{{ movie.title }}</p>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		 </flickity>

		 <div class="page-title">
		  	<h2>Upcoming Movies</h2>
		  </div>
		 <flickity v-if="sliderInit" ref="flickity-upcoming" :options="sliderOptions">
		 	<div class="item" v-for="movie in upcomingMoviesFiltered">
		 		<img :src="posterPath + movie.poster_path" class="item-image" :alt="movie.title"/>
		 		<div class="item-title">
		 			<div class="center-align">
		 				<div class="center-align-inner">
		 					<p>{{ movie.title }}</p>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		 </flickity>
	</div>
</template>

<script>
  import {HomeHttp} from '../resources/resources';

  export default {
  	data(){
  		return {
  			upcomingMovies: [],
  			popularMovies: [],
  			numberOfItems: 10,
  			sliderInit: false,
  		}
  	},
  	props: ['sliderOptions', 'posterPath'],
  	computed: {
  		upcomingMoviesFiltered(){
  			return _.sampleSize(this.upcomingMovies, this.numberOfItems); // Pluck only N random items from the array
  		},
  		popularMoviesFiltered(){
  			return _.sampleSize(this.popularMovies, this.numberOfItems); // Pluck only N random items from the array
  		},
  	},
  	methods: {
  		fetchData(){
  			let self = this;

  			HomeHttp.getUpcomingMovies().then(shows => {
		    	this.upcomingMovies = shows.data.results;


		    	HomeHttp.getPopularMovies().then(movies => {
			    	this.popularMovies = movies.data.results;
			    	self.$emit('loadingEnd') 
			    	this.sliderInit = true;
				}, error => {
					// Handle Error
				});

			}, error => {
				// Handle Error
			});

  		},
  	},
	created(){
		this.$emit('homeVisited'); // Change to default background if we go to the homepage
		this.$emit('loadingStart'); // Initiate loading

		this.fetchData(); // Fetch the data from the API
	},
  }
</script>