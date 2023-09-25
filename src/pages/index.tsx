import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePage from '@/components/HomePage/HomePage'
import Content from '@/components/Content/Content'
import Dashboard from '@/components/Dashboard/Dashboard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router =  useRouter()
  useEffect( () => {
    console.log(location.pathname)
    const token = localStorage.getItem('token')
    if (!token) {
        setIsLoggedIn(false)
        router.push('/login')

    } else {
      setIsLoggedIn(true)
    }
}, [])

  return (
    <div>
      {isLoggedIn && (
      <Dashboard />
      )}
    </div>
  )
}
