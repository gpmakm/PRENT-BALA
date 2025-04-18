"use client"
//import React from 'react'
import Image from 'next/image'
import faceBook from './Images/Facebook.jpg';
import instagram from './Images/Instagram.webp'

import React from 'react'
//import a from 'next/a'
const Navbar = (props) => {
  return (
    <nav>

      <ul>
        <li> <a href={"/"} >Home</a></li>
        {/* <li><a href={"/Card-designs"}>Card designs</a></li> */}
        {/* <li><a href={"/Buy-a-design"}>Buy a design</a></li> */}
        <span>{props.companyName}</span>

        <li id='uploadData' style={{ float: "inline-end" }}><a style={{ display: "flex", float: "left" }} href={"/pages"}>Upload a design</a></li>

        <li>
          <a href={"/shaadi-cards"}> Shaadi-cards </a>
        </li>

        <li>
          <a href={"/visiting-cards"}> Visiting-cards </a>
        </li>

        <li>
          <a href={"/posters"}> Posters </a>
        </li>
        <li>
          <a href={"/api/contact-us"}>Contact us</a>
        </li>
        <li className='socials'>   <a href="https://m.facebook.com/prentbala/" className='socialMedia'><Image src={faceBook} width={30} height={30} className='icons' alt='Facebook' /></a>
          <br />
        </li>
        <li className='socials'>
          <a href="https://www.instagram.com/prentbala/" className='socialMedia'> <Image src={instagram} width={30} height={30} className='icons' alt='Instagarm' /></a></li>

      </ul>


    </nav>
  )
}

export default Navbar