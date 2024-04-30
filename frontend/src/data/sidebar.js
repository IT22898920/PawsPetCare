import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";

const menu = [
  {
    title: "All Users",
    icon: <FaTh />,
    path: "/allusers",
  },
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Pet Dashboard",
    icon: <FaTh />,
    path: "/pet-dashboard",
  },
  {
    title: "Blog Dashbord",
    icon: <FaTh />,
    path: "/blog-dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Add Blog",
    icon: <BiImageAdd />,
    path: "/add-blog",
  },
  {
    title: "Add Pets",
    icon: <BiImageAdd />,
    path: "/add-pet",
  },
  
  
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
  {
    title: "Chart",
    icon: <FaChartBar />,
    path: "/chart",
  },
  {
    title: "Order List",
    icon: <FaChartBar />,
    path: "/ordersAdmin",
  },
];

export default menu;
