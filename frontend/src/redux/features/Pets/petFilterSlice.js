import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredPets: []
};

const petFilterSlice = createSlice({
  name: "petFilter",
  initialState,
  reducers: {
    FILTER_PETS(state, action) {
      const { pets, searchPet } = action.payload;

      // Check if searchPet is defined before calling toLowerCase
      const searchTerm = searchPet ? searchPet.toLowerCase() : '';

      const tempPets = pets.filter((pet) => {
        // Check if pet and pet.name are defined before accessing them
        return pet && pet.name && pet.name.toLowerCase().includes(searchTerm);
      });

      state.filteredPets = tempPets;
    }
  }
});

export const { FILTER_PETS } = petFilterSlice.actions;

export const selectFilteredPet = (state) => state.petFilter.filteredPets;

export default petFilterSlice.reducer;
