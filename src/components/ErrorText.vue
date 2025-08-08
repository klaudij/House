<script setup>
//Boolean prop
defineProps({
  show: Boolean
})
</script>

<template>
  <!-- Only show error message when 'show' is true -->
  <p 
    v-if="show"
    class="error-text"
  >
    Required field missing
  </p>
</template>

<style scoped>
.error-text {
    font-size: var(--fs-error-mobile);
    color: var(--color-primary);
}
/* Desktop styling */
@media (min-width: 1024px) {
 .error-text {
    font-size: var(--fs-error-desktop);
}   
}
</style>