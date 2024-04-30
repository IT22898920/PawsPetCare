import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./petForm.scss";
import Card from "../../card/Card"


const petForm = ({
  pet, 
  petImage, 
  imagePreview,
  description,
  setDescription,
   handleInputChange,
    handleImageChange,
     savePet,
    }) => {
  return (
    <div className='add-pet'>
    <Card cardClass={"card"}>
          <form onSubmit={savePet}>
            <Card cardClass={"group"}>
              <label >Pet Image</label>
              <code className='--color-dark'>Supported Formats: jpg, jpeg, png</code>
              <input type='file'
               name='image'
                onChange={(e) =>handleImageChange(e)}
                />

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

            <label>Pet category :</label>
            <input type='text' placeholder='Pet category' name='category' value={pet?.category} onChange={handleInputChange}/>

            <label>Pet price:</label>
            <input type='text' placeholder='Pet price' name='price' value={pet?.price} onChange={handleInputChange} />

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


export default petForm
