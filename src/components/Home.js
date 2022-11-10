import React from 'react'
import './Home.css'
import { useNavigate } from "react-router-dom";
export default function Home() {
  let navigate = useNavigate();
  function ClickLogo() {
    let path = `/`;
    navigate(path);
  }
  return (
    <div>
      <h1 className='H-img1' onClick={ClickLogo}>Wave delivery</h1>
      <div>
        <img src='/images/—Pngtree—flat colorful cartoon style supermarket_5464057.png' alt="" className='H-img2'></img>
        <div className='H-vl'></div>
        <div className='H-encl'>
          <p className='H-p1'>Order groceries online</p>
          <p className='H-p2'>Yes. You heard that right! Order your groceries right from the comfort of your home, and we'll deliver it for you.</p>
        </div>
        <button onClick={() => {
          navigate("/signup")
        }} className='H-button H-btn1' type='submit'>
          Create Account
        </button>
        <button onClick={() => {
          navigate("/login")
        }} className='H-button H-btn2' type='submit'>
          Login
        </button>
      </div>
    </div>
  )
}