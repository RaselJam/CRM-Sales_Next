import Link from 'next/link'
import React from 'react'

function login() {
  return (
    <>
      <h1 className='text-center text-2xl text-white font-light'>
        Login
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm ">
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input id="email" placeholder='Enter Email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <input id="password" placeholder='Enter Password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value="Login" />
            <Link href="/signup"><a className='bg-gray-800 w-full mt-5 p-2 text-white uppercase block text-center hover:bg-gray-900'>SignUp</a></Link>
          </form>

        </div>
      </div>
    </>
  )
}

export default login
