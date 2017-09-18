<template>
  <div id="app"> <!-- The main Application -->
      <div id="bg-image" :style="bgImage"></div> <!-- Div to change the main background image -->
      
      <div class="wrapper"> 
        <div class="wrapper-inner">

            <appHeader></appHeader> <!-- The header of the app -->

            <div id="content" :class="{ 'loading' : loading }"> <!-- Main Content of the app -->

                <router-view 
                  @homeVisited="backgroundImage = '/dist/assets/images/bg.jpeg'" 
                  @loadingCompleted="loading = false"
                  @loadingInit="loading = true"
                  :sliderOptions="sliderOptions"
                  :posterPath="posterPath"
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
            backgroundImage: '/dist/assets/images/bg.jpeg',
            posterPath: 'https://image.tmdb.org/t/p/w500',
            loading: false,
            sliderOptions: {
                prevNextButtons: false,
                pageDots: true,
                wrapAround: true,
                cellAlign: 'left',
                autoPlay: 5000,
            },
        }
    },
    computed: {
        bgImage(){
            return {
                backgroundImage: 'url('+ this.backgroundImage +')',
            }
        }
    },
    components: {
        appHeader: Header,
        appFooter: Footer,
    },
  }
</script>