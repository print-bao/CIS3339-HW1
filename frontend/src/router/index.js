import {createRouter, createWebHistory} from 'vue-router'
import StudentsView from '../views/StudentsView.vue'
import CoursesView from '../views/CoursesView.vue'
import EnrollmenetsView from '../views/EnrollmentsView.vue'
import EnrollmentsView from '../views/EnrollmentsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: StudentsView
    },
    {
      path: '/courses',
      component: CoursesView
    },
    {
      path: '/enrollments',
      component: EnrollmentsView
    }
  ]
})

export default router