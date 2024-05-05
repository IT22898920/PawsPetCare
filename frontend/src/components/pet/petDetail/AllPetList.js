import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '../../../redux/features/Pets/petsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllpetList.scss'

const AllPetList = () => {
    const dispatch = useDispatch();
    const { pets, isLoading, isError, message } = useSelector(state => state.pet);
    console.log('Pets from state:', pets); 
    
    useEffect(() => {
        dispatch(getPets());
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);
    
    useEffect(() => {
        console.log(pets); 
    }, [pets]);
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!pets.length) {
        return <p>No pets found!</p>;
    }

    return (
        <div className="pet-grid">
            {pets.map(pet => (
                <div key={pet.id} className="pet-card">
                    <h3>{pet.title}</h3>
                    <img src={pet.image?.filePath} alt={pet.name} />
                    <p>{pet.description}</p>
                </div>
            ))}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AllPetList;

