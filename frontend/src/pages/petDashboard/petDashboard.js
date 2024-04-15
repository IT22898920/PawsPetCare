import React from 'react'
import {useDispatch, useSelecetor} from "react-redux"
import {getPets} from '../../redux/features/Pets/petsSlice'
import petList from '../../components/pet/petList/petList'
import petSummary from '../../components/pet/petSummary/petSummery'



const petDashboard = () => {
  const dispatch = useDispatch();
  const { pet, isLoading, isError, message } = useSelecetor((state) => state.pet);

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
      
      <h2>petDashboard</h2>
      <petSummary pet = {pet}/>
      <petList pet = {pet} isLoading = {isLoading} />

    </div>
  )
}

export default petDashboard
