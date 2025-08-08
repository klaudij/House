<script setup>
/////////////////
// ALl imports //
/////////////////
import { defineProps } from 'vue';
// Custom back button component. This handles navigation to the previous page
import PreviousPageBtn from '../PreviousPageBtn.vue'

// define component props with validation
defineProps({
    title: {
        type: String,
        required: true
    },
})
</script>

<template>
    <!-- Page header container, only visible on desktop -->
    <div class="page-header desktop-only">
        <div class="header-content">
            <!-- Custom back button component with dark styling.-->
            <PreviousPageBtn
                :darkBtn="true"
            >
                <!-- Showing the title prop. Title can be changed when importing the DesktopHeader component -->
                <span class="page-header__back-label"> {{ title }}</span>
            </PreviousPageBtn>

        </div>


    </div>
</template>

<style scoped>
/* Styling for the desktop header */
.page-header {
    width: 100%;
    max-width: var(--width-max);
}

.header-content {
    padding: 40px 0 25px 0;
}

.page-header__back-label {
    font-weight: var(--weight-semibold);
    font-family: var(--font-heading);
}

/* Desktop styling */
@media (min-width: 1024px) {
    .page-header__back-label {
        font-size: var(--fs-back-button-desktop);
    }
}
</style>