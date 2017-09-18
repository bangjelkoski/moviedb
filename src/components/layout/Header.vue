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
              <input type="text" class="input-field input-search" v-model="keyword" @focus="searchClassActive = true" @blur="searchClassActive = false" placeholder="Search your Movie Here">
              <i class="fa fa-search input-icon input-search-icon"></i>
          </div>
       </div> <!-- End #search -->

  </header> <!-- End header -->
</template>

<script>
  export default {
      data(){
          return{
              keyword: '',
              searchClassActive: false,
          }
      },
      computed: {
          searchToggleClass(){
              return this.searchClassActive ? 'input-active' : '';
          }
      },
  }
</script>