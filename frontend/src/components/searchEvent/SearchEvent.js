import React from "react";
import styles from "./SearchEvent.module.scss";
import { BiSearch } from "react-icons/bi";

const SearchEvent = ({value, onChange}) => {
    return (
        <div className={styles.searchEvent}>
            <BiSearch size={18} className={styles.icon} />

            <input 
                type="text" 
                placeholder='Search Events'
                value={value}
                onChange={onChange}/>
        </div>
    )
}

export default SearchEvent;