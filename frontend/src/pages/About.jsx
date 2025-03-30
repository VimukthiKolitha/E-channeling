import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10'>
        <p>About <span className='font-medium'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-700'>
          <p>Welcome to Suwasetha E-Channeling, your trusted digital healthcare partner. Our mission is to bridge the gap between patients and healthcare professionals by providing a seamless, efficient, and user-friendly e-channeling platform.
             With just a few clicks, users can book appointments with their preferred doctors, reducing waiting times and improving access to quality medical care. 
            We are committed to leveraging technology to enhance the healthcare experience for both patients and medical practitioners.</p>
          <p>At Suwasetha E-Channeling, we prioritize convenience, security, and reliability. Our platform ensures that users can easily browse through a comprehensive list of healthcare professionals, check their availability, and schedule appointments at their convenience. 
            We also provide secure payment options and real-time appointment tracking to enhance the overall user experience.
             By integrating innovative solutions, we aim to make healthcare services more accessible and efficient for everyone.</p>
          <p>We believe in a future where healthcare is more connected and accessible to all. Our team is dedicated to continuously improving our platform, incorporating user feedback, and adopting the latest technologies to enhance service quality.
             Whether you're a patient seeking timely medical care or a doctor looking to manage appointments effectively, Suwasetha E-Channeling is here to support you every step of the way. 
            Join us in revolutionizing digital healthcare for a healthier tomorrow!</p>
        </div>
      </div>

    </div>
  )
}

export default About
