import { createRouter, createWebHistory } from 'vue-router';
import DayDetails from '../views/DayDetails/DayDetails.vue';
import AddHabit from '../views/AddHabit/AddHabit.vue';
import DashboardView from '../views/Dashboard/DashboardView.vue';
import NotFound from '../views/NotFound/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/day/:id',
      name: 'DayDetails',
      component: DayDetails,
      props: true
    },
    {
      path: '/day/:id/addHabit',
      name: 'AddHabit',
      component: AddHabit,
      props: true
    },
    // redirect
    {
      path: "/day/",
      redirect: "/"
    },
    // catch 404 (catches everything else not indicated above)
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
