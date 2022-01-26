import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout.vue'
import Comment from '@/pages/Comment.vue'
import Home from '@/pages/Home.vue'
import CommentLayout from '@/CommentLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: '/comments',
    component: CommentLayout,
    children: [
      {
        path: '',
        component: Comment,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
