import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getPets } from '../../../redux/features/Pets/petsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllPetList.scss'
import DOMPurify from 'dompurify';

const AllPetList = () => {
    const dispatch = useDispatch();
    const { pets, isLoading, isError, message } = useSelector(state => state.pet);
    const navigate = useNavigate();

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
            <h2>Adopt Pet</h2>
            {pets.map(pet => (
                <div key={pet.id} className="pet-card">
                    <h3>{pet.title}</h3>
                    <img src={pet.image?.filePath} alt={pet.title} />
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pet.description) }} />
                    <button onClick={() => navigate('/PetAdoptionForm')} className="adopt-now-btn">Adopt now</button>
                </div>
            ))}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AllPetList;
