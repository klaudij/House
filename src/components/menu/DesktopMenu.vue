<script setup>
/////////////////
// ALl imports //
/////////////////
import { useRoute } from 'vue-router';

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
    <!-- Desktop navigation bar -->
    <nav class="desktop-menu desktop-only">
        <div class="center">
            <div class="menu-content">

                <!-- Logo -->
                <img class="menu-logo" src="/src/assets/logo/img_logo_dtt@3x.png" alt="DTT">

                <!-- Link to Home / House Overview page -->
                <router-link
                    to="/"
                    :class="['menu-item', isActive('/') ? 'active' : '']"
                >
                    <p class="">Houses</p>
                </router-link>

                <!-- Link to About page -->
                <router-link
                    to="/about"
                    :class="['menu-item', isActive('/about') ? 'active' : '']"
                >
                    <p>About</p>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* styling & positioning*/
.desktop-menu {
    background-color: var(--color-background-2);
    box-shadow: rgba(99, 99, 99, 0.094) 0px 2px 8px 0px;
    width: 100%;
    padding: 18px 0;
    position: sticky;
    top: 0;
    z-index: 9999999;
}

.menu-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
    width: 100%;
    max-width: var(--width-max);
    padding: 0 20px;
}

.menu-logo {
    width: 125px;
    height: auto;
}

.menu-item p {
    color: var(--color-text-secondary);
    opacity: .5;
    font-family: var(--font-heading);
    font-size: var(--fs-button-desktop);
}

.menu-item.active p {
    opacity: 1;
    font-weight: var(--weight-bold);
}
</style>