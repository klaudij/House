<script setup>
//Importing RouterView to render the route components
import { RouterView } from 'vue-router'

//Importing menu components for differen screen sizes
import MobileMenu from './components/menu/MobileMenu.vue';
import DesktopMenu from './components/menu/DesktopMenu.vue';
</script>

<template>
  <!-- Visible only on mobile screens -->
  <DesktopMenu />

  <!-- Renders the matched component for the current route. -->
  <RouterView />

  <!-- Visible only on mobile screens -->
  <MobileMenu></MobileMenu>
</template>

<style scoped></style>
