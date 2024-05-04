import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import { createProduct, selectIsLoading } from "../../redux/features/product/productSlice";
import "./AddProduct.scss";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  errors: {
    name: "",
    category: "",
    quantity: "",
    price: ""
  }
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const validatePrice = (price) => {
    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      return "Only numbers can be entered for the price";
    }
    return "";
  };

  const validateQuantity = (quantity) => {
    if (!/^\d+$/.test(quantity)) {
      return "Only integer numbers can be entered for quantity";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "price") {
      error = validatePrice(value);
    } else if (name === "quantity") {
      error = validateQuantity(value);
    }

    setProduct({ ...product, [name]: value, errors: { ...product.errors, [name]: error } });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("quantity", Number(product.quantity));
    formData.append("price", product.price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div className="add-product-page">
      {isLoading && <Loader />}
      <h3 className="add-product-title">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
        errors={product.errors}
      />
    </div>
  );
};

export default AddProduct;
