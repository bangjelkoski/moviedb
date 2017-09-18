import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import Flickity from 'vue-flickity';

// Import configuration
import {config} from './config/config';

// Use the Router and Lodash in our Vue Application
Vue.use(VueRouter, lodash, VueLodash);

// Importing the routes we have created
import { routes } from './routes/routes';

// Defining the VueRouter instance
const router = new VueRouter({
	routes: routes, 
	mode: 'history',  /* To remove the # in the browser URL bar */

	// TODO: Add Scroll Behavior
});

// Register Slick Slider
Vue.component('flickity', Flickity);

// Initiating the Vue Application
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
