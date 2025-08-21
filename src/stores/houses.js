import { defineStore } from 'pinia'
import { ref } from 'vue'

// API URL & KEY
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const useHouseStore = defineStore('houses', () => {
  // all data
  const houses = ref([])

  // FOR FETCHING DATA
  async function fetchHouses() {
    const response = await fetch(API_URL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    const data = await response.json()

    houses.value = data
  }

  // FOR DELETING HOUSE
  async function deleteHouse(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Api-Key': API_KEY,
        },
      })
      if (response.ok) {
        await fetchHouses() // refresh list
      } else {
        console.error('Failed to delete house')
      }
    } catch (err) {
      console.error('Error deleting house:', err)
    }
  }

  // FOR CREATING NEW LIST //
  async function createListing(houseData, imageFile) {
    try {
      // create house list w/o image
      const houseResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY
        },
        body: houseData
      })

      const data = await houseResponse.json()

      if (houseResponse.ok) {
        // then upload image
        const houseImage = new FormData()
        houseImage.append('image', imageFile)

        const imageUploadResponse = await fetch(`${API_URL}/${data.id}/upload`, {
          method: 'POST',
          headers: {
            'X-Api-Key': API_KEY,
          },
          body: houseImage
        })

        if (imageUploadResponse.ok) {
          houses.value.push(data)
          return data
        } else {
          console.error('Image upload failes')
        }
      } else {
        console.error('House creation failed:', data)
      }
    } catch (err) {
      console.error('Error creating listing:', err)
    }
  }

  // FOR FETCHING HOUSE ID //
  async function fetchHouseById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY,

        }
      })
      const data = await response.json()
      return data.length > 0 ? data[0] : null

    } catch (error) {
      console.error(error)
    }
    
  }

  // FOR EDITING EXCISTING LIST //
  async function updateListing(id, houseData, imageFile) {
  try {
    // update house fields
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY },
      body: houseData
    })

    if (response.ok || imageFile) {
      const imageUpload = new FormData()
      imageUpload.append('image', imageFile)

      await fetch(`${API_URL}/${id}/upload`, {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY },
        body: imageUpload
      })
    }

  } catch (error) {
    console.error(error)
  }
}

  return {
    houses,
    fetchHouses,
    deleteHouse,
    createListing,
    fetchHouseById,
    updateListing
  }
})