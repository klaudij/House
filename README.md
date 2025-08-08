# DTT Houses App

A Vue 3 + Pinia application for listing, searching, sorting, creating, editing and deleting houses.  
This project uses the **DTT Houses API**.

---

## Features
- View all houses
- Search by address, city or postal code
- Sort by price or size
- Create new house listings (with image upload)
- Edit existing listings
- Delete listings
- View About

---

## Environment Variables

This project uses a `.env` file to store sensitive data such as API keys.  
Make sure you create this file in the project root before running the project.

Example `.env` file: <br>
VITE_API_URL=https://api.intern.d-tt.nl/api/houses <br>
VITE_API_KEY=YOUR_API_KEY_HERE


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
