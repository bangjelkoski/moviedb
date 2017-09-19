import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Review from '../components/Review.vue';
import Recommended from '../components/Recommended.vue';
import Movie from '../components/Movie.vue';
import NotFound from '../components/NotFound.vue';

export const routes = [
	{ path: '/', name: 'home', component: Home },
	// { path: '/review', name: 'review', component: Review },
	{ path: '/about', name: 'about', component: About },
	{ path: '/movie/:id', name: 'movie', component: Movie, props: true },
	{ path: '/recommended', name: 'recommended', component: Recommended },
	{ path: '*', name: 'notfound', component: NotFound },
];