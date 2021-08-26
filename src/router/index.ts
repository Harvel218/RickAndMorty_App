import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
