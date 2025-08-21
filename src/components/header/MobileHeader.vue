<script setup>
/////////////////
// ALl imports //
/////////////////
import { defineProps } from 'vue';
// Custom back button component. This handles navigation to the previous page
import PreviousPageBtn from '../PreviousPageBtn.vue'

/**
 * Define props that this component accepts, with types and whether they are required.
 * - title: The page header title .
 * - newListButton: Whether to show a button to create a new listing.
 * - backButton: Whether to show a back button.
 * Import MobileHeader in other 
 * componetns/pages and choose the props you need 
 **/
defineProps({
    title: {
        type: String,
        required: true
    },
    newListButton: {
        type: Boolean,
        required: false
    },
    backButton: {
        type: Boolean,
        required: false
    },
})
</script>

<template>
    <div class="page-header center mobile-only">
        <!-- Navigates back to previous page, if 'backButton' prop is true -->
        <PreviousPageBtn
            :darkBtn="true"
            v-if="backButton"
        />

        <!-- Page header title -->
        <h1 class="page-header__title">{{ title }}</h1>

        <!-- Navigates to 'Create a new listing' if 'newListButton' prop is true -->
        <router-link
            :to="`/create`"
            class="page-header__button page-header__button--add"
            aria-label="Create new listing" v-if="newListButton"
            >
                <img class="page-header__icon" src="/src/assets/icons/ic_upload@3x.png" alt="Upload icon">
        </router-link>

    </div>
</template>

<style scoped>
/* Container for the mobile header */
.page-header {
    margin-top: 34px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* styling & positioning for the create new list */
.page-header__button {
    position: absolute;
}

.page-header__button--back {
    left: 0px;
}

.page-header__button--add {
    right: 0px;
}

.page-header__icon {
    width: 18px;
    height: auto;
    display: block;
}
</style>