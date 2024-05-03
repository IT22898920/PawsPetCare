import React, { useState } from 'react';
import './petList.scss';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';

const PetList = ({ pets = [], isLoading }) => {
  const [searchPet, setSearchPet] = useState('');

  // Defaulting pets to an empty array if undefined
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
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
            <input
              type='text'
              value={searchPet}
              onChange={(e) => setSearchPet(e.target.value)}
              placeholder='Search Pet...'
            />
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
                {pets.map((pet, index) => {
                  const { _id, name, category, price } = pet || {};
                  return (
                    <tr key={_id || index}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name || '', 16)}</td>
                      <td>{category || ''}</td>
                      <td>{price || ''}</td>
                      <td className='icons'>
                        <AiOutlineEye size={25} color='purple' />
                        <FaEdit size={20} color='green' />
                        <FaTrashAlt size={20} color='red' />
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
};

export default PetList;
