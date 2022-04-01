import { useRouter } from 'next/router'
import React from 'react'
import Cookies from 'universal-cookie'

export default function HomePage(props) {
  console.log(props);
  const cookies = new Cookies()
  const router = useRouter()
  const logout = () =>{
    cookies.remove('token');
    router.push('/')
  }
  return (
    <div className='centerDiv'>Welcome To HomePages <b onClick={logout} style={{color:"red",cursor:"pointer"}}>Logout</b></div>
  )
}
const secretToken = process.env.NEXTAUTH_SECRET;

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=93436b3153b219c66db910043cc7c850`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }

}