import { createRouter,createWebHistory } from "vue-router";
import Users from './components/Users.vue';
import pageNotFound from './components/pageNotFound.vue'
import userDetails from './components/userDetails.vue'
 import Albums from './components/Albums.vue'
 import AlbumDetails from './components/AlbumDetails.vue'
const routes = [
  {
    name:'Users',
    path: '/',
    component: Users
  },
  {
    name:'pageNotFound',
    path: '/:pathMatch(.*)*',
    component: pageNotFound
  },
  {
    name:'userDetails',
    path: '/users/:userId',
    component: userDetails
  },
  {
    name:'Albums',
    path: '/album',
    component: Albums
  },
  {
    name:'AlbumDetails',
    path: '/album/:albumId',
    component: AlbumDetails
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;