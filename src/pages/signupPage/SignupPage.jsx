
import { useContext, useState,use, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const SignupPage=()=>{
const {dispatch,user}=useContext(AuthContext)

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState(null)



const handleClick=async(e)=>{
e.preventDefault()

const response =await fetch('http://127.0.0.1:3000/api/user/signup',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
})

const data= await response.json()
if(!response.ok){
    setError(data)
    setEmail('')
    setPassword('')
    console.log(error)
}
if(response.ok){
    setEmail('')
    setPassword('')
    console.log('success')
    localStorage.setItem('user',JSON.stringify(data))
dispatch({type:"LOGIN",payload:data})

}






}

    return(
        <div className="signupPage">
       <form className='signupPage-form' action="">
            <label htmlFor="">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <label htmlFor="">Password</label>
            <input type="password"onChange={(e)=>setPassword(e.target.value)} value={password} />
           <button onClick={handleClick}>SignUp</button>
         {error&&<div className='error'>{error}</div>}
           </form>
           </div>
    )
}