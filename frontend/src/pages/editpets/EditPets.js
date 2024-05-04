import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import PetForm from "../../components/pet/PetForm/PetForm";
import {
  getPet,
  getPets,
  selectIsLoading,
  selectPets,
  updatePet,
} from "../../redux/features/Pets/petsSlice";

const EditPets = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
  
    const petEdit = useSelector(selectPets);
  
    // Initialize state with default values to ensure all inputs are controlled.
    const [pet, setPet] = useState({
      name: "",
    });
    const [petImage, setPetImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
  
    // Fetch pet data when component mounts or id changes.
    useEffect(() => {
      if (id) {
        dispatch(getPet(id));
      }
    }, [dispatch, id]);
  
    // Update local state when petEdit changes, e.g., after fetching data.
    useEffect(() => {
      if (petEdit) {
        setPet({
          name: petEdit.name,
          price:petEdit.price,
        });
        setDescription(petEdit.description ? petEdit.description : "");
        setImagePreview(petEdit.image ? petEdit.image.filePath : null);
      }
    }, [petEdit]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPet({ ...pet, [name]: value });
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
      formData.append("description", description);
      if (petImage) {
        formData.append("image", petImage);
      }
  
      await dispatch(updatePet({ id, formData }));
      await dispatch(getPets());
      navigate("/pet-dashboard");
    };
  
    return (
      <div>
        {isLoading && <Loader />}
        <h3 className="--mt">Edit Pet</h3>
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
}

export default EditPets;
