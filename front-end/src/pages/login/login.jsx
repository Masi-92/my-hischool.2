import { useState } from "react";

import { toast } from "react-toastify";
import api from '../../api/api.js';
import { AuthApi } from '../../api/authApi.js';
import { loginSchema } from '../../validation/auth.validation.jsx';

import { useDispatch } from 'react-redux';

import { login } from '../../store/slice/auth.slice.js';



export const Login = () => {
const [email,setEmail] = useState("");
const [password,setPassword]= useState("");
const dispatch =useDispatch();


function handleLogin () {
    const {error} = loginSchema.validate({username:email,password});
    if(error) return toast.warn(error.message);
    AuthApi.login(email,password)
    .then((res)=>{
        api.defaults.headers.token = res.data.token
        dispatch(
            login({
                token:res.data.token,
                role: res.data.role,
            fullName: res.data.fullName,
            })
        );
    })
    .catch((err)=>toast.error(err))
}

  return (
    <div >
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="👤"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="🔒"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  </div>
  )
}
export default Login;