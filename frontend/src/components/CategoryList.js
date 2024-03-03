// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getcategory } from '../redux/features/product/productSlice'; // Adjust the import path as necessary
// import categoryImage from '../assets/main-background.jpg';

// const CategoryList = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.product.category);

//   useEffect(() => {
//     dispatch(getcategory());
//   }, [dispatch]);

//   // URL or path to the hardcoded image you want to display
//   const imageUrl = "path_to_your_image.jpg"; // Update with the actual path or URL

//   // Inline CSS styles
//   const categoryStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '20px',
//     backgroundColor: '#f0f0f0',
//     padding: '10px',
//     borderRadius: '5px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//   };

//   const imageStyle = {
//     width: '50px',
//     height: '50px',
//     marginRight: '15px',
//     borderRadius: '50%', // Makes the image circular
//   };

//   const textStyle = {
//     fontSize: '18px',
//     color: '#333',
//   };

//   return (
//     <div>
//       {categories.map((cat, index) => (
//         <div key={index} style={categoryStyle}>
//         <img src={categoryImage} alt="Category" style={imageStyle} />
//           <div style={textStyle}>{cat}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryList;
