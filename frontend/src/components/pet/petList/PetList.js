import React, { useEffect, useState } from 'react';
import './PetList.scss';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PETS, selectFilteredPet } from '../../../redux/features/Pets/petFilterSlice';
import SearchPet from '../../search-pets/SearchPet';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletepets, getPets } from '../../../redux/features/Pets/petsSlice';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import petLogo from './petLogo.png';

const PetList = ({ pets = [], isLoading }) => {
  const [searchPet, setSearchPet] = useState('');
  const filteredPets = useSelector(selectFilteredPet);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delPet = async (id) => {
    await dispatch(deletepets(id));
    await dispatch(getPets());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Pet',
      message: 'Are you sure you want to delete this Pet?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delPet(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(FILTER_PETS({ pets, searchPet }));
  }, [pets, searchPet, dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredPets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPets.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPets]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPets.length;
    setItemOffset(newOffset);
  };

  // Report generation
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Define columns and prepare rows data
    const tableColumn = ['Name', 'Category', 'Price'];
    const tableRows = filteredPets.map((pet) => [pet.name, pet.category, pet.price]);

    // Load the image and generate the PDF
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    loadImage(petLogo)
      .then((img) => {
        // Add image to PDF
        doc.addImage(img, 'JPEG', 10, 10, 30, 30);

        // Add table
        doc.autoTable(tableColumn, tableRows, { startY: 50 });

        // Save PDF
        doc.save('pets_report.pdf');
      })
      .catch((error) => {
        console.error('Failed to load image for PDF', error);
      });
  };

  return (
    <div className='pet-list'>
      <button onClick={generatePDFReport} className='report-button'>Generate PDF Report</button>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Pet Items</h3>
          </span>
          <span>
            <SearchPet value={searchPet} onChange={(e) => setSearchPet(e.target.value)} />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className='table'>
          {!isLoading && pets.length === 0 ? (
            <p>-- No pets found. Please add pets.</p>
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
                        <Link to={`/pet-detail/${_id}`}>
                          <AiOutlineEye size={25} color='purple' />
                        </Link>
                        <Link to={`/edit-pet/${_id}`}>
                          <FaEdit size={20} color='green' />
                        </Link>
                        <FaTrashAlt size={20} color='red' onClick={() => confirmDelete(_id)} />
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
        breakLabel='...'
        nextLabel='Next'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='Prev'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='activePage'
      />
    </div>
  );
};

export default PetList;
