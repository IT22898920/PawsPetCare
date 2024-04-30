import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../../redux/features/Pets/petsSlice";
import PetList from '../../components/pet/petList/PetList';

const PetDashboard = () => {
  const dispatch = useDispatch();
  const { pets, isLoading, isError, message } = useSelector((state) => state.pet);  // Ensure this path is correct based on your store setup

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  useEffect(() => {
    console.log(pets);

    if (isError) {
      console.log(message);
    }
  }, [isError, message, pets]); // Add pets to dependency array to log changes

  return (
    <div>
      <h2>Pet Dashboard</h2>
      <PetList pets={pets} isLoading={isLoading} />
    </div>
  );
};

export default PetDashboard;
