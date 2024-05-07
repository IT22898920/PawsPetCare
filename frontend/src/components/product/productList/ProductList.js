import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import petLogo from './petLogo.png';  

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const [reportType, setReportType] = useState("csv");
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);



  // CSV Report Generation
  const generateCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Category,Price,Quantity,Value\n";

    filteredProducts.forEach(product => {
      const { name, category, price, quantity } = product;
      const value = price * quantity;
      csvContent += `${name},${category},${price},${quantity},${value}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "product_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// PDF Report Generation with Address
const generatePDFReport = () => {
  const doc = new jsPDF();

  // Define address lines
  const petCareAddressLines = [
    "E3, Isurupura",
    "Malabe",
    "Sri Lanka",
  ];

  // Define columns and prepare rows data
  const tableColumn = ["Name", "Category", "Price", "Quantity", "Value"];
  const tableRows = filteredProducts.map(product => [
    product.name, 
    product.category, 
    `LKR ${product.price}`, 
    product.quantity, 
    `LKR ${product.price * product.quantity}`
  ]);

  // Load the image and generate the PDF
  const loadImage = src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  loadImage(petLogo).then(img => {
   
    doc.addImage(img, 'JPEG', 10, 10, 30, 30);

    // Add address text
    doc.setFontSize(10);
    let addressYPosition = 50;  
    petCareAddressLines.forEach(line => {
      doc.text(line, 10, addressYPosition);
      addressYPosition += 10; 
    });

    // Add table and other text elements
    doc.autoTable(tableColumn, tableRows, { startY: addressYPosition + 10 });
    const title = "Products Report";
    doc.setFontSize(14);
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2; 
    doc.text(title, titleX, addressYPosition - 20); 

    // Add current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 10, doc.internal.pageSize.height - 20);

    // Add manager's signature placeholder
    doc.text("Manager's Signature:", 10, doc.internal.pageSize.height - 10);
    doc.line(60, doc.internal.pageSize.height - 10, 150, doc.internal.pageSize.height - 10);

    doc.save("products_report.pdf");
  }).catch(error => {
    console.error("Failed to load image for PDF", error);
  });
};




  // Dropdown for report type selection
  const reportTypeSelector = (
    <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ margin: "10px 0", padding: "5px" }}>
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
    </select>
  );

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <div className="report-options">
        {reportTypeSelector}
        <button
          onClick={() => reportType === "csv" ? generateCSVReport() : generatePDFReport()}
          className="--btn --btn-AllProductList"
          style={{
            
          }}>
          Generate Report
        </button>
      </div>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"LKR "}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"LKR "}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
    </div>
  );
};

export default ProductList;
