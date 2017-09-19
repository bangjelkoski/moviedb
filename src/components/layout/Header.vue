<template>
  <header>

       <div id="logo">
          Movie<span>DB</span>
       </div> <!-- End #logo -->

       <div id="navigation">
          <ul>
            <router-link :to="{name: 'home'}" tag="li" active-class="active-nav" exact><a>Home</a></router-link>
            <router-link :to="{name: 'recommended'}" tag="li" active-class="active-nav" exact><a>Recommended</a></router-link>
            <router-link :to="{name: 'about'}" tag="li" active-class="active-nav" exact><a>About</a></router-link>
          </ul>
       </div> <!-- End #navigation -->


       <div id="search">
          <div class="input-container" :class="searchToggleClass">
              <input 
              type="text" class="input-field input-search" 
              @focus="searchFocus" 
              @blur="searchBlur" 
              @keyup="autocomplete"
              placeholder="Search your Movie Here" v-model="keyword">
              <i class="fa fa-search input-icon input-search-icon"></i>
          </div>
          <transition name="fade" mode="in-out">
            <div class="dropdown" :key='search-autocomplete' v-if="showDropdown">
                <div class="dropdown-item" v-for="movie in searchMovies" @click="loadSearchMovie(movie.id, movie.title)">
                    <span>{{ movie.title }}</span>
                </div>
            </div>
          </transition>
       </div> <!-- End #search -->

  </header> <!-- End header -->
</template>

<script>
  import {HeaderHttp} from '../../resources/resources';

  export default {
      data(){
          return{
              keyword: '',
              searchActive: false,
              searchMovies: [],
              search: '',
          }
      },
      props: ['resetSearch', 'currentMovie'],
      methods: {
        searchFocus(event){
            this.searchActive = true; 
            this.autocomplete(event);
        },
        searchBlur(event){
            this.searchActive = false; 
            this.searchMovies = [];
        },
        autocomplete(event){
            let keyword = event.target.value;
            if(keyword){
                
                // Get all movies for the keyword
                HeaderHttp.getMovies(keyword).then(movies => {
                    this.searchMovies = movies.data.results;
                }, error => {
                  // Handle Error
                });

            }else{
                this.searchMovies = [];
            }
        },
        loadSearchMovie(id, title, event){
          this.keyword = title; // Update the search field with full name of the movie
          this.$router.push({'name': 'movie', params: {id: id}}); // Load the movie with the given id
        },
      },
      watch:{
        resetSearch(value){
            if(value){
                this.keyword = '';
                this.$emit('resetSearch'); // We have resseted the search, emit an event to the parent
            }
        },
        currentMovie(value){
            this.keyword = value;
        }
      },
      computed: {
        searchToggleClass(){
            return this.searchActive ? 'input-active' : '';
        },
        showDropdown(){
            return this.searchMovies.length > 0;
        },
      },
  }
</script>