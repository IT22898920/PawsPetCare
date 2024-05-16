import React, { useEffect } from 'react'
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import "./PetSummary.scss"
import InfoBox from '../../infoBox/InfoBox';



//ICONS

const earningIcon =<AiFillDollarCircle size={40} color='#fff' />
const petIcon =<BsCart4 size={40}color='#fff' />
const categoryIcon =<BiCategory size={40}
color='#fff' />
const outOfStock =<BsCartX size={40}color='#fff' />

const PetSummary = ({pets}) => {


  
  return (
    <div className='pet-summary'>
     <h3 className='--mt'>Pet Status</h3>
     <div className='info-summary'>

       <InfoBox icon={petIcon} title={"Total Pets"} count={pets.length} bgColor="card1"></InfoBox>
       <InfoBox icon={categoryIcon} title={"All categories"} count={"0"} bgColor="card2"></InfoBox>
    


     </div>
    </div>
  )
}

export default PetSummary
