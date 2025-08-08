<script setup>
// Importing Vue reactivity tools
import { ref, onMounted, computed } from 'vue';

// Importing UI components
import MobileHeader from '@/components/header/MobileHeader.vue';
import SearchBar from '@/components/SearchBar.vue';
import Sorting from '@/components/Sorting.vue';
import HouseCard from '@/components/HouseCard.vue';
import DeleteHousePopUp from '@/components/DeleteHousePopUp.vue';

//RETRIEVING HOUSE DATA 
import { useHouseStore } from '@/stores/houses.js'
const HouseStore = useHouseStore()

/////////////////////////////////////
// Load data when component mounts //
//////////////////////////////////////
onMounted(() => {
  HouseStore.fetchHouses()
})

///////////////////
// search logic //
/////////////////
const searchTerm = ref('')

function getFilteredHouses(houses, searchTerm) {
  // return all houses if nothing is searched
  if (!searchTerm) return houses;

  const term = searchTerm.toLowerCase();

  // Filter the hosues
  return houses.filter(function (house) {
    if (!house.location) return false;

    const address =
      house.location.street + " " +
      house.location.houseNumber + " " +
      house.location.zip + " " +
      house.location.city;

    return address.toLowerCase().includes(term);
  });
}
const filteredHouses = computed(() => {
  return getFilteredHouses(HouseStore.houses || [], searchTerm.value);
});

///////////////////
// sorting logic //
/////////////////
const sortBy = ref('price')
const sortedHouses = computed (() => {
  let houses = getFilteredHouses(HouseStore.houses || [], searchTerm.value);

  if (sortBy.value === 'price') {
    houses.sort((a,b) => b.price - a.price) // High to low
  } else if (sortBy.value === 'size') {
    houses.sort((a, b) => b.size - a.size) // Large to small
  }
  return houses
})
function handleSortChanged (k) {
  sortBy.value = k
}

//////////////////////////////
// Delete confirmation flow //
//////////////////////////////
// Show or hide the delete popup
const showPopUp = ref(false)

// Save the ID of the house we want to delete
const selectedHouseId = ref(null)

// When delete is requested, open the popup & stores house ID to delete
function handleDeleteRequest(id) {
  selectedHouseId.value = id
  showPopUp.value = true
}

// When clicking on delete button
// Deletes the house from the store and navigates back home
function confirmDelete(id) {
  // console.log('Delete confirmed for house:', id)
  showPopUp.value = false
   // Call delete from store
  HouseStore.deleteHouse(id)
}
</script>

<template>
  <div class="container">
    <!-- Mobile header with 'Create new' button -->
    <MobileHeader title="Houses" :newListButton="true" />

    <!-- Mobile header with 'Create new' button -->
    <div class="page-header desktop-only">
      <!-- Page title -->
      <h1>Houses</h1>

      <!-- Navigation to the 'Create new house' form -->
      <router-link
        :to="`/create`" 
        class="page-header__action" 
      >
        <img src="/src/assets/icons/ic_plus_white@3x.png" alt="Upload icon">
        <button  aria-label="Add new house">Create new</button>
      </router-link>
    </div>

    <!-- Controls: search bar and sorting buttons -->
    <div class="house-controls">
      <!-- Search bar component-->
      <SearchBar class="house-controls__search" v-model="searchTerm" />

      <!-- Sorting component -->
      <Sorting 
        class="house-controls__sorting"
        @sort-changed="handleSortChanged"
    />
    </div>

    <!-- Show number of results found -->
     <p v-if="searchTerm && filteredHouses.length > 0" class="results-found">
      {{ filteredHouses.length }} results found
     </p>

    <!-- House Cards component-->
    <HouseCard
      v-for="house in sortedHouses"
      :key="house.id" 
      :house="house"
      @request-delete="handleDeleteRequest"
    />

    <!-- Empty state -->
    <div class="empty-state" v-if="filteredHouses.length === 0 && searchTerm">
      <img src="/src/assets/icons/img_empty_houses@3x.png" alt="No result found" />
      <p>No results found.<br />Please try another keyword.</p>
    </div>

    <!-- Pop up component-->
    <DeleteHousePopUp
      v-if="showPopUp"
      :house-id="selectedHouseId"
      @confirm="confirmDelete"
      @close="showPopUp = false"
    />
  </div>
</template>

<style scoped>
.results-found {
  font-weight: var(--weight-bold);
  font-size: var(--fs-body-desktop);
}
.empty-state {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 12vh;
}
.empty-state img {
  width: 230px;
}
.empty-state p {
  width: 200px;
  text-align: center;
}

.house-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* DESKTOP STYLING */
@media (min-width: 1024px) {
.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 20px 0;
}
.page-header__action {
  display: flex;
  flex-direction: row;
  align-items:center ;
  gap: 14px;

  background-color: var(--color-primary);
  padding: 10px 30px 10px 20px;
  border-radius: var(--border-radius-regular);
}
.page-header__action img {
  width: 16px;
  height: auto;
}
.page-header__action button {
  color: var(--color-background-2);
  text-transform: uppercase;
}

.house-controls {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.house-controls__search {
  width: 100%;
  max-width: 400px;
}
.house-controls__sorting {
  width: 100%;
  max-width: 250px;
}
.empty-state img {
  width: 420px;
}
.empty-state p {
  width: 300px;
}
}
</style>
