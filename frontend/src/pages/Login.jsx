import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/Zustand';
import { Loader } from 'lucide-react';
const Login = () => {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const {login,isLoading}  = useAuthStore();
    const handleSubmit = (e) => {
        e.preventDefault();
        login({email,password});
    }
  return (
    <div className='min-h-screen bg-hero'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
      <Link to="/"><img src="/netflix-logo.png" className='w-36' alt="" /></Link>
      </header>

    <div className='flex justify-center items-center mt-5 mx-3'
    
    
    >
         <motion.div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-lg'
         initial={{opacity:0,y:20}}
         animate={{opacity:1,y:0}}
         transition={{duration:0.5}}
         >
         <h1 className='text-center text-white text-2xl font-bold mb-4'>
            Welcome Back :)
         </h1>
         <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className='text-[18px] font-medium text-gray-300 block'>
                    Email
                </label>
                <input value={email} onChange={(e) => setemail(e.target.value)} type="email" id="email" name="email" className='w-full mt-2 px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none' />
            </div>
            <div>
                <label htmlFor="password" className='text-[18px] font-medium text-gray-300 block'>
                    Password
                </label>
                <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" id="password" name="password" className='w-full mt-2 px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none' />
            </div>
            <button type='submit' className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>{isLoading ? <Loader className='m-auto animate-spin' />: "Login"}</button>
         </form>
         <div className='text-center text-gray-400'>
            Don't have an account? <Link className='text-red-600 hover:underline' to="/signup">Signup</Link>
         </div>
         </motion.div>
    </div>


    </div>
  )
}

export default Login
