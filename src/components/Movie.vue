<template>
  <div class="content">
		 <div class="item-full" v-if="movieLoaded">
		 	<div class="item-image">
		 		<transition name="fade" mode="out-in"> 
		 			<img :key="'movie-poster'" :src="posterPath + movie.poster_path" class="item-image-full" :alt="movie.title"/>
		 		</transition>
		 	</div>
		 	<div class="item-data">
		 		<h3 class="item-title">{{ movie.title }}</h3>
		 		<p>{{ movie.overview }}</p>
				<div class="item-info">
					<div class="item-info-col">
						<p>Original Release: </p>
						<span class="item-info-value">{{ movie.release_date ? movie.release_date : '/' }}</span>
					</div>
					<div class="item-info-col">
						<p>Running Time</p>
						<span class="item-info-value">{{ movie.runtime ? movie.runtime : '-' }}min</span>
					</div>
					<div class="item-info-col">
						<p>Box Office</p>
						<span class="item-info-value">{{ formatedRevenue }}</span>
					</div>
					<div class="item-info-col">
						<p>Rating</p>
						<span class="item-info-value">{{ formatedRating }}</span>
					</div>
				</div>
		 	</div>
		 </div>
	</div>
</template>

<script>
  import {MovieHttp} from '../resources/resources';

  export default {
  	data(){
  		return {
  			movieId: '',
  			movie: '',
  			movieLoaded: false,
  		}
  	},
  	props: ['posterPath', 'backgroundPath'],
  	methods: {
  		init(id){
  			this.movieId = id;
			this.$emit('loadingStart'); // Initiate loading
			this.fetchData(this.movieId);
  		},
  		fetchData(id){
  			var self = this;

  			MovieHttp.getMovie(id).then(movie => {
  				this.movie = movie.body;
  				this.movieLoaded = true;

  				// Change the background image
  				self.$emit('movieLoaded', this.backgroundPath + this.movie.backdrop_path); 
				// Load the movie and allow refreshing with a delay so images are loaded properly
  				setTimeout(() => { self.$emit('loadingEnd'); }, 1000); 
  				self.$emit('setSearch', movie.body.title);
  			}, error => {
  				 // Some Error Happened
  			})
  		},
  	},
  	computed: {
  		formatedRevenue(){
  			return this.movie.revenue ? '$' + this.movie.revenue.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '$0';
  		},
  		formatedRating(){
  			return this.movie.vote_average ? this.movie.vote_average + ' / 10' : '-';
  		}
  	},
  	watch: {
  		'$route' (to, from) { // Watch if change in the route happens only in the ID parameter
	      if(to.params.id !== from.params.id){
	      		this.init(to.params.id);
	      }
	    }
  	},
	created(){
		this.init(this.$route.params.id);
	},
	beforeDestroy(){
		this.$emit('resetBg'); // To load the main background when moving to another route than Home
		this.$emit('resetSearch'); // To reset any keyword that we have in the search field
	}
  }
</script>
