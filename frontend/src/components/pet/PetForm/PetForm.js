import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./petForm.scss";
import Card from '../../card/Card';

const PetForm = ({
  pet, 
  petImage, 
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  savePet,
}) => {
 
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');

 
  const validateInputs = () => {
    let isValid = true;

    if (!pet.name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }


    if (!pet.category.trim() || !['cats', 'dogs'].includes(pet.category.toLowerCase())) {
      setCategoryError('Category must be either "cats" or "dogs"');
      toast.error('Category must be either "cats" or "dogs"');
      isValid = false;
    } else {
      setCategoryError('');
    }

    if (!pet.price.trim() || isNaN(pet.price) || parseInt(pet.price) < 1) {
      setPriceError('Price must be a number greater than or equal to 1');
      isValid = false;
    } else {
      setPriceError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
  
      savePet();
    }
  };

  return (
    <div className='add-pet'>
      <Card cardClass={"card"}>
        <form onSubmit={handleSubmit}>
          <Card cardClass={"group"}>
            <label >Pet Image</label>
            <code className='--color-dark'>Supported Formats: jpg, jpeg, png</code>
            <input type='file' name='image' onChange={handleImageChange} />

            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt="pet" />
              </div>
            ): (
              <p>No image set for this pet.</p>
            )}
          </Card>

          <label>Pet name :</label>
          <input type='text' placeholder='Pet name' name='name' value={pet?.name} onChange={handleInputChange}/>
          {nameError && <p className="error">{nameError}</p>}

          <label>Pet category :</label>
          <input type='text' placeholder='Pet category' name='category' value={pet?.category} onChange={handleInputChange}/>
          {categoryError && <p className="error">{categoryError}</p>}

          <label>Pet price:</label>
          <input type='text' placeholder='Pet price' name='price' value={pet?.price} onChange={handleInputChange} />
          {priceError && <p className="error">{priceError}</p>}

          <label>Pet description:</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription}  />

          <div className='--my'>
            <button type='submit'  className='--btn --btn-primary'>
              save Pet
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PetForm;
