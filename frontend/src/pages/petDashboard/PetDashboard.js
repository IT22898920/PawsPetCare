import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPets } from "../../redux/features/Pets/petsSlice";
import PetList from "../../components/pet/petList/PetList";
import PetSummary from "../../components/pet/petSummery/PetSummary"; // Adjust import based on actual file name

const PetDashboard = () => {
  const dispatch = useDispatch();
  const { pets, isLoading, isError, message } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  return (
    <div>
      <h2>Pet Dashboard</h2>
      <PetSummary pets={pets} />
      <PetList pets={pets} isLoading={isLoading} />
    </div>
  );
};

export default PetDashboard;
