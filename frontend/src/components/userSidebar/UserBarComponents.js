import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";

const menu = [
  {
    title: "Store",
    icon: <FaTh />,
    path: "/AllproductList",
  },
  {
    title: "Cart",
    icon: <FaTh />,
    path: "/viewCart",
  },
  {
    title: "My Orders",
    icon: <FaTh />,
    path: "/vieworders",
  },
  {
    title: "Channel a Doctor",
    icon: <BiImageAdd />,
    path: "/user/doctors",
  },
  {
    title: "Apply to Doctor",
    icon: <BiImageAdd />,
    path: "/apply-doctor",
  },
  {
    title: "My Appoinments",
    icon: <BiImageAdd />,
    path: "/appointments",
  },
  {
    title: "Pet Adoption",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Pet Adopt",
        path: "/petAdoptionForm",
      },
      {
        title: "Schedule",
        path: "/schedule",
      },
    ],
  },  
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/userProfile",
      },
      {
        title: "Edit Profile",
        path: "/userEdit-profile",
      },
    ],
  },
];

export default menu;
