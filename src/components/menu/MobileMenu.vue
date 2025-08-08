<script setup>
/////////////////
// ALl imports //
/////////////////
import { useRoute } from 'vue-router'
import home from '@/assets/icons/ic_mobile_navigarion_home@3x.png'
import homeActive from '@/assets/icons/ic_mobile_navigarion_home_active@3x.png'
import about from '@/assets/icons/ic_mobile_navigarion_info@3x.png'
import aboutActive from '@/assets/icons/ic_mobile_navigarion_info_active@3x.png'

// Get current route to check which link is active
const route = useRoute()

/**
 * Checks if the given link is the current page.
 * '/' should not be active if you're on '/about'.
 **/
const isActive = (path) => {
  if (path === '/') {
    return route.path !== '/about'
  }
  return route.path === path
}
</script>


<template>
<!-- Mobile bottom navigation menu -->
<nav class="mobile-menu mobile-only">
    <!-- Link to Home / House Overview page -->
    <router-link 
        to="/"
        class="menu-item"
        exact
    >
    <!-- Conditionally show active or inactive home icon -->
    <img :src="isActive('/') ? homeActive : home" alt="House overview">
    </router-link>

    <!-- Link to About page -->
    <router-link 
        to="/about"
        class="menu-item"
        exact
    >
    <!-- Conditionally show active or inactive about icon -->
    <img :src="isActive('/about') ? aboutActive : about" alt="About">
    </router-link>

</nav>
</template>

<style scoped>
/* Menu styling*/
.mobile-menu {
    background-color: var(--color-background-2);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 32px;
    padding: 16px;
/* Fix the menu at the bottom of the viewport */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.menu-item img {
    width: 25px;
    height: auto;
}
</style>