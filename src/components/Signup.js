import React, { useState,useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import './Signup.css'
import { Link,useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } from "../firebase"

function SignupForm() {
    const navi = useNavigate();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navi("/chomepage");
  }, [user, loading]);

    function ClickLogo() {
        let path = `/`;
        navi(path);
    }

    // This function is used to add the user to the database
    const createUser = async (e) => {

        /*
            Storing to the USER_EMAIL_PASS collection
        */
       //regex for email
       const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

       //test for email using regex
       const isEmailValid = emailRegex.test(email);

        if (!name || !email || !password || !confirmPassword || !address) {
            toast.warn('Fill Up empty Fields ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (confirmPassword !== password) {
            toast.warn('Passwords do not match', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        }
        else if (isEmailValid === false) {

            toast.warn('Email Address Invalid', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        else {

            // console.log("User added to the database");
            toast.success('Registered Successfully ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            e.preventDefault();
            try {
                registerWithEmailAndPassword(name, email, address,phone,password);
                console.log("User added to the database");
            } catch (error) {
                console.log(error.message);
            }

        }
    }


    return (
        <div className='outerdiv1'>
            <h1 className="logo" onClick={ClickLogo}>Wave Delivery</h1>
            <div className='box2'>
                <div className="form">
                    <div className='column'>
                        <div className="form-body">
                                <div className="influencername">
                                    <PersonIcon className="icon1" />
                                    <input className="form__input" type="text" value={name} onChange={(e) => setName(e.target.value)} id="influencerName" placeholder="Name" />
                                </div>
                            <div className="email1">
                                <EmailIcon className='icon1' />
                                <input type="email" id="email" className="form__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            <div className="address">
                                <textarea  id="address" className="form__input1" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Type your address" />
                            </div>
                            <div className="sp-phone">
                                <input type="text" id="phone" className="form__input1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                            </div>
                            <div className="password">
                                <LockIcon className="icon1" />
                                <input className="form__input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <div className="confirm-password">
                                <LockIcon className='icon1' />
                                <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                            </div>

                            <div className="footer" onClick={createUser} >
                                <button style={{ color: "black" }} type="submit" className="btn-register">
                                    Register
                                </button>
                            </div>
                            <div className="loginButton">
                                <button className="sp-google" onClick={signInWithGoogle}>Register with Google</button>
                            </div>
                            <div className='sp-link'>
                                Already have an account? <Link to="/login">Login</Link> now.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}
export default SignupForm