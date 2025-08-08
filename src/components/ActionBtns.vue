<script setup>
/////////////////
// ALl imports //
/////////////////
import { defineProps, defineEmits } from 'vue';

/**
 * Import ActionBtns in other 
 * componetns/pages and choose the icons
 * If true, use white icons instead of default ones
 * ID of the house (needed for edit or delete actions)
 **/
const props = defineProps({
  whiteIcons: {
    type: Boolean,
    default: false,
  },
  houseId: {
    type: [String, Number],
    required: true,
  }
})

//////////////////////////
// Emit event to parent //
//////////////////////////
const emit = defineEmits(['request-delete'])

// Called when the delete button is clicked, to send signal to delete house
function confirmDelete() {
  emit('request-delete', props.houseId)
}
</script>

<template>
  <div class="card__actions">
    <!-- Edit button: navigates to the Edit page of the current house -->
    <router-link :to="`/house/${houseId}/edit`" class="edit-button">
      <img
        :src="whiteIcons ? '/src/assets/icons/ic_edit_white@3x.png' : '/src/assets/icons/ic_edit@3x.png'"
        alt="Edit listing"
        @click.stop
      />
    </router-link>

    <!-- Delete button: opens pop-up to confirm deletion -->
    <button @click.stop="confirmDelete" class="delete-button">
      <img
        :src="whiteIcons ? '/src/assets/icons/ic_delete_white@3x.png' : '/src/assets/icons/ic_delete@3x.png'"
        alt="Delete listing"
      />
    </button>
  </div>
</template>

<style scoped>
/* styling for the action buttons */
.card__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}
.card__actions img {
    width: 16px;
    height: auto;
}

/* Desktop styling */
@media (min-width: 1024px) {
  .card__actions {
    gap: 15px;
  }
  .card__actions img {
    width: 18px;
  }
}
</style>