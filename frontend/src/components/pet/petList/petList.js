import React from 'react';
import './PetList.scss';
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const PetList = ({ pets = [], isLoading }) => {

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n) + "...";
      return shortenedText;
    }
    return text;
  }

  return (
    <div className='pet-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Pets</h3>
          </span>
          <span>
            <h3>Search pets</h3>
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className='table'>
          { !isLoading && pets.length === 0 ? (
            <p>--No Pets Found, Please add pets.....</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, index) => {
                  const { _id, Name, Category, Price } = pet;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(Name, 10)}</td>
                      <td>{Category}</td>
                      <td>{"$"}{Price}</td>
                      <td className='icons'>
                        <span>
                          <AiOutlineEye size={25} color={"purple"} />
                        </span>

                        <span>
                          <FaEdit size={20} color={"green"} />
                        </span>

                        <span>
                          <FaTrashAlt size={20} color={"red"} />
                        </span>
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
