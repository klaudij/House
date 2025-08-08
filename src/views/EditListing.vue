<script setup>
/////////////////
// ALl imports //
/////////////////
import { useRoute } from 'vue-router';

// Importing UI components 
import MobileHeader from '@/components/header/MobileHeader.vue';
import DesktopHeader from '@/components/header/DesktopHeader.vue';
import Form from '@/components/Form.vue';

const route = useRoute()
const houseId = route.params.id
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Desktop header with back navigation -->
      <DesktopHeader title="Back to detail page" />

      <!-- Mobile Header -->
      <MobileHeader
        title="Create new Listing"
        :backButton="true"
      />

      <!-- Page title for desktop only -->
      <h1 class="desktop-only">Edit Listing</h1>

      <!-- Form component -->
      <Form :houseId="houseId"></Form>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  background-image:
    linear-gradient(#f6f6f696, #f6f6f692),
    url('../assets/img/img_background@3x.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom center;
}

@media (min-width: 1024px) {
  .page-wrapper {
    background-image:
      linear-gradient(135deg, #f6f6f6f6 0%, #f6f6f600 100%),
      url('../assets/img/img_background@3x.png');
    background-size: 100%;
    background-position: bottom right;
  }
}
</style>
