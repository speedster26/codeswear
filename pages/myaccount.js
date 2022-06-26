import React , { useState , useEffect } from 'react'
import { useRouter } from 'next/router';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const MyAccount = (props) => {
  const [user, setUser] = useState()
  const router = useRouter()
  const { logout } = props
  useEffect(() => {
    const fetchUser = async () => {
      let data = {token}
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
          method: 'POST', // or 'PUT'
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      let res = await a.json();
      if(res.success===true){
        console.log(res);
        setUser(res.user)
      }
    }
    let token = localStorage.getItem('token')
    if (token) {
        fetchUser()
    }
    else{
      router.push('/')
    }
  }, [router])
  
  return (
    <div className='flex mx-auto min-h-screen justify-center mt-36'>
      <div className='flex flex-col items-center w-full'>
        <div className='rounded-full flex justify-center items-center h-24 w-24 bg-pink-700'>
          <FaUserAlt className='text-6xl text-white' />
        </div>
        <div className='flex flex-col justify-center items-center'>
          {!user && <div className='font-bold text-2xl'>Name</div>}
          {user && <div className='font-bold text-2xl'>{user.name}</div>}
          {!user && <div className='font-semibold text-xl'>Email</div>}
          {user && <div className='font-semibold text-xl'>{user.email}</div>}
        </div>
        <div className='w-64 flex flex-col space-y-4 mt-12'>
          <div className='bg-pink-500 shadow-xl w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-black hover:shadow-lg duration-300'>
            <div onClick={()=>{router.push('/change')}} className='flex hover:cursor-pointer justify-between p-4 text-white'>
              <div className='font-medium text-lg'>Change Password</div>
              <div className='flex items-center'><AiOutlineArrowRight /></div>
            </div>
          </div>
          <div onClick={logout} className='bg-pink-500 shadow-xl w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-black hover:shadow-lg duration-300'>
            <div className='flex justify-between p-4 text-white hover:cursor-pointer'>
              <div className='font-medium text-lg'>Logout</div>
              <div className='flex items-center'><AiOutlineArrowRight /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount