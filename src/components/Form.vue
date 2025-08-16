<script setup>
/////////////////
// ALl imports //
////////////////
import { ref, computed, defineProps, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/houses.js'

// Importing UI components
import ErrorText from './ErrorText.vue'

// Retrvies functions from @/stores/houses.js
const houseStore = useHouseStore()

//Props & router
const props = defineProps({
  houseId: String
})

const router = useRouter()

///////////////
// Form data //
///////////////
const streetName = ref('')
const houseNumber = ref('')
const addition = ref('')
const postalCode = ref('')
const city = ref('')
const price = ref('')
const size = ref('')
const garage = ref('')
const bedrooms = ref('')
const bathroom = ref('')
const construction = ref('')
const description = ref('')
const image = ref(null)

//////////////////////////
// FOR THE ERROR STATES //
//////////////////////////
const errors = reactive({
  streetName: false,
  houseNumber: false,
  postalCode: false,
  city: false,
  price: false,
  size: false,
  garage: false,
  bedrooms: false,
  bathroom: false,
  construction: false,
  description: false,
  image: false,

})
// CHECKS TO SEE IF FIELDS ARE EMPTY
function validateField(field) {
  if (field === 'streetName') {
    errors.streetName = streetName.value.trim() === ''
  }

  if (field === 'houseNumber') {
    errors.houseNumber = houseNumber.value.trim() === ''
  }

  if (field === 'postalCode') {
    errors.postalCode = postalCode.value.trim() === ''
  }

  if (field === 'city') {
    errors.city = city.value.trim() === ''
  }

  if (field === 'price') {
    errors.price = price.value === ''
  }

  if (field === 'size') {
    errors.size = size.value === ''
  }

  if (field === 'garage') {
    errors.garage = garage.value === ''
  }

  if (field === 'bedrooms') {
    errors.bedrooms = bedrooms.value === ''
  }

  if (field === 'bathroom') {
    errors.bathroom = bathroom.value === ''
  }

  if (field === 'construction') {
    errors.construction = construction.value === ''
  }

  if (field === 'description') {
    errors.description = description.value.trim() === ''
  }

  if (field === 'image') {
    errors.image = image.value === null || image.value === ''
  }
}
// FOR FORM BUTTON - turns active if all fields al filled in
const isFormValid = computed(() => {
  return (
    streetName.value &&
    houseNumber.value &&
    postalCode.value &&
    city.value &&
    price.value &&
    size.value &&
    garage.value &&
    bedrooms.value &&
    bathroom.value &&
    construction.value &&
    description.value &&
    image.value
  )
})

// HOLDS TO SEE IF NEEDS TO USE FORM FOR CREATING NEW LIST OR EDIT LIST
const isEditing = computed(() => !!props.houseId)

async function handleSubmit(e) {
  e.preventDefault()
  if (!image.value && !isEditing.value) {
    errors.value = true
    return
  }

  if (isEditing.value) {
    await updateListing() // edit mode
  } else {
    await createListing() // create new
  }
}

////////////////////////////
// FOR CREATING NEW LIST //
///////////////////////////
async function createListing() {
  // Create a new FormData object to hold form fields
  const HouseData = new FormData()
  // Append all the form values to the FormData object
  HouseData.append('streetName', streetName.value)
  HouseData.append('houseNumber', houseNumber.value)
  HouseData.append('numberAddition', addition.value)
  HouseData.append('zip', postalCode.value)
  HouseData.append('city', city.value)
  HouseData.append('price', price.value)
  HouseData.append('size', size.value)
  HouseData.append('hasGarage', garage.value === 'yes')
  HouseData.append('bedrooms', bedrooms.value)
  HouseData.append('bathrooms', bathroom.value)
  HouseData.append('constructionYear', construction.value)
  HouseData.append('description', description.value)

  try {
    // using createListing() from houses.js to create new listing
    const created = await houseStore.createListing(HouseData, image.value)
    // Navigate to new listing page if succesful
    router.push(`/house/${created.id}`)
  } catch (error) {
    console.error('Error creating house listing:', error)
  }
}

/////////////////////////////////
// FOR EDITING EXCISTING LIST //
///////////////////////////////
async function updateListing() {
  // Create a new FormData object to hold form fields
  const houseData = new FormData()
  // Append all the form values to the FormData object
  houseData.append('streetName', streetName.value)
  houseData.append('houseNumber', houseNumber.value)
  houseData.append('numberAddition', addition.value)
  houseData.append('zip', postalCode.value)
  houseData.append('city', city.value)
  houseData.append('price', price.value)
  houseData.append('size', size.value)
  houseData.append('hasGarage', garage.value === 'yes')
  houseData.append('bedrooms', bedrooms.value)
  houseData.append('bathrooms', bathroom.value)
  houseData.append('constructionYear', construction.value)
  houseData.append('description', description.value)

  try {
    // using updateListing() from houses.js to update listing
    await houseStore.updateListing(props.houseId, houseData)
    // Navigate to new listing page if succesful
    router.push(`/house/${props.houseId}`)
  } catch (error) {
    console.error('Error updating house listings:', error)
  }
}

///////////////////////////
// FOR CUSTOM IMG UPlOAD //
///////////////////////////
const previewUrl = ref(null)

// ADD IMG FUNCION
function handleImageUpload(event) {
  // Grabs first selected file from the input
  const file = event.target.files[0]

  // checking if its png or jpeg
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    // Create a preview URL to see preview img
    previewUrl.value = URL.createObjectURL(file)
    image.value = file   // stores the image
    validateField('image')
  } else {
    previewUrl.value = null
    image.value = null   // reset
  }
}
// REMOVE IMG FUNCION
function removeImage() {
  // Remove the preview from form
  previewUrl.value = null
  document.getElementById('picture').value = '' // clear file input
}

///////////////////////////////////
// FOR MOUNTING DATA INTO FIELDS //
///////////////////////////////////
onMounted(async () => {
  if (props.houseId) {
    try {
      const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${props.houseId}`, {
        headers: {
          'X-Api-Key': 'ErSOqjsmKLVAQDRydFI7aUn8NTx2Z-5i'
        }
      })
      const data = await response.json()

      if (response.ok && data.length > 0) {
        const house = data[0]

        streetName.value = house.location?.street || ''
        houseNumber.value = house.location?.houseNumber || ''
        postalCode.value = house.location?.zip || ''
        city.value = house.location?.city || ''
        price.value = house.price || ''
        size.value = house.size || ''
        garage.value = house.hasGarage ? 'yes' : 'no'
        bedrooms.value = house.rooms?.bedrooms || ''
        bathroom.value = house.rooms?.bathrooms || ''
        construction.value = house.constructionYear || ''
        description.value = house.description || ''
        previewUrl.value = house.image || ''
      } else {
        console.error('Failed to load house data')
      }
    } catch (error) {
      console.error(error)
    }
  }
})
</script>

<template>
  <!-- FORM -->
  <form @submit="handleSubmit" class="form">
    <div class="form-group">
      <label for="streetName">Street name*</label>
      <input
        id="streetName"
        type="text"
        v-model="streetName"
        placeholder="Enter the street name"
        required
        @blur="validateField('streetName')"
        :class="{ 'error-border': errors.streetName }"
      />
      <ErrorText :show="errors.streetName" />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="houseNumber">House number*</label>
        <input
          id="houseNumber"
          type="text"
          v-model="houseNumber"
          placeholder="Enter the house number"
          @blur="validateField('houseNumber')"
          :class="{ 'error-border': errors.houseNumber }"
          required
        >
        <ErrorText :show="errors.houseNumber" />
      </div>

      <div class="form-group">
        <label for="addition">Addition (optional)</label>
        <input id="addition" type="text" v-model="addition" placeholder="e.g. A">
      </div>
    </div>

    <div class="form-group">
      <label for="postalCode">Postal code*</label>
      <input
        id="postalCode"
        type="text"
        v-model="postalCode"
        placeholder="e.g. 1000 AA" required
        @blur="validateField('postalCode')"
        :class="{ 'error-border': errors.postalCode }"
      >
      <ErrorText :show="errors.postalCode" />
    </div>

    <div class="form-group">
      <label for="city">City*</label>
      <input
        id="city"
        type="text"
        v-model="city"
        placeholder="e.g. Utrecht" required
        @blur="validateField('city')"
        :class="{ 'error-border': errors.city }"
      >
      <ErrorText :show="errors.city" />
    </div>

    <div class="form-group">
      <label for="picture">Upload picture(PNG or JPG)*</label>

      <!-- Upload container -->
      <div class="upload-box">
        <!-- If there is an img uploaded -->
        <div
          v-if="previewUrl"
          class="preview-container"
        >
            <img
              :src="previewUrl"
              alt="Uploaded image"
              class="preview-image"
            />

            <button
              class="remove-btn"
              @click="removeImage"
            > 
              <img src="/src/assets/icons/ic_clear_white@3x.png"alt="remove">
            </button>
        </div>

        <!-- `otherwise show this -->
        <label
          v-else
          for="picture"
          class="upload-placeholder"
          :class="{ 'error-border': errors.image }"
        >
            <img src="/src/assets/icons/ic_plus_grey@3x.png" alt="plus icon" class="plus-icon" />
        </label>
      </div>
      <ErrorText :show="errors.image" />

      <input
        id="picture"
        type="file" 
        accept="image/png, image/jpeg" 
        @change="handleImageUpload"
        style="display: none"
      />
    </div>

    <div class="form-group">
      <label for="price">Price*</label>
      <input
        id="price"
        type="number"
        v-model="price"
        placeholder="e.g. €150.000" required
        @blur="validateField('price')"
        :class="{ 'error-border': errors.price }"
      >
      <ErrorText :show="errors.price" />

    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="size">Size*</label>
        <input
          id="size"
          type="number" 
          v-model="size" 
          placeholder="60m²" 
          required @blur="validateField('size')"
          :class="{ 'error-border': errors.size }"
        >
        <ErrorText :show="errors.size" />
      </div>

      <div class="form-group custom-select">
        <label for="garage">Garage*</label>
        <select 
          v-model="garage"
          id="garage" required
          @blur="validateField('garage')"
          :class="{ 'error-border': errors.garage }"
        >
            <option disabled value=""> Select</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
        </select>
        <ErrorText :show="errors.garage" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="bedrooms">Bedrooms*</label>
        <input
          id="bedrooms"
          type="number" 
          v-model="bedrooms" 
          placeholder="Enter amount" 
          required
          @blur="validateField('bedrooms')" 
          :class="{ 'error-border': errors.bedrooms }"
        >
        <ErrorText :show="errors.bedrooms" />
      </div>

      <div class="form-group">
        <label for="bathroom">Bathroom*</label>
        <input 
          id="bathroom" 
          type="number"
          v-model="bathroom"
          placeholder="Enter amount" 
          required
          @blur="validateField('bathroom')"
          :class="{ 'error-border': errors.bathroom }"
        >
        <ErrorText :show="errors.bathroom" />
      </div>
    </div>

    <div class="form-group">
      <label for="construction">Construction date*</label>
      <input
        id="construction" 
        type="number"
        v-model="construction"
        placeholder="e.g. 1990" required
        @blur="validateField('construction')"
        :class="{ 'error-border': errors.construction }"
      >
      <ErrorText :show="errors.construction" />
    </div>

    <div class="form-group">
      <label for="description">Description*</label>
      <textarea
        id="description" 
        v-model="description" 
        placeholder="Enter description" required
        @blur="validateField('description')" 
        :class="{ 'error-border': errors.description }"
      ></textarea>
      <ErrorText :show="errors.description" />
    </div>


    <!-- FORM BUTTON -->
    <button 
      type="submit" 
      :disabled="!isEditing && !isFormValid"
      :class="{ 'disabled-button': !isEditing && !isFormValid }"
    >
       {{ isEditing ? 'Save' : 'Post' }}
    </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px 0 90px 0;
  width: 100%;
  max-width: 450px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row input {
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

/* STYLING FOR ARROW/SPINNERS */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* STYLING FOR UPLOAD BUTTON */
form input[type="file"] {
  display: none;
}

.upload-box {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus-icon {
  margin-top: 4px;
  width: 30px;
  height: auto;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  border: 2px dashed var(--color-tertiary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
}

.preview-container {
  width: 106%;
  height: 104%;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: -12px;
  right: -12px;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
}

.remove-btn img {
  width: 30px;
  height: auto;
}

/* STYLING FOR FORM BUTTON */
form button {
  background-color: var(--color-primary);
  color: var(--color-background-2);
  text-transform: uppercase;
  border-radius: var(--border-radius-regular);
  padding: 12px;
  margin-top: 10px;
}

.disabled-button {
  opacity: 0.6;
  pointer-events: none;
}

/* FOR ERROR STATE */
.error-border {
  border: 1px solid red;
}

input.error-border::placeholder,
textarea.error-border::placeholder,
select.error-border::placeholder {
  color: red;
}

/* Desktop styling */
@media (min-width: 1024px) {
  form button {
    width: 50%;
    align-self: flex-end;
  }
}
</style>
