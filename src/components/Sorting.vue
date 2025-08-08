<script setup>
/////////////////
// ALl imports //
////////////////
import { ref } from 'vue';

const emit = defineEmits(['sort-changed']);
const activeSort = ref('price') //default

// Called when click a button
function setSort(k) {
    activeSort.value = k;
    //emit event to parent
    emit('sort-changed', k)
}
</script>

<template>
    <div class="sorting">
        <!-- Left-side Price filter -->
        <button
            :class="['sorting__button', { 'sorting__button--active': activeSort === 'price' }]"
            @click="setSort('price')"
        >
                Price
        </button>

        <!-- Right-side Size filter -->
        <button
            :class="['sorting__button', { 'sorting__button--active': activeSort === 'size' }]"
            @click="setSort('size')"
        >
                Size
        </button>
    </div>
</template>

<style scoped>
/* Container for the filter */
.sorting {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: var(--border-radius-regular);
    overflow: hidden;
}

/* Styling for the filter button */
.sorting__button {
    color: var(--color-background-2);

    background-color: var(--color-tertiary-dark);
    width: 100%;
    padding: 10px;
}

/* Active state*/
.sorting__button--active {
    background-color: var(--color-primary);
}
</style>