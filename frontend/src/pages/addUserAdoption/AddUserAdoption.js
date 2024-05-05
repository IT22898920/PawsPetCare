import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import PetAdoptionForm from '../../components/pet/petAdoptionFrom/PetAdoptionForm';
import { createUserAdoption, selectIsLoading } from '../../redux/features/userAdoption/userAdoptionSlice';
//import './AddProduct.scss'; // Make sure to rename or correct path if needed

const initialState = {
    cname: "",
    caddress: "",
    cnumber: "",
    errors: {} // Assuming you need to handle errors
};

const AddUserAdoption = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userAdoption, setUserAdoption] = useState(initialState);
    const [description, setDescription] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserAdoption(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const saveUserAdoption = async (e) => {
        e.preventDefault();  // This prevents the default form submission behavior
        console.log("Form submitted");  // Check if this message appears in the console
        const formData = new FormData();
        formData.append("cname", userAdoption.cname);
        formData.append("caddress", userAdoption.caddress);
        formData.append("cnumber", userAdoption.cnumber);
        formData.append("description", description);
        

        console.log(...formData); // For debugging purposes, remove in production

        await dispatch(createUserAdoption(formData));
        navigate("/AllPetList"); // Ensure this route is correct in your app
    };

    return (
        <div className="add-userAdoption-page">
            {isLoading && <Loader />}
            <h3 className="add-userAdoption-title">Add New User Adoption</h3>
            <PetAdoptionForm
                userAdoption={userAdoption}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                saveUserAdoption={saveUserAdoption}
            />
        </div>
    );
};

export default AddUserAdoption;
