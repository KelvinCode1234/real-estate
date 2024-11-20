import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          access_key: 'a7d50f34-c4ae-4234-ae18-266f69961a3b',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Thank you for subscribing! We will send you updates.');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' id='Footer'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
            <div className='w-full md:w-1/3 mb-8 md:mb-0'>
                <img src={assets.logo_dark} alt="Logo" />
                <p className='text-gray-400 mt-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque sequi tempora sint suscipit quibusdam nesciunt facilis nemo.</p>
            </div>
            <div className='w-full md:w-1/5 mb-8 md:mb-0'>
                <h3 className='text-white text-lg font-bold mb-4'>Company</h3>
                <ul className='flex flex-col gap-3 text-gray-400'>
                    <a href="#Header" className='hover:text-white'>Home</a>
                    <a href="#About" className='hover:text-white'>About</a>
                    <a href="#Contact" className='hover:text-white'>Contact Us</a>
                    <a href="#" className='hover:text-white'>Privacy Policy</a>
                </ul>
            </div>
            <div className='w-full md:w-1/3'>
                <h3 className='text-white text-lg font-bold mb-4'>Subscribe to our newsletter</h3>
                <p className='text-gray-400 mb-4 max-w-80'>The Latest news, articles, and resources, sent to inbox weekly.</p>
                <div className='flex flex-col gap-3' id='Subscribe'>
                    <input
                      type="email"
                      placeholder='Enter your email'
                      className='p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className='py-2 px-4 rounded bg-blue-500 text-white'
                      onClick={handleSubscribe}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                    {message && <p className='text-gray-300 mt-3'>{message}</p>}
                </div>
            </div>
        </div>
        <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-300'>
            Copyright 2024 &copy; Estate | All Right Reserved.
        </div>
    </div>
  );
};

export default Footer;
