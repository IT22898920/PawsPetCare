import React from 'react'
import stylesPet from "../search-pets/SearchPet.module.scss"
import { BiSearch } from "react-icons/bi";

const SearchPet = ({value, onChange}) => {
  return (
    <div className='{stylesPet.search}'>

        <BiSearch size={18} className='{stylesPet.icon}'/>
         <input type='text' placeholder='Search pets' value={value} onChange={onChange}/>
      
    </div>
  )
}

export default SearchPet
