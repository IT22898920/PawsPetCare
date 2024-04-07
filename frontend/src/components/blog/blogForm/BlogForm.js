import React  from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import Card from '../../card/Card'
import "./blogForm.scss";


const BlogForm = ({
    blog,
  blogImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveblog,
}) => {
    return(
        <div className="add-blog">
        <Card cardClass={"card"}>
          <form onSubmit={saveblog}>
            <Card cardClass={"group"}>
              <label>blog Image</label>
              <code className="--color-dark">
                Supported Formats: jpg, jpeg, png
              </code>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
  
              {imagePreview != null ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="blog" />
                </div>
              ) : (
                <p>No image set for this blog.</p>
              )}
            </Card>
            <label>blog Name:</label>
            <input
              type="text"
              placeholder="blog name"
              name="name"
              value={blog?.name}
              onChange={handleInputChange}
            />
  
            <label>blog title:</label>
            <input
              type="text"
              placeholder="blog title"
              name="title"
              value={blog?.title}
              onChange={handleInputChange}
            />
  
           
  
            <label>blog Description:</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={BlogForm.modules}
              formats={BlogForm.formats}
            />
  
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save blog
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
};

BlogForm.modules = {
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
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  BlogForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];


export default BlogForm;