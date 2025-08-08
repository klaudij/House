<script setup>
///////////////////////////////
// Go to previous page functions 
// & buttons in one place //////
///////////////////////////////

/////////////////
// ALl imports //
/////////////////
import { useRouter, useRoute} from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter()
const route = useRoute()

// Navigate back to previous page 
function goBack() {
  // If page is on HouseDetail page
  if (route.name === 'HouseDetail') {
    router.push('/') // then go back to overview Page
  } else {
    router.back() // Otherwise the previous page
  }
}

/**
 * Import PreviousPageBtn in other 
 * componetns/pages and choose the button
 * you need using :darkBtn="true" or 
 * :lightBtn="true" inside the PreviousPageBtn component
 **/
defineProps({
    darkBtn: {
        type: Boolean,
        required: false
    },
    lightBtn: {
        type: Boolean,
        required: false
    },
})
</script>

<template>

    <!-- Navigating back to previous page, or the Overview page if current page is 'HouseDetail' -->
     <!-- Dark back button, shown if darkBtn is true -->
     <button 
        class="page-header__button page-header__button--back"
        aria-label="Go to previous page"
        v-if="darkBtn"
        @click="goBack"
        >
        <img class="page-header__icon" src="/src/assets/icons/ic_back_grey@3x.png" alt="Back icon">
        <slot />
    </button>

    <!-- White back button, shown if lightBtn is true -->
     <button 
        aria-label="Go to previous page"
        v-if="lightBtn"
        @click="goBack"
        >
        <img class="page-header__icon" src="/src/assets/icons/ic_back_white@3x.png" alt="Back icon">
    </button>

</template>

<style scoped>
/* styling & positioning for back button*/
.page-header__button {
position: absolute;
}
.page-header__button--back {
    left: 0px;
}
.page-header__icon { 
    width: 18px;
    height: auto;
    display: block;
}

/* Desktop styling */
@media (min-width: 1024px) {
  .page-header__button {
    position: static;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }  
  .page-header__icon {
    width: 22px;
  }
}
</style>