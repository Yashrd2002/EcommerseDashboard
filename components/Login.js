import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from 'next/router';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        return;
      }
      if(res.ok){
        router.push("/products")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
