import React from 'react'
import styles from "./Search.modules.scss"
import { BiSearch } from "react-icons/bi";

const SearchPet = ({value, onChange}) => {
  return (
    <div className='{styles.search}'>

        <BiSearch size={18} className='{styles.icon}'/>
         <input type='text' placeholder='Search pets' value={value} onChange={onChange}/>
      
    </div>
  )
}

export default SearchPet
