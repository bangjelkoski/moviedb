<template>
  <div id="app"> <!-- The main Application -->
      <div id="bg-image">
          <img :class="{'bg-active' : !movieBg }" src="/dist/assets/images/bg.jpeg"/>
          <transition name="fade" mode="in-out"> 
            <img :key="'bg-image'" :class="{'bg-active' : movieBg }" :src="backgroundImage" /></transition>
      </div> <!-- Div to change the main background image -->
      
      <div class="wrapper"> 
        <div class="wrapper-inner">

            <appHeader :resetSearch="resetSearch" :currentMovie="currentMovie" @resetSearch="resetSearch = false"></appHeader> <!-- The header of the app -->

            <div id="content" :class="{ 'loading' : loading }"> <!-- Main Content of the app -->

                <router-view 
                  @resetBg="movieBg = false"
                  @resetSearch="resetSearch = true" 
                  @loadingEnd="loading = false"
                  @loadingStart="loading = true"
                  @movieLoaded="movieLoaded($event)"
                  @setSearch="currentMovie = $event"
                  :sliderOptions="sliderOptions"
                  :posterPath="posterPath"
                  :backgroundPath="backgroundPath"
                  ></router-view> 

            </div>

            <appFooter></appFooter> <!-- The Footer of the app -->

        </div> <!-- End .wrapper-inner -->
      </div> <!-- End .wrapper -->


  </div> <!-- End #app -->
</template>

<script>
  // Import the Components
  import Header from './components/layout/Header.vue';
  import Footer from './components/layout/Footer.vue';

  export default {
    data(){
        return {
            backgroundImage: '/dist/assets/images/bg.jpeg', // the background image
            posterPath: 'https://image.tmdb.org/t/p/w500',  // poster path 
            backgroundPath: 'https://image.tmdb.org/t/p/original',  // background path
            movieBg: false, // if movie background is loaded (for animation) 
            loading: false, // if data is being lodaed (for animation)
            currentMovie: '', // To show the current movie in the search bar
            resetSearch: false,
            sliderOptions: {  // slider for homepage - options
                prevNextButtons: false,
                pageDots: true,
                wrapAround: true,
                cellAlign: 'left',
                autoPlay: 5000,
            },
        }
    },
    methods: {
        movieLoaded(data){
            this.backgroundImage = data;

            // Add some delay for the image to actually load
            setTimeout(() => {
                this.movieBg = true;
            }, 1000)
        }
    },
    components: {
        appHeader: Header,
        appFooter: Footer,
    },
  }
</script>