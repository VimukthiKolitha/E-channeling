import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 '>
        <p>CONTACT<span> US</span></p>
        <div className='flex flex-col justify-center mt-10 text-base'>
          <p>We are here to assist you! If you have any inquiries, need support, or want to learn more about Suwasetha E-Channeling, feel free to reach out to us.
             Our team is dedicated to ensuring a smooth and hassle-free experience for all users, whether you are booking an appointment or managing your healthcare services</p>
        </div>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt=''/>
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p><span><b>Our Head Office</b><br/><p>LotNo 10,Shanamawatha,Galle.</p></span></p>
          <p>Tel : +9441-4141-411</p>
          <p>Email : suwasetha@gmail.com</p>
          <p>Facebook : www.facebook.com/SuwasethaEChanneling</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore More</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
