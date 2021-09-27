import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/books/Index.vue'),
  },
  {
    path: '/books/create',
    name: 'Store Book',
    component: () => import('../views/books/Store.vue'),
  },
  {
    path: '/books/:id',
    name: 'Book',
    component: () => import('../views/books/Show.vue'),
    children: [
      {
        path: '',
        name: 'Show Book',
        component: () => import('../views/books/show/Index.vue'),
      },
      {
        path: 'update',
        name: 'Update Book',
        component: () => import('../views/books/show/Update.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
