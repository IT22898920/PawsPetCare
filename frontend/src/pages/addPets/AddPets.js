import React, { useState } from 'react'
import PetForm from "../../components/PetForm/PetForm";

import {useSelector} from "react-redux";
import { selectIsLoading } from '../../redux/features/Pets/petsSlice';


const initialState = {

    name : "",
    category: "",
    price: "",

}


const AddPets = () => {

      const [pets, setPet]= useState(initialState)
    const [petImage, setPetImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")


    const isLoading = useSelector(selectIsLoading);

    const {name, category, price} = pet
    


  return (
    <div>
   <h3 className="--mt">Add new Pet</h3>
   <PetForm/>


    </div>

  );
  
};

export default AddPets
