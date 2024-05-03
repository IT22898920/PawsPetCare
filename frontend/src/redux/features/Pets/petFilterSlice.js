import { createSlice } from '@reduxjs/toolkit'
import SearchPet from '../../../components/search-pets/SearchPet';


const initialState = {
    filteredPets : []

}

const petFilterSlice = createSlice({
  name: "petFilter",
  initialState,
  reducers: {


    FILTER_PETS(state, action){
         const {pets, SearchPet} = action.payload
         const tempPets = pets.filter((pet)=>pet.name.toLowerCase().includes(SearchPet.toLowerCase()) ||pet.category.toLowerCase().includes(SearchPet.toLowerCase()))

         state.filteredPets = tempPets;
    }

  }
});

export const {FILTER_PETS} = petFilterSlice.actions

export const selectFilteredpet = (state) => state.petFilter.filteredPets;

export default petFilterSlice.reducer