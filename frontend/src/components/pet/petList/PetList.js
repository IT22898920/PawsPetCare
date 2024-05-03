import React, { useEffect, useState } from 'react';
import './petList.scss';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PETS, selectFilteredpet } from '../../../redux/features/Pets/petFilterSlice';
import SearchPet from '../../search-pets/SearchPet';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deletepets, getPets } from '../../../redux/features/Pets/petsSlice';


const PetList = ({ pets = [], isLoading }) => {
  const [SearchPet, setSearchPet] = useState('');
  const filteredPets = useSelector(selectFilteredpet)
  const dispatch = useDispatch()

  // Defaulting pets to an empty array if undefined
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delpet = async (id) => {
    console.log(id);
    await dispatch(deletepets(id));
    await dispatch(getPets());
  };
  const confirmDelete = (id) => {
    confirmAlert({
        title: "Delete Blog",
        message: "Are you sure you want to delete this Blog?",
        buttons: [
            {
                label: "Delete",
                onClick: () => delpet(id),
            },
            {
                label: "Cancel",
                // No need for an onClick if it just cancels
            },
        ],
    });
};


 //BEgin pagination
     // Pagination state
     const [currentItems, setCurrentItems] = useState([]);
     const [pageCount, setPageCount] = useState(0);
     const [itemOffset, setItemOffset] = useState(0);
     const itemsPerPage = 5;

     // Fetch and filter blogs
     useEffect(() => {
      if (pets) {
          console.log(pets); // This will show you the structure of `blog`
          dispatch(FILTER_PETS({ pets, SearchPet }));        }
  }, [pets, SearchPet, dispatch]);


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredPets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPets.length / itemsPerPage));
}, [itemOffset, itemsPerPage, filteredPets])

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % filteredPets.length;
  setItemOffset(newOffset);
};

    
 //end pagination

 

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
              value={SearchPet}
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
                {currentItems.map((pet, index) => {
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
                        <FaTrashAlt size={20} color="red" onClick={() => confirmDelete(_id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </div>
  );
};

export default PetList;
