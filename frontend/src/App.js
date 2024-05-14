import { useEffect } from "react";
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import AllProductList from "./components/product/productDetail/AllProductList";
import AllBlogList from "./components/blog/blogDetail/AllBlogList";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Chart from "./pages/chart/Chart";
import OutOfStock from "./components/OutOfStock";
import ChartPage from "./components/product/totalStoreValueBarchart/ChartPage";
import UserDashboard from "./pages/userList/UserList";
import ViewCartItems from "./pages/cart/ViewCartItems";
import ViewOrders from "./pages/cart/ViewOrders";
import AddPets from "./pages/addPets/AddPets";
import ClintOutOfStock from "./components/ClintOutOfStock";
import AddBlog from "./pages/addBlog/AddBlog";
import BlogDashboard from "./pages/blogDashboard/BlogDashboard";
import BlogDetail from "./components/blog/blogDetail/BlogDetail";
import EditBlog from "./pages/editBlog/EditBlog";
import OrdersAdmin from "./pages/admin/orders";
import EventDashboard from "./pages/eventDashboard/EventDashboard";
import AddEvent from "./pages/addEvent/AddEvent";
import PetDashboard from "./pages/petDashboard/PetDashboard";
import PetDetail from "./components/pet/petDetail/PetDetail";
import EditPets from "./pages/editpets/EditPets";
import AllPetList from "./components/pet/petDetail/AllPetList";

import DoctorsRequests from "./pages/DoctorsFunc/AdminHandle/DocRequests";
import AllDoctors from "./pages/DoctorsFunc/UserHandle/AllDoctors";
import BookingPage from "./pages/DoctorsFunc/UserHandle/BookingPage";
import ApplyDoctor from "./pages/DoctorsFunc/UserHandle/ApplyDoctor";
import AdminAllDoctors from "./pages/DoctorsFunc/AdminHandle/AdminAllDoctors";
import Appointments from "./pages/DoctorsFunc/UserHandle/Appointments";
import UserSidebar from "./components/userSidebar/UserSidebar";
import DoctorAppointments from "./pages/DoctorsFunc/doctor/DoctorAppointments";
import PetAdoptionForm from "./components/pet/petAdoptionFrom/PetAdoptionForm";
import AddUserAdoption from "./pages/addUserAdoption/AddUserAdoption";
import AdoptSchedule from "./components/pet/AdoptSchedule/AdoptSchedule";
import ViewAllAdoptionSchedule from "./components/pet/AdoptSchedule/ViewAllAdoptionSchedule";
import AdoptScheduleUpdate from "./components/pet/AdoptSchedule/AdoptScheduleUpdate";
import ViewSchedule from "./components/pet/AdoptSchedule/ViewSchedule";
import Reschedule from "./components/pet/AdoptSchedule/Reschedule";
import RegisterUserHome from "./pages/registerUserHome/RegisterUserHome";
import EditEvent from "./pages/editEvent/EditEvent";
import EventDetail from "./components/event/eventDetail/EventDetail";
import AllEventList from "./components/event/eventDetail/AllEventList";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    // Check if the navigation state has `allowed` set to true
    if (location.state?.allowed) {
      return children;
    } else {
      // Redirect to home or any other page if the condition is not met
      return <Navigate to="/" />;
    }
  };


  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/registeruserHome" element={<RegisterUserHome />} />         
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/allusers"
          element={
            <Sidebar>
              <Layout>
                <UserDashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/blog-dashboard"
          element={
            <Sidebar>
              <Layout>
                <BlogDashboard />
              </Layout>
            </Sidebar>
          }
        />
              <Route
          path="/pet-dashboard"
          element={
            <Sidebar>
              <Layout>
                <PetDashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/event-dashboard"
          element={
            <Sidebar>
              <Layout>
                <EventDashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-pet"
          element={
            <Sidebar>
              <Layout>
               <AddPets/>
              </Layout>
            </Sidebar>
          }
        />
       <Route
          path="/add-blog"
          element={
            <Sidebar>
              <Layout>
               <AddBlog />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-event"
          element={
            <Sidebar>
              <Layout>
                <AddEvent />
              </Layout>
            </Sidebar>
          }
        />
<Route
          path="/add-userAdoption"
          element={
            <Sidebar>
              <Layout>
               <AddUserAdoption />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/blog-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <BlogDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/event-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <EventDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/pet-detail/:id"
          element={
            <Sidebar>
              <Layout>
               <PetDetail/>
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <Sidebar>
              <Layout>
                <EditBlog />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <Sidebar>
              <Layout>
                <EditEvent />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-pet/:id"
          element={
            <Sidebar>
              <Layout>
               <EditPets/>
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/chart"
          element={
            <Sidebar>
              <Layout>
                <Chart />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/AllProductList"
          element={
            <UserSidebar>
            <AllProductList />
            </UserSidebar>

          }
        />
       <Route
          path="/AllPetList"
          element={
            <UserSidebar>
            <AllPetList />
            </UserSidebar>
          }
        />
        <Route
          path="/AllBlogList"
          element={
            <UserSidebar>
            <AllBlogList />
            </UserSidebar>
          }
        />
        <Route
          path="/AllEventList"
          element={
            <UserSidebar>
            <AllEventList />
            </UserSidebar>
          }
        />
        <Route
          path="/viewcart"
          element={
            <UserSidebar>
                <ViewCartItems />
            </UserSidebar>
          }
        />
        <Route
          path="admin/viewcart"
          element={
            <Sidebar>
              <Layout>
                <ViewCartItems />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/vieworders"
          element={
            <UserSidebar>
              <ViewOrders />
            </UserSidebar>

          }
        />
        <Route
          path="admin/vieworders"
          element={
            <Sidebar>
              <Layout>
                <ViewOrders />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/ordersAdmin"
          element={
           
              <Layout>
                <OrdersAdmin />
              </Layout>
            
          }
        />

        <Route
          path="/admin/doctorReq"
          element={
            <Sidebar>
            <Layout>
            <DoctorsRequests />
            </Layout>
          </Sidebar>
  
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <Sidebar>
            <Layout>
            <AdminAllDoctors />
             </Layout>
           </Sidebar>
          }
        />
        <Route
          path="/admin/AllProductList"
          element={
            <Sidebar>
              <Layout>
              <AllProductList />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/admin/AllEventList"
          element={
            <Sidebar>
              <Layout>
              <AllEventList />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/admin/AllBlogList"
          element={
            <Sidebar>
              <Layout>
              <AllBlogList />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/admin/AllPetList"
          element={
            <Sidebar>
              <Layout>
              <AllPetList />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/user/doctors"
          element={
            <UserSidebar>
            <Layout>
            <AllDoctors />
               </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/doctor/book-appointment/:doctorId"
          element={
            <UserSidebar>
            <Layout>
            <BookingPage />
            </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <UserSidebar>
            <Layout>
            <ApplyDoctor />
            </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/appointments"
          element={
            <UserSidebar>
            <Layout>
            <Appointments />
            </Layout>
               </UserSidebar>
          
          }
        />
        <Route
          path="/userProfile"
          element={
            <UserSidebar>
              <Layout>
                <Profile />
              </Layout>
            </UserSidebar>
          }
        />
        <Route
          path="/userEdit-profile"
          element={
            <UserSidebar>
            <Layout>
                <EditProfile />
                </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/doctorAppointments"
          element={
            <UserSidebar>
            <Layout>
                <DoctorAppointments />
                </Layout>
               </UserSidebar>
          }
        />
<Route
          path="/schedule"
          element={
            <UserSidebar>
            <Layout>
            <ViewSchedule />
                </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/petAdoptionForm"
          element={
            <UserSidebar>
            <Layout>
            <PetAdoptionForm />
                </Layout>
               </UserSidebar>
          }
        />

          <Route
          path="/adoptSchedule/:petId"
          element={
            <UserSidebar>
            <Layout>
            <AdoptSchedule />
                </Layout>
               </UserSidebar>
          }
        />
        <Route
          path="/reschedule/:Id"
          element={
            <UserSidebar>
            <Layout>
            <Reschedule />
                </Layout>
               </UserSidebar>
          }
        />


<Route
          path="/ViewAllAdoptionSchedule"
          element={
            <Sidebar>
              <Layout>
              <ViewAllAdoptionSchedule />
              </Layout>
            </Sidebar>
          }
        />
     

<Route path="/cout" element={
            <Layout>
              <ClintOutOfStock/>
            </Layout>
        }/>
        <Route path="/out" element={<OutOfStock/>}/>
        <Route path="/total" element={<ChartPage />}/>

        <Route path="/adoptSchedule-update/" element={<AdoptScheduleUpdate />} />

        <Route path="/reschedule/:Id" element={ <Reschedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

