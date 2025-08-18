<script setup>
/////////////////
// ALl imports //
/////////////////
import { onMounted, ref, computed } from 'vue';
import { useHouseStore } from '@/stores/houses.js'
import { useRoute, useRouter } from 'vue-router'
import { formatPrice } from '@/utils/currencyFormat'

// Importing UI components 
import PreviousPageBtn from '@/components/PreviousPageBtn.vue';
import DesktopHeader from '@/components/header/DesktopHeader.vue';
import ActionBtns from '@/components/ActionBtns.vue';
import DeleteHousePopUp from '@/components/DeleteHousePopUp.vue';
import HouseCard from '@/components/HouseCard.vue';

// DIRECTS TO SPECIFIC HOUSE FOR DETAIL PAGE
const router = useRouter()
const route = useRoute()

//RETRIEVING DATA
const HouseStore = useHouseStore()

const houseId = computed(() => route.params.id)

const house = computed(() =>
  HouseStore.houses.find(h => String(h.id) === String(houseId.value))
);

/////////////////////////////////////
// Load data when component mounts //
//////////////////////////////////////
onMounted(async () => {
   await HouseStore.fetchHouses();
});

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
async function confirmDelete(id) {
  // console.log('Delete confirmed for house', id)
  showPopUp.value = false

  try {
    await HouseStore.deleteHouse(id)  // waiting for deletion to complete
    router.push('/')  // routing to Overview page
  } catch (error) {
    console.error('Failed to delete house', error)
  }
}
</script>

<template>
  <div class="center">
    <!-- Header for desktop -->
    <DesktopHeader class="dekstopheader" title="Back to overview" />

    <div class="house-details" v-if="house">
      <!-- House details -->
      <div class="house-detail__spec-row">
        <div class="house-detail__image">
          <img :src="house.image" alt="Header" class="house-detail__image-banner" />

          <div class="house-detail__image-actions mobile-only">
            <!-- Navigate back to previous page -->
            <PreviousPageBtn :lightBtn="true" />

            <!-- Edit/Delete button -->
            <ActionBtns
              v-if="house.madeByMe"
              whiteIcons
              :house-id="house.id"
              @request-delete="handleDeleteRequest" />
          </div>
        </div>

        <div class="container house-detail__content">
          <div class="house-detail-row">
            <h2 class="house-detail__street">{{ house.location.street }} {{ house.location.houseNumber }}</h2>
            <!-- Edit/Delete button -->
            <ActionBtns
              v-if="house.madeByMe"
              class="ActionBtns" 
              @request-delete="handleDeleteRequest"
              :house-id="house.id"
            />
          </div>

          <div class="house-detail__specs">
            <div class="spec-row">
              <p class="house-detail__spec house-detail__spec--location">{{ house.location.zip }} {{ house.location.city
              }}</p>
            </div>

            <div class="spec-row">
              <p class="house-detail__spec house-detail__spec--price">{{ formatPrice(house.price) }}</p>
              <p class="house-detail__spec house-detail__spec--size">{{ house.size }}m²</p>
              <p class="house-detail__spec house-detail__spec--construction">Built in {{ house.constructionYear }}</p>
            </div>

            <div class="spec-row">
              <p class="house-detail__spec house-detail__spec--bedroom">{{ house.rooms.bedrooms }}</p>
              <p class="house-detail__spec house-detail__spec--bathroom">{{ house.rooms.bathrooms }}</p>
              <p class="house-detail__spec house-detail__spec--garage">{{ house.hasGarage }}</p>
            </div>
          </div>

          <p class="house-detail__description">
            {{ house.description }}
          </p>
        </div>
      </div>

      <!-- Recommendation section -->
      <div class="container house-detail__recommendation">
        <h2>Recommended for you</h2>
        <HouseCard
          class="compact-style"
          v-for="recommended in HouseStore.houses.slice(0,3).filter(k => k.id !== houseId)"
          :key="recommended.id"
          :house="recommended"
          :showActions="false" />
      </div>

       <!-- Pop-up component -->
      <DeleteHousePopUp v-if="showPopUp" :house-id="selectedHouseId" @confirm="confirmDelete"
        @close="showPopUp = false" />
    </div>

    <div v-else class="loading">
      <p>Loading house details...</p>
    </div>
  </div>
</template>

<style scoped>
/* Container*/
.container {
  padding: 22px;
  gap: 15px;
}

.house-detail__image {
  position: relative;
  overflow: hidden;
}

.house-detail__image-banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.house-detail__image-actions {
  position: absolute;
  top: 6vh;
  left: 22px;
  right: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ActionBtns {
  gap: 25px;
}

.house-detail__content {
  position: relative;
  background-color: var(--color-background-2);
  border-radius: 20px 20px 0 0;

  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: -40px;
  z-index: 1;
}

.house-detail-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.house-detail__street {
    font-size: var(--fs-h1-mobile);
  }

.house-detail-row .ActionBtns {
  display: none;
}

.house-detail__specs {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
}

.spec-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}

.house-detail__spec {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Adding decoration icons */
.house-detail__spec::before {
  content: '';
  width: 14px;
  height: 14px;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
}

.house-detail__spec--location::before {
  background-image: url('../assets/icons/ic_location@3x.png');
}

.house-detail__spec--price::before {
  background-image: url('../assets/icons/ic_price@3x.png');
}

.house-detail__spec--size::before {
  background-image: url('../assets/icons/ic_size@3x.png');
}

.house-detail__spec--construction::before {
  background-image: url('../assets/icons/ic_construction_date@3x.png');
  margin-top:5px;
}

.house-detail__spec--bedroom::before {
  background-image: url('../assets/icons/ic_bed@3x.png');
  margin-top:5px;
}

.house-detail__spec--bathroom::before {
  background-image: url('../assets/icons/ic_bath@3x.png');
}

.house-detail__spec--garage::before {
  background-image: url('../assets/icons/ic_garage@3x.png');
}


/* FOR DESKTOP CHANGES */
@media (min-width: 1024px) {
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .house-detail__image-banner {
    height: 400px;
  }

  .house-details {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: var(--width-max);
    margin-bottom: 50px;
    padding: 0 20px;
  }

  .house-detail-row {
    margin-bottom: -5px;
  }

  .house-detail__street {
    font-size: var(--fs-h1-desktop);
  }

  .house-detail-row .ActionBtns {
    display: flex;
  }

  .house-detail__spec-row {
    width: 100%;
    max-width: 700px;
  }

  .house-detail__content {
    border-radius: 0;
    margin-top: 0;
    padding: 35px 30px;
    gap: 25px;
  }

  .house-detail__description {
    line-height: 1.6;
  }

  .house-detail__recommendation {
    width: 100%;
    max-width: 350px;
    padding: 0;
  }

  .house-detail__recommendation h2 {
    font-size: var(--fs-body-desktop);
  }

  .house-detail__recommendation .card p {
    font-size: 14px;
  }

  .dekstopheader {
    padding: 0 20px;
  }
}
</style>
