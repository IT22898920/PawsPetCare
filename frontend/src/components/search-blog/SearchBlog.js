import React from 'react'
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const SearchBlog = ({ value, onChange }) => {
    return (
        <div className={styles.SearchBlog}>
          <BiSearch size={18} className={styles.icon} />
          <input
            type="text"
            placeholder="Search blogs"
            value={value}
            onChange={onChange}
          />
        </div>
  );
};

export default SearchBlog;



