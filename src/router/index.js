import { createRouter, createWebHistory } from 'vue-router'

//Importing page components
import HouseOverview from '@/views/HouseOverview.vue'
import CreateListing from '@/views/CreateListing.vue'
import HouseDetail from '@/views/HouseDetail.vue'
import EditListing from '@/views/EditListing.vue'
import About from '@/views/About.vue'

// Define routes for the application
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/',
      name:'Home',
      component: HouseOverview
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {path:'/create',
      name:'CreateListing',
      component: CreateListing
    },
    { path:'/house/:id',
      name:'HouseDetail',
      component: HouseDetail,
      props: true
    },
    { path:'/house/:id/edit',
      name:'EditListing',
      component: EditListing,
      props: true
    },
  ],
})

export default router