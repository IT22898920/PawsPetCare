import React, { useState } from 'react';
import axios from 'axios';

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    cname: '',
    caddress: '',
    cnumber: '',
    description: ''
  });
  const { cname, caddress, cnumber, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/useradoptions/', formData);
      console.log(res.data); // Assuming you want to log the response
      // Optionally, you can redirect the user or show a success message here
      const petId = res.data._id; // Get the ID from the response data
      window.location = `/adoptSchedule/${petId}`;
      if (res.ok) {
        
      }
      
    } catch (err) {
      console.error(err.response.data);
      // Handle error: show error message to the user
    }
  };

  return (
    <div>
      <h2>Submit Adoption Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="cname"
            value={cname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="caddress"
            value={caddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="cnumber"
            value={cnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PetAdoptionForm;
