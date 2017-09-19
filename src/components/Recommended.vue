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
		 		<transition name="fade" mode="out-in"> 
		 			<div :key="'item-refresh'" class="item-refresh" @click="refresh" v-show="showRefresh"><i class="fa fa-refresh"></i></div>
		 		</transition>
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
  			maxID: 45000,
  			movie: '',
  			movieLoaded: false,
  			showRefresh: true,
  		}
  	},
  	props: ['posterPath', 'backgroundPath'],
  	methods: {
  		fetchData(){
  			var self = this;
  			let id = Math.floor(Math.random() * this.maxID) + 1;

  			MovieHttp.getMovie(id).then(movie => {
  				this.movie = movie.body;
  				if(this.movie.backdrop_path && this.movie.poster_path){	  				
	  				this.movieLoaded = true;

	  				// Change the background image
	  				self.$emit('movieLoaded', this.backgroundPath + this.movie.backdrop_path); 

					// Load the movie and allow refreshing with a delay so images are loaded properly
	  				setTimeout(() => { this.showRefresh = true; self.$emit('loadingEnd'); }, 1000); 
	  				self.$emit('setSearch', movie.body.title);
  				}else{
  					this.fetchData(); 
  				}
  			}, error => {
  				this.fetchData(); // If the movie with that ID doesnt exist, fetch new movie
  			})
  		},
  		refresh(){
  			this.showRefresh = false;
  			this.$emit('loadingStart'); // Initiate loading
  			this.$emit('resetBg', true);
			this.fetchData(); // Fetch new movie
  		}
  	},
  	computed: {
  		formatedRevenue(){
  			return this.movie.revenue ? '$' + this.movie.revenue.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '$0';
  		},
  		formatedRating(){
  			return this.movie.vote_average ? this.movie.vote_average + ' / 10' : '-';
  		}
  	},
	created(){
		this.$emit('loadingStart'); // Initiate loading
		this.fetchData(); // Fetch movie
	},
	beforeDestroy(){
		this.$emit('resetBg', true); // To load the main background when moving to another route than Home
	}
  }
</script>
