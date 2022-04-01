import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router';

export const LoginPage = (props) => {
  console.log(secretToken);
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [res, setRes] = useState()
  const cookies = new Cookies();
  const router = useRouter()
  const data = {
    email,
    pass
  }
  const onSignIn = () => {
    console.log(data);
    fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then((res) => {
        if (res.status === 201) {
          const token = jwt.sign({
            data  
          }, "vP+nwKyaxgqfVqDOf6VTTH5pSagV2DHeRu/ZGCwZwoA=", { expiresIn: '1h' , header:{isLogged:true} });
          alert("Login Success")
          cookies.set('token', token)
          router.push('/')
        } else {
          alert("Login Failed")
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='login' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Login By Fillup information or <b style={{ color: 'blue', cursor: 'pointer' }}>Scan QR Code</b></h3>
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={onSignIn} style={{ marginTop: '5px' }}>Login</button>
    </div>
  )
}

export default LoginPage;

export async function getStaticProps(){
  const secretToken = process.env.NEXTAUTH_SECRET;
}