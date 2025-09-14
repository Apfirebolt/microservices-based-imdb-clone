import { createRouter, createWebHistory } from 'vue-router'
import Home from '../screens/Home.vue'
import NotFound from '../screens/404.vue'
import { useAuth } from '../stores/auth';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../screens/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../screens/Register.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // IMPORTANT: Get the store instance inside the guard
    const authStore = useAuth();

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
        // All good, let the user proceed
        next();
    }
});

export default router;