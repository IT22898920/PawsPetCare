import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '../../redux/features/Pets/petsSlice';
import PetList from '../../components/pet/petList/petList';
import PetSummary from '../../components/pet/petSummary/petSummery';

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
      <PetSummary pet={pets} />
      <PetList pet={pets} isLoading={isLoading} />
    </div>
  );
};

export default PetDashboard;
