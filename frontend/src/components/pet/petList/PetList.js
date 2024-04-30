import React from 'react';
import "./petList.scss";
import { SpinnerImg } from '../../loader/Loader';

const PetList = ({ pets = [], isLoading }) => {  // Defaulting pets to an empty array if undefined
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className='pet-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Pet Items</h3>
          </span>
          <span>
            <h3>Search pets</h3>
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className='table'>
          {!isLoading && pets.length === 0 ? (
            <p>--no pets found please add pets....</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, index) => { // Removed length check as it's already handled in the conditional rendering above
                  // Check if pet is defined before destructuring its properties
                  const { _id, name, category, price } = pet || {};  
                  return (
                    <tr key={_id || index}> {/* Use index as key fallback if _id is undefined */}
                      <td>{index + 1}</td>
                      <td>{shortenText(name || '', 16)}</td> {/* Use empty string as default for name if undefined */}
                      <td>{category || ''}</td> {/* Use empty string as default for category if undefined */}
                      <td>{price || ''}</td> {/* Use empty string as default for price if undefined */}
                      <td>
                        {/* Placeholder for action buttons or links */}
                        Edit / Delete
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetList;
