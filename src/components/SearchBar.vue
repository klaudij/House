<script setup>
/////////////////
// ALl imports //
////////////////
import { defineModel } from 'vue';

//to store the input field's value
const searchTerm = defineModel();

// Clear input field content when custom clear button is clicked
function clearSearch() {
  searchTerm.value = '';
}
</script>

<template>
  <div class="search-bar">
    <!-- Left-side search icon -->
    <span class="search-bar__icon"><img class="search-bar__icon-image" src="/src/assets/icons/ic_search@3x.png"
        alt="search"></span>

    <!-- Search input field -->
    <input
      type="search"
      v-model="searchTerm" 
      placeholder="Search for a houses" 
      aria-label="Search houses"
      @input="onInput" 
      class="search-bar__input"
    >

    <!-- Custom clear button, only shown when searchTerm is not empty -->
    <button
      v-if="searchTerm"
      @click="clearSearch"
      class="search-bar__clear-button"
      aria-label="Clear search"
      type="button"
    >
        <img class="search-bar__clear-icon" src="/src/assets/icons/ic_clear@3x.png" alt="clear">
    </button>
  </div>
</template>

<style scoped>
/* Container for the search bar */
.search-bar {
  background: var(--color-tertiary-light);
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  align-items: center;
  gap: 10px;
  padding: 4px 16px;
}

/* Search icon styling */
.search-bar__icon-image {
  width: 13px;
  height: auto;
}

/* Search input field styling */
input[type="search"] {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
}

/* Override default browser cancel (x) button */
input[type="search"]::placeholder {
  color: var(--color-tertiary-dark)
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

/* Custom clear button */
.search-bar__clear-icon {
  width: 15px;
  height: auto;
  margin-top: 1px;
  display: block;
}

@media (min-width: 1024px) {
  .search-bar {
    padding: 10px 20px;
    gap: 15px;
  }

  .search-bar__icon-image {
    width: 18px;
    margin-top: 4px;
  }

  .search-bar__clear-icon {
    width: 20px;
  }
}
</style>