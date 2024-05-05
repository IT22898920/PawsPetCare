import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./petAdoptionForm.scss";
import Card from '../../card/Card';

const PetAdoptionForm = ({
  userAdoption, 
  description,
  setDescription,
  handleInputChange,
  saveUserAdoption,
  }) => {
  return (
    <div className='add-userAdoption'>
    <Card cardClass={"card"}>
    <form onSubmit={saveUserAdoption}>

            <label>User name :</label>
            <input type='text' placeholder='Enter your name' name='name' value={userAdoption?.cname} onChange={handleInputChange}/>

            <label>User Address :</label>
            <input type='text' placeholder='Enter Address' name='Address' value={userAdoption?.caddress} onChange={handleInputChange}/>

            <label>User Contact Number:</label>
            <input type='text' placeholder='Enter Contact Number' name='Number' value={userAdoption?.cnumber} onChange={handleInputChange} />

            <label>UserAdoption description:</label>
            <ReactQuill theme="snow" value={description} onChange={setDescription}  />


              <div className='--my'>
                <button type='submit'  className='--btn --btn-primary'>
                  Submit
                </button>
              </div>
          </form>
    </Card>
      
    </div>
  )
}


export default PetAdoptionForm
