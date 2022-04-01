import React, { useState } from 'react'

export const Signup = () => {
    const [ pass , setPass] = useState('');
    const [ email , setEmail] = useState('');

    const onSignup =async () =>{
      const data = {
        email,
        pass
      }
      console.log(data);
      try {
        const res = fetch('/api/auth/signup' , {method:'POST', headers:{'Content-Type':'application/json'} , body:JSON.stringify(data)})
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
   
  return (
    <div className='login' style={{display:'flex' , justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <h3>Signup for a new Account</h3>
        <input type='text' value={email} onChange={e=>setEmail(e.target.value)} />
        <input type='password' value={pass} onChange={e=>setPass(e.target.value)} />
        <button onClick={onSignup} style={{marginTop:'5px'}}>Signup</button>
    </div>
  )
}
