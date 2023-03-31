
import { useContext, useState,use, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import "./signupPage.css";

export const SignupPage=()=>{
const {dispatch,user}=useContext(AuthContext)

const [name,setName]=useState('')
const [surname,setSurname]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [gender,setGender]=useState('')
const [error,setError]=useState(null)



const handleClick=async(e)=>{
e.preventDefault()

const response =await fetch('http://127.0.0.1:3000/api/user/signup',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,surname,email,password,gender})
})

const data= await response.json()
if(!response.ok){
    setError(data)
    setName('')
    setSurname('')
    setEmail('')
    setPassword('')
    console.log(error)
}
if(response.ok){
    setName('')
    setSurname('')
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
       <div className="signUpPageItem">
       <label htmlFor="">Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} />
            </div>
            <div className="signUpPageItem">
       <label htmlFor="">Surname</label>
            <input type="text" onChange={(e)=>setSurname(e.target.value)} value={surname} />
            </div>
           
                <div className="signUpPageItem">
            <label htmlFor="">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </div>
            <div className="signUpPageItem">
            <label htmlFor="">Password</label>
            <input type="password"onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <div className="signUpPageItem-radioBtns">
            <input type="radio" name="gender" id="male" value="male" onChange={(e)=>setGender(e.target.value)} />
                <label className='male' for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female"onChange={(e)=>setGender(e.target.value)} />
                <label className='female' for="female">Female</label>
                </div>
           <button onClick={handleClick}>SignUp</button>
         {error&&<div className='error'>{error}</div>}
           </form>
           </div>
    )
}