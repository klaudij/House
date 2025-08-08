<script setup>
/////////////////
// ALl imports //
////////////////
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'

// Importing UI components used
import ActionBtns from './ActionBtns.vue';

// Props this componetns use
const props = defineProps({
  house: Object, // containt data
  showActions: {
    type: Boolean,
    default: true, // Show edit/delete buttons by default
  },
  detailPageStyle: Boolean, // Used for styling in Detail page (desktop v.)
})

// Navigate to the detailed house page
const router = useRouter()
function goToDetail(houseId) {
  router.push({ name: 'HouseDetail', params: { id: houseId } })
}
</script>

<template>
    <div class="card" @click="goToDetail(house.id)">
        <div class="card__content">
            <!-- Image on the left -->
            <img class="card__image" :src="house.image" alt="">

            <!-- Info block in the middle -->
            <div class="card__details">
                <div class="card__text">
                    <h2 class="card__streetname">{{ house.location.street }} {{ house.location.houseNumber }}</h2>
                    <p class="card__price">€ {{ house.price }}</p>
                    <p class="card__location">{{ house.location.zip }} {{ house.location.city }}</p>
                </div>
                <div class="card__specs">
                    <p class="card__spec card__spec--bedroom">{{ house.rooms.bedrooms }}</p>
                    <p class="card__spec card__spec--bathroom">{{ house.rooms.bathrooms }}</p>
                    <p class="card__spec card__spec--size">{{ house.size }}m²</p>
                </div>
            </div>
        </div>

        <!-- Delete/edit icon on the right -->
         <ActionBtns
            v-if="showActions && house.madeByMe"
            :house-id="house.id"
            @request-delete="$emit('request-delete', $event)" 
            />
    </div>
</template>

<style scoped>
/* Container for the card */
.card {
    background-color: var(--color-background-2);
    display: flex;
    flex-direction: row;
    align-items: self-start;
    justify-content: space-between;
    padding: 15px;
    border-radius: var(--border-radius-regular);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
}
.card:last-of-type {
    margin-bottom: 90px;
}
/* Styling for inside the card */
.card__content {
    display: flex;
    flex-direction: row;
    gap: 14px
}
.card__image {
    width: 90px;
    height: 90px;
    border-radius: 5px;
    object-fit:cover;
    object-position: 5% 100%;
}
.card__details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card__text {
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.card__location {
    color: var(--color-tertiary-dark)
}
.card__specs {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.card__spec {
      display: flex;
      align-items: center; 
      gap: 5px;
}
/* Adding decoration icons */
.card__spec::before {
  content: '';
  width: 14px;
  height: 14px;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
}
.card__spec--bedroom::before{
  background-image: url('../assets/icons/ic_bed@3x.png');    
}
.card__spec--bathroom::before {
  background-image: url('../assets/icons/ic_bath@3x.png');
}
.card__spec--size::before {
  background-image: url('../assets/icons/ic_size@3x.png');
}

/* Desktop styling */
@media (min-width: 1024px)  {
    .card {
        padding: 25px 22px;
    }
    .card__image {
        width: 150px;
        height: 150px;
    }
    .card__details {
        justify-content: flex-start;
        gap: 12px;
    }
    .card__text {
        gap: 10px;
    }
    .card__spec--bedroom::before{
    margin-top: 5px;
    }

     /*For the styling on desktop in Detail page */
     .compact-style {
        padding: 15px ;
     }
     .compact-style .card__content .card__image {
        width: 90px;
        height: 90px;
     }
     .compact-style .card__details {
        gap: 5px;
     }
     .compact-style .card__details .card__text {
        gap: 5px;
     }
    .compact-style .card__details h2 {
        font-size: var(--fs-back-button-desktops);
    }
    .compact-style  .card__details p {
        font-size: var(--fs-body-mobile)
    }
}
</style>