import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import PetForm from "../../components/pet/PetForm/PetForm";
import {
  getPet,
  selectPetById,
  selectIsLoading,
  updatePet,
  getPets,
} from "../../redux/features/Pets/petsSlice";

const EditPets = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const petEdit = useSelector(state => selectPetById(state, id));

  // Initialize state with default values to ensure all inputs are controlled.
  const [pet, setPet] = useState({
    name: "",
    price: "",
  });
  const [petImage, setPetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  useEffect(() => {
    console.log("Fetching pet with ID:", id);
    dispatch(getPet(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    console.log("Pet data from store:", petEdit);
    if (petEdit) {
      setPet({
        name: petEdit.name || "",
        price: petEdit.price || "",
      });
      setDescription(petEdit.description || "");
      setImagePreview(petEdit.image ? URL.createObjectURL(petEdit.image) : null);
    }
  }, [petEdit]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const savePet = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", pet.name);
    formData.append("price", pet.price);
    formData.append("description", description);
    if (petImage) {
      formData.append("image", petImage);
    }

    await dispatch(updatePet({ id, formData }));
    await dispatch(getPets()); // Refresh the list after update
    navigate("/pet-dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3>Edit Pet</h3>
      <PetForm
        pet={pet}
        petImage={petImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        savePet={savePet}
      />
    </div>
  );
};

export default EditPets;
