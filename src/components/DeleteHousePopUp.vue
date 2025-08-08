<script setup>
/////////////////
// ALl imports //
/////////////////
import { defineProps } from 'vue';

// Props passed from parent
const { houseId } = defineProps({
  houseId: [String, Number],
})
// sending events to parent: confirm and cancel
const emit = defineEmits(['confirm', 'close'])

// called when cicking on 'Yes, Delete'. Sends houseId for deletion
function confirmDelete() {
  emit('confirm', houseId)
}

//Called when clicking "Go back". Closes the popup 
function closePopUp() {
  emit('close')
}
</script>

<template>
<div class="overlay">
    <div class="popup">
        <h2 class="popup__title">Delete listing</h2>

        <p class="popup__message">Are you sure you want to delete this listing?
            This action cannot be undone.
        </p>

        <div class="popup__buttons">
            <!-- Confirm deletion -->
            <button
                class="popup__button popup__button--confirm"
                @click="confirmDelete"
            >
                Yes, Delete
            </button>

            <!-- Cancel -->
            <button
                class="popup__button popup__button--cancel"
                @click="closePopUp"
            >
                Go back
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Styling for the pop-up message */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  
  /* Center popup horizontally and vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* The popup box styling */
.popup {
    background-color: var(--color-background-2);
    padding: 30px;
    border-radius: var(--border-radius-regular);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    width: 100%;
    max-width: 465px;
    margin: 0 20px;
}
.popup__title {
    font-size: var(--fs-h1-mobile);
}
.popup__message {
    width: 260px;
}
.popup__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
}
.popup__button {
    background-color: var(--color-secondary);
    color: var(--color-background-2);
    text-transform: uppercase;
    padding:14px  20px;
    border-radius: var(--border-radius-regular);

    width: 100%;
    max-width: 206px;
}
.popup__button--confirm {
    background-color: var(--color-primary);
}

/* Desktop styling */
@media (min-width: 1024px) {
    .popup {
        padding: 50px;
        gap: 40px;
        max-width: 660px;
    }
    .popup__title {
        font-size: var(--fs-h2-desktop);
    }
    .popup__message  {
        width: 100%;
        max-width: 400px;
        margin-bottom: 10px;
    }
    .popup__buttons  {
        gap: 25px;
    }
    .popup__button {
        max-width: 400px;
    }
    
}
</style>