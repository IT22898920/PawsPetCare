import React, { useState } from 'react'
import PetForm from "../../components/pet/PetForm/PetForm";
import {useDispatch, useSelector} from "react-redux";
import { createPet, selectIsLoading } from '../../redux/features/Pets/petsSlice';
import { useNavigate  } from 'react-router-dom';
import Loader from '../../components/loader/Loader';



const initialState = {

    name : "",
    category: "",
    price: "",

}


const AddPets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [pet, setPet]= useState(initialState)
    const [petImage, setPetImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")


    const isLoading = useSelector(selectIsLoading);
   

    const {name, category, price} = pet

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPet({ ...pet, [name]: value });
    };

    const handleImageChange= (e) =>{
      setPetImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))

    };

    const genarateSKU = (category)=>{
      const letter = category.slice(0, 3).toUpperCase()
      const number = Date.now()
      const sku = letter+ "-" + number

      return sku;
    }


    const savePet = async (e) =>{
      e.preventDefault(); // Fix the typo here
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", genarateSKU(category));
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", petImage);
    
      console.log(...formData);
      await dispatch(createPet(formData))

      navigate("/pet-dashboard");
      
     
    };
    
  
    


  return (
    <div>
      {isLoading && <Loader/>}
   <h3 className="--mt">Add new Pet</h3>
   <PetForm
      pet = {pet}
      petImage = {petImage}
      imagePreview = {imagePreview}
      description = {description}
      setDescription = {setDescription}
      handleInputChange = {handleInputChange}
      handleImageChange = {handleImageChange}
      savePet = {savePet}
     
   />
  


    </div>

  );
  
};

export default AddPets
