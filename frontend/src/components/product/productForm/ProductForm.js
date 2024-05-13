import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  errors
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>

          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            className="form-control select-category"  // Added class for styling
          >
            <option value="">Select Category</option>
            <option value="Cards And Stationery">Cards And Stationery</option>
            <option value="PAWS & Garden">PAWS & Garden</option>
            <option value="Supplements">Supplements</option>
            <option value="Clothing And Accessories">Clothing And Accessories</option>
            <option value="Gifts">Gifts</option>
            <option value="Books & DVDs">Books & DVDs</option>
          </select>

          <label>Product Price:</label>
          <input
            type="number"
            min={1}
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
          {errors?.price && (
            <div className="error-message">{errors.price}</div>
          )}

          <label>Product Quantity:</label>
          <input
            type="number"
            min={1}
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          {errors?.quantity && (
            <div className="error-message">{errors.quantity}</div>
          )}

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["clean"]
  ]
};

ProductForm.formats = [
  "header", "font", "size", "bold", "italic", "underline", "strike", "blockquote",
  "color", "background", "list", "bullet", "indent", "link", "video", "image", "code-block", "align"
];

export default ProductForm;
