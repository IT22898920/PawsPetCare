// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import './products.css';
// import Categories from "./category";
// import axios from "axios";
// import Alert from 'react-bootstrap/Alert';

// function Products() {
//   const [data, seData] = useState(Categories);

//   const filterResult = (catItem) => {
//     const result = Categories.filter((curData) => {
//       return curData.category === catItem;
//     });
//     seData(result)
//   }

//   const filterResultAll = (catItem) => {
//     const result = Categories.filter((curData) => {
//       return curData.category ;
//     });
//     seData(result)
//   }
  
//   return (
//     <div>
//       <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//         <ol className="carousel-indicators">
//           <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//         </ol>
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img className="d-block w-100" src="./images/bb4.png" alt="First slide" />
//           </div>
//           <div className="carousel-item">
//             <img className="d-block w-100" src="./images/bb2.jpg" alt="Second slide" />
//           </div>
//           <div className="carousel-item">
//             <img className="d-block w-100" src="./images/bb3.png" alt="Third slide" />
//           </div>
//         </div>
//         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="sr-only">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="sr-only">Next</span>
//         </a>
//       </div>


//       <div className="row mt-5 mx-2">
//         <div className="col-md-3">
//         <h3 className="mb-4" style={{color:"#5a189a"}}>Categories</h3>
//           <Link to="/store">
//             <button className="btn btn-warning w-100 mb-3" onClick={() => filterResultAll()}>all</button>
//           </Link>
//           <button className="btn btn-warning w-100 mb-3" onClick={() => filterResult('makeup')}>makeup</button>
//           <button className="btn btn-warning w-100 mb-3" onClick={() => filterResult('skin care')}>skin care</button>
//           <button className="btn btn-warning w-100 mb-3" onClick={() => filterResult('hair care')}>hair care</button>
//           <button className="btn btn-warning w-100 mb-3" onClick={() => filterResult('beauty essential')}>beauty essential</button>
//           <i class="bi bi-list"></i>
//         </div>

//         <div className="col-md-9">
//           <div className="row">
//             {data.map((values) => {
//               const { id, title, price, image } = values;
//               return (
//                 <>
//                   <div className="col-md-3 mb-4" key={values.id}>
//                     <div className="card" >
//                       <img src={values.image} className="card-img-top" alt="Card image cap" />
//                       <div className="card-body">
//                         <h5 className="card-title">{values.title}</h5>
//                         <p>price: {values.price}</p>
//                         <div style={{textAlign:"center"}}>
//                         <Link to={`/add`}>
//                           <a className="btn btn-primary" >Reserve</a>
//                         </Link>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 </>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default Products;